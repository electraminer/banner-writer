const functions = require("firebase-functions");
const server = require("../ts-build/src/backend/Server.js").default;
console.log(server);
exports.app = functions.https.onRequest(server);
