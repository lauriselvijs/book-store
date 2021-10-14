import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { useMutation, gql } from "@apollo/client";

const DELETE_AUTHOR_QUERY = gql`
  mutation DeleteAuthorQuery($author_id: String!) {
    deleteAuthor(_id: $author_id) {
      ISBN_10
      author_id
      title
      year
      page_count
      book_cover
    }
  }
`;

const Author = ({
  author: { _id: author_id, name, birth_year, author_pic },
}) => {
  const [deleteNewAuthor] = useMutation(DELETE_AUTHOR_QUERY);

  const onDeleteBtnCLick = () => {
    deleteNewAuthor({
      variables: { _id: author_id },
    });
  };

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-lg-6">
          <h4>{name}</h4>
          <p>
            Birth year: <Moment format="DD MMMM, YYYY">{birth_year}</Moment>
          </p>
          <Link to={`/books/${author_id}`} className="btn btn-secondary m-2">
            Author Books
          </Link>
          <Link
            to={`/edit_author/${author_id}`}
            className="btn btn-secondary m-2"
          >
            Edit Author
          </Link>
        </div>
        <div className="col-lg-3 mt-2 d-flex justify-content-center">
          <img
            src={author_pic}
            alt="Author"
            style={{
              width: 300,
              display: "block",
              margin: "auto",
              border: "20px solid rgba(0, 0, 0, 0.05)",
            }}
          />
        </div>
      </div>
      <button onClick={onDeleteBtnCLick} className="btn btn-secondary mt-2">
        Delete
      </button>
    </div>
  );
};

Author.propTypes = {
  author: PropTypes.object,
  _id: PropTypes.string,
  name: PropTypes.string,
  birth_year: PropTypes.string,
  author_pic: PropTypes.string,
};

Author.defaultProps = {
  author: {},
  _id: "Author ID",
  name: "Author name",
  birth_year: "Birth year",
  author_pic: "Author picture",
};

export default Author;
