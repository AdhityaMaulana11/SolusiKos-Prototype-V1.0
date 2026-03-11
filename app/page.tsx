"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  ListingCard,
  ListingCardSkeleton,
} from "@/components/shared/listing-card";
import { useApp } from "@/lib/app-context";
import { regions } from "@/lib/mock-data";
import {
  Search,
  ArrowRight,
  Shield,
  Headphones,
  CalendarSearch,
  MessageSquare,
  Sparkles,
  Building2,
} from "lucide-react";

export default function HomePage() {
  const { state } = useApp();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const featuredListings = state.properties
    .filter((p) => p.featured)
    .slice(0, 6);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/cari?q=${encodeURIComponent(searchQuery)}`);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* 1. Hero Section - Refined Centering */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden pt-24 pb-16">
        {/* Abstract Background Effects */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute left-1/2 top-10 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-primary/20 opacity-40 blur-[120px]" />

        <div className="relative mx-auto w-full max-w-5xl px-4 text-center">
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-sm font-medium text-primary backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              <span>Eksplorasi Rebana Metropolitan</span>
            </div>
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:leading-[1.15] text-balance">
            Temukan{" "}
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Kos Impianmu
            </span>{" "}
            <br className="hidden md:block" /> di Jantung Jawa Barat
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed text-balance">
            Platform tepercaya untuk mencari dan mengelola kos di Kota Cirebon,
            Kab. Cirebon, Kuningan, Majalengka, dan Indramayu.
          </p>

          {/* Elevated Search Bar - Refined Width & Position */}
          <div className="mx-auto mt-12 max-w-3xl">
            <form
              onSubmit={handleSearch}
              className="group relative flex w-full items-center gap-2 rounded-2xl border border-border/60 bg-background/90 p-2 shadow-2xl shadow-primary/5 backdrop-blur-xl transition-all focus-within:border-primary/50 focus-within:shadow-primary/10 focus-within:ring-4 focus-within:ring-primary/10"
            >
              <div className="flex flex-1 items-center gap-3 px-4">
                <Search className="h-6 w-6 shrink-0 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ketik nama kos, daerah, atau fasilitas..."
                  className="w-full bg-transparent py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-primary px-8 py-3.5 font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98]"
              >
                Cari Kos
              </button>
            </form>

            {/* Popular Tags */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
              <span className="font-medium mr-1">Sering dicari:</span>
              {[
                "WiFi Ngebut",
                "AC",
                "Kos Putri",
                "Dekat Kampus",
                "Kamar Mandi Dalam",
              ].map((tag) => (
                <Link
                  key={tag}
                  href={`/cari?q=${tag}`}
                  className="rounded-full border border-border bg-background/50 px-4 py-1.5 transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-sm"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Region Cards - True Bento Layout */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Jelajahi Wilayah
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto md:mx-0">
            Pilihan area strategis di kawasan Rebana Metropolitan untuk
            kenyamanan aktivitasmu.
          </p>
        </div>

        {/* Changed to a 6-col grid for better bento positioning (2 top, 3 bottom) */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
          {regions.map((region, idx) => (
            <Link
              key={region.id}
              href={`/cari?region=${region.id}`}
              // The magic is here: First 2 items take 3 columns each (50% width). Last 3 take 2 columns each (33.3% width)
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 ${
                idx < 2 ? "lg:col-span-3" : "lg:col-span-2"
              }`}
            >
              <div
                className={`relative h-48 w-full overflow-hidden bg-gradient-to-br ${region.gradient}`}
              >
                <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                <div className="flex h-full items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <Building2 className="h-14 w-14 text-white/60 drop-shadow-md" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold text-card-foreground">
                  {region.name}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {region.description}
                </p>
                <div className="mt-5 flex items-center justify-between text-sm font-semibold text-primary">
                  <span className="bg-primary/10 px-3 py-1.5 rounded-full">
                    {region.propertyCount} properti
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Listings */}
      <section className="relative border-y border-border/50 bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4" />
                Rekomendasi Spesial
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Kos Pilihan Terbaik
              </h2>
            </div>
            <Link
              href="/cari"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold shadow-sm transition-all hover:border-primary hover:text-primary"
            >
              Lihat semua
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <ListingCardSkeleton key={i} />
                ))
              : featuredListings.map((p) => (
                  <ListingCard key={p.id} property={p} />
                ))}
          </div>
        </div>
      </section>

      {/* 4. How it works - Flex Wrap Layout for better centering */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Sewa Kos Tanpa Ribet
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Dari pencarian hingga pindahan, kami merancang setiap prosesnya agar
            cepat, aman, dan transparan.
          </p>
        </div>

        {/* Changed from Grid to Flex to naturally center the 5 items (3 top, 2 bottom on large screens) */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {[
            {
              icon: Search,
              title: "Cari & Filter",
              desc: "Sesuaikan pencarian dengan budget dan lokasimu.",
            },
            {
              icon: CalendarSearch,
              title: "Survey Lokasi",
              desc: "Jadwalkan kunjungan atau lihat virtual tour.",
            },
            {
              icon: MessageSquare,
              title: "Diskusi Langsung",
              desc: "Chat pemilik kos dengan fitur pesan terintegrasi.",
            },
            {
              icon: Shield,
              title: "Booking Aman",
              desc: "Transaksi dilindungi dengan sistem pembayaran kami.",
            },
            {
              icon: Headphones,
              title: "Layanan Ekstra",
              desc: "Nikmati kemudahan lapor kerusakan & bayar tagihan.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="group relative flex w-full flex-col items-center rounded-2xl border border-border/50 bg-card p-8 text-center shadow-sm transition-all hover:-translate-y-2 hover:border-primary/30 hover:shadow-lg sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[340px]"
            >
              <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-8 ring-background transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <step.icon className="h-7 w-7 text-primary transition-colors group-hover:text-primary-foreground" />
                <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background shadow-sm">
                  {i + 1}
                </div>
              </div>
              <h3 className="mb-3 text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA - Refined Alignment */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-primary relative shadow-2xl shadow-primary/20">
          <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-[250px] w-[250px] rounded-full bg-black/10 blur-3xl" />

          <div className="relative flex flex-col items-center gap-10 px-6 py-16 text-center lg:flex-row lg:text-left sm:px-16 sm:py-20">
            <div className="flex-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl text-balance">
                Maksimalkan Potensi Properti Anda
              </h2>
              <p className="mt-4 max-w-xl text-lg text-primary-foreground/80 mx-auto lg:mx-0">
                Bergabunglah dengan ratusan pemilik kos lainnya di Domira.
                Kelola properti, otomatisasi tagihan, dan jangkau lebih banyak
                penyewa.
              </p>
            </div>
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row lg:shrink-0">
              <Link
                href="/daftar"
                className="inline-flex w-full items-center justify-center rounded-xl bg-background px-8 py-4 text-base font-bold text-foreground shadow-sm transition-all hover:bg-background/90 hover:scale-105 active:scale-95 sm:w-auto"
              >
                Daftar sebagai Pemilik
              </Link>
              <Link
                href="/membership"
                className="inline-flex w-full items-center justify-center rounded-xl border-2 border-primary-foreground/30 px-8 py-4 text-base font-bold text-primary-foreground transition-all hover:bg-primary-foreground/10 sm:w-auto"
              >
                Lihat Paket
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
