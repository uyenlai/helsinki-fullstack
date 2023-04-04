const Fail = ({ fail }) => {
  if (fail === null) {
    return null
  }
    return (
        <div className="fail">
          {fail}
        </div>
    )
  };
export default Fail;