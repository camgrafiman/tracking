const router = require('express').Router();
/*Importar el modelo */
let Exercise = require('../models/exercise.model');

/*GET requests  */
router.route('/').get((req, res) => {
    /*Mongoose method que retorna un json con todos los usuarios */
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});
/*POST requests */
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    /*Crear el usuario con los datos de la constante username de arriba y usando el modelo (user.model.js). */
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
        .then(() => res.json('Ejercicio añadido!'))
        .catch(err => res.status(400).json('Error: ' + err));
});
/*CRUD READ */
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});
/* CRUD DELETE */
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Ejercicio borrado.'))
        .catch(err => res.status(400).json('Error: ' + err));
});
/* CRUD UPDATE */
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = req.body.duration;
            exercise.date = req.body.date;

            exercise.save()
                .then(() => res.json('Ejercicio actualizado!'))
                .catch(err => res.status(400).json('Error' + err));

        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;