import Header from './Header.js';
import Content from './Content.js';
import Total from './Total.js';

const Courses = ({ courses }) => {
    return (
      <>
        {courses.map((course) => (
          <div key={course.id}>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        ))}
      </>
    )
  }

export default Courses