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

// Vencimiento del token
process.env.TOKEN_EXPIRED = process.env.TOKEN_EXPIRED || 60 * 60 * 24 * 30;

// Seed authentication
process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'secret';

// Google
process.env.GOOGLE_CLIENT = process.env.GOOGLE_CLIENT || '231406294081-ot607l9vhimogb4sot34j3eadpmjj536.apps.googleusercontent.com';