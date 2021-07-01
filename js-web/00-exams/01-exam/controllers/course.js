const Course = require("../models/course");

const getCourse = async (id) => {
    const course = await Course.findById(id).lean();
    return course;
}

const getAllCourses = async () => {
    const plays = await Course.find().lean();
    return plays;
}

const sortByEnrolledUsers = async () => {
    const courses = await getAllCourses();
    return courses.sort((a, b) => b.usersEnrolled.length - a.usersEnrolled.length);
}

const sortByDateCreated = async () => {
    const courses = await getAllCourses();
    return courses.sort((a, b) => a.createdAt - b.createdAt);
}

module.exports = {
    getCourse,
    getAllCourses,
    sortByEnrolledUsers,
    sortByDateCreated
}