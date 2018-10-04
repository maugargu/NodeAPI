const AnimalModel = require('../models/animal');
const jwtManager = require('jsonwebtoken');
const config = require('../config');

function login(req, res) {
  if ((req.body.username === config.jwt_user_name)
  && (req.body.userpassword ===
    config.jwt_user_password)) {

      const token = jwtManager.sign({
        exp: Math.floor(Date.now() / 1000) + (config.jwt_expiration_time),
        data: {
          userName: req.body.userName,
          ipSource: req._remoteAddress,
          requestDate: req._startTime,
          creationDateToken: Date.now()
        }
      },
        config.jwt_secret_key,
        { algorithm: config.jwt_encryption_method }
      );
      res.status(200).send({ 
        resp: token
      });  
    }
    return res.status(401).send({ resp: 'INVALID_AUTHENTICATION' });  
}

function createAnimal(req, res) {
  if (!req.body.nombre) return res.status(404).send({ msg: 'El request esta mal hecho' });



  let AnimalSchema = new AnimalModel();
  AnimalSchema.nombre = req.body.nombre;
  AnimalSchema.sexo = req.body.sexo;
  AnimalSchema.promedioEdad = req.body.promedioEdad;

  AnimalSchema.save((err, animal) => {
    if (err) return res.status(500).send({ err });

    res.status(201).send({ resp: animal })
  });
}

function updateAnimal(req, res) {
  
}

function findById(req, res) {
  
}

/*function findAll(req, res) {
  AnimalModel.find({}, (err, animales) => {
    if (err) return res.status(500).send({ err });

    res.status(200).send({ animales });
  })
}*/

function findAll(req, res) {

  applicationToken = req.headers.applicationtoken;
  if (!applicationToken) {
    res.status(201).send({ resp: 'INVALID_AUTHENTICATION' });
  }
  jwtManager.verify(
    applicationToken, // Token Obtenido
    config.jwt_secret_key, // Llave
    { algorithm: config.jwt_encryption_method }, // Metodo de Encripcion
    function (errorRequest, objectValue) {
      if (errorRequest)
        return res.status(403).send({ resp: 'REQUEST_FORBIDDEN' });
      else {
        AnimalModel.find({}, (err, animales) => {
          if (err) return res.status(500).send({ err });
          res.status(200).send({ animales });
        })
      }
      
    });
   
}

function deleteAnimal(req, res) {
  
}

module.exports = {
  createAnimal,
  updateAnimal,
  findById,
  findAll,
  login,
  deleteAnimal
}