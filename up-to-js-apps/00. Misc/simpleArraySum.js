function simpleArraySum(ar) {
    return ar.reduce((acc, curr) => acc + curr);
}

const arr = [1, 2, 3, 4, 5];

console.log(simpleArraySum(arr));