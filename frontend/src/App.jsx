import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`,
      );

      if (confirmUpdate) {
        const changedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson,
              ),
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setErrorMessage(error.response.data.error);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>

      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumChange={handleNumChange}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
