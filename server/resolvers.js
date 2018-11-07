const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getAllColognes: async (root, args, { Cologne }) => {
      const allColognes = await Cologne.find();
      return allColognes;
    }
  },

  Mutation: {
    addCologne: async (
      root,
      { scentName, scentPrice, description, username },
      { Cologne }
    ) => {
      const newCologne = await new Cologne({
        scentName,
        scentPrice,
        description,
        username
      }).save();

      return newCologne;
    },

    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found");
      }
      // check to make sure password matches with user
      // that is found
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid Password");
      }
      // all good? return token
      return { token: createToken(user, process.env.SECRET, "1hr") };
    },

    signupUser: async (root, { username, email, password }, { User }) => {
      // does user already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already exists");
      }
      // user doesn't exist, create a user
      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    }
  }
};
