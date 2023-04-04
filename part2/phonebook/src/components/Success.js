const Success = ({ success }) => {
    if (success === null) {
        return null
    }
    return (
        <div className="success">
          {success}
        </div>
    )
  };
export default Success;