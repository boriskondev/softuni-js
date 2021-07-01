// console.log(global);

// Can be written without "global" before the function
// It is the same as "window" object in browser

// global.setTimeout(() => {
//     console.log("Set timeout - 10 sec.");
//     clearInterval(interval);
// }, 10000);
//
// const interval = setInterval(() => {
//     console.log("Set interval - 1 sec.");
// }, 1000);

// Path to the file
console.log(__dirname);

// Path to the file with filename
console.log(__filename);
