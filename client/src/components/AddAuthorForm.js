import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import PropTypes from "prop-types";

const ADD_NEW_AUTHOR_QUERY = gql`
  mutation ($name: String!, $birth_year: String!, $author_pic: String!) {
    addAuthor(name: $name, birth_year: $birth_year, author_pic: $author_pic) {
      name
      birth_year
      author_pic
    }
  }
`;

const EDIT_AUTHOR_QUERY = gql`
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

const AddAuthorForm = ({
  onBackBtnClick,
  authorInfo: { _id: author_id, name, birth_year, author_pic },
  editForm,
}) => {
  const [addNewAuthor] = useMutation(ADD_NEW_AUTHOR_QUERY);
  const [editAuthor] = useMutation(EDIT_AUTHOR_QUERY);

  const [authorName, setAuthorName] = useState(name);
  const [birthYear, setBirthYear] = useState(birth_year);
  const [authorPicture, setAuthorPicture] = useState(author_pic);
  const [showError, setShowError] = useState(false);
  const [showInfoMsg, setShowInfoMsg] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (authorName && birthYear && authorPicture && !editForm) {
      setShowError(false);
      addNewAuthor({
        variables: {
          name: authorName,
          birth_year: birthYear,
          author_pic: authorPicture,
        },
      });
      setAuthorName("");
      setBirthYear("");
      setAuthorPicture("");
      setShowInfoMsg(true);
    } else if (editForm) {
      setShowError(false);
      editAuthor({
        variables: {
          author_id,
          name: authorName,
          birth_year: birthYear,
          author_pic: authorPicture,
        },
      });
      setShowInfoMsg(true);
    } else {
      setShowError(true);
      setShowInfoMsg(false);
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
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthYear" className="form-label mt-4">
                Birth year
              </label>
              <input
                value={birthYear}
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

        {showInfoMsg && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            Saved!
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
        <button onClick={() => onBackBtnClick()} className="btn btn-danger m-2">
          Back
        </button>
      </div>
    </>
  );
};

AddAuthorForm.propTypes = {
  editForm: PropTypes.bool,
  onBackBtnClick: PropTypes.func,
  authorInfo: PropTypes.shape({
    name: PropTypes.string,
    author_id: PropTypes.string,
    birth_year: PropTypes.string,
    author_pic: PropTypes.string,
  }),
};

AddAuthorForm.defaultProps = {
  editForm: false,
  onBackBtnClick: () => {},
  authorInfo: { author_id: "", name: "", birth_year: "", author_pic: "" },
};

export default AddAuthorForm;
