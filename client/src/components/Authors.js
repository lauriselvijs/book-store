import { Link } from "react-router-dom";

const Authors = ({
  Author: { author_id, first_name, last_name, birth_year, author_pic },
}) => {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-6">
          <h4>
            {first_name} {last_name},
          </h4>
          <p>Birth year: {birth_year}</p>
          <p>Author ID: {author_id}</p>
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
        <div className="col-md-3">
          <h5>Books</h5>
          <Link to={`/books/${author_id}`} className="btn btn-secondary">
            Author Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Authors;
