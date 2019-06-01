/* jshint esversion:6 */
// PUERTO
process.env.PORT = process.env.PORT || 3000;

// ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Base de Datos
let urlDB;
let userDB;
let passwordDB;

if (process.env.NODE_ENV == 'dev') {
    userDB = 'admin';
    passwordDB = 'admin';
    urlDB = `mongodb+srv://${userDB}:${passwordDB}@cloudmongo-soi7x.mongodb.net/cafePrueba`;

} else {
    userDB = 'admin';
    passwordDB = 'admin';
    urlDB = `mongodb+srv://${userDB}:${passwordDB}@cloudmongo-soi7x.mongodb.net/cafePrueba`;
}

process.env.URLDB = urlDB;
process.env.userDB = userDB;
process.env.passwordDB = passwordDB;