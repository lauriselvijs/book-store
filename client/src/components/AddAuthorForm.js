import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

const ADD_NEW_AUTHOR_QUERY = gql`
  mutation (
    $author_id: String!
    $name: String!
    $birth_year: String!
    $author_pic: String!
  ) {
    editAuthor(
      _id: $author_id
      name: $name
      birth_year: $birth_year
      author_pic: $author_pic
    ) {
      name
      birth_year
      author_pic
    }
  }
`;

const AddAuthorForm = () => {
  const [addNewAuthor] = useMutation(ADD_NEW_AUTHOR_QUERY);

  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [authorPicture, setAuthorPicture] = useState("");
  const [showError, setShowError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (name && birthYear && authorPicture) {
      setShowError(false);
      addNewAuthor({
        variables: { name, birth_year: birthYear, author_pic: authorPicture },
      });
      setName("");
      // Reset birth year
      setBirthYear("");
      setAuthorPicture("");
    } else {
      setShowError(true);
    }
  };

  return (
    <>
      <div className="card card-body m-3">
        <form id="newAuthorForm" onSubmit={onSubmit}>
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
                value={authorPicture}
                onChange={(e) => setAuthorPicture(e.target.value)}
              />
              <small id="emailHelp" className="form-text text-muted">
                Enter URL for author picture
              </small>
            </div>
          </fieldset>
        </form>

        {showError && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            Fill all fields
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-describedby="Close"
            ></button>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center justify-content-lg-end">
        <button
          type="submit"
          form="newAuthorForm"
          className="btn btn-success m-2"
        >
          Save
        </button>
        <button className="btn btn-danger m-2">
          <Link style={{ textDecoration: "none", color: "white" }} to={`/`}>
            Back
          </Link>
        </button>
      </div>
    </>
  );
};

export default AddAuthorForm;
