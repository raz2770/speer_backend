const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const Note = require('../src/models/noteModel');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Search API', () => {
  beforeEach(async () => {
    // Clear the Note collection before each test
    await Note.deleteMany({});
  });

  describe('GET /api/search', () => {
    it('should search for notes based on keywords for the authenticated user', async () => {
      const userId = 'user123';
      const note1 = { title: 'Important Meeting', content: 'Discuss project updates', userId };
      const note2 = { title: 'Shopping List', content: 'Buy groceries for the week', userId };
      const note3 = { title: 'Personal Goals', content: 'Exercise and read more books', userId };

      await Note.create(note1);
      await Note.create(note2);
      await Note.create(note3);

      const searchQuery = 'project'; // Searching for notes related to a project

      const res = await chai
        .request(app)
        .get(`/api/search?q=${searchQuery}`)
        .set('Authorization', 'Bearer valid_token');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(1);
      expect(res.body[0]).to.have.property('title').to.equal(note1.title);
      expect(res.body[0]).to.have.property('content').to.equal(note1.content);
    });

    it('should handle no matching notes for the search query', async () => {
      const userId = 'user123';
      const note1 = { title: 'Important Meeting', content: 'Discuss project updates', userId };
      const note2 = { title: 'Shopping List', content: 'Buy groceries for the week', userId };
      const note3 = { title: 'Personal Goals', content: 'Exercise and read more books', userId };

      await Note.create(note1);
      await Note.create(note2);
      await Note.create(note3);

      const searchQuery = 'nonexistent'; // Searching for a term that doesn't exist

      const res = await chai
        .request(app)
        .get(`/api/search?q=${searchQuery}`)
        .set('Authorization', 'Bearer valid_token');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array').that.is.empty;
    });

    it('should handle empty search query', async () => {
      const res = await chai
        .request(app)
        .get('/api/search?q=')
        .set('Authorization', 'Bearer valid_token');

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error').to.equal('Search query cannot be empty');
    });
  });
});
