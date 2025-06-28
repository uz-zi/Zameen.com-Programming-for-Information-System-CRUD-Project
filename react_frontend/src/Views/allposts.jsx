import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Post = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/user/allpropertyposts');
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="d-flex gap-3 flex-wrap justify-content-center">
      {posts.map((post, index) => (
        <div className="card w-25" key={index}>
          <img
            src={post.Images && post.Images.length > 0 ? post.Images[0] : 'https://plus.unsplash.com/premium_photo-1661963869605-4b5f4c8e55f2?fm=jpg'}
            className="card-img-top"
            alt="Post"
          />
          <div className="card-body">
            <h5 className="card-title">{post.Title}</h5>
            <p className="card-text">{post.Description}</p>
            <p className="card-text"><strong>Location:</strong> {post.Area}, {post.City}</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
