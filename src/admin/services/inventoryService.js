export const createInventory = (gender = "") => {
    const menVisible = gender === "Men" || gender === "Unisex";
    const womenVisible = gender === "Women" ;
    // || gender === "Unisex";
  
    return {
      men: {
        "40": { stock: "", visible: menVisible },
        "41": { stock: "", visible: menVisible },
        "42": { stock: "", visible: menVisible },
        "43": { stock: "", visible: menVisible },
        "44": { stock: "", visible: menVisible },
        "45": { stock: "", visible: menVisible },
        "46": { stock: "", visible: false },
        "47": { stock: "", visible: false },
      },
  
      women: {
        "33": { stock: "", visible: false },
        "34": { stock: "", visible: womenVisible },
        "35": { stock: "", visible: womenVisible },
        "36": { stock: "", visible: womenVisible },
        "37": { stock: "", visible: womenVisible },
        "38": { stock: "", visible: womenVisible },
        "39": { stock: "", visible: womenVisible },
      },
    };
  };