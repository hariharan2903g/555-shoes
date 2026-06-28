function ProductHeader({ pageTitle }) {
  return (
    <div className="products-page-header">

      <div>

        <h1 className="products-title">
          {pageTitle}
        </h1>

      </div>

    </div>
  );
}

export default ProductHeader;