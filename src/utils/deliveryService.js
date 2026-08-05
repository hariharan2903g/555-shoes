export async function getDeliveryEstimate(pincode) {

    if (!pincode || pincode.length !== 6) {

        return {

            success: false,

            message: "Invalid pincode"

        };

    }

    try {

        const response = await fetch(
            `https://api.postalpincode.in/pincode/${pincode}`
        );

        const data = await response.json();

        if (
            data[0].Status !== "Success" ||
            !data[0].PostOffice?.length
        ) {

            return {

                success: false,

                message: "Pincode not found"

            };

        }

        const office = data[0].PostOffice[0];

        const state = office.State;

        const district = office.District;

        const area = office.Name;

        let estimate = "";

        // Fast Delivery Zone
        if (

            district === "Chennai" ||

            district === "Tiruvallur" ||

            district === "Chengalpattu" ||

            district === "Kanchipuram"

        ) {

            estimate = "1–2 Working Days";

        }

        // Rest of Tamil Nadu
        else if (state === "Tamil Nadu") {

            estimate = "2–3 Working Days";

        }

        // South States
        else if (

            state === "Kerala" ||

            state === "Karnataka" ||

            state === "Andhra Pradesh" ||

            state === "Telangana"

        ) {

            estimate = "3–5 Working Days";

        }

        // Rest of India
        else {

            estimate = "4–6 Working Days";

        }

        return {

            success: true,

            area,

            district,

            state,

            estimate

        };

    }

    catch {

        return {

            success: false,

            message: "Unable to check delivery"

        };

    }

}