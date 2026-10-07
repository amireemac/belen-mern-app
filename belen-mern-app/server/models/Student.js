const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    coures: String,
    age: Number
});
 module.exports = mongoose.model("Student", studentSchema);