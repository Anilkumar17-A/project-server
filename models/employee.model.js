const mongoose = require('mongoose');

module.exports = mongoose.model('Employee', {
    fullName: { type: String },
    gender : { type:String },
    age : { type: Number },
    position: { type: String },
    skills : { type: String },
    experience : { type: String },
    location: { type: String },
    salary: { type: Number },
    state : { type: String },
})