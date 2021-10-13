import React, { useState } from "react";
import { Link } from "react-router-dom";

const NewBookForm = ({ match: { params } }) => {
  let { _id } = params;

  const [ISBN10, setISBN10] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookYear, setBookYear] = useState("");
  const [bookPageCount, setBookPageCount] = useState("");
  const [bookCoverURL, setBookCoverURL] = useState("");

  return (
    <>
      <div className="card card-body m-3">
        <form id="newBookForm">
          <fieldset>
            <div className="form-group">
              <label htmlFor="bookISBN10" className="form-label mt-4">
                ISBN 10
              </label>
              <input
                type="text"
                className="form-control"
                id="bookISBN10"
                aria-describedby="bookISBN10"
                placeholder="Enter book ISBN 10"
                value={ISBN10}
                onChange={(e) => setISBN10(e.target.value())}
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
                onChange={(e) => setBookTitle(e.target.value())}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookYear" className="form-label mt-4">
                Book year
              </label>
              <input
                type="text"
                className="form-control"
                id="bookYear"
                aria-describedby="bookYear"
                placeholder="Enter book year"
                value={bookYear}
                onChange={(e) => setBookYear(e.target.value())}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookPageCount" className="form-label mt-4">
                Book page count
              </label>
              <input
                type="text"
                className="form-control"
                id="bookPageCount"
                aria-describedby="bookPageCount"
                placeholder="Enter book page count"
                value={bookPageCount}
                onChange={(e) => setBookPageCount(e.target.value())}
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
                onChange={(e) => setBookCoverURL(e.target.value())}
              />
              <small id="bookCoverURL" className="form-text text-muted">
                Enter URL for book cover
              </small>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="d-flex justify-content-center justify-content-lg-end">
        <Link to={`/`} form="newBookForm" className="btn btn-success m-2">
          Save
        </Link>
        <Link to={`/`} className="btn btn-danger m-2">
          Cancel
        </Link>
      </div>
    </>
  );
};

export default NewBookForm;
