export type Role = "customer" | "professional" | "admin";

export type CategorySlug =
  | "it"
  | "accounting"
  | "engineering"
  | "architecture"
  | "healthcare"
  | "tutoring"
  | "design"
  | "home-services"
  | "consulting"
  | "wellness";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  icon: string;
  professionalCount: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  popular?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  year: number;
}

export interface Review {
  id: string;
  professionalId: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  date: string;
  serviceName: string;
  comment: string;
  helpful: number;
}

export interface Professional {
  id: string;
  name: string;
  avatar: string;
  profession: string;
  category: CategorySlug;
  verified: boolean;
  topRated: boolean;
  rating: number;
  reviewCount: number;
  location: string;
  timezone: string;
  yearsExperience: number;
  startingPrice: number;
  responseTime: string;
  completedJobs: number;
  availability: string[];
  bio: string;
  languages: string[];
  services: Service[];
  portfolio: PortfolioItem[];
  credentials: Credential[];
  reviewIds: string[];
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in-progress"
  | "completed"
  | "cancelled";

export interface Booking {
  id: string;
  professionalId: string;
  customerName: string;
  customerAvatar: string;
  serviceName: string;
  date: string;
  time: string;
  durationMinutes: number;
  status: BookingStatus;
  price: number;
  location: string;
  notes: string;
  createdAt: string;
}

export interface Message {
  id: string;
  sender: "me" | "them";
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  professionalId: string;
  participantName: string;
  participantAvatar: string;
  participantRole: string;
  lastMessage: string;
  lastMessageAt: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

export type NotificationKind =
  | "booking"
  | "message"
  | "payment"
  | "review"
  | "system";

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
}

export type TransactionStatus = "paid" | "pending" | "refunded" | "failed";

export interface Transaction {
  id: string;
  bookingId: string;
  professionalId: string;
  professionalName: string;
  amount: number;
  fee: number;
  net: number;
  method: string;
  status: TransactionStatus;
  date: string;
}

export type DisputeStatus = "open" | "under-review" | "resolved";

export interface Dispute {
  id: string;
  bookingId: string;
  raisedBy: string;
  against: string;
  reason: string;
  amount: number;
  status: DisputeStatus;
  openedAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  status: "active" | "suspended" | "pending";
  joinedAt: string;
  bookings: number;
}

export interface VerificationRequest {
  id: string;
  professionalId: string;
  name: string;
  profession: string;
  avatar: string;
  submittedAt: string;
  documents: string[];
  status: "pending" | "approved" | "rejected";
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant: "default" | "success" | "error";
}
