import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import PropTypes from "prop-types";

const ADD_NEW_BOOK_QUERY = gql`
  mutation (
    $ISBN_10: String!
    $author_id: String!
    $title: String!
    $year: Int!
    $page_count: Int!
    $book_cover: String!
  ) {
    addBook(
      ISBN_10: $ISBN_10
      author_id: $author_id
      title: $title
      year: $year
      page_count: $page_count
      book_cover: $book_cover
    ) {
      ISBN_10
      author_id
      title
      year
      page_count
      book_cover
    }
  }
`;

const EDIT_BOOK_QUERY = gql`
  mutation (
    $ISBN_10: String!
    $author_id: String!
    $title: String!
    $year: Int!
    $page_count: Int!
    $book_cover: String!
  ) {
    editBook(
      ISBN_10: $ISBN_10
      author_id: $author_id
      title: $title
      year: $year
      page_count: $page_count
      book_cover: $book_cover
    ) {
      ISBN_10
      author_id
      title
      year
      page_count
      book_cover
    }
  }
`;

const NewBookForm = ({
  bookInfo: { author_id, ISBN_10, title, year, page_count, book_cover },
  editForm,
  onBackBtnClick,
}) => {
  console.log(editForm);
  const [addNewBook] = useMutation(ADD_NEW_BOOK_QUERY);
  const [editBook] = useMutation(EDIT_BOOK_QUERY);

  const [ISBN10, setISBN10] = useState(ISBN_10);
  const [bookTitle, setBookTitle] = useState(title);
  const [bookYear, setBookYear] = useState(year);
  const [bookPageCount, setBookPageCount] = useState(page_count);
  const [bookCoverURL, setBookCoverURL] = useState(book_cover);
  const [showError, setShowError] = useState(false);
  const [showInfoMsg, setShowInfoMsg] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      ISBN10 &&
      bookTitle &&
      bookCoverURL &&
      bookPageCount &&
      bookYear &&
      !editForm
    ) {
      setShowError(false);
      addNewBook({
        variables: {
          author_id,
          ISBN_10: ISBN10,
          title: bookTitle,
          year: parseInt(bookYear),
          page_count: parseInt(bookPageCount),
          book_cover: bookCoverURL,
        },
      });
      setISBN10("");
      setBookTitle("");
      setBookYear("");
      setBookPageCount("");
      setBookCoverURL("");
      setShowInfoMsg(true);
    } else if (editForm) {
      setShowError(false);
      editBook({
        variables: {
          author_id,
          ISBN_10,
          title: bookTitle,
          year: parseInt(bookYear),
          page_count: parseInt(bookPageCount),
          book_cover: bookCoverURL,
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
        <form id="newBookForm" onSubmit={onSubmit}>
          <fieldset>
            <div hidden={editForm ? true : false} className="form-group">
              <label htmlFor="bookISBN10" className="form-label mt-4">
                ISBN
              </label>
              <input
                type="text"
                className="form-control"
                id="bookISBN10"
                aria-describedby="bookISBN10"
                placeholder="Enter book ISBN 10"
                value={editForm ? ISBN_10 : ISBN10}
                onChange={(e) => setISBN10(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookTitle" className="form-label mt-4">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="bookTitle"
                aria-describedby="bookTitle"
                placeholder="Enter book title"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookYear" className="form-label mt-4">
                Book year
              </label>
              <input
                type="number"
                min="0"
                className="form-control"
                id="bookYear"
                aria-describedby="bookYear"
                placeholder="Enter book year"
                value={bookYear}
                onChange={(e) => setBookYear(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookPageCount" className="form-label mt-4">
                Book page count
              </label>
              <input
                type="number"
                min="0"
                className="form-control"
                id="bookPageCount"
                aria-describedby="bookPageCount"
                placeholder="Enter book page count"
                value={bookPageCount}
                onChange={(e) => setBookPageCount(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookCoverURL" className="form-label mt-4">
                Book cover URL
              </label>
              <input
                type="url"
                className="form-control"
                id="bookCoverURL"
                aria-describedby="bookCoverURL"
                placeholder="Enter book cover URL"
                value={bookCoverURL}
                onChange={(e) => setBookCoverURL(e.target.value)}
              />
              <small id="bookCoverURL" className="form-text text-muted">
                Enter URL for book cover
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
          form="newBookForm"
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

NewBookForm.propTypes = {
  editForm: PropTypes.bool,
  onBackBtnClick: PropTypes.func,
  bookInfo: PropTypes.shape({
    author_id: PropTypes.string,
    ISBN_10: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    page_count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    book_cover: PropTypes.string,
  }),
};

NewBookForm.defaultProps = {
  editForm: false,
  onBackBtnClick: () => {},
  bookInfo: {
    ISBN_10: "test",
    author_id: "",
    title: "",
    year: "",
    page_count: "",
    book_cover: "",
  },
};

export default NewBookForm;
