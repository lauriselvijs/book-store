import { useQuery, gql } from "@apollo/client";
import Author from "./Author";
import { Link } from "react-router-dom";
import Loader from "./loaders/loader";
import "../styles/loaders/loader.css";

/*
 * Used to create query and looping trough items
 */

const AUTHOR_QUERY = gql`
  query AuthorQuery {
    authors {
      _id
      name
      birth_year
      author_pic
    }
  }
`;

const Authors = () => {
  const { loading, error, data } = useQuery(AUTHOR_QUERY);

  if (loading)
    return (
      <div className="loading m-2">
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
      {data.authors.map((author, index) => (
        <Author key={index} author={author} />
      ))}
      <div className="m-2 d-flex justify-content-sm-end justify-content-end ">
        <Link to={`/add_author`} className="btn btn-secondary">
          Add New Author
        </Link>
      </div>
    </>
  );
};

export default Authors;
