import Part from './Part.js';

const Content = ({ parts }) => {
    return (
      <>
        {parts.map((part) => (
          <div key={part.id}>
            <Part part={part} />
          </div>
        ))}
      </>
    )
  }

export default Content;