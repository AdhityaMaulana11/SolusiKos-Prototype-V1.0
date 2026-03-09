export type Region =
  | "kota-cirebon"
  | "kab-cirebon"
  | "kuningan"
  | "majalengka"
  | "indramayu";
export type RoomType = "putra" | "putri" | "campur";
export type RentalPeriod = "mingguan" | "bulanan" | "tahunan";
export type MembershipTier = "gratis" | "perak" | "emas";
export type UserRole = "penghuni" | "pemilik" | "penyedia" | "admin";
export type ProviderType = "laundry" | "kebersihan" | "tukang";
export type BookingStatus = "menunggu" | "aktif" | "selesai" | "dibatalkan";
export type PaymentStatus = "belum_bayar" | "menunggu" | "lunas" | "gagal";
export type JobStatus = "menunggu" | "dikerjakan" | "selesai";
export type SurveyStatus =
  | "menunggu"
  | "dikonfirmasi"
  | "selesai"
  | "dibatalkan";

export interface RegionData {
  id: Region;
  name: string;
  description: string;
  gradient: string;
  propertyCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  providerType?: ProviderType;
  avatar: string;
  membershipTier?: MembershipTier;
  createdAt: string;
}

export interface TrustedContact {
  id: string;
  tenantId: string;
  name: string;
  relationship: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface TrustedContactNotification {
  id: string;
  trustedContactId: string;
  type:
    | "booking_confirmed"
    | "payment_confirmed"
    | "payment_due"
    | "survey_reminder";
  message: string;
  sentAt: string;
  method: "email" | "sms";
}

export interface PropertyMedia {
  photos: {
    id: string;
    url: string;
    caption?: string;
    isPrimary?: boolean;
  }[];
  videoTour?: {
    url: string;
    thumbnail?: string;
    duration?: string;
  };
  tour360?: {
    url: string;
    thumbnail?: string;
  };
}

export interface Property {
  id: string;
  name: string;
  region: Region;
  address: string;
  description: string;
  // Legacy single images array (for backward compatibility)
  images: string[];
  // New structured media object for real assets
  media?: PropertyMedia;
  amenities: string[];
  pricePerMonth: number;
  pricePerWeek?: number;
  pricePerYear?: number;
  roomType: RoomType;
  totalRooms: number;
  availableRooms: number;
  ownerId: string;
  membershipTier: MembershipTier;
  rating: number;
  reviewCount: number;
  featured: boolean;
  rentalPeriods: RentalPeriod[];
  hasVideoTour?: boolean;
  has360Tour?: boolean;
  // Additional location details
  coordinates?: {
    lat: number;
    lng: number;
  };
  nearbyPlaces?: {
    name: string;
    distance: string;
    type: "campus" | "mall" | "hospital" | "station" | "market" | "other";
  }[];
}

export interface Review {
  id: string;
  propertyId: string;
  tenantId: string;
  bookingId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  tenantId: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  monthlyRent: number;
  totalPaid: number;
  rentalPeriod: RentalPeriod;
  duration: number;
  createdAt: string;
  trustedContactId?: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  tenantId: string;
  ownerId: string;
  amount: number;
  netAmount: number;
  status: PaymentStatus;
  method: string;
  dueDate: string;
  paidAt?: string;
  createdAt: string;
}

export interface ServiceRequest {
  id: string;
  tenantId: string;
  providerId: string;
  propertyId: string;
  serviceType: ProviderType;
  description: string;
  status: JobStatus;
  price: number;
  createdAt: string;
  completedAt?: string;
}

export interface ProviderService {
  id: string;
  providerId: string;
  name: string;
  description: string;
  price: number;
  serviceType: ProviderType;
  active: boolean;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type:
    | "booking"
    | "payment"
    | "service"
    | "membership"
    | "system"
    | "survey"
    | "qna"
    | "review"
    | "trusted_contact";
  read: boolean;
  createdAt: string;
}

export interface MembershipPlan {
  tier: MembershipTier;
  name: string;
  price: number;
  features: string[];
  highlighted: boolean;
  videoTour: boolean;
  tour360: boolean;
  featuredPlacement: boolean;
  prioritySearch: boolean;
  verifiedBadge: boolean;
  analyticsExport: boolean;
  metaAdsCredit?: number;
}

export interface SurveyVisit {
  id: string;
  propertyId: string;
  tenantId: string;
  ownerId: string;
  date: string;
  time: string;
  status: SurveyStatus;
  notes?: string;
  createdAt: string;
}

export interface RoomChatMessage {
  id: string;
  threadId: string;
  senderId: string;
  message: string;
  isOwner: boolean;
  isAdmin: boolean;
  timestamp: string;
}

export interface PrivateChatRoom {
  id: string;
  propertyId: string;
  tenantId: string;
  ownerId: string;
  createdAt: string;
}

export interface PrivateChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  message: string;
  timestamp: string;
  isOwner: boolean;
}

export interface QAThread {
  id: string;
  propertyId: string;
  tenantId: string;
  question: string;
  answer?: string;
  answeredAt?: string;
  answeredBy?: "owner" | "admin";
  createdAt: string;
  messages?: RoomChatMessage[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  message: string;
  timestamp: string;
  isAdmin: boolean;
}

export interface DemoStep {
  id: number;
  title: string;
  description: string;
  target?: string;
}
