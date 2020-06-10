const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Postagem = new Schema({
    Titulo: {
        type: String,
        required: true
    },
    Slug: {
        type: String,
        required: true
    },
    Descricao: {
        type: String,
        required: true
    },
    Conteudo: {
        type: String,
        required: true
    },
    Categoria: {
        type: Schema.Types.ObjectId,
        ref: "Categorias",
        required: true
    },
    Data: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model("Postagens", Postagem);