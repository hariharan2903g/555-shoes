import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function FilterSection({
  title,
  options,
  selected,
  setSelected,
}) {

  const [open, setOpen] = useState(false);

  return (
    <div className="filter-section">

      <button
        className="filter-section-header"
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>

        {open ? (
          <ChevronUp size={20} />
        ) : (
          <ChevronDown size={20} />
        )}
      </button>

      {open && (

        <div className="filter-options">

          {options.map((option) => (

            <button
              key={option}
              className={`filter-option ${
                selected === option
                  ? "selected-option"
                  : ""
              }`}
              onClick={() =>
                setSelected(
                  selected === option
                    ? "All"
                    : option
                )
              }
            >
              {option}
            </button>

          ))}

        </div>

      )}

    </div>
  );
}

export default FilterSection;