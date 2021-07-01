const fs = require("fs");

// ---------- READING FIES ----------
// Async method - the function fires when the reading of file is complete
//
// console.log("First line.");
//
// fs.readFile("./docs/blog1.txt", (err, data) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(data.toString());
// })
//
// console.log("Last line.");

// ---------- WRITING FILES ----------

// fs.writeFile("./docs/blog1.txt", "Hello, World", () => {
//     console.log("File written.");
// });
//
// fs.writeFile("./docs/blog2.txt", "Hello, World", () => {
//     console.log("File written.");
// });

// ---------- DIRECTORIES ----------

// if (!fs.existsSync("./assets")) {
//     fs.mkdir("./assets", (err) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log("Folder created.");
//     })
// } else {
//     fs.rmdir("./assets", (err) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log("Folder deleted.");
//     })
// }

// ---------- DELETING FILES ----------

if (fs.existsSync("./docs/deleteme.txt")) {
    fs.unlink("./docs/deleteme.txt", (err) => {
        if (err) {
            console.log(err);
        }
        console.log("File deleted.")
    })
}