require('should');

const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app-rest');
const Book = require('../models/bookModel');

const agent = request.agent(app);

describe('Book CRUD Test', () => {
  it('should allow a book to be posted and return read and _id', (done) => {
    const bookPost = { title: 'Vu Pham Clean Code', author: 'Vu Pham', genre: 'Programming' };

    agent
      .post('/api/books')
      .send(bookPost)
      .expect(201)
      .end((err, result) => {
        if (err) done(err);
        result.body.should.have.property('read');
        result.body.should.have.property('title');
        result.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close(app.server.close(done()));
  });
});
