const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
  name: String,
  post: String,
  country: String,
  images: {
    userimage: {
      type: String,
      required: true
    },
    flag: {
      type: String,
      required: true
    },
    comaimage: {
      type: String,
      required: true
    }
  }
});

module.exports = mongoose.model('test', testSchema);
