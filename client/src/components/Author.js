import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";

const Author = ({
  author: { _id: author_id, name, birth_year, author_pic },
  onDelete,
  onEdit,
}) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          <h4>{name}</h4>
          <p>
            Birth year: <Moment format="MMM Do, YYYY">{birth_year}</Moment>
          </p>
          <button className="btn btn-secondary m-2">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/books/${author_id}`}
            >
              Author Books
            </Link>
          </button>
          <button onClick={() => onEdit()} className="btn btn-secondary m-2">
            Edit Author
          </button>
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
      <button onClick={() => onDelete()} className="btn btn-secondary mt-2">
        Delete
      </button>
    </>
  );
};

Author.propTypes = {
  onDelete: PropTypes.func,
  author: PropTypes.object,
  _id: PropTypes.string,
  name: PropTypes.string,
  birth_year: PropTypes.string,
  author_pic: PropTypes.string,
};

Author.defaultProps = {
  onDelete: () => {},
  author: {},
  _id: "Author ID",
  name: "Author name",
  birth_year: "Birth year",
  author_pic: "Author picture",
};

export default Author;
