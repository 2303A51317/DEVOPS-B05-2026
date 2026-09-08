const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// 1. Add a new student record
router.post('/', async (req, res) => {
    try {
        const student = new Student(req.body);
        const savedStudent = await student.save();
        res.status(201).json({ success: true, data: savedStudent });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Student ID already exists.' });
        }
        res.status(400).json({ success: false, message: error.message });
    }
});

// 2. Retrieve all student records OR Search by department OR Sort by CGPA
// Query parameters: ?department=CSE & ?sort=cgpa_desc
router.get('/', async (req, res) => {
    try {
        const { department, sort } = req.query;
        let query = {};

        if (department) {
            query.department = { $regex: department, $options: 'i' };
        }

        let studentQuery = Student.find(query);

        if (sort === 'cgpa_asc') {
            studentQuery = studentQuery.sort({ cgpa: 1 });
        } else if (sort === 'cgpa_desc') {
            studentQuery = studentQuery.sort({ cgpa: -1 });
        }

        const students = await studentQuery;
        res.status(200).json({ success: true, count: students.length, data: students });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 3. Count total number of students
router.get('/count', async (req, res) => {
    try {
        const count = await Student.countDocuments();
        res.status(200).json({ success: true, totalStudents: count });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 4. Update student information by Student ID
router.put('/:studentId', async (req, res) => {
    try {
        const student = await Student.findOneAndUpdate(
            { studentId: req.params.studentId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found.' });
        }

        res.status(200).json({ success: true, data: student });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// 5. Delete a student record by Student ID
router.delete('/:studentId', async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({ studentId: req.params.studentId });

        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found.' });
        }

        res.status(200).json({ success: true, message: 'Student deleted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;