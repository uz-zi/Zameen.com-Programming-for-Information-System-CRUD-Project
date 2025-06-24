import React from 'react';

const RealEstateUI = () => {
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Properties</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                More
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Blog</a></li>
                <li><a className="dropdown-item" href="#">Maps</a></li>
                <li><hr className="dropdown-divider"></hr></li>
                <li><a className="dropdown-item" href="#">Tools</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Login</a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>


    <div className="container">
      <div className="my-4">
        <h4>Search properties for sale in Pakistan</h4>

        <div className="d-flex gap-3 my-2">
          <button className="btn btn-outline-primary">Buy</button>
          <button className="btn btn-outline-secondary">Rent</button>
          <button className="btn btn-outline-success">Apartment</button>
        </div>

        <div className="row g-2 my-2">
          <div className="col-md-3">
            <label className="form-label">City</label>
            <input type="text" className="form-control" placeholder="Islamabad" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Location</label>
            <input type="text" className="form-control" placeholder="Find" />
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button className="btn btn-primary w-100">Search</button>
          </div>
        </div>

        <div className="d-flex gap-3 my-3">
          <button className="btn btn-link text-danger">Reset Search</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default RealEstateUI;
