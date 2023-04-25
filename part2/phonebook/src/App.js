import { useState, useEffect } from "react";
import Filter from "./components/Filter.js";
import Form from "./components/Form.js";
import PersonsDisplay from "./components/PersonsDisplay.js";
import phonebookService from "./services/phonebook.js";
import Fail from "./components/Fail.js";
import Success from "./components/Success.js";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [fail, setFail] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    phonebookService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((error) => {
        console.log(error);
      });
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
    phonebookService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setSuccess(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      })
      .catch((error) => {
        setFail(error.response.data.error, error.message);
        setTimeout(() => {
          setFail(null);
        }, 3000);
        console.log(error.response.data.error);
      });
  };

  const handleUpdate = (id) => {
    if (persons.map((p) => p.name).includes(newName)) {
      let ans = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (!ans) {
        return;
      }
    }
    const person = persons.find((p) => p.id === id);
    const updatedPerson = { ...person, name: newName, number: newNumber };
    phonebookService
      .update(id, updatedPerson)
      .then((returnedPerson) => {
        setPersons(persons.map((p) => (p.id === id ? returnedPerson : p)));
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        setFail(
          `Information of ${person.name} has already been removed from server`
        );
        setTimeout(() => {
          setFail(null);
        }, 3000);
        setPersons(persons.filter((p) => p.id !== id));
      });
  };
  if (!persons) {
    return null;
  }

  const handleDelete = (id) => {
    let answer = window.confirm(`Are you sure you want to delete?`);
    if (answer) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Success success={success} />
      <Fail fail={fail} />
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
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default App;
