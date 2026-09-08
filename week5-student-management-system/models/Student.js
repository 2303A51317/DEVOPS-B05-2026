const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: [true, 'Student ID is required'],
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Student Name is required'],
        trim: true
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address'
        ]
    },
    cgpa: {
        type: Number,
        required: [true, 'CGPA is required'],
        min: [0.0, 'CGPA cannot be less than 0.0'],
        max: [10.0, 'CGPA cannot exceed 10.0']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);