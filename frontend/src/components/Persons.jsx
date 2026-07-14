const Persons = ({ personsToShow, handleDelete }) => {
  if (personsToShow.length === 0) {
    return <p className="empty-state">No contacts found.</p>;
  }

  return (
    <div>
      {personsToShow.map((person) => (
        <div className="person-row" key={person.id}>
          <div className="person-info">
            <span className="person-name">{person.name}</span>
            <span className="person-number">{person.number}</span>
          </div>
          <button onClick={() => handleDelete(person.id, person.name)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
