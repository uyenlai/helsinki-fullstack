import { useState, useEffect } from "react";
import Filter from "./components/Filter.js";
import Form from "./components/Form.js";
import PersonsDisplay from "./components/PersonsDisplay.js";
import phonebookService from "./services/phonebook.js";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567", id: 1 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    phonebookService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((error) =>{console.log(error)})
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.map((p) => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };
    phonebookService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleDelete = (id) => {
    let answer = window.confirm(`Are you sure you want to delete?`);
    if (answer) {
      phonebookService.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch((error) => {
        console.log(error)
      })
    }
  };

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <Form
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <PersonsDisplay
        persons={persons}
        filter={filter}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;