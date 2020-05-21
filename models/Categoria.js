const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categoria = new Schema({
  Nome: {
    type: String,
    required: true
  },
  Slug: {
    type: String,
    required: true
  },
  Data: {
    type: Date,
    default: Date.now()
  }
});

mongoose.model("Categorias", Categoria);
