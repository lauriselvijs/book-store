import { Link } from "react-router-dom";

const Authors = ({
  Book: { title, year, category, description, page_count, book_cover },
}) => {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-6">
          <h4>{title}</h4>
          <p>Year: {year}</p>
          <p>Category: {category}</p>
          <p>Description: {description}</p>
          <p>Page count: {page_count}</p>
          <img
            src={book_cover}
            alt="Book cover"
            style={{
              width: 300,
              display: "block",
              margin: "auto",
              border: "20px solid rgba(0, 0, 0, 0.05)",
            }}
          />
        </div>
        <div className="col-md-3">
          <Link to={`/`} className="btn btn-secondary">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Authors;
