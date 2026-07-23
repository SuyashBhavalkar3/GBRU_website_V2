export const warrantiesData = [
  {
    id: "seeder-pro-x",
    name: "Seeder Pro X",
    model: "SPR-2024",
    fullModelId: "GBRU-2024-SPX-062",
    warrantyId: "W-GBRU-77213",
    status: "active", // active | expiring | expired | pending
    image: "/all_products/Seeder pro X.jpg",
    verified: true,
    purchaseDate: "12 Oct 2023",
    registrationDate: "October 12, 2023",
    expiryDate: "12 Oct 2025",
    expiryFullDate: "December 15, 2025",
    daysRemaining: 420,
    coverage: [
      {
        id: "c1",
        category: "Frame & Structure",
        badge: "F",
        description: "Full structural integrity coverage for main chassis and load-bearing components.",
      },
      {
        id: "c2",
        category: "Hydraulic Systems",
        badge: "H",
        description: "Covers pumps, valves, and cylinders against manufacturing defects and leakage.",
      },
      {
        id: "c3",
        category: "Electronic Sensors",
        badge: "E",
        description: "Advanced IoT sensors and telemetry modules included in full diagnostic coverage.",
      },
    ],
    documents: [
      { id: "d1", name: "Warranty-Cert.pdf", type: "pdf" },
      { id: "d2", name: "Product-Manual.pdf", type: "doc" },
    ],
    maintenanceHistory: [
      { id: "m1", date: "Aug 15, 2024", service: "Annual Inspection", status: "PASSED", statusType: "passed" },
      { id: "m2", date: "Mar 22, 2024", service: "Sensor Calibration", status: "PASSED", statusType: "passed" },
      { id: "m3", date: "Oct 12, 2023", service: "Post-Purchase Setup", status: "COMPLETED", statusType: "completed" },
    ],
  },
  {
    id: "solar-irrigation-hub",
    name: "Solar Irrigation Hub",
    model: "SIH-5502",
    fullModelId: "GBRU-2024-SIH-5502",
    warrantyId: "W-GBRU-55073",
    status: "active",
    image: "/all_products/Solar Installation.jpg",
    verified: true,
    purchaseDate: "05 Jan 2024",
    registrationDate: "January 05, 2024",
    expiryDate: "05 Jan 2026",
    expiryFullDate: "January 05, 2026",
    daysRemaining: 535,
    coverage: [
      {
        id: "c1",
        category: "Solar Photovoltaic Cells",
        badge: "S",
        description: "100% replacement warranty on solar panel power output and converter units.",
      },
      {
        id: "c2",
        category: "Pump Motor Assembly",
        badge: "P",
        description: "Heavy-duty submersible motor covered for voltage fluctuations and thermal overload.",
      },
    ],
    documents: [
      { id: "d1", name: "Solar-Warranty-Certificate.pdf", type: "pdf" },
      { id: "d2", name: "Installation-Guide.pdf", type: "pdf" },
    ],
    maintenanceHistory: [
      { id: "m1", date: "Jun 10, 2024", service: "Panel Efficiency Check", status: "PASSED", statusType: "passed" },
      { id: "m2", date: "Jan 05, 2024", service: "Initial Grid Sync", status: "COMPLETED", statusType: "completed" },
    ],
  },
  {
    id: "smart-tractor-g3",
    name: "Smart Tractor G3",
    model: "STG-4410",
    fullModelId: "GBRU-2022-[#4410]",
    warrantyId: "W-GBRU-44191",
    status: "expired",
    image: "/all_products/TerraMaster.jpg",
    verified: true,
    purchaseDate: "20 Aug 2022",
    registrationDate: "August 20, 2022",
    expiryDate: "20 Aug 2023",
    expiryFullDate: "August 20, 2023",
    daysRemaining: 0,
    coverage: [
      {
        id: "c1",
        category: "Engine & Powertrain",
        badge: "E",
        description: "Engine block and transmission gear system coverage (Expired).",
      },
    ],
    documents: [
      { id: "d1", name: "Tractor-Warranty-Policy.pdf", type: "pdf" },
    ],
    maintenanceHistory: [
      { id: "m1", date: "Jul 15, 2023", service: "500-Hour Oil Service", status: "PASSED", statusType: "passed" },
    ],
  },
];

export const userProfile = {
  name: "Rajesh Kumar",
  phone: "+91 98765 43210",
  memberSince: "Oct 2023",
  verified: true,
  avatar: "/all_products/human.jpg",
  stats: {
    registeredProducts: 3,
    activeWarranties: 2,
    supportTickets: 1,
    savedVideos: 12,
  },
};

