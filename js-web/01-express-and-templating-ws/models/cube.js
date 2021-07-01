const uniqid = require("uniqid");
const fs = require("fs");

class Cube {
    constructor(name, description, imageURL, difficulty) {
        this.id = uniqid();
        this.name = name || "Unknown name";
        this.description = description || "No description yet";
        this.imageURL = imageURL || "https://lunawood.com/wp-content/uploads/2018/02/placeholder-image-300x225.png";
        this.difficulty = difficulty || 0;
    }

    save() {
        fs.readFile("./config/database.json", (err, data) => {
            if (err) {
                console.log(err);
            }

            let fileContent = JSON.parse(data.toString());

            fileContent.push({
                id: this.id,
                name: this.name,
                description: this.description,
                imageURL: this.imageURL,
                difficulty: this.difficulty
            });

            fs.writeFile("./config/database.json", JSON.stringify(fileContent), () => {
                console.log(`Cube "${this.name}" added to database.`);
            })
        })
    }
}

module.exports = Cube;

// let newCube1 = new Cube("Harold", "Nice one", "", 10);
// newCube1.save();
// let newCube2 = new Cube("Pandemonium", "Mystical one", "", 5);
// newCube2.save();
// let newCube3 = new Cube("Innuendo", "Ageless one", "", 12);
// newCube3.save();
// let newCube4 = new Cube();
// newCube4.save();
// let newCube5 = new Cube("Narcissus", "Everybody loves Miami", "https://images-na.ssl-images-amazon.com/images/I/514gwcvKpJL._AC_SY400_.jpg", 20);
// newCube5.save();