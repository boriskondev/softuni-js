const Play = require("../models/play");

const getPlay = async (id) => {
    const play = await Play.findById(id).lean();
    return play;
}

const getAllPlays = async () => {
    const plays = await Play.find().lean();
    return plays;
}

const sortByLikes = async () => {
    const plays = await getAllPlays();
    return plays.filter(x => x.isPublic === true).sort((a, b) => b.usersLiked.length - a.usersLiked.length);
}

const sortByDate= async () => {
    const plays = await getAllPlays();
    return plays.filter(x => x.isPublic === true).sort((a, b) => b.createdAt - a.createdAt);
}

module.exports = {
    getPlay,
    getAllPlays,
    sortByLikes,
    sortByDate
}