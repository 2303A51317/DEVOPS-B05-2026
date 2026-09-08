import Course from './Course';

function CourseList({ courses, onRegister, registeredCourses }) {
  return (
    <div className="course-list">
      <h2>Available Courses</h2>
      {courses.length === 0 ? (
        <p>No courses match your search/filter.</p>
      ) : (
        <div className="course-grid">
          {courses.map((course) => (
            <Course
              key={course.id}
              course={course}
              onRegister={onRegister}
              isRegistered={registeredCourses.some((c) => c.id === course.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseList;