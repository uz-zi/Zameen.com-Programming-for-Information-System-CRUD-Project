import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RealEstateUI = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleResetSearch = () => {
    setSearchQuery("");
    navigate("/UploadPosts");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate("/UploadPosts", { state: { searchquery: searchQuery } });
    }
  };

  const addpost = () => {
    navigate("/addPost");
  };

  const viewprofile = () => {
    navigate("/Profile");
  };

  return (
    <>
      {/* Bootstrap navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Zameen.com</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Search form */}
            <form className="d-flex me-auto" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search city, area, or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-outline-primary me-2" type="submit">Search</button>
              <button className="btn btn-outline-danger" type="button" onClick={handleResetSearch}>Reset</button>
            </form>

            {/* Buttons */}
            <div className="d-flex gap-3 my-2">
              <button className="btn btn-outline-primary" onClick={addpost}>Add a new post</button>
              <button className="btn btn-outline-secondary" onClick={viewprofile}>View Profile</button>
              <button className="btn btn-outline-success" onClick={handleResetSearch}>View Posts</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default RealEstateUI;
