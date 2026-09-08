function Registration({ registeredCourses, onRemove }) {
  const totalCredits = registeredCourses.reduce((sum, c) => sum + c.credits, 0);

  return (
    <div className="registration">
      <h2>My Registered Courses</h2>
      {registeredCourses.length === 0 ? (
        <p>No courses registered yet.</p>
      ) : (
        <>
          <ul>
            {registeredCourses.map((course) => (
              <li key={course.id}>
                {course.name} ({course.credits} credits)
                <button onClick={() => onRemove(course.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <p><strong>Total Credits:</strong> {totalCredits}</p>
        </>
      )}
    </div>
  );
}

export default Registration;