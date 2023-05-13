const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
    url: {
      type: String,
      required: true,
    },
  });


module.exports  = mongoose.model('audio', audioSchema);

  