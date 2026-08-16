export const specificationConfig = {
  Shoes: [
    {
      key: "shoe_style",
      label: "Shoe Style",
      type: "select",
      options: [
        "Sneakers",
        "Boots",
        "Loafers",
        "Formal",
        "High Tops",
        "Slip-ons",
      ],
    },
    
    {
      key: "best_for",
      label: "Best For",
      type: "multiselect",
      options: [
        "Running",
        "Walking",
        "Gym",
        "Casual",
        "Sports",
        "Travel",
      ],
    },
    
    {
      key: "closure",
      label: "Closure",
      type: "select",
      options: [
        "Lace",
        "Slip-on",
        "Velcro",
        "Bungee",
      ],
    },
    {
      key: "toe_shape",
      label: "Toe Shape",
      type: "select",
      options: [
        "Round",
        "Pointed",
      ],
    },
  ],

  Watches: [
    {
      key: "display_type",
      label: "Display Type",
      type: "select",
      options: [
        "Analog",
        "Digital",
        "Smartwatch",
        "Hybrid",
      ],
    },
    {
      key: "movement",
      label: "Movement",
      type: "select",
      options: [
        "Quartz",
        "Automatic",
        "Mechanical",
        "Solar",
      ],
    },
    {
      key: "dial_color",
      label: "Dial Color",
      type: "text",
    },
    {
      key: "strap_material",
      label: "Strap Material",
      type: "select",
      options: [
        "Leather",
        "Metal",
        "Silicone",
        "Nylon",
      ],
    },
  ],
};