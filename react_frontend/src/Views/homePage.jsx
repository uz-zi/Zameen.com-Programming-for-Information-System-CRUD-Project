import React from 'react';

const RealEstateUI = () => {
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-2">
        <div className="d-flex gap-3">
          <span>Home</span>
          <span>Properties</span>
          <span>Plot Finder</span>
          <span>Area Guides</span>
          <span>Blog</span>
          <span>Maps</span>
          <span>Tools</span>
          <span>More</span>
        </div>
        <div className="d-flex gap-3">
          <span>Property ID</span>
          <span>Add Property</span>
          <span>Language</span>
          <span>Country</span>
          <span>Login</span>
        </div>
      </div>

      <div className="d-flex gap-3 my-2">
        <span>Buy</span>
        <span>Homes</span>
        <span>Plots</span>
        <span>Commercial</span>
        <span>Rent</span>
        <span>Agents</span>
        <span>New Projects</span>
      </div>

      <div className="my-4">
        <h4>Search properties for sale in Pakistan</h4>

        <div className="d-flex gap-3 my-2">
          <button className="btn btn-outline-primary">Buy</button>
          <button className="btn btn-outline-secondary">Rent</button>
          <button className="btn btn-outline-success">Projects</button>
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
          <button className="btn btn-link">More Options</button>
          <button className="btn btn-link">Change Currency</button>
          <button className="btn btn-link">Change Area Unit</button>
          <button className="btn btn-link text-danger">Reset Search</button>
        </div>
      </div>
    </div>
  );
};

export default RealEstateUI;
