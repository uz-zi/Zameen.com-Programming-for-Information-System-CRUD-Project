import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const PostForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location?.state?.postId || null;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [sizeInSqFt, setSizeInSqFt] = useState('');
  const [images, setImages] = useState([]);

  // Fetch post details if editing
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/user/propertypost/${postId}`);
        const data = res.data;
        setTitle(data.Title);
        setDescription(data.Description);
        setPrice(data.Price);
        setPropertyType(data.PropertyType);
        setAddress(data.Address);
        setCity(data.City);
        setArea(data.Area);
        setBedrooms(data.Bedrooms);
        setBathrooms(data.Bathrooms);
        setSizeInSqFt(data.SizeInSqFt);
        // Note: images not set here as it's usually URLs or handled differently
      } catch (err) {
        console.error("Failed to load post data", err);
      }
    };

    if (postId) fetchPostData();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      description,
      price,
      propertyType,
      address,
      city,
      area,
      bedrooms,
      bathrooms,
      sizeInSqFt,
    };

    try {
      if (postId) {
        // UPDATE
        const response = await axios.put(
          `http://localhost:3000/user/propertypost/${postId}`,
          postData
        );
        if (response.data.success) {
          alert('Post updated successfully!');
          navigate('/posts');
        }
      } else {
        // CREATE
        const response = await axios.post(
          'http://localhost:3000/user/addpropertypost',
          postData
        );

        console.log("============",response.data)
        if (response.data.success) {
          alert('Post created successfully!');
          navigate('/posts');
        }
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('Failed to submit post');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light my-5">
      <div className="card shadow p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <form onSubmit={handleSubmit}>
          <h4 className="mb-4">{postId ? 'Update Post' : 'Create Post'}</h4>

          {/* Title */}
          <div className="mb-4">
            <label className="form-label fw-bold text-muted">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="form-label fw-bold text-muted">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="form-control"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="form-label fw-bold text-muted">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="form-control"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Property Type */}
          <div className="mb-4">
            <label className="form-label fw-bold text-muted">
              Property Type:
            </label>
            <select
              id="propertyType"
              name="propertyType"
              className="form-control"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              required
            >
              <option value="">Select property type</option>
              <option value="house">House</option>
              <option value="plot">Plot</option>
              <option value="apartment">Apartment</option>
            </select>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="form-label fw-bold text-muted">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* City */}
          <div className="mb-4">
            <label className="form-label fw-bold text-muted">
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="form-control"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          {/* Area */}
          <div className="mb-4">
            <label className="form-label fw-bold text-muted">
              Area:
            </label>
            <input
              type="text"
              id="area"
              name="area"
              className="form-control"
              placeholder="Enter area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            />
          </div>

          {/* Bedrooms */}
          <div className="mb-4">
            <label className="form-label fw-bold text-muted">
              Bedrooms:
            </label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              className="form-control"
              placeholder="Enter number of bedrooms"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            />
          </div>

          {/* Bathrooms */}
          <div className="mb-4">
            <label className="form-label fw-bold text-muted">
              Bathrooms:
            </label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              className="form-control"
              placeholder="Enter number of bathrooms"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
            />
          </div>

          {/* Size In Sq Ft */}
          <div className="mb-4">
            <label className="form-label fw-bold text-muted">
              Size In Sq Ft:
            </label>
            <input
              type="number"
              id="sizeInSqFt"
              name="sizeInSqFt"
              className="form-control"
              placeholder="Enter size in sq ft"
              value={sizeInSqFt}
              onChange={(e) => setSizeInSqFt(e.target.value)}
              required
            />
          </div>

          {/* Images */}
          <div className="mb-4">
            <label className="form-label fw-bold text-muted">
              Images:
            </label>
            <input
              type="file"
              id="images"
              name="images"
              className="form-control"
              multiple
              onChange={(e) => setImages(e.target.files)}
            />
          </div>

          {/* Submit Button */}
          <div className="d-flex justify-content-between align-items-center">
            <button type="submit" className="btn btn-primary d-flex align-items-center gap-2">
              {postId ? 'Update' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
