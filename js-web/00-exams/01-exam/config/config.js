const user = "boriskondev";
const pass = "boriskondev123";
const dbname = "nodejs-exam";

module.exports = {
    development: {
        port: process.env.PORT || 3000,
        privateKey: "SOFTUNI-JS-BACKEND-EXAM",
        databaseUrl: `mongodb+srv://${user}:${pass}@cluster0.d5skl.mongodb.net/${dbname}?retryWrites=true&w=majority`
    },
    production: {}
};

