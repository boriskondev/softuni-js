const user = "boriskondev";
const pass = "boriskondev123";
const dbname = "nodejs-exam-prep";

module.exports = {
    development: {
        port: process.env.PORT || 3000,
        privateKey: "SOFT-UNI-WORKSHOP",
        databaseUrl: `mongodb+srv://${user}:${pass}@cluster0.d5skl.mongodb.net/${dbname}?retryWrites=true&w=majority`
    },
    production: {}
};

