import React, { useState, useEffect } from 'react';
import axios from '../axios';
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
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch post details if editing
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await axios.get(`/user/propertypost/${postId}`);
        console.log("==========update the post",res.data)
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
        if (data.Image) {
          setImagePreview(`${import.meta.env.VITE_BACKEND_URL}${data.Image}`);
        }
      } catch (err) {
        console.error("Failed to load post data", err);
      }
    };

    if (postId) fetchPostData();
  }, [postId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('propertyType', propertyType);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('area', area);
    formData.append('bedrooms', bedrooms);
    formData.append('bathrooms', bathrooms);
    formData.append('sizeInSqFt', sizeInSqFt);

    if (image) {
      formData.append('image', image);
    }

    try {
      if (postId) {
        const response = await axios.put(`/user/propertypost/${postId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response.data.success) {
          alert('Post updated successfully!');
          navigate('/UploadPosts');
        }
      } else {
        const response = await axios.post('/user/addpropertypost', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.data.success) {
          alert('Post created successfully!');
          navigate('/UploadPosts');
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
              accept="image/*"
              className="form-control"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Selected or Existing"
                style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }}
              />
            )}
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
