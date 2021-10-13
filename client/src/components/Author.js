import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";

const Author = ({ author: { _id, name, birth_year, author_pic } }) => {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-lg-6">
          <h4>{name}</h4>
          <p>
            Birth year: <Moment format="DD MMMM, YYYY">{birth_year}</Moment>
          </p>
          <Link to={`/books/${_id}`} className="btn btn-secondary">
            Author Books
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
