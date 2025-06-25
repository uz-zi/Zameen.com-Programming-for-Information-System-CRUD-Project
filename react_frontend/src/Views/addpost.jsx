import React, { useState } from 'react';

const PostForm = () => {
  const [postContent, setPostContent] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ postContent, file });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <form onSubmit={handleSubmit}>
          {/* Post Content */}
          <div className="mb-4">
            <label className="form-label fw-bold text-muted">
              Post Content:
            </label>
            <textarea
              id="postContent"
              name="postContent"
              rows="4"
              className="form-control"
              placeholder="What's on your mind?"
              maxLength={280}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
          </div>

          {/* File Attachment */}
          <div className="mb-4">
            <label htmlFor="fileAttachment" className="form-label fw-bold text-muted">
              Attach File:
            </label>
            <div className="border p-3 rounded d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <span className="text-secondary small">Choose a file</span>
              </div>
              <span className="text-muted small">Max file size: 5MB</span>
              <input
                type="file"
                id="fileAttachment"
                name="fileAttachment"
                className="position-absolute w-100 h-100 opacity-0"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Submit Button and Character Limit */}
          <div className="d-flex justify-content-between align-items-center">
            <button type="submit" className="btn btn-primary d-flex align-items-center gap-2">
              Post
            </button>
            <span className="text-muted small">Max 280 characters</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
