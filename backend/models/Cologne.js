const mongoose = require("mongoose");

const { Schema } = mongoose;

const CologneSchema = new Schema({
  scentName: {
    type: String,
    required: true
  },
  scentPrice: {
    type: Number
  },
  description: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  username: {
    type: String
  }
});

module.exports = mongoose.model("Cologne", CologneSchema);
