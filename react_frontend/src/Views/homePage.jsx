import { useNavigate } from "react-router-dom";

const RealEstateUI = () => {
  const navigate = useNavigate();

  const handleResetSearch = () => {
    navigate("/UploadPosts");
  };

  const addpost = () => {
    navigate("/addPost");
  };

   const viewprofile = () => {
    navigate("/Profile");
  };

  return (
    <>
    {/*bootstrap navbar */}
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Zameen.com</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="d-flex gap-3 my-2">
          <button className="btn btn-outline-primary" onClick={addpost}>Add a new post</button>
          <button className="btn btn-outline-secondary" onClick={viewprofile}> View Profile</button>
          <button className="btn btn-outline-success" onClick={handleResetSearch}>View Posts</button>
        </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default RealEstateUI;
