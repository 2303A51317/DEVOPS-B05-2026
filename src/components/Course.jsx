function Course({ course, onRegister, isRegistered }) {
  return (
    <div className="course-card">
      <h3>{course.name}</h3>
      <p>Department: {course.department}</p>
      <p>Credits: {course.credits}</p>
      <button onClick={() => onRegister(course)} disabled={isRegistered}>
        {isRegistered ? 'Registered' : 'Register'}
      </button>
    </div>
  );
}

export default Course;