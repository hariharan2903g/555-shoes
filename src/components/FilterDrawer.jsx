import { useState } from "react";
import FilterSection from "./FilterSection";

function FilterDrawer({

  filterOpen,
  setFilterOpen,
  
  products,
  filteredProducts,
  
  categories,
  subcategories,
  brands,
  activities,
  strapTypes,
  
  selectedCategory,
  setSelectedCategory,
  
  selectedSubcategory,
  setSelectedSubcategory,
  
  selectedBrand,
  setSelectedBrand,
  
  selectedGender,
  setSelectedGender,
  
  selectedActivity,
  setSelectedActivity,
  
  selectedStrapType,
  setSelectedStrapType,
  
  selectedDiscount,
  setSelectedDiscount,
  
  })
   {

  if (!filterOpen) return null;

  // const categories = [
  //   ...new Set(
  //     products
  //       .map((p) => p.category)
  //       .filter(Boolean)
  //   ),
  // ];

  // const brands = [
  //   ...new Set(
  //     products
  //       .filter(
  //         (p) =>
  //           selectedCategory === "All" ||
  //           p.category === selectedCategory
  //       )
  //       .map((p) => p.brand)
  //       .filter(Boolean)
  //   ),
  // ];

  // const subcategories = [
  //   ...new Set(
  //     products
  //       .filter(
  //         (p) =>
  //           selectedCategory === "All" ||
  //           p.category === selectedCategory
  //       )
  //       .map((p) => p.subcategory)
  //       .filter(Boolean)
  //   ),
  // ];

  // const strapTypes = [
  //   ...new Set(
  //     products
  //       .filter(
  //         (p) =>
  //           p.category === "Watches"
  //       )
  //       .map((p) => p.Strap_Type)
  //       .filter(Boolean)
  //   ),
  // ];

  // const activityTypes = [
  //   ...new Set(
  //     products
  //       .filter(
  //         (p) =>
  //           p.category === "Shoes"
  //       )
  //       .map((p) => p.activity_type)
  //       .filter(Boolean)
  //   ),
  // ];

  return (
    <>

      <div
        className="drawer-overlay"
        onClick={() =>
          setFilterOpen(false)
        }
      />

      <div className="filter-drawer">

        <div className="drawer-handle"></div>

        {/* <div className="filter-header">


        </div> */}

        <div className="filter-content">

          <FilterSection
            title="Category"
            options={categories}
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />

          {selectedCategory !== "All" && (

            <FilterSection
              title="Subcategory"
              options={subcategories}
              selected={selectedSubcategory}
              setSelected={setSelectedSubcategory}
            />

          )}

          <FilterSection
            title="Brand"
            options={brands}
            selected={selectedBrand}
            setSelected={setSelectedBrand}
          />

          <FilterSection
            title="Gender"
            options={[
              "All",
              "Men",
              "Women",
              "Unisex",
            ]}
            selected={selectedGender}
            setSelected={setSelectedGender}
          />

            {selectedCategory === "Shoes" &&
              activities.length > 0 && (

                <FilterSection
                  title="Activity"
                  options={activities}
                  selected={selectedActivity}
                  setSelected={setSelectedActivity}
                />

            )}

          {selectedCategory === "Watches" &&
            strapTypes.length > 0 && (

              <FilterSection
                title="Strap Type"
                options={strapTypes}
                selected={selectedStrapType}
                setSelected={setSelectedStrapType}
              />

          )}

          <FilterSection
            title="Discount"
            options={[
              "All",
              "10",
              "20",
              "30",
              "50",
            ]}
            selected={selectedDiscount}
            setSelected={setSelectedDiscount}
          />

        </div>

        <div className="filter-footer">

          <button
            className="clear-filters-btn"
            onClick={() => {
              setSelectedCategory("All");
              setSelectedSubcategory("All");
              setSelectedBrand("All");
              setSelectedGender("All");
              setSelectedDiscount("All");
              setSelectedActivity("All");
              setSelectedStrapType("All");
            }}
          >
            Clear All
          </button>

          <button
            className="show-products-btn"
            onClick={() =>
              setFilterOpen(false)
            }
          >
            Show {filteredProducts.length}
          </button>

        </div>

      </div>

    </>
  );
}

export default FilterDrawer;