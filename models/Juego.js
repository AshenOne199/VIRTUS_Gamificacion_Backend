const { Schema, model, Mixed } = require('mongoose');

const JuegoBaseSchema = new Schema({
  titulo: {
    type: String,
    required: [true, 'El título del juego es obligatorio']
  },
  tipo: {
    type: String,
    required: [true, 'El tipo de juego es obligatorio'],
    enum: ['crucigrama', 'preguntas', 'sopa-letras']
  }
}, {
  discriminatorKey: 'tipo',
  collection: 'juegos',
  timestamps: true
});

const Juego = model('Juegos', JuegoBaseSchema);


// Esquemas específicos para los diferentes tipos de juegos
const CrucigramaSchema = new Schema({
  matriz: {
    type: [[String]],
    required: true
  },
  palabras: {
    type: [String],
    required: true
  }
});
const TriviaSchema = new Schema({
  preguntas: [{
    pregunta: String,
    opciones: [String],
    respuesta: Mixed,
    tiempo: Number
  }]
});
const SopaLetrasSchema = new Schema({
  filas: Number,
  columnas: Number,
  palabras: [{
    palabra: String
  }]
});


// Creación de modelos específicos utilizando discriminadores
const Crucigrama = Juego.discriminator('crucigrama', CrucigramaSchema);
const Trivia = Juego.discriminator('preguntas', TriviaSchema);
const SopaLetras = Juego.discriminator('sopa-letras', SopaLetrasSchema);


module.exports = { Juego, Crucigrama, Trivia, SopaLetras };

