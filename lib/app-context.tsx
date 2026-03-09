"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type {
  User,
  Property,
  Booking,
  Payment,
  ServiceRequest,
  AppNotification,
  BookingStatus,
  PaymentStatus,
  JobStatus,
  UserRole,
  SurveyVisit,
  SurveyStatus,
  QAThread,
  ChatMessage,
  Review,
  TrustedContact,
  TrustedContactNotification,
  PrivateChatRoom,
  PrivateChatMessage,
} from "./types";

// Admin fee percentage for transactions
export const ADMIN_FEE_PERCENTAGE = 5;
import {
  users as initialUsers,
  properties as initialProperties,
  bookings as initialBookings,
  payments as initialPayments,
  serviceRequests as initialServiceRequests,
  notifications as initialNotifications,
  surveyVisits as initialSurveyVisits,
  qaThreads as initialQAThreads,
  adminChatMessages as initialChatMessages,
  reviews as initialReviews,
  trustedContacts as initialTrustedContacts,
  trustedContactNotifications as initialTrustedContactNotifications,
  privateChatRooms as initialPrivateChatRooms,
  privateChatMessages as initialPrivateChatMessages,
} from "./mock-data";

interface AppState {
  isLoggedIn: boolean;
  currentUser: User | null;
  users: User[];
  properties: Property[];
  bookings: Booking[];
  payments: Payment[];
  serviceRequests: ServiceRequest[];
  notifications: AppNotification[];
  surveyVisits: SurveyVisit[];
  qaThreads: QAThread[];
  chatMessages: ChatMessage[];
  reviews: Review[];
  trustedContacts: TrustedContact[];
  trustedContactNotifications: TrustedContactNotification[];
  privateChatRooms: PrivateChatRoom[];
  privateChatMessages: PrivateChatMessage[];
  showDemoGuide: boolean;
  demoGuideStep: number;
}

type AppAction =
  | { type: "LOGIN"; userId: string }
  | { type: "LOGOUT" }
  | { type: "SWITCH_USER"; userId: string }
  | { type: "CREATE_BOOKING"; booking: Booking }
  | { type: "UPDATE_BOOKING_STATUS"; bookingId: string; status: BookingStatus }
  | { type: "CREATE_PAYMENT"; payment: Payment }
  | {
      type: "UPDATE_PAYMENT_STATUS";
      paymentId: string;
      status: PaymentStatus;
      paidAt?: string;
      method?: string;
    }
  | { type: "CREATE_SERVICE_REQUEST"; request: ServiceRequest }
  | {
      type: "UPDATE_JOB_STATUS";
      requestId: string;
      status: JobStatus;
      completedAt?: string;
    }
  | { type: "ADD_NOTIFICATION"; notification: AppNotification }
  | { type: "MARK_NOTIFICATION_READ"; notificationId: string }
  | { type: "MARK_ALL_NOTIFICATIONS_READ"; userId: string }
  | { type: "UPDATE_PROPERTY"; property: Property }
  | { type: "UPGRADE_MEMBERSHIP"; userId: string; tier: User["membershipTier"] }
  | { type: "CREATE_SURVEY_VISIT"; survey: SurveyVisit }
  | { type: "UPDATE_SURVEY_STATUS"; surveyId: string; status: SurveyStatus }
  | { type: "ADD_QA_THREAD"; thread: QAThread }
  | {
      type: "ANSWER_QA_THREAD";
      threadId: string;
      answer: string;
      answeredBy?: "owner" | "admin";
    }
  | { type: "ADD_CHAT_MESSAGE"; message: ChatMessage }
  | { type: "ADD_REVIEW"; review: Review }
  | { type: "ADD_TRUSTED_CONTACT"; contact: TrustedContact }
  | { type: "UPDATE_TRUSTED_CONTACT"; contact: TrustedContact }
  | { type: "DELETE_TRUSTED_CONTACT"; contactId: string }
  | {
      type: "ADD_TRUSTED_CONTACT_NOTIFICATION";
      notification: TrustedContactNotification;
    }
  | { type: "CREATE_PRIVATE_CHAT_ROOM"; room: PrivateChatRoom }
  | { type: "ADD_PRIVATE_CHAT_MESSAGE"; message: PrivateChatMessage }
  | { type: "TOGGLE_DEMO_GUIDE" }
  | { type: "SET_DEMO_STEP"; step: number }
  | { type: "NEXT_DEMO_STEP" }
  | { type: "CLOSE_DEMO_GUIDE" };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "LOGIN": {
      const user = state.users.find((u) => u.id === action.userId);
      if (!user) return state;
      return { ...state, isLoggedIn: true, currentUser: user };
    }
    case "LOGOUT":
      return { ...state, isLoggedIn: false, currentUser: null };
    case "SWITCH_USER": {
      const user = state.users.find((u) => u.id === action.userId);
      if (!user) return state;
      return { ...state, isLoggedIn: true, currentUser: user };
    }
    case "CREATE_BOOKING":
      return { ...state, bookings: [...state.bookings, action.booking] };
    case "UPDATE_BOOKING_STATUS":
      return {
        ...state,
        bookings: state.bookings.map((b) =>
          b.id === action.bookingId ? { ...b, status: action.status } : b,
        ),
      };
    case "CREATE_PAYMENT":
      return { ...state, payments: [...state.payments, action.payment] };
    case "UPDATE_PAYMENT_STATUS":
      return {
        ...state,
        payments: state.payments.map((p) =>
          p.id === action.paymentId
            ? {
                ...p,
                status: action.status,
                paidAt: action.paidAt,
                method: action.method ?? p.method,
              }
            : p,
        ),
      };
    case "CREATE_SERVICE_REQUEST":
      return {
        ...state,
        serviceRequests: [...state.serviceRequests, action.request],
      };
    case "UPDATE_JOB_STATUS":
      return {
        ...state,
        serviceRequests: state.serviceRequests.map((sr) =>
          sr.id === action.requestId
            ? { ...sr, status: action.status, completedAt: action.completedAt }
            : sr,
        ),
      };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.notification, ...state.notifications],
      };
    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.notificationId ? { ...n, read: true } : n,
        ),
      };
    case "MARK_ALL_NOTIFICATIONS_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.userId === action.userId ? { ...n, read: true } : n,
        ),
      };
    case "UPDATE_PROPERTY":
      return {
        ...state,
        properties: state.properties.map((p) =>
          p.id === action.property.id ? action.property : p,
        ),
      };
    case "UPGRADE_MEMBERSHIP":
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.userId ? { ...u, membershipTier: action.tier } : u,
        ),
        currentUser:
          state.currentUser?.id === action.userId
            ? { ...state.currentUser, membershipTier: action.tier }
            : state.currentUser,
      };
    case "CREATE_SURVEY_VISIT":
      return { ...state, surveyVisits: [...state.surveyVisits, action.survey] };
    case "UPDATE_SURVEY_STATUS":
      return {
        ...state,
        surveyVisits: state.surveyVisits.map((sv) =>
          sv.id === action.surveyId ? { ...sv, status: action.status } : sv,
        ),
      };
    case "ADD_QA_THREAD":
      return { ...state, qaThreads: [...state.qaThreads, action.thread] };
    case "ANSWER_QA_THREAD":
      return {
        ...state,
        qaThreads: state.qaThreads.map((t) =>
          t.id === action.threadId
            ? {
                ...t,
                answer: action.answer,
                answeredAt: new Date().toISOString().split("T")[0],
                answeredBy: action.answeredBy ?? "owner",
              }
            : t,
        ),
      };
    case "ADD_CHAT_MESSAGE":
      return {
        ...state,
        chatMessages: [...state.chatMessages, action.message],
      };
    case "ADD_REVIEW":
      return { ...state, reviews: [...state.reviews, action.review] };
    case "ADD_TRUSTED_CONTACT":
      return {
        ...state,
        trustedContacts: [...state.trustedContacts, action.contact],
      };
    case "UPDATE_TRUSTED_CONTACT":
      return {
        ...state,
        trustedContacts: state.trustedContacts.map((tc) =>
          tc.id === action.contact.id ? action.contact : tc,
        ),
      };
    case "DELETE_TRUSTED_CONTACT":
      return {
        ...state,
        trustedContacts: state.trustedContacts.filter(
          (tc) => tc.id !== action.contactId,
        ),
      };
    case "ADD_TRUSTED_CONTACT_NOTIFICATION":
      return {
        ...state,
        trustedContactNotifications: [
          ...state.trustedContactNotifications,
          action.notification,
        ],
      };
    case "CREATE_PRIVATE_CHAT_ROOM":
      return {
        ...state,
        privateChatRooms: [...state.privateChatRooms, action.room],
      };
    case "ADD_PRIVATE_CHAT_MESSAGE":
      return {
        ...state,
        privateChatMessages: [...state.privateChatMessages, action.message],
      };
    case "TOGGLE_DEMO_GUIDE":
      return { ...state, showDemoGuide: !state.showDemoGuide };
    case "SET_DEMO_STEP":
      return { ...state, demoGuideStep: action.step };
    case "NEXT_DEMO_STEP":
      return { ...state, demoGuideStep: Math.min(state.demoGuideStep + 1, 5) };
    case "CLOSE_DEMO_GUIDE":
      return { ...state, showDemoGuide: false, demoGuideStep: 1 };
    default:
      return state;
  }
}

const initialState: AppState = {
  isLoggedIn: false,
  currentUser: null,
  users: initialUsers,
  properties: initialProperties,
  bookings: initialBookings,
  payments: initialPayments,
  serviceRequests: initialServiceRequests,
  notifications: initialNotifications,
  surveyVisits: initialSurveyVisits,
  qaThreads: initialQAThreads,
  chatMessages: initialChatMessages,
  reviews: initialReviews,
  trustedContacts: initialTrustedContacts,
  trustedContactNotifications: initialTrustedContactNotifications,
  privateChatRooms: initialPrivateChatRooms,
  privateChatMessages: initialPrivateChatMessages,
  showDemoGuide: false,
  demoGuideStep: 1,
};

const STORAGE_KEY = "solusikos_auth";

function getStoredAuth(): { userId: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore parse errors
  }
  return null;
}

function setStoredAuth(userId: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (userId) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ userId }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Ignore storage errors
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false);

  // Restore auth state from localStorage on mount
  useEffect(() => {
    const storedAuth = getStoredAuth();
    if (storedAuth?.userId) {
      dispatch({ type: "LOGIN", userId: storedAuth.userId });
    }
    setIsHydrated(true);
  }, []);

  // Persist auth state changes to localStorage
  useEffect(() => {
    if (!isHydrated) return;

    if (state.isLoggedIn && state.currentUser) {
      setStoredAuth(state.currentUser.id);
    } else {
      setStoredAuth(null);
    }
  }, [state.isLoggedIn, state.currentUser, isHydrated]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}

export function useCurrentUser() {
  const { state } = useApp();
  return state.currentUser;
}

export function useIsLoggedIn() {
  const { state } = useApp();
  return state.isLoggedIn;
}

export function useNotifications(userId?: string) {
  const { state } = useApp();
  const uid = userId ?? state.currentUser?.id;
  if (!uid) return [];
  return state.notifications.filter((n) => n.userId === uid);
}

export function useUnreadCount(userId?: string) {
  const notifs = useNotifications(userId);
  return notifs.filter((n) => !n.read).length;
}

export function useUserBookings(tenantId?: string) {
  const { state } = useApp();
  const tid = tenantId ?? state.currentUser?.id;
  if (!tid) return [];
  return state.bookings.filter((b) => b.tenantId === tid);
}

export function useOwnerProperties(ownerId?: string) {
  const { state } = useApp();
  const oid = ownerId ?? state.currentUser?.id;
  if (!oid) return [];
  return state.properties.filter((p) => p.ownerId === oid);
}

export function useOwnerPayments(ownerId?: string) {
  const { state } = useApp();
  const oid = ownerId ?? state.currentUser?.id;
  if (!oid) return [];
  return state.payments.filter((p) => p.ownerId === oid);
}

export function useProviderJobs(providerId?: string) {
  const { state } = useApp();
  const pid = providerId ?? state.currentUser?.id;
  if (!pid) return [];
  return state.serviceRequests.filter((sr) => sr.providerId === pid);
}

export function usePropertyQA(propertyId: string) {
  const { state } = useApp();
  return state.qaThreads.filter((t) => t.propertyId === propertyId);
}

export function usePropertyReviews(propertyId: string) {
  const { state } = useApp();
  return state.reviews.filter((r) => r.propertyId === propertyId);
}

export function usePropertySurveys(propertyId: string) {
  const { state } = useApp();
  return state.surveyVisits.filter((sv) => sv.propertyId === propertyId);
}

export function useOwnerSurveys(ownerId?: string) {
  const { state } = useApp();
  const oid = ownerId ?? state.currentUser?.id;
  if (!oid) return [];
  return state.surveyVisits.filter((sv) => sv.ownerId === oid);
}

export function useTenantSurveys(tenantId?: string) {
  const { state } = useApp();
  const tid = tenantId ?? state.currentUser?.id;
  if (!tid) return [];
  return state.surveyVisits.filter((sv) => sv.tenantId === tid);
}

export function useTrustedContact(tenantId?: string) {
  const { state } = useApp();
  const tid = tenantId ?? state.currentUser?.id;
  if (!tid) return null;
  return state.trustedContacts.find((tc) => tc.tenantId === tid) ?? null;
}

export function useTrustedContactNotifications(contactId: string) {
  const { state } = useApp();
  if (!contactId) return [];
  return state.trustedContactNotifications.filter(
    (tcn) => tcn.trustedContactId === contactId,
  );
}

export function useCanReview(propertyId: string, tenantId?: string) {
  const { state } = useApp();
  const tid = tenantId ?? state.currentUser?.id;
  if (!tid) return false;

  // Check if tenant has a completed booking for this property
  const completedBooking = state.bookings.find(
    (b) =>
      b.propertyId === propertyId &&
      b.tenantId === tid &&
      b.status === "selesai",
  );
  if (!completedBooking) return false;

  // Check if tenant has already reviewed this booking
  const existingReview = state.reviews.find(
    (r) => r.propertyId === propertyId && r.tenantId === tid,
  );
  return !existingReview;
}

export function usePrivateChatRoom(propertyId: string, tenantId?: string) {
  const { state } = useApp();
  const tid = tenantId ?? state.currentUser?.id;
  if (!tid) return null;
  return (
    state.privateChatRooms.find(
      (r) => r.propertyId === propertyId && r.tenantId === tid,
    ) ?? null
  );
}

export function usePrivateChatMessages(roomId: string) {
  const { state } = useApp();
  return state.privateChatMessages.filter((m) => m.roomId === roomId);
}

export function getRolePath(role: UserRole): string {
  const paths: Record<UserRole, string> = {
    penghuni: "/dasbor/penghuni",
    pemilik: "/dasbor/pemilik",
    penyedia: "/dasbor/penyedia",
    admin: "/admin",
  };
  return paths[role];
}
