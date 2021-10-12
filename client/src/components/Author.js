import { useQuery, gql } from "@apollo/client";
import Author from "./Country";
import Loader from "../components/loaders/loader";
import "../styles/loaders/loader.css";

/*
 * Used to create query and looping trough items
 */

const AUTHOR_QUERY = gql`
  query AuthorQuery {
    authors {
      author_id
      first_name
      last_name
      birth_year
      author_pic
    }
  }
`;

const Countries = () => {
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
      {data.authors.map((author) => (
        <Author key={data.authors.author_id} author={author} />
      ))}
    </>
  );
};

export default Countries;
