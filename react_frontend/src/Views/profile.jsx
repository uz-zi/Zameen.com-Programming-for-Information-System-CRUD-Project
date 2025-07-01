import React, { useEffect, useState } from 'react';
import axios from '../axios';

const SetupABMId = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedUser = localStorage.getItem('userData');
        if (!storedUser) {
          console.warn('No user data in localStorage');
          return;
        }

        const parsedUser = JSON.parse(storedUser);
        const userId = parsedUser.userId;
        console.log("--------user id", userId);
        const res = await axios.get(`/user/userProfile?id=${userId}`);
        console.log("User profile fetched: ", res.data);
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    fetchUserProfile();
  }, []);


  return (
    <div className="container my-5" style={{ backgroundColor: "#f4f4f0" }}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="mt-4 px-3">
            <h1 className="display-5 fw-semibold py-3">Profile</h1>

            {profile ? (
            <form className="my-4">
              {/* Name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-semibold">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Your name"
                  value={profile.FirstName || ""}
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
                    value={profile.LastName || ""}
                  />
              </div>
               <div className="mb-3">
                <label htmlFor="handle" className="form-label fw-semibold">Phone number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="handle"
                    name="handle"
                    placeholder="phone number"
                    value={profile.PhoneNumber || ""}
                  />
              </div>

               <div className="mb-3">
                <label htmlFor="handle" className="form-label fw-semibold">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="handle"
                    name="handle"
                    placeholder="Email"
                    value={profile.Email || ""}
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
                  value={profile.Bio || ""}
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
            ) : (
  <div>Loading profile...</div>
  )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupABMId;
