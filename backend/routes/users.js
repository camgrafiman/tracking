const router = require('express').Router();
/*Importar el modelo */
let User = require('../models/user.model');

/*GET requests  */
router.route('/').get((req, res) => {
    /*Mongoose method que retorna un json con todos los usuarios */
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});
/*POST requests */
router.route('/add').post((req, res) => {
    const username = req.body.username;

    /*Crear el usuario con los datos de la constante username de arriba y usando el modelo (user.model.js). */
    const newUser = new User({
        username
    });

    newUser.save()
        .then(() => res.json('Usuario añadido!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

/*READ */
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));

});

/*DELETE */
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((user) => res.json('Usuario borrado.', user))
        .catch(err => res.status(400).json('Error: ' + err));

});


/* UPDATE */
router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;
            user.save()
                .then(() => res.json('Usuario actualizado!'))
                .catch(err => res.status(400).json('Error' + err));

        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;