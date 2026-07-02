export function calculateShipping(subtotal, pincode) {

    const freeShippingLimit = 2000;

    if (subtotal >= freeShippingLimit) {

        return {
            shipping: 0,
            delivery: "Delivery in 2–3 working days"
        };

    }

    if (pincode.startsWith("600")) {

        return {
            shipping: 50,
            delivery: "Delivery in 2–3 working days"
        };

    }

    if (pincode.startsWith("6")) {

        return {
            shipping: 80,
            delivery: "Delivery in 2–3 working days"
        };

    }

    if (/^\d{6}$/.test(pincode)) {

        return {
            shipping: 100,
            delivery: "Delivery in 3–5 working days"
        };

    }

    return {
        shipping: 0,
        delivery: ""
    };

}