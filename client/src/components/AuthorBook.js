import PropTypes from "prop-types";

const AuthorBook = ({
  book: { title, year, ISBN_10, page_count, book_cover },
}) => {
  return (
    <div className="card card-body mb-3 ">
      <div className="row">
        <div className="col-lg-6">
          <h4>{title}</h4>
          <p>Year: {year}</p>
          <p>ISBN 10: {ISBN_10}</p>
          <p>Page count: {page_count}</p>
        </div>
        <div className="col-lg-3 mt-2 d-flex justify-content-center">
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
      </div>
    </div>
  );
};

AuthorBook.propTypes = {
  book: PropTypes.object,
  title: PropTypes.string,
  year: PropTypes.string,
  ISBN: PropTypes.string,
  page_count: PropTypes.string,
  book_cover: PropTypes.string,
};

AuthorBook.defaultProps = {
  book: {},
  title: "Title",
  year: "Year",
  ISBN: "ISBN",
  page_count: "Page count",
  book_cover: "Book cover",
};

export default AuthorBook;
