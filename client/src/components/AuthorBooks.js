import { useQuery, gql } from "@apollo/client";
import Loader from "./loaders/loader";
import "../styles/loaders/loader.css";
import AuthorBook from "./AuthorBook";
import { Link } from "react-router-dom";

const AUTHOR_BOOKS_QUERY = gql`
  query AuthorBooksQuery($_id: String!) {
    books(author_id: $_id) {
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
  let { _id } = params;

  const { loading, error, data } = useQuery(AUTHOR_BOOKS_QUERY, {
    variables: { _id },
  });

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
      <p class="alert alert-danger m-2" role="alert">
        Error :(
      </p>
    );

  return (
    <>
      {data.books.map((book, index) => (
        <AuthorBook key={index} book={book} />
      ))}
      <div className="m-2 d-flex justify-content-end">
        <Link to={`/add_author_book/${_id}`} className="btn btn-success m-2">
          Add new book
        </Link>
        <Link to={`/`} className="btn btn-danger m-2">
          Back
        </Link>
      </div>
    </>
  );
};

export default AuthorBooks;
