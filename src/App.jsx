import { useState } from 'react';
import Header from './components/Header';
import StudentProfile from './components/StudentProfile';
import CourseList from './components/CourseList';
import Registration from './components/Registration';
import Footer from './components/Footer';
import './components/styles.css';

const studentData = {
  name: 'Aditi Sharma',
  id: 'STU2026001',
  department: 'Computer Science',
  semester: 6,
};

const availableCourses = [
  { id: 1, name: 'Data Structures', department: 'Computer Science', credits: 4 },
  { id: 2, name: 'Operating Systems', department: 'Computer Science', credits: 3 },
  { id: 3, name: 'Digital Marketing', department: 'Management', credits: 3 },
  { id: 4, name: 'Linear Algebra', department: 'Mathematics', credits: 4 },
  { id: 5, name: 'Web Development', department: 'Computer Science', credits: 3 },
  { id: 6, name: 'Microeconomics', department: 'Management', credits: 2 },
];

function App() {
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');

  const handleRegister = (course) => {
    const alreadyRegistered = registeredCourses.some((c) => c.id === course.id);
    if (alreadyRegistered) {
      alert(`${course.name} is already registered.`);
      return;
    }
    setRegisteredCourses([...registeredCourses, course]);
  };

  const handleRemove = (courseId) => {
    setRegisteredCourses(registeredCourses.filter((c) => c.id !== courseId));
  };

  const filteredCourses = availableCourses.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = departmentFilter === 'All' || course.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  const departments = ['All', ...new Set(availableCourses.map((c) => c.department))];

  return (
    <div className="app-container" id="home">
      <Header />

      <div id="profile">
        <StudentProfile student={studentData} />
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search courses by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
          {departments.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      <div id="courses">
        <CourseList
          courses={filteredCourses}
          onRegister={handleRegister}
          registeredCourses={registeredCourses}
        />
      </div>

      <div id="registration">
        <Registration
          registeredCourses={registeredCourses}
          onRemove={handleRemove}
        />
      </div>

      <Footer />
    </div>
  );
}

export default App;