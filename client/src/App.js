import "./App.css";
import Authors from "./components/Authors";
import AuthorBooks from "./components/AuthorBooks";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Authors} />
          <Route exact path="/books/:author_id" component={AuthorBooks} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
