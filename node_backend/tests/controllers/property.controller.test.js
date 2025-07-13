const {
  createPropertyPost,
  getAllPropertyPosts,
  updatePropertyPost,
  deletePost
} = require('../../Controllers/sign_in.controller');
const multer = require('multer');
const { User, PropertyPost } = require('../../models');

jest.mock('../../models/proprtyPosts.model');
jest.mock('../../models/users.model');

const httpMocks = require('node-mocks-http');
const fs = require('fs');
const path = require('path');

// Mock multer's middleware since createPropertyPost and updatePropertyPost use it
jest.mock('multer', () => {
  const multerMock = jest.fn(() => ({
    single: jest.fn(() => (req, res, next) => next())
  }));
  multerMock.diskStorage = jest.fn(() => {
    return {
      // You can leave this empty or mock the required methods if needed
    };
  });
  return multerMock;
});


describe('Property Post Controller CRUD', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createPropertyPost', () => {
    it('should create a new property post and return 201', async () => {
      const req = httpMocks.createRequest({
        body: {
          title: 'Test Post',
          description: 'Test Desc',
          price: 100000,
          propertyType: 'Apartment',
          address: '123 Test St',
          city: 'Test City',
          area: 'Test Area',
          bedrooms: 2,
          bathrooms: 2,
          sizeInSqFt: 1200
        },
        file: { filename: 'testimage.jpg' }
      });
      const res = httpMocks.createResponse();
      PropertyPost.create.mockResolvedValue({
        Title: req.body.title,
        Description: req.body.description,
        Price: req.body.price,
        PropertyType: req.body.propertyType,
        Address: req.body.address,
        City: req.body.city,
        Area: req.body.area,
        Bedrooms: req.body.bedrooms,
        Bathrooms: req.body.bathrooms,
        SizeInSqFt: req.body.sizeInSqFt,
        UserID: 1,
        Image: `/uploads/images/${req.file.filename}`
      });

      await new Promise((resolve) => createPropertyPost(req, res, resolve));

      expect(res.statusCode).toBe(201);
      const data = res._getJSONData();
      expect(data.success).toBe(true);
      expect(data.post.Title).toBe(req.body.title);
    });

    it('should handle errors in createPropertyPost', async () => {
      const req = httpMocks.createRequest({ body: {} });
      const res = httpMocks.createResponse();
      PropertyPost.create.mockRejectedValue(new Error('DB error'));

      await new Promise((resolve) => createPropertyPost(req, res, resolve));

      expect(res.statusCode).toBe(500);
      const data = res._getJSONData();
      expect(data.message).toBe('Failed to create post');
    });
  });

  describe('getAllPropertyPosts', () => {
    it('should return all property posts with status 200', async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      PropertyPost.findAll.mockResolvedValue([
        { PostID: 1, Title: 'Post1' },
        { PostID: 2, Title: 'Post2' }
      ]);

      await getAllPropertyPosts(req, res);

      expect(res.statusCode).toBe(200);
      const data = res._getJSONData();
      expect(data.length).toBe(2);
    });

    it('should handle errors in getAllPropertyPosts', async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      PropertyPost.findAll.mockRejectedValue(new Error('DB error'));

      await getAllPropertyPosts(req, res);

      expect(res.statusCode).toBe(500);
      const data = res._getJSONData();
      expect(data.message).toBe('Failed to fetch posts');
    });
  });

  describe('updatePropertyPost', () => {
    it('should update the post and return 200', async () => {
      const req = httpMocks.createRequest({
        params: { id: 1 },
        body: {
          title: 'Updated Title',
          description: 'Updated Desc',
          price: 500000,
          propertyType: 'House',
          address: 'New Address',
          city: 'New City',
          area: 'New Area',
          bedrooms: 3,
          bathrooms: 2,
          sizeInSqFt: 1500
        },
        file: null
      });
      const res = httpMocks.createResponse();

      const mockPost = {
        PostID: 1,
        Image: '/uploads/images/oldimage.jpg',
        update: jest.fn().mockResolvedValue(true),
      };

      PropertyPost.findOne.mockResolvedValue(mockPost);
      fs.unlink = jest.fn((path, cb) => cb(null)); // mock unlink

      await new Promise((resolve) => updatePropertyPost(req, res, resolve));

      expect(mockPost.update).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      const data = res._getJSONData();
      expect(data.success).toBe(true);
      expect(data.message).toBe('Property post updated successfully');
    });

    it('should return 404 if post not found during update', async () => {
      const req = httpMocks.createRequest({ params: { id: 999 }, body: {} });
      const res = httpMocks.createResponse();

      PropertyPost.findOne.mockResolvedValue(null);

      await new Promise((resolve) => updatePropertyPost(req, res, resolve));

      expect(res.statusCode).toBe(404);
      const data = res._getJSONData();
      expect(data.success).toBe(false);
      expect(data.message).toBe('Post not found');
    });

    it('should handle errors in updatePropertyPost', async () => {
      const req = httpMocks.createRequest({ params: { id: 1 }, body: {} });
      const res = httpMocks.createResponse();

      PropertyPost.findOne.mockResolvedValue({
        PostID: 1,
        Image: null,
        update: jest.fn().mockRejectedValue(new Error('DB error'))
      });

      await new Promise((resolve) => updatePropertyPost(req, res, resolve));

      expect(res.statusCode).toBe(500);
      const data = res._getJSONData();
      expect(data.success).toBe(false);
      expect(data.message).toBe('Failed to update property post');
    });
  });

  describe('deletePost', () => {
    it('should delete a post successfully', async () => {
      const req = httpMocks.createRequest({ params: { postId: 1 } });
      const res = httpMocks.createResponse();

      const mockPost = { destroy: jest.fn().mockResolvedValue(true) };
      PropertyPost.findOne.mockResolvedValue(mockPost);

      await deletePost(req, res);

      expect(mockPost.destroy).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      const data = res._getJSONData();
      expect(data.message).toBe('Post deleted successfully');
    });

    it('should return 404 if post to delete not found', async () => {
      const req = httpMocks.createRequest({ params: { postId: 999 } });
      const res = httpMocks.createResponse();

      PropertyPost.findOne.mockResolvedValue(null);

      await deletePost(req, res);

      expect(res.statusCode).toBe(404);
      const data = res._getJSONData();
      expect(data.message).toBe('Post not found');
    });

    it('should handle errors in deletePost', async () => {
      const req = httpMocks.createRequest({ params: { postId: 1 } });
      const res = httpMocks.createResponse();

      PropertyPost.findOne.mockRejectedValue(new Error('DB error'));

      await deletePost(req, res);

      expect(res.statusCode).toBe(500);
      const data = res._getJSONData();
      expect(data.message).toBe('Server error while deleting post');
    });
  });
});
