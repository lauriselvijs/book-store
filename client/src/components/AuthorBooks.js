import { useQuery, gql } from "@apollo/client";
import Loader from "./loaders/loader";
import "../styles/loaders/loader.css";
import AuthorBookList from "./AuthorBookList";

const AUTHOR_BOOK_QUERY = gql`
  query CountryNameTranslQuery($ISBN: String!) {
    books(ISBN: $ISBN) {
      book {
        ISBN
        author_id
        title
        year
        category
        description
        page_count
        book_cover
      }
    }
  }
`;

const AuthorBooks = ({ match: { params } }) => {
  let { ISBN } = params;

  const { loading, error, data } = useQuery(AUTHOR_BOOK_QUERY, {
    variables: { ISBN },
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
      {data.books.map((book) => (
        <AuthorBookList key={data.books.book.ISBN} book={book} />
      ))}
    </>
  );
};

export default AuthorBooks;
