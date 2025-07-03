import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const handleUpdate = (postId) => {
    navigate('/addPost', { state: { postId } });
  };

  const handlePostClick = (postId) => {
    navigate('/postDetails', { state: { postId } });
  };

  const handleDelete = async (postId) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    try {
      await axios.delete(`/user/deletepost/${postId}`);
      setPosts((prevPosts) => prevPosts.filter(post => post.PostID !== postId));
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Failed to delete the post.');
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/user/allpropertyposts');
        console.log("=========", res.data);
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
            src={
              post.Image
                ? `${import.meta.env.VITE_BACKEND_URL}${post.Image}`
                : 'https://plus.unsplash.com/premium_photo-1661963869605-4b5f4c8e55f2?fm=jpg'
            }
            className="card-img-top"
            alt="Post"
            style={{ height: '300px', objectFit: 'cover' }}
          />
          <div className="card-body">
            <h5 className="card-title">{post.Title}</h5>
            <p className="card-text">{post.Description}</p>
            <p className="card-text"><strong>Location:</strong> {post.Area}, {post.City}</p>

            <button className="btn btn-primary me-2" onClick={() => handleUpdate(post.PostID)}>
              Update
            </button>
            <button className="btn btn-danger me-2" onClick={() => handleDelete(post.PostID)}>
              Delete
            </button>
            <button className="btn btn-success" onClick={() => handlePostClick(post.PostID)}>
              Detail
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
