const Form = ({ handleSubmit, newName, setNewName, newNumber, setNewNumber , formStyle}) => {
  return (
    <>
    <h2>Add a new</h2>
    <form onSubmit={handleSubmit}>
    <div style={{ marginBottom: 5 }}>
      name:
      <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
    </div>
    <div style={{ marginBottom: 10 }}>
      number:
      <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
    </>
    
  );
};
export default Form;