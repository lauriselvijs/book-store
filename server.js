const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const colors = require("colors");
const path = require("path");

const Author = require("./models/Author");

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get("/", async function (req, res) {
  try {
    const authors = await Author.find({});
    res.status(200).json(authors);
    //console.log(authors);
  } catch (e) {
    res.status(404).json(e);
    console.log(e);
  }

  /*
  Author.find({}).then(function (authors, err) {
    if (authors) {
      console.log(authors);
    } else if (!authors) {
      console.log("no authors found");
    } else {
      console.log(err);
    }
  });
*/

  /*
  Author.find({}, function (err, authors) {
    if (authors) {
      console.log(authors);
    } else if (!authors) {
      console.log("nothing found");
    } else {
      console.log(err);
    }
  });
  */
});

//const authors = Author.find({});
//console.log(authors);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
