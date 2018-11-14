const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

// bring in graphql middleware
const { ApolloServer } = require("apollo-server-express");

// models
const Cologne = require("./models/Cologne");
const User = require("./models/User");

// graphql
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

// connect to db
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("DB connected"))
  .catch(err => {
    console.log(`Error on start: ${err.stack}`);
    process.exit(1);
  });

mongoose.set("useCreateIndex", true);

// initialize app
const app = express();

// set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(req.headers);
  next();
});

// create apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ Cologne, User })
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
