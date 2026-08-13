import BottomSheet from "../BottomSheet";
import "./SizeSelectionSheet.css"

function SizeSelectionSheet({

    open,
    onClose,

    availableSizes,
    selectedSize,
    onSelectSize,
    onAddToBag,

}) {

    // console.log(availableSizes);

    return (

        <BottomSheet
            open={open}
            title="Select Size"
            onClose={onClose}
            className="size-selection-sheet"
        >

            <div className="sheet-size-options">

                {availableSizes.map((item) => (

                    <button
                        key={item.size}
                        disabled={item.stock <= 0}
                        className={`sheet-size-btn
                            ${selectedSize === item.size ? "selected-size" : ""}
                            ${item.stock <= 0 ? "out-of-stock" : ""}
                        `}
                        onClick={() => onSelectSize(item.size)}
                    >

                        {item.size}

                    </button>

                ))}

            </div>

            <div className="sheet-actions">

                <button
                    className="sheet-cancel-btn"
                    onClick={onClose}
                >
                    Cancel
                </button>

                <button
                    className="sheet-add-btn"
                    disabled={!selectedSize}
                    onClick={onAddToBag}
                >
                    Add To Bag
                </button>

            </div>

        </BottomSheet>

    );

}

export default SizeSelectionSheet;