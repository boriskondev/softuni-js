const fs = require("fs");

const readStream = fs.createReadStream("./bigfile.txt", { encoding: "utf8"});
const writeStream = fs.createWriteStream("./bigfile2.txt")

// let counter = 1;

readStream.on("data", (chunk) => {
    // console.log(`---------- CHUNK ${counter} ----------`);
    // console.log(chunk);
    // counter++;
    writeStream.write("\nNEW CHUNK\n");
    writeStream.write(chunk);
})

// Pipping - works the same as the code above

// readStream.pipe(writeStream);