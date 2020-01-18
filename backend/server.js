const express = require('express');
const cors = require('cors');

/* CONEXIÓN CON MONGODB ATLAS A TRAVÉS DE MONGOOSE*/
const mongoose = require('mongoose');

/*DOTENV */
require('dotenv').config();

/*CREAR EL SERVIDOR Y PONER EL PUERTO */
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/*ATLAS_URI es una string que está dentro del archivo .env en la misma carpeta del servidor. */
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true
});
/*REALIZAR LA CONEXIÓN */
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('La conexión con MongoDB ha sido establecida correctamente.');
})

/* IMPORTAR LOS ARCHIVOS DE ROUTES: */
const exerciseRouter = require('./routes/exercises.js');
const userRouter = require('./routes/users.js');
/* RUTAS  URL*/
app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);


/*LISTENER DEL PUERTO DONDE CORRE EL SERVIDOR: */

app.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto: ${port}`);
});