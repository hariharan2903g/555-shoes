function SaveProduct({ onSave, isSaving }) {

    return (

        <div className="admin-card">

           <button
                className="admin-btn"
                onClick={onSave}
                disabled={isSaving}
            >
                {isSaving ? "Uploading..." : "Save Product"}
            </button>

        </div>

    );

}

export default SaveProduct;