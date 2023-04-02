const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      <h2>Phonebook</h2>
      Filter shown with:
      <input onChange={(e) => setFilter(e.target.value)} />
    </div>
  );
};

export default Filter;