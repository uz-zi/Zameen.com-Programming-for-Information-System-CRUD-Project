//https://youtu.be/FKnzS_icp20?si=Y5su8affC4mwx4OB
//https://youtu.be/dXOfOgFFKuY?si=zHe73JzGK_iaxepm
//https://www.testim.io/blog/node-js-unit-testing-get-started-quickly-with-examples/
//https://chatgpt.com/share/6874f51e-1bac-8004-9aff-c098a6205f5a
const request = require('supertest');
const app = require('../../index');
const db = require('../../config');
const PropertyPost = require('../../models/proprtyPosts.model');

// Clean up after tests
afterAll(async () => {
  await db.close();
});

describe('Property Post APIs', () => {
  it('should fetch all property posts (empty at start)', async () => {
    const res = await request(app).get('/user/allpropertyposts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it('should create a property post', async () => {
    const res = await request(app)
      .post('/user/addpropertypost')
      .field('title', 'Test Title')
      .field('description', 'Test Description')
      .field('price', 100000)
      .field('propertyType', 'house')
      .field('address', '123 Main St')
      .field('city', 'Islamabad')
      .field('area', 'G-11')
      .field('bedrooms', 3)
      .field('bathrooms', 2)
      .field('sizeInSqFt', 1200);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.post.Title).toBe('Test Title');
  });

  it('should fetch all property posts (with data)', async () => {
    const res = await request(app).get('/user/allpropertyposts');
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a property post', async () => {
    const post = await PropertyPost.findOne();
    const res = await request(app)
      .put(`/user/propertypost/${post.PostID}`)
      .field('title', 'Updated Title')
      .field('description', 'Updated Description')
      .field('price', 150000)
      .field('propertyType', 'apartment')
      .field('address', '456 Park Ave')
      .field('city', 'Lahore')
      .field('area', 'DHA')
      .field('bedrooms', 4)
      .field('bathrooms', 3)
      .field('sizeInSqFt', 1400);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.Title).toBe('Updated Title');
  });

  it('should delete a property post', async () => {
    const post = await PropertyPost.findOne();
    const res = await request(app).delete(`/user/deletepost/${post.PostID}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Post deleted successfully');
  });
});
