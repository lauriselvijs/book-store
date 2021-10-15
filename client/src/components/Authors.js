import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Author from "./Author";
import Loader from "./loaders/loader";
import "../styles/loaders/loader.css";
import AddAuthorForm from "./AddAuthorForm";

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

const DELETE_AUTHOR_QUERY = gql`
  mutation DeleteAuthorQuery($author_id: String!) {
    deleteAuthor(_id: $author_id) {
      _id
      name
      birth_year
      author_pic
    }
  }
`;

const Authors = () => {
  const { loading, error, data, refetch } = useQuery(AUTHOR_QUERY);
  const [deleteNewAuthor] = useMutation(DELETE_AUTHOR_QUERY);
  const [addNewAuthor, setAddNewAuthor] = useState(false);
  const [authorInfo, setAuthorInfo] = useState();
  const [editForm, setEditForm] = useState(false);

  const onDeleteBtnClick = (author_id) => {
    deleteNewAuthor({
      variables: { author_id },
    });
    refetch();
  };

  const onAddNewAuthorBtnClick = () => {
    setAddNewAuthor(true);
  };

  const onBackBtnClick = () => {
    setAuthorInfo("");
    setEditForm(false);
    setAddNewAuthor(false);
    refetch();
  };

  const onEditButtonClick = (author) => {
    setAuthorInfo(author);
    setEditForm(true);
    setAddNewAuthor(true);
  };

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
      <p className="alert alert-danger m-2" role="alert">
        Error :(
      </p>
    );

  return (
    <>
      {!addNewAuthor ? (
        <>
          {data.authors.map((author, index) => (
            <div className="card card-body mb-3" key={index}>
              <Author
                author={author}
                onDelete={() => onDeleteBtnClick(author._id)}
                onEdit={() => onEditButtonClick(author)}
              />
            </div>
          ))}
          <div className="m-2 d-flex justify-content-sm-end justify-content-end ">
            <button
              onClick={onAddNewAuthorBtnClick}
              className="btn btn-secondary"
            >
              Add New Author
            </button>
          </div>
        </>
      ) : (
        <AddAuthorForm
          authorInfo={authorInfo}
          editForm={editForm}
          onBackBtnClick={onBackBtnClick}
        />
      )}
    </>
  );
};

export default Authors;
