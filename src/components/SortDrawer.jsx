function SortDrawer({

    sortOpen,
    setSortOpen,
    
    sortBy,
    setSortBy
    
    }){
    
    if(!sortOpen)
    return null;
    
  
return (
  <>
    {sortOpen && (
      <>
        <div
          className="drawer-overlay"
          onClick={() => setSortOpen(false)}
        />

        <div
          className="sort-drawer"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="drawer-handle"></div>

          <h2>Sort By</h2>

          <button
            onClick={() => {
              setSortBy("popular");
              setSortOpen(false);
            }}
          >
            Popular
          </button>

          <button
            onClick={() => {
              setSortBy("newest");
              setSortOpen(false);
            }}
          >
            New Arrivals
          </button>

          <button
            onClick={() => {
              setSortBy("high");
              setSortOpen(false);
            }}
          >
            Price: High to Low
          </button>

          <button
            onClick={() => {
              setSortBy("low");
              setSortOpen(false);
            }}
          >
            Price: Low to High
          </button>

        </div>
      </>
    )}
  </>
);
    
    }
    
    export default SortDrawer;