const path = require('path');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//crear el servidor de express
const app = express();

//base de datos
dbConnection();

//CORS
app.use(cors());

//directorio publico
app.use(express.static('public'));

//lectura y parseo del body
app.use(express.json());

//rutas
//Todo: auth // crear, login, renew
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
//Todo Crud: Eventos



// app.get('/', (req, res) => {
//     console.log('Se requiere /');
//     res.json({
//         ok: true
//     })
// })

//escuchar peticiones
// app.listen(4000, () => {
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});