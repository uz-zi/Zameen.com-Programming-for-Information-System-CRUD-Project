//https://github.com/uz-zi/mobile_and_web_CA1
import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useLocation } from 'react-router-dom';

const PostDetail = () => {
  const location = useLocation();
  const postId = location.state?.postId;
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/user/propertypost/${postId}`);
        console.log("-------------",res.data)
        setPost(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [postId]);

  const {
    Title,
    Description,
    Price,
    PropertyType,
    Address,
    City,
    Area,
    Bedrooms,
    Bathrooms,
    SizeInSqFt,
    Image,
    User,
  } = post;

  return (
    <div className="product-container" style={{ display: 'flex', gap: '2rem', padding: '1rem' }}>
      <div className="product-image-container" style={{ flex: 1 }}>
        <img
          src={
            Image
              ? `${import.meta.env.VITE_BACKEND_URL}${Image}`
              : 'https://via.placeholder.com/300'
          }
          alt="Product"
          className="main-image"
          style={{ width: '100%', borderRadius: '8px' }}
        />
      </div>

      <div className="product-details" style={{ flex: 2 }}>
        <h5 className="product-title">{Title}</h5>
        <p className="product-description">{Description}</p>
        <p className="product-price">Price: PKR {Price?.toLocaleString()}</p>
        <p className="product-info">Type: {PropertyType}</p>
        <p className="product-info">Location: {Address}, {Area}, {City}</p>
        {Bedrooms !== null && <p className="product-info">Bedrooms: {Bedrooms}</p>}
        {Bathrooms !== null && <p className="product-info">Bathrooms: {Bathrooms}</p>}
        <p className="product-info">Size: {SizeInSqFt} sqft</p>
        <p className="product-category">Posted by: {User?.FirstName || 'Unknown'}</p>

        <div className="product-rating">
          <span className="material-icons">star</span>
        </div>

        <button className="btn btn-warning" type="button">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
