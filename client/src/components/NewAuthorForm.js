import React, { useState } from "react";
import { Link } from "react-router-dom";

const NewAuthorForm = () => {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [bookCoverURL, setBookCoverURL] = useState("");

  return (
    <>
      <div className="card card-body m-3">
        <form id="newAuthorForm">
          <fieldset>
            <div className="form-group">
              <label htmlFor="authorName" className="form-label mt-4">
                Author name
              </label>
              <input
                type="text"
                className="form-control"
                id="authorName"
                aria-describedby="authorName"
                placeholder="Enter author name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthYear" className="form-label mt-4">
                Birth year
              </label>
              <input
                type="date"
                className="form-control"
                id="birthYear"
                aria-describedby="birthYear"
                placeholder="Enter author birth date"
                onChange={(e) => setBirthYear(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="authorPictureUrl" className="form-label mt-4">
                Author picture URL
              </label>
              <input
                type="url"
                className="form-control"
                id="authorPictureUrl"
                aria-describedby="authorPictureUrl"
                placeholder="Enter author picture URL"
                value={bookCoverURL}
                onChange={(e) => setBookCoverURL(e.target.value)}
              />
              <small id="emailHelp" className="form-text text-muted">
                Enter URL for author picture
              </small>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="d-flex justify-content-center justify-content-lg-end">
        <Link
          to={`/`}
          type="submit"
          form="newAuthorForm"
          className="btn btn-success m-2"
        >
          Save
        </Link>
        <Link to={`/`} className="btn btn-danger m-2">
          Cancel
        </Link>
      </div>
    </>
  );
};

export default NewAuthorForm;
