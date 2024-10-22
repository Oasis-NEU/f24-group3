function Course(course) {
  return (
    <section>
      <h4>{course.name}</h4>
      <p>Location: {course.location}</p>
      <p>Frequency: {course.frequency}</p>
    </section>
  );
}

export default Course;
