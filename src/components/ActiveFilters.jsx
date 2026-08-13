function ActiveFilters({

  selectedGender,
  selectedCategory,
  selectedBestFor,

  setSelectedGender,
  setSelectedCategory,
  setSelectedBestFor,

}) {

  return (

    <div className="active-filters">

      {selectedGender !== "All" && (
        <button
          className="filter-pill"
          onClick={() => setSelectedGender("All")}
        >
          {selectedGender} ✕
        </button>
      )}

      {selectedCategory !== "All" && (
        <button
          className="filter-pill"
          onClick={() => setSelectedCategory("All")}
        >
          {selectedCategory} ✕
        </button>
      )}

      {selectedBestFor !== "All" && (
        <button
          className="filter-pill"
          onClick={() => setSelectedBestFor("All")}
        >
          {selectedBestFor} ✕
        </button>
      )}

      {(selectedGender !== "All" ||
        selectedCategory !== "All" ||
        selectedBestFor !== "All") && (

        <button
          className="clear-all-pill"
          onClick={() => {
            setSelectedGender("All");
            setSelectedCategory("All");
            setSelectedBestFor("All");
          }}
        >
          Clear All
        </button>

      )}

    </div>

  );

}

export default ActiveFilters;