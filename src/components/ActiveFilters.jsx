function ActiveFilters({

    selectedGender,
    selectedCategory,
    selectedSubcategory,
    
    setSelectedGender,
    setSelectedCategory,
    setSelectedSubcategory
    
    }){
    
    return(
    
    
    <div className="active-filters">

{selectedGender !== "All" && (
  <button
    className="filter-pill"
    onClick={() =>
      setSelectedGender("All")
    }
  >
    {selectedGender} ✕
  </button>
)}

{selectedCategory !== "All" && (
  <button
    className="filter-pill"
    onClick={() =>
      setSelectedCategory("All")
    }
  >
    {selectedCategory} ✕
  </button>
)}

{selectedSubcategory !== "All" && (
  <button
    className="filter-pill"
    onClick={() =>
      setSelectedSubcategory("All")
    }
  >
    {selectedSubcategory} ✕
  </button>
)}

{(selectedGender !== "All" ||
  selectedCategory !== "All" ||
  selectedSubcategory !== "All") && (

  <button
    className="clear-all-pill"
    onClick={() => {

      setSelectedGender("All");
      setSelectedCategory("All");
      setSelectedSubcategory("All");

    }}
  >
    Clear All
  </button>

)}

</div>
    
    
    );
    
    }
    
    export default ActiveFilters;