export function addToWishlist(product) {

    const savedWishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];

    const exists = savedWishlist.some(
        item => item.id === product.id
    );

    if (exists) return false;

    savedWishlist.push(product);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(savedWishlist)
    );

    window.dispatchEvent(
        new Event("wishlistUpdated")
    );

    return true;

}

export function removeFromWishlist(productId) {

    const savedWishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];

    const updatedWishlist =
        savedWishlist.filter(
            item => item.id !== productId
        );

    localStorage.setItem(
        "wishlist",
        JSON.stringify(updatedWishlist)
    );

    window.dispatchEvent(
        new Event("wishlistUpdated")
    );

}

export function isWishlisted(productId) {

    const savedWishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];

    return savedWishlist.some(
        item => item.id === productId
    );

}

