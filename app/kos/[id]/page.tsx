"use client";

import { use, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ListingCard } from "@/components/shared/listing-card";
import { PhotoLightbox } from "@/components/shared/photo-lightbox";
import {
  InlinePanorama,
  PanoramaViewer,
} from "@/components/shared/panorama-viewer";
import {
  useApp,
  usePropertyReviews,
  useIsLoggedIn,
  useCanReview,
  usePrivateChatRoom,
} from "@/lib/app-context";
import {
  formatRupiah,
  getUser,
  roomTypeLabel,
  membershipLabel,
  rentalPeriodLabel,
} from "@/lib/mock-data";
import {
  MapPin,
  Star,
  Users,
  ArrowLeft,
  Check,
  Wifi,
  Wind,
  Bath,
  Car,
  Tv,
  UtensilsCrossed,
  Shield,
  Shirt,
  Phone,
  Mail,
  CalendarSearch,
  Send,
  MessageSquare,
  Clock,
  Calendar,
  Maximize2,
  Video,
  View,
  Lock,
  LogIn,
  BadgeCheck,
  Image as ImageIcon,
  Crown,
  X,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const amenityIconMap: Record<string, React.ElementType> = {
  WiFi: Wifi,
  AC: Wind,
  "Kamar Mandi Dalam": Bath,
  "Kamar Mandi Luar": Bath,
  "Parkir Motor": Car,
  "Parkir Mobil": Car,
  "TV Kabel": Tv,
  TV: Tv,
  Dapur: UtensilsCrossed,
  "Dapur Bersama": UtensilsCrossed,
  "Dapur Lengkap": UtensilsCrossed,
  CCTV: Shield,
  "Penjaga 24 Jam": Shield,
  Laundry: Shirt,
  "Kipas Angin": Wind,
  Taman: MapPin,
  "Ruang Tamu": Users,
  Rooftop: MapPin,
  "Kolam Renang": Users,
  Gym: Users,
  "Antar-Jemput Bandara": Car,
};

export default function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { state, dispatch } = useApp();
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();
  const canReview = useCanReview(id);
  const [loading, setLoading] = useState(true);
  const [surveyDate, setSurveyDate] = useState("");
  const [surveyTime, setSurveyTime] = useState("10:00");
  const [surveyNotes, setSurveyNotes] = useState("");
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [activeMediaTab, setActiveMediaTab] = useState<
    "photos" | "video" | "360"
  >("photos");
  const [show360Viewer, setShow360Viewer] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [panoramaFullscreen, setPanoramaFullscreen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const property = state.properties.find((p) => p.id === id);
  const owner = property ? getUser(property.ownerId) : undefined;
  const reviews = usePropertyReviews(id);
  const existingChatRoom = usePrivateChatRoom(id);

  // Get chat messages - use state directly to handle newly created rooms
  const currentRoomId =
    existingChatRoom?.id ??
    state.privateChatRooms.find(
      (r) => r.propertyId === id && r.tenantId === state.currentUser?.id,
    )?.id;
  const chatMessages = state.privateChatMessages.filter(
    (m) => m.roomId === currentRoomId,
  );
  const similarListings = state.properties
    .filter((p) => p.id !== id && p.region === property?.region)
    .slice(0, 3);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (chatOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatOpen, chatMessages]);

  if (!property) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 flex-col items-center justify-center py-20">
          <h2 className="text-xl font-bold text-foreground">
            Kos tidak ditemukan
          </h2>
          <p className="mt-2 text-muted-foreground">
            Properti yang Anda cari tidak tersedia.
          </p>
          <Link
            href="/cari"
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Kembali ke Pencarian
          </Link>
        </div>
      </div>
    );
  }

  const gradients: Record<string, string> = {
    "prop-1": "from-amber-400 to-orange-500",
    "prop-2": "from-pink-400 to-rose-500",
    "prop-3": "from-emerald-400 to-teal-500",
    "prop-4": "from-violet-400 to-purple-500",
    "prop-5": "from-sky-400 to-blue-500",
    "prop-6": "from-rose-400 to-pink-500",
    "prop-7": "from-orange-400 to-red-500",
    "prop-8": "from-teal-400 to-cyan-500",
    "prop-9": "from-indigo-400 to-blue-500",
    "prop-10": "from-yellow-400 to-amber-500",
    "prop-11": "from-cyan-400 to-blue-500",
  };

  function handleSubmitSurvey() {
    if (!isLoggedIn || !state.currentUser) {
      toast.error("Login untuk menjadwalkan survey");
      return;
    }
    if (!surveyDate) {
      toast.error("Pilih tanggal survey");
      return;
    }
    dispatch({
      type: "CREATE_SURVEY_VISIT",
      survey: {
        id: `sv-${Date.now()}`,
        propertyId: property.id,
        tenantId: state.currentUser.id,
        ownerId: property.ownerId,
        date: surveyDate,
        time: surveyTime,
        status: "menunggu",
        notes: surveyNotes || undefined,
        createdAt: new Date().toISOString().split("T")[0],
      },
    });
    dispatch({
      type: "ADD_NOTIFICATION",
      notification: {
        id: `n-${Date.now()}`,
        userId: property.ownerId,
        title: "Permintaan Survey Baru",
        message: `${state.currentUser.name} ingin survey ${property.name} pada ${surveyDate} pukul ${surveyTime}.`,
        type: "survey",
        read: false,
        createdAt: new Date().toISOString().split("T")[0],
      },
    });
    dispatch({
      type: "ADD_NOTIFICATION",
      notification: {
        id: `n-${Date.now() + 1}`,
        userId: state.currentUser.id,
        title: "Survey Dijadwalkan",
        message: `Permintaan survey untuk ${property.name} telah dikirim. Menunggu konfirmasi pemilik.`,
        type: "survey",
        read: false,
        createdAt: new Date().toISOString().split("T")[0],
      },
    });
    setSurveySubmitted(true);
    toast.success("Permintaan survey berhasil dikirim!");
  }

  function handleSubmitReview() {
    if (!isLoggedIn || !state.currentUser) {
      toast.error("Login untuk memberikan review");
      return;
    }
    if (!reviewComment.trim()) {
      toast.error("Masukkan komentar review");
      return;
    }
    dispatch({
      type: "ADD_REVIEW",
      review: {
        id: `rev-${Date.now()}`,
        propertyId: property.id,
        tenantId: state.currentUser.id,
        bookingId:
          state.bookings.find(
            (b) =>
              b.propertyId === property.id &&
              b.tenantId === state.currentUser!.id &&
              b.status === "selesai",
          )?.id ?? "",
        rating: reviewRating,
        comment: reviewComment.trim(),
        createdAt: new Date().toISOString().split("T")[0],
      },
    });
    dispatch({
      type: "ADD_NOTIFICATION",
      notification: {
        id: `n-${Date.now()}`,
        userId: property.ownerId,
        title: "Review Baru",
        message: `${state.currentUser.name} memberikan rating ${reviewRating}/5 untuk ${property.name}.`,
        type: "review",
        read: false,
        createdAt: new Date().toISOString().split("T")[0],
      },
    });
    setShowReviewForm(false);
    setReviewComment("");
    setReviewRating(5);
    toast.success("Review berhasil dikirim!");
  }

  // Get or create room ID for chat
  const getChatRoomId = () => {
    if (existingChatRoom) return existingChatRoom.id;
    const room = state.privateChatRooms.find(
      (r) =>
        r.propertyId === property.id && r.tenantId === state.currentUser?.id,
    );
    return room?.id;
  };

  function handleStartChat() {
    if (!isLoggedIn || !state.currentUser) {
      toast.error("Login untuk chat dengan pemilik");
      return;
    }
    // Create room if it doesn't exist
    if (!getChatRoomId()) {
      const newRoomId = `pcr-${Date.now()}`;
      dispatch({
        type: "CREATE_PRIVATE_CHAT_ROOM",
        room: {
          id: newRoomId,
          propertyId: property.id,
          tenantId: state.currentUser.id,
          ownerId: property.ownerId,
          createdAt: new Date().toISOString().split("T")[0],
        },
      });
    }
    setChatOpen(true);
  }

  function handleSendMessage() {
    if (!chatMessage.trim()) return;
    if (!isLoggedIn || !state.currentUser) return;

    const roomId = getChatRoomId();
    if (!roomId) return;

    dispatch({
      type: "ADD_PRIVATE_CHAT_MESSAGE",
      message: {
        id: `pcm-${Date.now()}`,
        roomId,
        senderId: state.currentUser.id,
        message: chatMessage.trim(),
        timestamp: new Date().toLocaleString("id-ID"),
        isOwner: state.currentUser.role === "pemilik",
      },
    });
    setChatMessage("");

    // Simulate owner response after delay
    setTimeout(() => {
      dispatch({
        type: "ADD_PRIVATE_CHAT_MESSAGE",
        message: {
          id: `pcm-${Date.now() + 1}`,
          roomId,
          senderId: property.ownerId,
          message:
            "Terima kasih atas pertanyaan Anda. Saya akan segera merespons.",
          timestamp: new Date().toLocaleString("id-ID"),
          isOwner: true,
        },
      });
    }, 2000);
  }

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : property.rating.toString();

  // Media availability based on membership tier
  const tierFeatures = {
    gratis: { photos: true, video: false, tour360: false },
    perak: { photos: true, video: true, tour360: false },
    emas: { photos: true, video: true, tour360: true },
  };
  const currentTierFeatures = tierFeatures[property.membershipTier];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="mx-auto w-full max-w-7xl px-4 py-6">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali
        </button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Media Gallery - Redesigned */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
              {/* Tier Badge */}
              {property.membershipTier !== "gratis" && (
                <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-background to-accent/30 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Crown
                      className={cn(
                        "h-4 w-4",
                        property.membershipTier === "emas"
                          ? "text-amber-500"
                          : "text-slate-400",
                      )}
                    />
                    <span className="text-xs font-medium text-muted-foreground">
                      {property.membershipTier === "emas"
                        ? "Premium Gold Listing"
                        : "Silver Listing"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <ImageIcon className="h-3 w-3" /> Foto
                    </span>
                    {currentTierFeatures.video && (
                      <span className="flex items-center gap-1 text-primary">
                        <Video className="h-3 w-3" /> Video
                      </span>
                    )}
                    {currentTierFeatures.tour360 && (
                      <span className="flex items-center gap-1 text-primary">
                        <View className="h-3 w-3" /> 360
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Media Navigation Tabs */}
              <div className="flex border-b border-border bg-muted/30">
                <button
                  onClick={() => setActiveMediaTab("photos")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-all relative",
                    activeMediaTab === "photos"
                      ? "text-primary bg-background"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50",
                  )}
                >
                  <ImageIcon className="h-4 w-4" />
                  <span>Foto</span>
                  {activeMediaTab === "photos" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
                <button
                  onClick={() =>
                    currentTierFeatures.video &&
                    property.hasVideoTour &&
                    setActiveMediaTab("video")
                  }
                  disabled={
                    !currentTierFeatures.video || !property.hasVideoTour
                  }
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-all relative",
                    activeMediaTab === "video"
                      ? "text-primary bg-background"
                      : currentTierFeatures.video && property.hasVideoTour
                        ? "text-muted-foreground hover:text-foreground hover:bg-background/50"
                        : "text-muted-foreground/40 cursor-not-allowed",
                  )}
                >
                  <Video className="h-4 w-4" />
                  <span>Video Tour</span>
                  {!currentTierFeatures.video && (
                    <Lock className="h-3 w-3 ml-1" />
                  )}
                  {activeMediaTab === "video" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
                <button
                  onClick={() =>
                    currentTierFeatures.tour360 &&
                    property.has360Tour &&
                    setActiveMediaTab("360")
                  }
                  disabled={
                    !currentTierFeatures.tour360 || !property.has360Tour
                  }
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-all relative",
                    activeMediaTab === "360"
                      ? "text-primary bg-background"
                      : currentTierFeatures.tour360 && property.has360Tour
                        ? "text-muted-foreground hover:text-foreground hover:bg-background/50"
                        : "text-muted-foreground/40 cursor-not-allowed",
                  )}
                >
                  <View className="h-4 w-4" />
                  <span>360° Tour</span>
                  {!currentTierFeatures.tour360 && (
                    <Lock className="h-3 w-3 ml-1" />
                  )}
                  {activeMediaTab === "360" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
              </div>

              {/* Photos View */}
              {activeMediaTab === "photos" &&
                (loading ? (
                  <div className="h-72 animate-pulse bg-muted sm:h-[420px]" />
                ) : (
                  <div className="grid gap-1 sm:grid-cols-4 sm:grid-rows-2 h-[420px]">
                    {/* Main Photo */}
                    <button
                      onClick={() => {
                        setLightboxIndex(0);
                        setLightboxOpen(true);
                      }}
                      className="h-full rounded-none sm:col-span-2 sm:row-span-2 cursor-pointer hover:opacity-95 transition-opacity relative group overflow-hidden"
                    >
                      <Image
                        src={
                          property.media?.photos[0]?.url ||
                          property.images?.[0] ||
                          "/images/prop1.jpeg"
                        }
                        alt={
                          property.media?.photos[0]?.caption || property.name
                        }
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                          <Maximize2 className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <span className="absolute bottom-3 left-3 text-white/80 text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        {property.media?.photos[0]?.caption || "Tampak Depan"}
                      </span>
                    </button>
                    {/* Thumbnails */}
                    {[1, 2, 3].map((idx) => {
                      const photo = property.media?.photos[idx];
                      const photoUrl =
                        photo?.url ||
                        property.images?.[0] ||
                        "/images/prop1.jpeg";
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setLightboxIndex(idx);
                            setLightboxOpen(true);
                          }}
                          className="hidden sm:block rounded-none cursor-pointer hover:opacity-95 transition-opacity relative group overflow-hidden"
                        >
                          <Image
                            src={photoUrl}
                            alt={photo?.caption || `Foto ${idx + 1}`}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                            sizes="25vw"
                            style={{ opacity: 1 - idx * 0.1 }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                            <Maximize2 className="h-5 w-5 text-white" />
                          </div>
                        </button>
                      );
                    })}
                    {/* Show More */}
                    <button
                      onClick={() => {
                        setLightboxIndex(0);
                        setLightboxOpen(true);
                      }}
                      className="hidden sm:flex rounded-none items-center justify-center cursor-pointer hover:opacity-90 transition-opacity relative overflow-hidden"
                    >
                      <Image
                        src={property.images?.[0] || "/images/prop1.jpeg"}
                        alt="Lihat semua foto"
                        fill
                        className="object-cover opacity-60"
                        sizes="25vw"
                      />
                      <span className="relative z-10 text-white/90 text-sm font-medium bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                        Lihat Semua ({property.media?.photos.length || 5} Foto)
                      </span>
                    </button>
                  </div>
                ))}

              {/* Video Tour View */}
              {activeMediaTab === "video" &&
                currentTierFeatures.video &&
                property.hasVideoTour && (
                  <div className="relative h-[420px] bg-slate-900">
                    <video
                      className="absolute inset-0 w-full h-full object-contain bg-black"
                      controls
                      playsInline
                      poster={
                        property.media?.videoTour?.thumbnail ||
                        property.images?.[0] ||
                        "/images/kos1/prop1.jpeg"
                      }
                      src={
                        property.media?.videoTour?.url ||
                        "/videos/prop1-tour.mp4"
                      }
                    >
                      <source
                        src={
                          property.media?.videoTour?.url ||
                          "/videos/prop1-tour.mp4"
                        }
                        type="video/mp4"
                      />
                      Browser Anda tidak mendukung pemutaran video.
                    </video>
                    {/* Video info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pointer-events-none">
                      <div className="flex items-center justify-between text-white/80 text-sm">
                        <span>Video Tour - {property.name}</span>
                        {property.media?.videoTour?.duration && (
                          <span className="text-white/60">
                            Durasi: {property.media.videoTour.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

              {/* 360 Tour View */}
              {activeMediaTab === "360" &&
                currentTierFeatures.tour360 &&
                property.has360Tour && (
                  <InlinePanorama
                    imageUrl={
                      property.media?.tour360?.thumbnail ||
                      "/360/kos1/prop1-360.jpeg"
                    }
                    height="420px"
                    onExpand={() => setPanoramaFullscreen(true)}
                  />
                )}

              {/* Locked Media Message */}
              {((activeMediaTab === "video" &&
                (!currentTierFeatures.video || !property.hasVideoTour)) ||
                (activeMediaTab === "360" &&
                  (!currentTierFeatures.tour360 || !property.has360Tour))) && (
                <div className="h-[420px] flex flex-col items-center justify-center bg-muted/30">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                    <Lock className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <p className="text-foreground font-medium">Fitur Premium</p>
                  <p className="text-sm text-muted-foreground mt-2 text-center max-w-xs">
                    {activeMediaTab === "video"
                      ? "Video Tour tersedia untuk properti member Perak & Emas"
                      : "360° Tour tersedia eksklusif untuk properti member Emas"}
                  </p>
                </div>
              )}
            </div>

            {/* Title + badges */}
            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-2">
                {property.membershipTier !== "gratis" && (
                  <span
                    className={cn(
                      "flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white",
                      property.membershipTier === "emas"
                        ? "bg-amber-500"
                        : "bg-slate-400",
                    )}
                  >
                    {property.membershipTier === "emas" && (
                      <BadgeCheck className="h-3 w-3" />
                    )}
                    {membershipLabel(property.membershipTier)}
                  </span>
                )}
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                  {roomTypeLabel(property.roomType)}
                </span>
                {property.rentalPeriods.map((rp) => (
                  <span
                    key={rp}
                    className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground"
                  >
                    {rentalPeriodLabel(rp)}
                  </span>
                ))}
              </div>
              <h1 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                {property.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {property.address}
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-medium">{averageRating}</span>
                  <span className="text-muted-foreground">
                    ({reviews.length + property.reviewCount} ulasan)
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="font-semibold text-foreground text-lg">
                Deskripsi
              </h2>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="mt-6">
              <h2 className="font-semibold text-foreground text-lg">
                Fasilitas
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {property.amenities.map((a) => {
                  const Icon = amenityIconMap[a] ?? Check;
                  return (
                    <div
                      key={a}
                      className="flex items-center gap-2 rounded-lg border border-border p-3 text-sm text-foreground transition-colors hover:border-primary/30"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      {a}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Room info */}
            <div className="mt-6">
              <h2 className="font-semibold text-foreground text-lg">
                Informasi Kamar
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg border border-border p-4 text-center">
                  <p className="text-2xl font-bold text-primary">
                    {property.totalRooms}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Kamar</p>
                </div>
                <div className="rounded-lg border border-border p-4 text-center">
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {property.availableRooms}
                  </p>
                  <p className="text-sm text-muted-foreground">Tersedia</p>
                </div>
                <div className="rounded-lg border border-border p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {roomTypeLabel(property.roomType)}
                  </p>
                  <p className="text-sm text-muted-foreground">Tipe</p>
                </div>
                <div className="rounded-lg border border-border p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {property.rentalPeriods.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Opsi Sewa</p>
                </div>
              </div>
            </div>

            {/* Pricing Table */}
            <div className="mt-6">
              <h2 className="font-semibold text-foreground text-lg">
                Harga Sewa
              </h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {property.rentalPeriods.map((rp) => {
                  const price =
                    rp === "mingguan"
                      ? (property.pricePerWeek ??
                        Math.round(property.pricePerMonth / 4))
                      : rp === "tahunan"
                        ? (property.pricePerYear ?? property.pricePerMonth * 10)
                        : property.pricePerMonth;
                  return (
                    <div
                      key={rp}
                      className="rounded-lg border border-border p-4 text-center transition-colors hover:border-primary/30"
                    >
                      <Calendar className="mx-auto mb-2 h-5 w-5 text-primary" />
                      <p className="text-sm font-medium text-muted-foreground">
                        {rentalPeriodLabel(rp)}
                      </p>
                      <p className="mt-1 text-xl font-bold text-primary">
                        {formatRupiah(price)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="flex items-center gap-2 font-semibold text-foreground text-lg">
                  <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                  Ulasan ({reviews.length + property.reviewCount})
                </h2>
                {canReview && (
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Tulis Ulasan
                  </button>
                )}
              </div>

              {/* Review form */}
              {showReviewForm && (
                <div className="mb-6 rounded-xl border border-border bg-card p-4 animate-in slide-in-from-top-2 duration-200">
                  <h3 className="font-medium text-card-foreground mb-3">
                    Berikan Ulasan Anda
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className="p-1"
                      >
                        <Star
                          className={cn(
                            "h-6 w-6 transition-colors",
                            star <= reviewRating
                              ? "text-amber-500 fill-amber-500"
                              : "text-muted-foreground",
                          )}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {reviewRating}/5
                    </span>
                  </div>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Bagikan pengalaman Anda tinggal di kos ini..."
                    rows={3}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={handleSubmitReview}
                      className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      Kirim Ulasan
                    </button>
                    <button
                      onClick={() => setShowReviewForm(false)}
                      className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent transition-colors"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}

              {/* Reviews list */}
              <div className="flex flex-col gap-4">
                {reviews.length === 0 && property.reviewCount === 0 ? (
                  <p className="text-center text-sm text-muted-foreground py-8">
                    Belum ada ulasan
                  </p>
                ) : (
                  reviews.map((review) => {
                    const reviewer = getUser(review.tenantId);
                    return (
                      <div
                        key={review.id}
                        className="rounded-lg border border-border bg-card p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                            {reviewer?.avatar ?? "?"}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-card-foreground">
                                {reviewer?.name ?? "Pengguna"}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {review.createdAt}
                              </span>
                            </div>
                            <div className="flex items-center gap-0.5 mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={cn(
                                    "h-3.5 w-3.5",
                                    star <= review.rating
                                      ? "text-amber-500 fill-amber-500"
                                      : "text-muted-foreground",
                                  )}
                                />
                              ))}
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-4">
              {/* Price card */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4">
                  <span className="text-3xl font-bold text-primary">
                    {formatRupiah(property.pricePerMonth)}
                  </span>
                  <span className="text-muted-foreground">/bulan</span>
                </div>
                <div className="mb-4 flex flex-col gap-2 rounded-lg bg-secondary/50 p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sewa bulanan</span>
                    <span className="text-foreground">
                      {formatRupiah(property.pricePerMonth)}
                    </span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-semibold">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">
                      {formatRupiah(property.pricePerMonth)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    Tanpa biaya admin - Platform berbasis membership
                  </p>
                </div>
                {property.availableRooms > 0 ? (
                  isLoggedIn ? (
                    <Link
                      href={`/booking/${property.id}`}
                      className="block w-full rounded-lg bg-primary py-3 text-center font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
                    >
                      Pesan Sekarang
                    </Link>
                  ) : (
                    <Link
                      href="/masuk"
                      className="block w-full rounded-lg bg-primary py-3 text-center font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
                    >
                      Login untuk Pesan
                    </Link>
                  )
                ) : (
                  <button
                    disabled
                    className="block w-full rounded-lg bg-muted py-3 text-center font-semibold text-muted-foreground cursor-not-allowed"
                  >
                    Kamar Penuh
                  </button>
                )}
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  {property.availableRooms} kamar tersedia dari{" "}
                  {property.totalRooms}
                </p>
              </div>

              {/* Chat with Owner Button */}
              <button
                onClick={handleStartChat}
                className="flex items-center justify-center gap-2 rounded-xl border border-primary bg-primary/5 py-3.5 font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <MessageCircle className="h-5 w-5" />
                Chat dengan Pemilik
              </button>

              {/* Survey visit card */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-3 flex items-center gap-2 font-semibold text-card-foreground">
                  <CalendarSearch className="h-5 w-5 text-primary" />
                  Jadwalkan Survey
                </h3>
                {!isLoggedIn ? (
                  <div className="flex flex-col items-center text-center py-4">
                    <LogIn className="h-8 w-8 text-muted-foreground/50 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Login untuk menjadwalkan survey
                    </p>
                  </div>
                ) : surveySubmitted ? (
                  <div className="flex flex-col items-center text-center py-4 animate-in fade-in duration-300">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                      <Check className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <p className="mt-3 text-sm font-medium text-card-foreground">
                      Survey Dijadwalkan!
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Menunggu konfirmasi pemilik. Anda akan mendapat
                      notifikasi.
                    </p>
                    <button
                      onClick={() => setSurveySubmitted(false)}
                      className="mt-3 text-xs text-primary hover:underline"
                    >
                      Jadwalkan lagi
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted-foreground">
                        Tanggal
                      </label>
                      <input
                        type="date"
                        value={surveyDate}
                        onChange={(e) => setSurveyDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted-foreground">
                        Waktu
                      </label>
                      <select
                        value={surveyTime}
                        onChange={(e) => setSurveyTime(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        {[
                          "08:00",
                          "09:00",
                          "10:00",
                          "11:00",
                          "13:00",
                          "14:00",
                          "15:00",
                          "16:00",
                        ].map((t) => (
                          <option key={t} value={t}>
                            {t} WIB
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted-foreground">
                        Catatan (opsional)
                      </label>
                      <textarea
                        value={surveyNotes}
                        onChange={(e) => setSurveyNotes(e.target.value)}
                        placeholder="Misal: ingin melihat kamar lantai 2"
                        rows={2}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <button
                      onClick={handleSubmitSurvey}
                      className="w-full rounded-lg border border-primary bg-primary/5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground active:scale-[0.98]"
                    >
                      Kirim Permintaan Survey
                    </button>
                  </div>
                )}
              </div>

              {/* Owner card */}
              {owner && (
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-3 font-semibold text-card-foreground">
                    Pemilik Kos
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {owner.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-card-foreground">
                          {owner.name}
                        </p>
                        {owner.membershipTier === "emas" && (
                          <BadgeCheck className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                      {owner.membershipTier &&
                        owner.membershipTier !== "gratis" && (
                          <span
                            className={cn(
                              "text-xs font-semibold",
                              owner.membershipTier === "emas"
                                ? "text-amber-500"
                                : "text-slate-500",
                            )}
                          >
                            Member {membershipLabel(owner.membershipTier)}
                          </span>
                        )}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" /> {owner.phone}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" /> {owner.email}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar listings */}
        {similarListings.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-foreground">
              Kos Serupa di Wilayah Ini
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similarListings.map((p) => (
                <ListingCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <Footer />
      </div>

      {/* Private Chat Modal */}
      {chatOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 rounded-xl border border-border bg-card shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/20 text-xs font-bold text-primary-foreground">
                {owner?.avatar ?? "PK"}
              </div>
              <div>
                <p className="text-sm font-semibold text-primary-foreground">
                  {owner?.name ?? "Pemilik Kos"}
                </p>
                <p className="text-[10px] text-primary-foreground/70">
                  Pemilik {property.name}
                </p>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="text-primary-foreground/70 hover:text-primary-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="h-72 overflow-y-auto p-3 flex flex-col gap-2">
            {!isLoggedIn ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <MessageCircle className="h-10 w-10 text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">
                  Login untuk memulai percakapan
                </p>
                <Link
                  href="/masuk"
                  onClick={() => setChatOpen(false)}
                  className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  Masuk
                </Link>
              </div>
            ) : chatMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <MessageSquare className="h-10 w-10 text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">
                  Mulai percakapan dengan pemilik kos
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Pesan Anda bersifat privat
                </p>
              </div>
            ) : (
              chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "max-w-[80%] rounded-xl px-3 py-2 text-sm",
                    msg.isOwner
                      ? "self-start bg-secondary text-secondary-foreground"
                      : "self-end bg-primary text-primary-foreground",
                  )}
                >
                  <p>{msg.message}</p>
                  <p
                    className={cn(
                      "mt-0.5 text-[10px]",
                      msg.isOwner
                        ? "text-muted-foreground"
                        : "text-primary-foreground/60",
                    )}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              ))
            )}
            <div ref={chatEndRef} />
          </div>
          {isLoggedIn && (
            <div className="border-t border-border p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ketik pesan..."
                  className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-primary p-2 text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Photo Lightbox */}
      <PhotoLightbox
        photos={
          property.media?.photos || [
            {
              id: "p1",
              url: property.images?.[0] || "/images/prop1.jpeg",
              caption: "Tampak Depan",
            },
            {
              id: "p2",
              url: property.images?.[0] || "/images/prop1.jpeg",
              caption: "Kamar Tidur",
            },
            {
              id: "p3",
              url: property.images?.[0] || "/images/prop1.jpeg",
              caption: "Kamar Mandi",
            },
            {
              id: "p4",
              url: property.images?.[0] || "/images/prop1.jpeg",
              caption: "Dapur",
            },
            {
              id: "p5",
              url: property.images?.[0] || "/images/prop1.jpeg",
              caption: "Area Parkir",
            },
          ]
        }
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        placeholderGradient={
          gradients[property.id] ?? "from-amber-400 to-orange-500"
        }
      />

      {/* Panorama Viewer Fullscreen */}
      <PanoramaViewer
        imageUrl={
          property.media?.tour360?.thumbnail || "/360/kos1/prop1-360.jpeg"
        }
        isOpen={panoramaFullscreen}
        onClose={() => setPanoramaFullscreen(false)}
        title={`360° Tour - ${property.name}`}
      />
    </div>
  );
}
