const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const Note = require('../src/models/noteModel');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Note API', () => {
  beforeEach(async () => {
    // Clear the Note collection before each test
    await Note.deleteMany({});
  });

  describe('GET /api/notes', () => {
    it('should get a list of all notes for the authenticated user', async () => {
      const userId = 'user123'; // Replace with a valid user ID
      const note1 = { title: 'Note 1', content: 'Content 1', userId };
      const note2 = { title: 'Note 2', content: 'Content 2', userId };

      await Note.create(note1);
      await Note.create(note2);

      const res = await chai.request(app).get('/api/notes').set('Authorization', 'Bearer valid_token');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(2);
      expect(res.body[0]).to.have.property('title').to.equal(note1.title);
      expect(res.body[1]).to.have.property('title').to.equal(note2.title);
    });

    it('should handle empty notes for the authenticated user', async () => {
      const res = await chai.request(app).get('/api/notes').set('Authorization', 'Bearer valid_token');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array').that.is.empty;
    });
  });

  describe('GET /api/notes/:id', () => {
    it('should get a specific note by ID for the authenticated user', async () => {
      const userId = 'user123';
      const note = { title: 'Note 1', content: 'Content 1', userId };

      const createdNote = await Note.create(note);

      const res = await chai
        .request(app)
        .get(`/api/notes/${createdNote._id}`)
        .set('Authorization', 'Bearer valid_token');

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('title').to.equal(note.title);
    });

    it('should handle not finding a specific note by ID', async () => {
      const nonExistentNoteId = 'nonexistentnoteid';

      const res = await chai
        .request(app)
        .get(`/api/notes/${nonExistentNoteId}`)
        .set('Authorization', 'Bearer valid_token');

      expect(res).to.have.status(404);
      expect(res.body).to.have.property('error').to.equal('Note not found');
    });
  });

  describe('POST /api/notes', () => {
    it('should create a new note for the authenticated user', async () => {
      const userId = 'user123';
      const newNote = { title: 'New Note', content: 'New Content', userId };

      const res = await chai
        .request(app)
        .post('/api/notes')
        .set('Authorization', 'Bearer valid_token')
        .send(newNote);

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('title').to.equal(newNote.title);
      expect(res.body).to.have.property('content').to.equal(newNote.content);
    });

    it('should not allow creating a note with missing required fields', async () => {
      const incompleteNote = { content: 'Incomplete Content' };

      const res = await chai
        .request(app)
        .post('/api/notes')
        .set('Authorization', 'Bearer valid_token')
        .send(incompleteNote);

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });
  });

  describe('PUT /api/notes/:id', () => {
    it('should update an existing note by ID for the authenticated user', async () => {
      const userId = 'user123';
      const updatedNoteData = { title: 'Updated Note', content: 'Updated Content' };
  
      const existingNote = await Note.create({ title: 'Note to be updated', content: 'Old Content', userId });
  
      const res = await chai
        .request(app)
        .put(`/api/notes/${existingNote._id}`)
        .set('Authorization', 'Bearer valid_token')
        .send(updatedNoteData);
  
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('title').to.equal(updatedNoteData.title);
      expect(res.body).to.have.property('content').to.equal(updatedNoteData.content);
    });
  
    it('should handle updating a non-existing note by ID', async () => {
      const nonExistentNoteId = 'nonexistentnoteid';
      const updatedNoteData = { title: 'Updated Note', content: 'Updated Content' };
  
      const res = await chai
        .request(app)
        .put(`/api/notes/${nonExistentNoteId}`)
        .set('Authorization', 'Bearer valid_token')
        .send(updatedNoteData);
  
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('error').to.equal('Note not found');
    });
  });
  
  describe('DELETE /api/notes/:id', () => {
    it('should delete an existing note by ID for the authenticated user', async () => {
      const userId = 'user123';
  
      const existingNote = await Note.create({ title: 'Note to be deleted', content: 'Old Content', userId });
  
      const res = await chai
        .request(app)
        .delete(`/api/notes/${existingNote._id}`)
        .set('Authorization', 'Bearer valid_token');
  
      expect(res).to.have.status(204);
      // Ensure the note is actually deleted
      const deletedNote = await Note.findById(existingNote._id);
      expect(deletedNote).to.be.null;
    });
  
    it('should handle deleting a non-existing note by ID', async () => {
      const nonExistentNoteId = 'nonexistentnoteid';
  
      const res = await chai
        .request(app)
        .delete(`/api/notes/${nonExistentNoteId}`)
        .set('Authorization', 'Bearer valid_token');
  
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('error').to.equal('Note not found');
    });
  });
  
  describe('POST /api/notes/:id/share', () => {
    it('should share a note with another user for the authenticated user', async () => {
      const userId = 'user123';
      const otherUserId = 'user456';
  
      const existingNote = await Note.create({ title: 'Note to be shared', content: 'Old Content', userId });
  
      const res = await chai
        .request(app)
        .post(`/api/notes/${existingNote._id}/share`)
        .set('Authorization', 'Bearer valid_token')
        .send({ userId: otherUserId });
  
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('sharedWith').to.include(otherUserId);
    });
  
    it('should handle sharing a note with an invalid user', async () => {
      const userId = 'user123';
      const invalidUserId = 'invaliduser';
  
      const existingNote = await Note.create({ title: 'Note to be shared', content: 'Old Content', userId });
  
      const res = await chai
        .request(app)
        .post(`/api/notes/${existingNote._id}/share`)
        .set('Authorization', 'Bearer valid_token')
        .send({ userId: invalidUserId });
  
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error').to.equal('Invalid user to share with');
    });
  });
});
