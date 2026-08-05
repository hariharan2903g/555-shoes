function Description({ product, setProduct }) {

    return (

        <div className="admin-card">

            <h2>Description</h2>

            <div className="form-group">

                {/* <label>Description</label> */}

                <textarea
                    className="description-textarea"
                    placeholder="Enter product description"
                    value={product.description}
                    onChange={(e)=>
                        setProduct(prev=>({
                            ...prev,
                            description:e.target.value,
                        }))
                    }
                />

            </div>

        </div>

    );

}

export default Description;