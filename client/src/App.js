import "./App.css";
import Author from "./components/Author";
import AuthorBooks from "./components/AuthorBooks";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Author} />
          <Route exact path="/books/:ISBN" component={AuthorBooks} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
