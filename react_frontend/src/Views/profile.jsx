import React from 'react';

const SetupABMId = () => {
  return (
    <div className="container my-5" style={{ backgroundColor: "#f4f4f0" }}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="mt-4 px-3">
            <h1 className="display-5 fw-semibold py-3">Profile</h1>

            <form className="my-4">
              {/* Name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-semibold">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Your name"
                />
              </div>

              {/* Username/Handle */}
              <div className="mb-3">
                <label htmlFor="handle" className="form-label fw-semibold">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="handle"
                    name="handle"
                    placeholder="username"
                  />
              </div>

              {/* Profile Photo Preview */}
              <div className="mb-3 text-center">
                <img
                  src="https://plus.unsplash.com/premium_photo-1661963869605-4b5f4c8e55f2?fm=jpg"
                  alt="Current profile"
                  className="rounded-circle"
                  style={{ height: "80px", width: "80px", objectFit: "cover" }}
                />
              </div>

              {/* Upload Photo */}
              <div className="mb-3">
                <label htmlFor="profilePhoto" className="form-label">Choose Profile Photo</label>
                <input
                  className="form-control"
                  type="file"
                  id="profilePhoto"
                />
              </div>

              {/* Bio */}
              <div className="mb-3">
                <label htmlFor="bio" className="form-label fw-semibold">Bio</label>
                <input
                  type="text"
                  className="form-control"
                  id="bio"
                  placeholder="Write Your Bio"
                />
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <button type="submit" className="btn btn-dark fw-bold px-4 py-2">
                  Submit
                </button>
              </div>
              <div className="mt-4">
                <button type="submit" className="btn btn-primary fw-bold px-4 py-2">
                  Update
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupABMId;
