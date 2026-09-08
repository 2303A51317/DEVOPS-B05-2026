function StudentProfile({ student }) {
  return (
    <div className="student-profile">
      <h2>Student Profile</h2>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>ID:</strong> {student.id}</p>
      <p><strong>Department:</strong> {student.department}</p>
      <p><strong>Semester:</strong> {student.semester}</p>
    </div>
  );
}

export default StudentProfile;