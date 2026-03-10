import type {
  Region,
  RoomType,
  RentalPeriod,
  MembershipTier,
  RegionData,
  User,
  Property,
  PropertyMedia,
  Booking,
  Payment,
  ServiceRequest,
  ProviderService,
  AppNotification,
  MembershipPlan,
  SurveyVisit,
  QAThread,
  ChatMessage,
  Review,
  TrustedContact,
  TrustedContactNotification,
  PrivateChatRoom,
  PrivateChatMessage,
} from "./types";

export const regions: RegionData[] = [
  {
    id: "kota-cirebon",
    name: "Kota Cirebon",
    description:
      "Kota udang dengan budaya yang kaya, pusat bisnis dan pendidikan di pesisir utara Jawa.",
    gradient: "from-orange-500 to-red-500",
    propertyCount: 3,
  },
  {
    id: "kab-cirebon",
    name: "Kabupaten Cirebon",
    description:
      "Kabupaten luas dengan potensi industri dan pertanian, serta akses strategis ke jalur pantura.",
    gradient: "from-amber-500 to-orange-600",
    propertyCount: 2,
  },
  {
    id: "kuningan",
    name: "Kuningan",
    description:
      "Kota kecil yang asri di kaki Gunung Ciremai, cocok untuk mahasiswa dan pekerja.",
    gradient: "from-emerald-500 to-teal-600",
    propertyCount: 3,
  },
  {
    id: "majalengka",
    name: "Majalengka",
    description:
      "Kabupaten yang berkembang pesat dengan bandara baru dan peluang investasi properti.",
    gradient: "from-sky-500 to-blue-600",
    propertyCount: 2,
  },
  {
    id: "indramayu",
    name: "Indramayu",
    description:
      "Kabupaten pesisir utara dengan sektor perikanan dan pertanian yang kuat.",
    gradient: "from-yellow-500 to-amber-600",
    propertyCount: 1,
  },
];

export const allFacilities = [
  "WiFi",
  "AC",
  "Kipas Angin",
  "Kamar Mandi Dalam",
  "Kamar Mandi Luar",
  "Dapur Bersama",
  "Dapur Lengkap",
  "Parkir Motor",
  "Parkir Mobil",
  "CCTV",
  "Penjaga 24 Jam",
  "Laundry",
  "TV Kabel",
  "TV",
  "Ruang Tamu",
  "Taman",
  "Rooftop",
  "Kolam Renang",
  "Gym",
  "Antar-Jemput Bandara",
];

export const users: User[] = [
  {
    id: "t1",
    name: "Rina Susanti",
    email: "rina@email.com",
    phone: "081234567890",
    role: "penghuni",
    avatar: "RS",
    createdAt: "2025-08-01",
  },
  {
    id: "t2",
    name: "Budi Pratama",
    email: "budi@email.com",
    phone: "081234567891",
    role: "penghuni",
    avatar: "BP",
    createdAt: "2025-09-15",
  },
  {
    id: "t3",
    name: "Siti Aminah",
    email: "siti@email.com",
    phone: "081234567892",
    role: "penghuni",
    avatar: "SA",
    createdAt: "2025-10-01",
  },
  {
    id: "o1",
    name: "Haji Ahmad Hidayat",
    email: "ahmad@email.com",
    phone: "081234567893",
    role: "pemilik",
    avatar: "AH",
    membershipTier: "emas",
    createdAt: "2025-01-15",
  },
  {
    id: "o2",
    name: "Dewi Lestari",
    email: "dewi@email.com",
    phone: "081234567894",
    role: "pemilik",
    avatar: "DL",
    membershipTier: "perak",
    createdAt: "2025-03-20",
  },
  {
    id: "o3",
    name: "Pak Joko Widodo",
    email: "joko@email.com",
    phone: "081234567895",
    role: "pemilik",
    avatar: "JW",
    membershipTier: "gratis",
    createdAt: "2025-06-10",
  },
  {
    id: "p1",
    name: "Laundry Bersih Jaya",
    email: "laundrybj@email.com",
    phone: "081234567896",
    role: "penyedia",
    providerType: "laundry",
    avatar: "LB",
    createdAt: "2025-04-01",
  },
  {
    id: "p2",
    name: "Cleaning Segar",
    email: "cleaningsegar@email.com",
    phone: "081234567897",
    role: "penyedia",
    providerType: "kebersihan",
    avatar: "CS",
    createdAt: "2025-05-15",
  },
  {
    id: "p3",
    name: "Tukang Handal",
    email: "tukanghandal@email.com",
    phone: "081234567898",
    role: "penyedia",
    providerType: "tukang",
    avatar: "TH",
    createdAt: "2025-07-20",
  },
  {
    id: "a1",
    name: "Admin SolusiKos",
    email: "admin@solusikos.com",
    phone: "081234567899",
    role: "admin",
    avatar: "AD",
    createdAt: "2025-01-01",
  },
];

export const properties: Property[] = [
  {
    id: "prop-1",
    name: "Kos Melati Indah",
    region: "kuningan",
    address: "Jl. Siliwangi No. 45, Kuningan",
    description:
      "Kos nyaman di pusat kota Kuningan, dekat dengan kampus dan pusat perbelanjaan. Fasilitas lengkap dengan WiFi cepat dan dapur bersama.",
    images: ["/images/kos1/tampak-depan.jpeg"],
    media: {
      photos: [
        {
          id: "photo-1-1",
          url: "/images/kos1/tampak-depan.jpeg",
          caption: "Tampak Depan",
          isPrimary: true,
        },
        {
          id: "photo-1-2",
          url: "/images/kos1/kamar.jpeg",
          caption: "Kamar Tidur",
          isPrimary: true,
        },
        {
          id: "photo-1-3",
          url: "/images/kos1/kamarmandi.jpeg",
          caption: "Kamar Mandi",
          isPrimary: true,
        },
        {
          id: "photo-1-4",
          url: "/images/kos1/area-parkir.jpeg",
          caption: "Area Parkir",
          isPrimary: true,
        },
      ],
      videoTour: {
        url: "/videos/kos/prop-1/tour.mp4",
        thumbnail: "/images/kos1/prop1.jpeg",
        duration: "2:30",
      },
      tour360: {
        url: "/360/kos/prop-1/tour.html",
        thumbnail: "/360/kos1/prop1-360.jpeg",
      },
    },
    amenities: [
      "WiFi",
      "AC",
      "Kamar Mandi Dalam",
      "Dapur Bersama",
      "Parkir Motor",
      "Laundry",
    ],
    pricePerMonth: 1500000,
    pricePerWeek: 500000,
    pricePerYear: 15000000,
    roomType: "campur",
    totalRooms: 12,
    availableRooms: 3,
    ownerId: "o1",
    membershipTier: "emas",
    rating: 4.8,
    reviewCount: 45,
    featured: true,
    rentalPeriods: ["mingguan", "bulanan", "tahunan"],
    hasVideoTour: true,
    has360Tour: true,
    coordinates: { lat: -6.9751, lng: 108.4836 },
    nearbyPlaces: [
      { name: "Universitas Kuningan", distance: "500m", type: "campus" },
      { name: "Pasar Kuningan", distance: "300m", type: "market" },
      { name: "RS Ciremai", distance: "1.2km", type: "hospital" },
    ],
  },
  {
    id: "prop-2",
    name: "Kos Putri Anggrek",
    region: "kuningan",
    address: "Jl. Veteran No. 12, Kuningan",
    description:
      "Kos khusus putri dengan lingkungan aman dan bersih. Tersedia penjaga 24 jam dan CCTV.",
    images: ["/images/kos1/prop1.jpeg"],
    media: {
      photos: [
        {
          id: "photo-2-1",
          url: "/images/kos1/prop1.jpeg",
          caption: "Kamar Tidur",
          isPrimary: true,
        },
      ],
      videoTour: {
        url: "/videos/kos/prop-2/tour.mp4",
        thumbnail: "/images/kos1/prop1.jpeg",
        duration: "2:15",
      },
      tour360: {
        url: "/360/kos/prop-2/tour.html",
        thumbnail: "/images/prop1-360.jpeg",
      },
    },
    amenities: [
      "WiFi",
      "AC",
      "Kamar Mandi Dalam",
      "CCTV",
      "Penjaga 24 Jam",
      "Parkir Motor",
    ],
    pricePerMonth: 1200000,
    pricePerWeek: 400000,
    pricePerYear: 12000000,
    roomType: "putri",
    totalRooms: 8,
    availableRooms: 2,
    ownerId: "o1",
    membershipTier: "emas",
    rating: 4.9,
    reviewCount: 32,
    featured: true,
    rentalPeriods: ["bulanan", "tahunan"],
    hasVideoTour: true,
    has360Tour: true,
    coordinates: { lat: -6.978, lng: 108.4801 },
    nearbyPlaces: [
      { name: "Universitas Kuningan", distance: "800m", type: "campus" },
      { name: "Mall Kuningan", distance: "1km", type: "mall" },
    ],
  },
  {
    id: "prop-3",
    name: "Kos Putra Garuda",
    region: "kuningan",
    address: "Jl. Ahmad Yani No. 78, Kuningan",
    description:
      "Kos khusus putra dengan fasilitas olahraga dan ruang komunal yang luas.",
    images: ["/images/kos1/prop1.jpeg"],
    media: {
      photos: [
        {
          id: "photo-3-1",
          url: "/images/kos1/prop1.jpeg",
          caption: "Kamar Tidur",
          isPrimary: true,
        },
      ],
      videoTour: {
        url: "/videos/kos/prop-3/tour.mp4",
        thumbnail: "/images/kos1/prop1.jpeg",
        duration: "2:00",
      },
    },
    amenities: [
      "WiFi",
      "Kipas Angin",
      "Kamar Mandi Luar",
      "Ruang Tamu",
      "Parkir Motor",
    ],
    pricePerMonth: 800000,
    pricePerWeek: 250000,
    pricePerYear: 8000000,
    roomType: "putra",
    totalRooms: 15,
    availableRooms: 5,
    ownerId: "o2",
    membershipTier: "perak",
    rating: 4.3,
    reviewCount: 18,
    featured: false,
    rentalPeriods: ["mingguan", "bulanan"],
    hasVideoTour: true,
    has360Tour: false,
  },
  {
    id: "prop-4",
    name: "Kos Harmoni",
    region: "kab-cirebon",
    address: "Jl. Merdeka No. 33, Sumber, Kab. Cirebon",
    description:
      "Kos modern minimalis dengan desain interior yang stylish, cocok untuk profesional muda.",
    images: ["/images/kos1/prop1.jpeg"],
    media: {
      photos: [
        {
          id: "photo-4-1",
          url: "/images/kos1/prop1.jpeg",
          caption: "Kamar Tidur",
          isPrimary: true,
        },
      ],
      videoTour: {
        url: "/videos/kos/prop-4/tour.mp4",
        thumbnail: "/images/kos1/prop1.jpeg",
        duration: "1:45",
      },
    },
    amenities: [
      "WiFi",
      "AC",
      "Kamar Mandi Dalam",
      "TV Kabel",
      "Dapur Lengkap",
      "Parkir Mobil",
    ],
    pricePerMonth: 2000000,
    pricePerWeek: 650000,
    pricePerYear: 20000000,
    roomType: "campur",
    totalRooms: 6,
    availableRooms: 1,
    ownerId: "o2",
    membershipTier: "perak",
    rating: 4.7,
    reviewCount: 28,
    featured: true,
    rentalPeriods: ["bulanan", "tahunan"],
    hasVideoTour: true,
    has360Tour: false,
  },
  {
    id: "prop-5",
    name: "Kos Cirebon Sejahtera",
    region: "kota-cirebon",
    address: "Jl. Kartini No. 56, Kota Cirebon",
    description:
      "Kos strategis di pusat Kota Cirebon, dekat stasiun kereta dan alun-alun. Cocok untuk mahasiswa dan pekerja.",
    images: ["/images/kos1/prop1.jpeg"],
    media: {
      photos: [
        {
          id: "photo-5-1",
          url: "/images/kos1/prop1.jpeg",
          caption: "Kamar Tidur",
          isPrimary: true,
        },
      ],
      videoTour: {
        url: "/videos/kos/prop-5/tour.mp4",
        thumbnail: "/images/kos1/prop1.jpeg",
        duration: "2:20",
      },
      tour360: {
        url: "/360/kos/prop-5/tour.html",
        thumbnail: "/images/prop1-360.jpeg",
      },
    },
    amenities: [
      "WiFi",
      "AC",
      "Kamar Mandi Dalam",
      "Dapur Bersama",
      "Parkir Motor",
      "Rooftop",
    ],
    pricePerMonth: 1300000,
    pricePerWeek: 430000,
    pricePerYear: 13000000,
    roomType: "campur",
    totalRooms: 10,
    availableRooms: 4,
    ownerId: "o1",
    membershipTier: "emas",
    rating: 4.6,
    reviewCount: 52,
    featured: true,
    rentalPeriods: ["mingguan", "bulanan", "tahunan"],
    hasVideoTour: true,
    has360Tour: true,
  },
  {
    id: "prop-6",
    name: "Kos Putri Mawar",
    region: "kota-cirebon",
    address: "Jl. Pilsauddin No. 21, Kota Cirebon",
    description: "Kos putri elegan dengan taman yang indah dan suasana tenang.",
    images: ["/images/kos1/prop1.jpeg"],
    media: {
      photos: [
        {
          id: "photo-6-1",
          url: "/images/kos1/prop1.jpeg",
          caption: "Kamar Tidur",
          isPrimary: true,
        },
      ],
    },
    amenities: [
      "WiFi",
      "AC",
      "Kamar Mandi Dalam",
      "Taman",
      "Laundry",
      "Dapur Lengkap",
    ],
    pricePerMonth: 1100000,
    pricePerWeek: 370000,
    pricePerYear: 11000000,
    roomType: "putri",
    totalRooms: 7,
    availableRooms: 2,
    ownerId: "o3",
    membershipTier: "gratis",
    rating: 4.4,
    reviewCount: 15,
    featured: false,
    rentalPeriods: ["bulanan"],
    hasVideoTour: false,
    has360Tour: false,
  },
  {
    id: "prop-7",
    name: "Kos Ciremai View",
    region: "kota-cirebon",
    address: "Jl. Tuparev No. 88, Kota Cirebon",
    description:
      "Kos premium dengan pemandangan Gunung Ciremai. Fasilitas hotel bintang 3.",
    images: ["/images/kos1/prop1.jpeg"],
    media: {
      photos: [
        {
          id: "photo-7-1",
          url: "/images/kos1/prop1.jpeg",
          caption: "Kamar Tidur",
          isPrimary: true,
        },
      ],
      videoTour: {
        url: "/videos/kos/prop-7/tour.mp4",
        thumbnail: "/images/kos1/prop1.jpeg",
        duration: "3:00",
      },
      tour360: {
        url: "/360/kos/prop-7/tour.html",
        thumbnail: "/images/prop1-360.jpeg",
      },
    },
    amenities: [
      "WiFi",
      "AC",
      "Kamar Mandi Dalam",
      "Kolam Renang",
      "Gym",
      "Parkir Mobil",
      "Laundry",
    ],
    pricePerMonth: 2500000,
    pricePerWeek: 800000,
    pricePerYear: 25000000,
    roomType: "campur",
    totalRooms: 20,
    availableRooms: 6,
    ownerId: "o1",
    membershipTier: "emas",
    rating: 4.9,
    reviewCount: 78,
    featured: true,
    rentalPeriods: ["mingguan", "bulanan", "tahunan"],
    hasVideoTour: true,
    has360Tour: true,
  },
  {
    id: "prop-8",
    name: "Kos Sederhana Majalengka",
    region: "majalengka",
    address: "Jl. Raya Tonjong No. 15, Majalengka",
    description:
      "Kos murah dan bersih di Majalengka, ideal untuk pekerja pabrik dan mahasiswa.",
    images: ["/images/kos1/prop1.jpeg"],
    media: {
      photos: [
        {
          id: "photo-8-1",
          url: "/images/kos1/prop1.jpeg",
          caption: "Kamar Tidur",
          isPrimary: true,
        },
      ],
    },
    amenities: ["WiFi", "Kipas Angin", "Kamar Mandi Luar", "Parkir Motor"],
    pricePerMonth: 600000,
    pricePerWeek: 200000,
    pricePerYear: 6000000,
    roomType: "putra",
    totalRooms: 20,
    availableRooms: 8,
    ownerId: "o3",
    membershipTier: "gratis",
    rating: 4.0,
    reviewCount: 10,
    featured: false,
    rentalPeriods: ["mingguan", "bulanan"],
    hasVideoTour: false,
    has360Tour: false,
  },
  {
    id: "prop-9",
    name: "Kos Airport Residence",
    region: "majalengka",
    address: "Jl. Bandara BIJB No. 5, Majalengka",
    description:
      "Kos modern dekat Bandara Kertajati, cocok untuk pekerja bandara dan wisatawan transit.",
    images: ["/images/kos1/prop1.jpeg"],
    media: {
      photos: [
        {
          id: "photo-9-1",
          url: "/images/kos1/prop1.jpeg",
          caption: "Kamar Tidur",
          isPrimary: true,
        },
      ],
      videoTour: {
        url: "/videos/kos/prop-9/tour.mp4",
        thumbnail: "/images/kos1/prop1.jpeg",
        duration: "2:10",
      },
    },
    amenities: [
      "WiFi",
      "AC",
      "Kamar Mandi Dalam",
      "TV",
      "Parkir Mobil",
      "Antar-Jemput Bandara",
    ],
    pricePerMonth: 1800000,
    pricePerWeek: 600000,
    pricePerYear: 18000000,
    roomType: "campur",
    totalRooms: 8,
    availableRooms: 3,
    ownerId: "o2",
    membershipTier: "perak",
    rating: 4.5,
    reviewCount: 22,
    featured: true,
    rentalPeriods: ["mingguan", "bulanan", "tahunan"],
    hasVideoTour: true,
    has360Tour: false,
  },
  {
    id: "prop-10",
    name: "Kos Keluarga Bahagia",
    region: "kab-cirebon",
    address: "Jl. Siti Armilah No. 30, Plered, Kab. Cirebon",
    description:
      "Kos keluarga dengan suasana homey dan dapur lengkap. Dekat pasar tradisional.",
    images: ["/images/kos1/prop1.jpeg"],
    media: {
      photos: [
        {
          id: "photo-10-1",
          url: "/images/kos1/prop1.jpeg",
          caption: "Kamar Tidur",
          isPrimary: true,
        },
      ],
    },
    amenities: [
      "WiFi",
      "Kipas Angin",
      "Kamar Mandi Dalam",
      "Dapur Lengkap",
      "Taman",
      "Parkir Motor",
    ],
    pricePerMonth: 900000,
    pricePerWeek: 300000,
    pricePerYear: 9000000,
    roomType: "campur",
    totalRooms: 10,
    availableRooms: 4,
    ownerId: "o3",
    membershipTier: "gratis",
    rating: 4.2,
    reviewCount: 14,
    featured: false,
    rentalPeriods: ["bulanan", "tahunan"],
    hasVideoTour: false,
    has360Tour: false,
  },
  {
    id: "prop-11",
    name: "Kos Indramayu Permai",
    region: "indramayu",
    address: "Jl. Raya Pabean No. 10, Indramayu",
    description:
      "Kos bersih dan terjangkau di pusat Kota Indramayu, dekat kawasan industri dan pelabuhan.",
    images: ["/images/kos1/prop1.jpeg"],
    media: {
      photos: [
        {
          id: "photo-11-1",
          url: "/images/kos1/prop1.jpeg",
          caption: "Kamar Tidur",
          isPrimary: true,
        },
      ],
    },
    amenities: [
      "WiFi",
      "Kipas Angin",
      "Kamar Mandi Dalam",
      "Parkir Motor",
      "Dapur Bersama",
    ],
    pricePerMonth: 700000,
    pricePerWeek: 230000,
    pricePerYear: 7000000,
    roomType: "campur",
    totalRooms: 14,
    availableRooms: 6,
    ownerId: "o3",
    membershipTier: "gratis",
    rating: 4.1,
    reviewCount: 8,
    featured: false,
    rentalPeriods: ["bulanan", "tahunan"],
    hasVideoTour: false,
    has360Tour: false,
  },
];

export const reviews: Review[] = [
  {
    id: "rev-1",
    propertyId: "prop-1",
    tenantId: "t1",
    bookingId: "bk-1",
    rating: 5,
    comment:
      "Kos sangat nyaman dan bersih. Pemilik ramah dan responsif. WiFi cepat dan stabil. Sangat recommended!",
    createdAt: "2026-02-15",
  },
  {
    id: "rev-2",
    propertyId: "prop-1",
    tenantId: "t2",
    bookingId: "bk-past-1",
    rating: 4,
    comment:
      "Lokasi strategis, dekat dengan kampus. Fasilitas lengkap. Hanya saja parkir terbatas.",
    createdAt: "2026-01-20",
  },
  {
    id: "rev-3",
    propertyId: "prop-5",
    tenantId: "t2",
    bookingId: "bk-2",
    rating: 5,
    comment:
      "Kos terbaik di Cirebon! Rooftop view nya bagus banget. Cocok untuk anak muda.",
    createdAt: "2026-03-01",
  },
  {
    id: "rev-4",
    propertyId: "prop-7",
    tenantId: "t3",
    bookingId: "bk-past-2",
    rating: 5,
    comment:
      "Worth the price! Kolam renang dan gym nya top. Seperti tinggal di hotel.",
    createdAt: "2026-02-28",
  },
];

export const trustedContacts: TrustedContact[] = [
  {
    id: "tc-1",
    tenantId: "t1",
    name: "Ibu Susanti",
    relationship: "Ibu",
    email: "ibu.susanti@email.com",
    phone: "081298765432",
    createdAt: "2026-01-10",
  },
  {
    id: "tc-2",
    tenantId: "t2",
    name: "Pak Pratama",
    relationship: "Ayah",
    email: "pak.pratama@email.com",
    phone: "081387654321",
    createdAt: "2026-01-25",
  },
];

export const trustedContactNotifications: TrustedContactNotification[] = [
  {
    id: "tcn-1",
    trustedContactId: "tc-1",
    type: "booking_confirmed",
    message:
      "Booking untuk Rina Susanti di Kos Melati Indah telah dikonfirmasi.",
    sentAt: "2026-01-15 10:30",
    method: "email",
  },
  {
    id: "tcn-2",
    trustedContactId: "tc-1",
    type: "payment_confirmed",
    message: "Pembayaran sewa bulan Februari dari Rina Susanti telah diterima.",
    sentAt: "2026-02-14 14:20",
    method: "email",
  },
  {
    id: "tcn-3",
    trustedContactId: "tc-1",
    type: "payment_due",
    message:
      "Pengingat: Pembayaran sewa bulan April untuk Rina Susanti akan jatuh tempo dalam 7 hari.",
    sentAt: "2026-04-08 09:00",
    method: "sms",
  },
];

export const bookings: Booking[] = [
  {
    id: "bk-1",
    propertyId: "prop-1",
    tenantId: "t1",
    checkIn: "2026-01-15",
    checkOut: "2026-07-15",
    status: "aktif",
    monthlyRent: 1500000,
    totalPaid: 4500000,
    rentalPeriod: "bulanan",
    duration: 6,
    createdAt: "2026-01-10",
    trustedContactId: "tc-1",
  },
  {
    id: "bk-2",
    propertyId: "prop-5",
    tenantId: "t2",
    checkIn: "2026-02-01",
    checkOut: "2026-08-01",
    status: "aktif",
    monthlyRent: 1300000,
    totalPaid: 2600000,
    rentalPeriod: "bulanan",
    duration: 6,
    createdAt: "2026-01-25",
    trustedContactId: "tc-2",
  },
  {
    id: "bk-3",
    propertyId: "prop-9",
    tenantId: "t3",
    checkIn: "2026-03-01",
    checkOut: "2026-06-01",
    status: "menunggu",
    monthlyRent: 1800000,
    totalPaid: 0,
    rentalPeriod: "bulanan",
    duration: 3,
    createdAt: "2026-02-20",
  },
  {
    id: "bk-past-1",
    propertyId: "prop-1",
    tenantId: "t2",
    checkIn: "2025-06-01",
    checkOut: "2025-12-01",
    status: "selesai",
    monthlyRent: 1500000,
    totalPaid: 9000000,
    rentalPeriod: "bulanan",
    duration: 6,
    createdAt: "2025-05-20",
  },
  {
    id: "bk-past-2",
    propertyId: "prop-7",
    tenantId: "t3",
    checkIn: "2025-09-01",
    checkOut: "2026-02-01",
    status: "selesai",
    monthlyRent: 2500000,
    totalPaid: 12500000,
    rentalPeriod: "bulanan",
    duration: 5,
    createdAt: "2025-08-25",
  },
];

export const payments: Payment[] = [
  {
    id: "pay-1",
    bookingId: "bk-1",
    tenantId: "t1",
    ownerId: "o1",
    amount: 1500000,
    netAmount: 1500000,
    status: "lunas",
    method: "BCA Virtual Account",
    dueDate: "2026-02-15",
    paidAt: "2026-02-14",
    createdAt: "2026-02-01",
  },
  {
    id: "pay-2",
    bookingId: "bk-1",
    tenantId: "t1",
    ownerId: "o1",
    amount: 1500000,
    netAmount: 1500000,
    status: "lunas",
    method: "GoPay",
    dueDate: "2026-03-15",
    paidAt: "2026-03-13",
    createdAt: "2026-03-01",
  },
  {
    id: "pay-3",
    bookingId: "bk-1",
    tenantId: "t1",
    ownerId: "o1",
    amount: 1500000,
    netAmount: 1500000,
    status: "belum_bayar",
    method: "",
    dueDate: "2026-04-15",
    createdAt: "2026-04-01",
  },
  {
    id: "pay-4",
    bookingId: "bk-2",
    tenantId: "t2",
    ownerId: "o1",
    amount: 1300000,
    netAmount: 1300000,
    status: "lunas",
    method: "Mandiri Virtual Account",
    dueDate: "2026-03-01",
    paidAt: "2026-02-28",
    createdAt: "2026-02-15",
  },
  {
    id: "pay-5",
    bookingId: "bk-2",
    tenantId: "t2",
    ownerId: "o1",
    amount: 1300000,
    netAmount: 1300000,
    status: "menunggu",
    method: "OVO",
    dueDate: "2026-04-01",
    createdAt: "2026-03-15",
  },
];

export const serviceRequests: ServiceRequest[] = [
  {
    id: "sr-1",
    tenantId: "t1",
    providerId: "p1",
    propertyId: "prop-1",
    serviceType: "laundry",
    description: "Cuci setrika 5 kg pakaian",
    status: "selesai",
    price: 35000,
    createdAt: "2026-02-10",
    completedAt: "2026-02-11",
  },
  {
    id: "sr-2",
    tenantId: "t1",
    providerId: "p2",
    propertyId: "prop-1",
    serviceType: "kebersihan",
    description: "Bersih-bersih kamar dan kamar mandi",
    status: "dikerjakan",
    price: 50000,
    createdAt: "2026-03-01",
  },
  {
    id: "sr-3",
    tenantId: "t2",
    providerId: "p3",
    propertyId: "prop-5",
    serviceType: "tukang",
    description: "Perbaiki keran bocor di kamar mandi",
    status: "menunggu",
    price: 75000,
    createdAt: "2026-03-05",
  },
];

export const providerServices: ProviderService[] = [
  {
    id: "ps-1",
    providerId: "p1",
    name: "Cuci Kiloan",
    description: "Laundry cuci kering per kg",
    price: 7000,
    serviceType: "laundry",
    active: true,
  },
  {
    id: "ps-2",
    providerId: "p1",
    name: "Cuci Setrika",
    description: "Laundry cuci + setrika per kg",
    price: 10000,
    serviceType: "laundry",
    active: true,
  },
  {
    id: "ps-3",
    providerId: "p1",
    name: "Express Laundry",
    description: "Selesai dalam 6 jam",
    price: 15000,
    serviceType: "laundry",
    active: true,
  },
  {
    id: "ps-4",
    providerId: "p2",
    name: "Bersih Kamar",
    description: "Bersih-bersih kamar standar",
    price: 50000,
    serviceType: "kebersihan",
    active: true,
  },
  {
    id: "ps-5",
    providerId: "p2",
    name: "Deep Cleaning",
    description: "Pembersihan menyeluruh",
    price: 100000,
    serviceType: "kebersihan",
    active: true,
  },
  {
    id: "ps-6",
    providerId: "p3",
    name: "Perbaikan Ringan",
    description: "Keran, saklar, engsel, dll",
    price: 75000,
    serviceType: "tukang",
    active: true,
  },
  {
    id: "ps-7",
    providerId: "p3",
    name: "Perbaikan Berat",
    description: "Pipa, listrik, konstruksi ringan",
    price: 150000,
    serviceType: "tukang",
    active: true,
  },
];

export const notifications: AppNotification[] = [
  {
    id: "n-1",
    userId: "t1",
    title: "Pembayaran Berhasil",
    message: "Pembayaran bulan Maret sebesar Rp 1.500.000 telah diterima.",
    type: "payment",
    read: true,
    createdAt: "2026-03-13",
  },
  {
    id: "n-2",
    userId: "t1",
    title: "Layanan Selesai",
    message: "Layanan laundry dari Laundry Bersih Jaya telah selesai.",
    type: "service",
    read: true,
    createdAt: "2026-02-11",
  },
  {
    id: "n-3",
    userId: "t1",
    title: "Tagihan Baru",
    message:
      "Tagihan bulan April sebesar Rp 1.500.000 telah dibuat. Jatuh tempo: 15 April 2026.",
    type: "payment",
    read: false,
    createdAt: "2026-04-01",
  },
  {
    id: "n-4",
    userId: "o1",
    title: "Booking Baru",
    message:
      "Siti Aminah ingin memesan Kos Airport Residence. Menunggu persetujuan Anda.",
    type: "booking",
    read: false,
    createdAt: "2026-02-20",
  },
  {
    id: "n-5",
    userId: "o1",
    title: "Pembayaran Diterima",
    message:
      "Rina Susanti telah membayar sewa bulan Maret untuk Kos Melati Indah.",
    type: "payment",
    read: true,
    createdAt: "2026-03-13",
  },
  {
    id: "n-6",
    userId: "p3",
    title: "Pekerjaan Baru",
    message:
      "Budi Pratama membutuhkan perbaikan keran di Kos Cirebon Sejahtera.",
    type: "service",
    read: false,
    createdAt: "2026-03-05",
  },
  {
    id: "n-7",
    userId: "t2",
    title: "Pembayaran Menunggu",
    message:
      "Pembayaran via OVO sedang diproses. Kami akan mengirim konfirmasi secepatnya.",
    type: "payment",
    read: false,
    createdAt: "2026-03-15",
  },
  {
    id: "n-8",
    userId: "t1",
    title: "Sewa Akan Jatuh Tempo",
    message:
      "Pembayaran sewa bulan depan akan jatuh tempo dalam 7 hari. Segera lakukan pembayaran.",
    type: "payment",
    read: false,
    createdAt: "2026-04-08",
  },
  {
    id: "n-9",
    userId: "o1",
    title: "Membership Segera Berakhir",
    message:
      "Paket Membership Emas Anda akan berakhir dalam 14 hari. Perpanjang sekarang untuk tetap menikmati fitur premium.",
    type: "membership",
    read: false,
    createdAt: "2026-04-01",
  },
  {
    id: "n-10",
    userId: "t1",
    title: "Review Baru",
    message: "Terima kasih telah memberikan review untuk Kos Melati Indah!",
    type: "review",
    read: true,
    createdAt: "2026-02-15",
  },
];

export const surveyVisits: SurveyVisit[] = [
  {
    id: "sv-1",
    propertyId: "prop-1",
    tenantId: "t3",
    ownerId: "o1",
    date: "2026-03-10",
    time: "10:00",
    status: "dikonfirmasi",
    notes: "Ingin melihat kamar lantai 2",
    createdAt: "2026-03-05",
  },
  {
    id: "sv-2",
    propertyId: "prop-5",
    tenantId: "t1",
    ownerId: "o1",
    date: "2026-03-15",
    time: "14:00",
    status: "menunggu",
    createdAt: "2026-03-08",
  },
];

export const qaThreads: QAThread[] = [
  {
    id: "qa-1",
    propertyId: "prop-1",
    tenantId: "t2",
    question:
      "Apakah tersedia parkir untuk mobil? Saya membawa kendaraan roda empat.",
    answer:
      "Maaf, saat ini kami hanya menyediakan parkir motor. Namun ada lahan parkir umum di sebelah kos yang bisa digunakan.",
    answeredAt: "2026-02-16",
    answeredBy: "owner",
    createdAt: "2026-02-15",
  },
  {
    id: "qa-2",
    propertyId: "prop-1",
    tenantId: "t3",
    question: "Apakah boleh membawa hewan peliharaan?",
    createdAt: "2026-03-01",
  },
  {
    id: "qa-3",
    propertyId: "prop-5",
    tenantId: "t1",
    question: "Jam berapa batas tamu berkunjung?",
    answer:
      "Tamu diperbolehkan berkunjung hingga pukul 22.00 WIB. Setelah itu, tamu tidak diperkenankan berada di area kos.",
    answeredAt: "2026-02-21",
    answeredBy: "owner",
    createdAt: "2026-02-20",
  },
  {
    id: "qa-4",
    propertyId: "prop-7",
    tenantId: "t2",
    question: "Apakah kolam renang bisa digunakan setiap hari?",
    answer:
      "Ya, kolam renang buka setiap hari dari pukul 06.00 - 20.00 WIB untuk seluruh penghuni.",
    answeredAt: "2026-03-02",
    answeredBy: "admin",
    createdAt: "2026-03-01",
  },
];

export const privateChatRooms: PrivateChatRoom[] = [
  {
    id: "pcr-1",
    propertyId: "prop-1",
    tenantId: "t1",
    ownerId: "o1",
    createdAt: "2026-01-15",
  },
  {
    id: "pcr-2",
    propertyId: "prop-5",
    tenantId: "t2",
    ownerId: "o1",
    createdAt: "2026-02-01",
  },
];

export const privateChatMessages: PrivateChatMessage[] = [
  {
    id: "pcm-1",
    roomId: "pcr-1",
    senderId: "t1",
    message:
      "Selamat siang Pak, saya ingin bertanya soal jadwal pembersihan AC.",
    timestamp: "2026-03-10 10:30",
    isOwner: false,
  },
  {
    id: "pcm-2",
    roomId: "pcr-1",
    senderId: "o1",
    message:
      "Selamat siang Rina. AC dijadwalkan dibersihkan setiap 3 bulan sekali. Jadwal berikutnya bulan April.",
    timestamp: "2026-03-10 10:45",
    isOwner: true,
  },
  {
    id: "pcm-3",
    roomId: "pcr-1",
    senderId: "t1",
    message: "Baik Pak, terima kasih informasinya.",
    timestamp: "2026-03-10 10:50",
    isOwner: false,
  },
  {
    id: "pcm-4",
    roomId: "pcr-2",
    senderId: "t2",
    message: "Pak, mau tanya soal perpanjangan sewa bulan depan.",
    timestamp: "2026-03-12 14:00",
    isOwner: false,
  },
  {
    id: "pcm-5",
    roomId: "pcr-2",
    senderId: "o1",
    message: "Silakan Budi, ada yang bisa saya bantu?",
    timestamp: "2026-03-12 14:15",
    isOwner: true,
  },
];

export const adminChatMessages: ChatMessage[] = [
  {
    id: "cm-1",
    senderId: "t1",
    message:
      "Halo admin, saya ingin bertanya tentang proses perpanjangan sewa.",
    timestamp: "2026-03-10 09:00",
    isAdmin: false,
  },
  {
    id: "cm-2",
    senderId: "a1",
    message:
      "Halo Rina! Untuk perpanjangan sewa, Anda bisa langsung mengajukan melalui dashboard penghuni di menu Booking. Pilih opsi perpanjangan dan ikuti langkah-langkahnya.",
    timestamp: "2026-03-10 09:05",
    isAdmin: true,
  },
  {
    id: "cm-3",
    senderId: "t1",
    message:
      "Baik, terima kasih infonya! Apakah ada biaya tambahan untuk perpanjangan?",
    timestamp: "2026-03-10 09:10",
    isAdmin: false,
  },
  {
    id: "cm-4",
    senderId: "a1",
    message:
      "Tidak ada biaya tambahan. Harga sewa tetap sama sesuai yang tertera di listing. Platform dimonetisasi melalui membership pemilik.",
    timestamp: "2026-03-10 09:12",
    isAdmin: true,
  },
];

export const membershipPlans: MembershipPlan[] = [
  {
    tier: "gratis",
    name: "Gratis",
    price: 0,
    features: [
      "Listing dasar (maks. 3 properti)",
      "Dashboard pengelolaan standar",
      "Dukungan email",
      "Notifikasi dasar",
    ],
    highlighted: false,
    videoTour: false,
    tour360: false,
    featuredPlacement: false,
    prioritySearch: false,
    verifiedBadge: false,
    analyticsExport: false,
  },
  {
    tier: "perak",
    name: "Perak",
    price: 200000,
    features: [
      "Listing prioritas (maks. 10 properti)",
      "Video Room Tour di listing",
      "Badge Perak di listing",
      "Laporan keuangan bulanan",
      "Dukungan prioritas",
      "Promosi listing di pencarian",
      "Notifikasi lengkap",
    ],
    highlighted: false,
    videoTour: true,
    tour360: false,
    featuredPlacement: false,
    prioritySearch: true,
    verifiedBadge: false,
    analyticsExport: false,
  },
  {
    tier: "emas",
    name: "Emas",
    price: 300000,
    features: [
      "Listing tak terbatas",
      "Video + 360° Room Tour",
      "Badge Emas eksklusif & Verified",
      "Listing teratas di pencarian",
      "Tampil di halaman utama",
      "Laporan keuangan real-time",
      "Dukungan 24/7 via WhatsApp",
      "Analitik properti lengkap + Export",
      "Kredit promosi Meta Ads (Rp 100.000)",
    ],
    highlighted: true,
    videoTour: true,
    tour360: true,
    featuredPlacement: true,
    prioritySearch: true,
    verifiedBadge: true,
    analyticsExport: true,
    metaAdsCredit: 100000,
  },
];

export const demoSteps = [
  {
    id: 1,
    title: "Cari Kos",
    description:
      "Filter properti di Rebana Metropolitan berdasarkan lokasi, harga, dan fasilitas.",
  },
  {
    id: 2,
    title: "Lihat Detail & Media",
    description:
      "Buka properti, tonton Video Tour dan 360° Room Tour, lalu jadwalkan survey.",
  },
  {
    id: 3,
    title: "Login & Booking",
    description:
      "Login sebagai Tenant, booking kos, dan tambahkan Trusted Contact untuk notifikasi.",
  },
  {
    id: 4,
    title: "Dasbor Pemilik",
    description:
      "Beralih ke Owner untuk melihat survey masuk, Q&A, dan upgrade membership.",
  },
  {
    id: 5,
    title: "Notifikasi & Chat",
    description:
      "Cek notifikasi dan Room Chat untuk melihat interaksi tenant-owner.",
  },
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getUser(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function getProperty(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export function regionLabel(r: Region): string {
  return regions.find((reg) => reg.id === r)?.name ?? r;
}

export function roomTypeLabel(t: RoomType): string {
  const labels: Record<RoomType, string> = {
    putra: "Putra",
    putri: "Putri",
    campur: "Campur",
  };
  return labels[t];
}

export function rentalPeriodLabel(p: RentalPeriod): string {
  const labels: Record<RentalPeriod, string> = {
    mingguan: "Mingguan",
    bulanan: "Bulanan",
    tahunan: "Tahunan",
  };
  return labels[p];
}

export function membershipLabel(t: MembershipTier): string {
  const labels: Record<MembershipTier, string> = {
    gratis: "Gratis",
    perak: "Perak",
    emas: "Emas",
  };
  return labels[t];
}

export function statusLabel(s: string): string {
  const labels: Record<string, string> = {
    menunggu: "Menunggu",
    aktif: "Aktif",
    selesai: "Selesai",
    dibatalkan: "Dibatalkan",
    belum_bayar: "Belum Bayar",
    lunas: "Lunas",
    gagal: "Gagal",
    dikerjakan: "Dikerjakan",
    dikonfirmasi: "Dikonfirmasi",
  };
  return labels[s] ?? s;
}

export type Region_ = typeof regions;
