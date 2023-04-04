const PersonsDisplay = ({ persons, filter, handleDelete, handleUpdate }) => {
    return (
      <>
        <h2>Numbers</h2>
        {persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase()))
        .map((person) => (
          <div key={person.id}>
            <p>
              {person.name} {person.number}
            {' '}
            <button onClick={() => handleDelete(person.id)}>Delete</button>
            <button onClick={() => handleUpdate(person.id)}>Update</button>
            </p>
          </div>
        ))}
      </>
    )
}
export default PersonsDisplay;