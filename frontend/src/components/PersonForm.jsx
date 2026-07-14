const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumChange,
}) => {
  return (
    <form onSubmit={addPerson} className="person-form">
      <div className="field">
        <label>Name</label>
        <input
          value={newName}
          onChange={handleNameChange}
          placeholder="Full name"
        />
      </div>
      <div className="field">
        <label>Number</label>
        <input
          value={newNumber}
          onChange={handleNumChange}
          placeholder="040-1234567"
        />
      </div>
      <button type="submit">Add contact</button>
    </form>
  );
};

export default PersonForm;
