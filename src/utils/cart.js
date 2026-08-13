export function addToCart({
    product,
    selectedColor,
    selectedSize,
    quantity = 1,
}) {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    const selectedColorData =
        product.colors.find(
            color => color.color === selectedColor
        );

    const existingItem = cart.find(
        item =>
            item.id === product.id &&
            item.size === selectedSize &&
            item.color === selectedColor
    );

    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.push({

            id: product.id,

            name: product.product_name,

            price: product.selling_price,

            image:
                selectedColorData.images.find(
                    image =>
                        image.id ===
                        selectedColorData.coverImageId
                )?.url,

            size: selectedSize,

            color: selectedColor,

            quantity,

        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    window.dispatchEvent(
        new Event("cartUpdated")
    );

}