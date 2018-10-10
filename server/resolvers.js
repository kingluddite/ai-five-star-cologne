exports.resolvers = {
  Query: {
    getAllColognes: () => {},
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
        username,
      }).save();

      return newCologne;
    },
  },
};
