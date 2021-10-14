import "./App.css";
import Authors from "./components/Authors";
import AuthorBooks from "./components/AuthorBooks";
import NewAuthorForm from "./components/NewAuthorForm";
import NewBookForm from "./components/NewBookForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddAuthorForm from "./components/AddAuthorForm";

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Authors} />
          <Route exact path="/books/:author_id" component={AuthorBooks} />
          <Route exact path="/add_author" component={NewAuthorForm} />
          <Route
            exact
            path="/edit_author/:author_id"
            component={AddAuthorForm}
          />

          <Route
            exact
            path="/add_author_book/:author_id"
            component={NewBookForm}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
