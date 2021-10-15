import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import Loader from "./loaders/loader";
import "../styles/loaders/loader.css";
import AuthorBook from "./AuthorBook";
import { Link } from "react-router-dom";
import NewBookForm from "./NewBookForm";

const AUTHOR_BOOKS_QUERY = gql`
  query AuthorBooksQuery($author_id: String!) {
    authorBooks(author_id: $author_id) {
      ISBN_10
      author_id
      title
      year
      page_count
      book_cover
    }
  }
`;

const DELETE_AUTHOR_QUERY = gql`
  mutation DeleteBookQuery($ISBN_10: String!) {
    deleteBook(ISBN_10: $ISBN_10) {
      ISBN_10
      author_id
      title
      year
      page_count
      book_cover
    }
  }
`;

// adding prop check for match and params
const AuthorBooks = ({ match: { params } }) => {
  let { author_id } = params;

  const { loading, error, data, refetch } = useQuery(AUTHOR_BOOKS_QUERY, {
    variables: { author_id },
  });

  const [deleteBook] = useMutation(DELETE_AUTHOR_QUERY);

  const [addNewBook, setAddNewBookForm] = useState(false);
  const [bookInfo, setBookInfo] = useState();
  const [editForm, setEditForm] = useState(false);

  const onDeleteBtnClick = (ISBN_10) => {
    deleteBook({
      variables: { ISBN_10 },
    });
    refetch();
  };

  const onAddNewBookBtnClick = () => {
    setBookInfo({
      author_id,
      ISBN_10: "",
      title: "",
      year: "",
      page_count: "",
      book_cover: "",
    });
    setAddNewBookForm(true);
  };

  const onBackBtnClick = () => {
    setBookInfo("");
    setEditForm(false);
    setAddNewBookForm(false);
    refetch();
  };

  const onEditButtonClick = (book) => {
    setBookInfo(book);
    setEditForm(true);
    setAddNewBookForm(true);
  };

  if (loading)
    return (
      <div className="loading mt-2">
        {" "}
        <Loader />
        Loading...
      </div>
    );
  if (error)
    return (
      <p className="alert alert-danger m-2" role="alert">
        Error :(
      </p>
    );

  return (
    <>
      {!addNewBook ? (
        <>
          {data.authorBooks.map((book, index) => (
            <div className="card card-body mb-3" key={index}>
              <AuthorBook
                book={book}
                onDelete={() => onDeleteBtnClick(book.ISBN_10)}
                onEdit={() => onEditButtonClick(book)}
              />
            </div>
          ))}
          <div className="m-2 d-flex justify-content-end">
            <button
              onClick={onAddNewBookBtnClick}
              className="btn btn-success m-2"
            >
              Add new book
            </button>
            <button className="btn btn-danger m-2">
              <Link style={{ textDecoration: "none", color: "white" }} to={`/`}>
                Back
              </Link>
            </button>
          </div>
        </>
      ) : (
        <NewBookForm
          bookInfo={bookInfo}
          editForm={editForm}
          onBackBtnClick={onBackBtnClick}
        />
      )}
    </>
  );
};

export default AuthorBooks;
