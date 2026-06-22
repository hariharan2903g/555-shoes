function NewArrivals({
  newArrivals,
  setSelectedProduct,
}) {
  return (
    <section className="section">
      <h2>New Arrivals</h2>

      <div className="arrival-slider">
        <div className="arrival-track">

          {[...newArrivals, ...newArrivals].map(
            (item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="arrival-card"
                onClick={() =>
                  setSelectedProduct({
                    ...item,
                    source: "newArrivals",
                  })
                }
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                />
              </div>
            )
          )}

        </div>
      </div>
    </section>
  );
}

export default NewArrivals;