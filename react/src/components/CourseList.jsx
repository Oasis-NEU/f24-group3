import Course from "./Course.jsx";

function CourseList(courses) {
  return (
    <section className="course-list">
      {courses.map((courses) => (
        <Course key={courses.id} course={courses} />
      ))}
    </section>
  );
}

export default CourseList;
