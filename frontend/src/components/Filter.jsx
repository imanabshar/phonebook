const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <label>Search</label>
      <input
        value={filter}
        onChange={handleFilterChange}
        placeholder="Find a contact..."
      />
    </div>
  );
};

export default Filter;
