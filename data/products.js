export const CATEGORIES = [
  {
    slug: "seeder",
    name: "Seeder",
    description: "Precision sowing tools designed for optimal seed placement and maximum yield consistency across diverse soil types.",
    image: "/all_products/seeder.jpg",
    itemCount: 6,
  },
  {
    slug: "irrigation",
    name: "Irrigation",
    description: "Smart water management solutions including drip, sprinkler, and automated valve systems for sustainable crop hydration.",
    image: "/all_products/Irrigation.jpg",
    itemCount: 4,
  },
  {
    slug: "controllers",
    name: "Controllers",
    description: "Advanced automation hubs for centralized farm operations, featuring remote-monitoring and cloud-sync capabilities.",
    image: "/all_products/contorller.jpg",
    itemCount: 5,
  },
  {
    slug: "farm-equipment",
    name: "Farm Equipment",
    description: "Robust heavy-duty machinery built for endurance, efficiency, and the most demanding agricultural tasks in the field.",
    image: "/all_products/Framer equment.jpg",
    itemCount: 8,
  },
  {
    slug: "accessories",
    name: "Accessories",
    description: "Premium replacement parts, specialized attachments, and add-ons to customize and enhance your existing equipment.",
    image: "/all_products/Accessories.jpg",
    itemCount: 12,
  },
  {
    slug: "solar-systems",
    name: "Solar Systems",
    description: "Off-grid energy solutions to power remote pump stations, sensors, and outbuildings using sustainable solar technology.",
    image: "/all_products/solar system.jpg",
    itemCount: 3,
  },
  {
    slug: "sensors-monitoring",
    name: "Sensors & Monitoring",
    description: "Real-time data tracking for soil moisture, crop health, and environmental conditions to drive data-led decisions.",
    image: "/all_products/sensor and monotor.jpg",
    itemCount: 6,
  },
  {
    slug: "maintenance-kits",
    name: "Maintenance Kits",
    description: "Complete care packages for routine upkeep, ensuring your machinery maintains peak performance and longevity.",
    image: "/all_products/maintence kit.jpg",
    itemCount: 5,
  },
];

export const PRODUCTS = {
  seeder: [
    {
      id: "seeder-pro-x",
      category: "seeder",
      categoryName: "Seeder",
      name: "Seeder Pro X",
      shortDescription: "Precision depth control with multi-seed compatibility for high-yield farming.",
      badge: "TOP RATED",
      image: "/all_products/Seeder pro X.jpg",
    },
    {
      id: "agri-sow-3000",
      category: "seeder",
      categoryName: "Seeder",
      name: "Agri-Sow 3000",
      shortDescription: "Fully-automated distribution system designed for large-scale industrial field rows.",
      favorite: true,
      image: "/all_products/Arig-Sow.jpg",
    },
    {
      id: "ecoplanter-lite",
      category: "seeder",
      categoryName: "Seeder",
      name: "EcoPlanter Lite",
      shortDescription: "Lightweight, manual-operation seeder perfect for small-scale horticulture gardens.",
      badge: null,
      image: "/all_products/Eco plant.jpg",
    },
    {
      id: "terramaster-500",
      category: "seeder",
      categoryName: "Seeder",
      name: "TerraMaster 500",
      shortDescription: "Heavy-duty multi-row planting smart attachment with reinforced wheel components.",
      badge: null,
      image: "/all_products/TerraMaster.jpg",
    },
    {
      id: "smartsow-v2",
      category: "seeder",
      categoryName: "Seeder",
      name: "SmartSow V2",
      shortDescription: "IoT-enabled seeder with real-time soil moisture sensing and continuous tracking.",
      badge: "NEW EDITION",
      image: "/all_products/SmartShow V2.jpg",
    },
    {
      id: "grainguard-4",
      category: "seeder",
      categoryName: "Seeder",
      name: "GrainGuard 4.0",
      shortDescription: "Advanced seed metering system specifically optimized for small grains and legumes.",
      badge: null,
      image: "/all_products/GainGuard.jpg",
    },
  ],
  irrigation: [
    {
      id: "drip-master-pro",
      category: "irrigation",
      categoryName: "Irrigation",
      name: "DripMaster Pro System",
      shortDescription: "Precision drip irrigation kit with automated pressure regulators and pressure compensation.",
      badge: "TOP RATED",
      image: "/all_products/Irrigation.jpg",
    },
    {
      id: "solar-pump-x",
      category: "irrigation",
      categoryName: "Irrigation",
      name: "Solar Pump X",
      shortDescription: "High-flow solar powered water pump system engineered for deep-well irrigation.",
      badge: "NEW EDITION",
      image: "/all_products/Solar Installation.jpg",
    },
  ],
  controllers: [
    {
      id: "agri-control-v1",
      category: "controllers",
      categoryName: "Controllers",
      name: "AgriControl Central Hub",
      shortDescription: "Automated climate, fertigation, and moisture control console with smartphone sync.",
      badge: "TOP RATED",
      image: "/all_products/contorller.jpg",
    },
  ],
  "farm-equipment": [
    {
      id: "terra-tractor-pro",
      category: "farm-equipment",
      categoryName: "Farm Equipment",
      name: "TerraTractor Pro 500",
      shortDescription: "Multi-utility field tiller and tractor attachment for hard clay & rocky soil.",
      badge: null,
      image: "/all_products/Framer equment.jpg",
    },
  ],
  accessories: [
    {
      id: "nozzle-pack-v2",
      category: "accessories",
      categoryName: "Accessories",
      name: "High-Pressure Nozzle Pack",
      shortDescription: "Durable ceramic spray nozzles designed for uniform liquid fertilizer distribution.",
      badge: null,
      image: "/all_products/Accessories.jpg",
    },
  ],
  "solar-systems": [
    {
      id: "solarpower-hub-5k",
      category: "solar-systems",
      categoryName: "Solar Systems",
      name: "SolarPower Hub 5K",
      shortDescription: "Off-grid solar generator tailored for remote farm ops and automated pump stations.",
      badge: "NEW EDITION",
      image: "/all_products/solar system.jpg",
    },
  ],
  "sensors-monitoring": [
    {
      id: "soil-sense-pro",
      category: "sensors-monitoring",
      categoryName: "Sensors & Monitoring",
      name: "SoilSense Pro Telemetry Probe",
      shortDescription: "Wireless NPK, soil moisture, pH, and temperature sensor with long battery life.",
      badge: null,
      image: "/all_products/sensor and monotor.jpg",
    },
  ],
  "maintenance-kits": [
    {
      id: "universal-lube-kit",
      category: "maintenance-kits",
      categoryName: "Maintenance Kits",
      name: "Universal Field Repair Kit",
      shortDescription: "Heavy-duty sealants, replacement o-rings, gaskets and specialized spanners.",
      badge: null,
      image: "/all_products/maintence kit.jpg",
    },
  ],
};

export const PRODUCT_DETAILS = {
  "seeder-pro-x": {
    id: "seeder-pro-x",
    category: "seeder",
    categoryName: "Seeder",
    name: "Seeder Pro X",
    shortDescription: "Precision depth control with multi-seed compatibility for high-yield farming.",
    description: "The Seeder Pro X represents the pinnacle of precision agriculture. Engineered for high-volume seed distribution, this model combines state-of-the-art airflow structure with durable materials to eliminate seed damage while ensuring optimal depth control.",
    heroImage: "/all_products/Seeder pro X.jpg",
    featuredGuide: {
      subBadge: "FEATURED GUIDE",
      title: "Complete Installation Walkthrough",
      description: "From unboxing to field execution, this video demonstrates full assembly, depth calibration, and initial test operation.",
      image: "/all_products/Solar Installation.jpg",
      duration: "04:45",
    },
    tutorialVideos: [
      {
        id: "tut1",
        title: "Assembly & Unboxing",
        duration: "03:15",
        thumbnail: "/all_products/contorller.jpg",
      },
      {
        id: "tut2",
        title: "Daily Maintenance Routine",
        duration: "05:40",
        thumbnail: "/all_products/Arig-Sow.jpg",
      },
      {
        id: "tut3",
        title: "Depth Calibration Best Practices",
        duration: "07:10",
        thumbnail: "/all_products/Framer equment.jpg",
      },
      {
        id: "tut4",
        title: "Troubleshooting Common Issues",
        duration: "04:25",
        thumbnail: "/all_products/Eco plant.jpg",
      },
    ],
    technicalDocs: [
      {
        title: "User Manual (PDF)",
        meta: "Full instructions for pitch and cable calibrations",
        filename: "Seeder_Pro_X_User_Manual.pdf",
      },
      {
        title: "Spec Sheet (PDF)",
        meta: "Detailed dimensions and operational ranges",
        filename: "Seeder_Pro_X_Specs.pdf",
      },
      {
        title: "Parts Catalogue",
        meta: "Detailed breakdown diagram of spare components",
        filename: "Seeder_Pro_X_Parts.pdf",
      },
      {
        title: "Warranty Terms",
        meta: "Coverage terms and legal requirements",
        filename: "Seeder_Pro_X_Warranty.pdf",
      },
    ],
    faqs: [
      {
        question: "How long does the battery last without sun?",
        answer: "The onboard lithium power cell retains operational power for up to 72 continuous field hours without solar input.",
      },
      {
        question: "Can I use it with my existing hose storage?",
        answer: "Yes, it is designed with standard ISO 34-series quick-connect couplings compatible with standard irrigation lines.",
      },
      {
        question: "Is the camera waterproof?",
        answer: "Yes, the camera array and optic sensors are IP68 rated, fully sealed against high-pressure water streams and field dust.",
      },
    ],
  },
};

export function getProductDetail(categorySlug, productId) {
  if (PRODUCT_DETAILS[productId]) {
    return PRODUCT_DETAILS[productId];
  }

  const categoryProducts = PRODUCTS[categorySlug] || [];
  const prod = categoryProducts.find((p) => p.id === productId);
  const categoryObj = CATEGORIES.find((c) => c.slug === categorySlug);

  const name = prod ? prod.name : productId.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  const image = prod ? prod.image : "/all_products/seeder.jpg";
  const catName = categoryObj ? categoryObj.name : categorySlug;

  return {
    id: productId,
    category: categorySlug,
    categoryName: catName,
    name: name,
    shortDescription: prod ? prod.shortDescription : "High performance agricultural equipment designed for optimal farm productivity.",
    description: `${name} represents the pinnacle of precision agriculture. Engineered for high-volume distribution, this model combines state-of-the-art airflow structure with durable materials to eliminate component damage while ensuring optimal control.`,
    heroImage: image,
    featuredGuide: {
      subBadge: "FEATURED GUIDE",
      title: "Complete Installation Walkthrough",
      description: "From unboxing to field execution, this video demonstrates full assembly, depth calibration, and initial test operation.",
      image: image,
      duration: "04:45",
    },
    tutorialVideos: [
      {
        id: "tut1",
        title: "Assembly & Unboxing",
        duration: "03:15",
        thumbnail: image,
      },
      {
        id: "tut2",
        title: "Daily Maintenance Routine",
        duration: "05:40",
        thumbnail: image,
      },
      {
        id: "tut3",
        title: "Depth Calibration Best Practices",
        duration: "07:10",
        thumbnail: image,
      },
      {
        id: "tut4",
        title: "Troubleshooting Common Issues",
        duration: "04:25",
        thumbnail: image,
      },
    ],
    technicalDocs: [
      {
        title: "User Manual (PDF)",
        meta: "Full instructions for pitch and cable calibrations",
        filename: `${productId}_User_Manual.pdf`,
      },
      {
        title: "Spec Sheet (PDF)",
        meta: "Detailed dimensions and operational ranges",
        filename: `${productId}_Specs.pdf`,
      },
      {
        title: "Parts Catalogue",
        meta: "Detailed breakdown diagram of spare components",
        filename: `${productId}_Parts.pdf`,
      },
      {
        title: "Warranty Terms",
        meta: "Coverage terms and legal requirements",
        filename: `${productId}_Warranty.pdf`,
      },
    ],
    faqs: [
      {
        question: "How long does the battery last without sun?",
        answer: "The onboard lithium power cell retains operational power for up to 72 continuous field hours without solar input.",
      },
      {
        question: "Can I use it with my existing hose storage?",
        answer: "Yes, it is designed with standard ISO 34-series quick-connect couplings compatible with standard irrigation lines.",
      },
      {
        question: "Is the camera waterproof?",
        answer: "Yes, the camera array and optic sensors are IP68 rated, fully sealed against high-pressure water streams and field dust.",
      },
    ],
  };
}
