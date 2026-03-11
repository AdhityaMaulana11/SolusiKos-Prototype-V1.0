"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useApp, getRolePath } from "@/lib/app-context";
import { users } from "@/lib/mock-data";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Building,
  Wrench,
  Shield,
  ChevronRight,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const demoAccounts = [
  {
    id: "t1",
    label: "Penghuni",
    name: "Rina Susanti",
    description: "Cari kos, booking, dan kelola pembayaran",
    role: "penghuni",
    icon: User,
    color: "bg-emerald-500",
    bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-800",
  },
  {
    id: "o1",
    label: "Pemilik Kos",
    name: "H. Ahmad Hidayat",
    description: "Kelola properti, terima booking, lihat pembayaran",
    role: "pemilik",
    icon: Building,
    color: "bg-amber-500",
    bgLight: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-800",
  },
  {
    id: "p1",
    label: "Penyedia Jasa",
    name: "Laundry Bersih Jaya",
    description: "Terima pesanan layanan dari penghuni",
    role: "penyedia",
    icon: Wrench,
    color: "bg-sky-500",
    bgLight: "bg-sky-50 dark:bg-sky-950/30",
    borderColor: "border-sky-200 dark:border-sky-800",
  },
  {
    id: "a1",
    label: "Admin",
    name: "Admin Domira",
    description: "Kelola platform, pengguna, dan laporan",
    role: "admin",
    icon: Shield,
    color: "bg-red-500",
    bgLight: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-800",
  },
];

export default function LoginPage() {
  const { dispatch } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const user = users.find((u) => u.email === email) ?? users[0];

      // Persist to localStorage BEFORE dispatch
      try {
        localStorage.setItem(
          "solusikos_auth",
          JSON.stringify({ userId: user.id }),
        );
      } catch {
        // Ignore storage errors
      }

      dispatch({ type: "LOGIN", userId: user.id });
      toast.success(`Selamat datang, ${user.name}!`);
      router.push(getRolePath(user.role));
      setLoading(false);
    }, 800);
  }

  async function handleDemoLogin(userId: string) {
    setSelectedAccount(userId);
    setLoading(true);

    const user = users.find((u) => u.id === userId);
    if (!user) {
      toast.error("Akun demo tidak ditemukan");
      setSelectedAccount(null);
      setLoading(false);
      return;
    }

    // Persist to localStorage BEFORE dispatch to ensure state survives navigation
    try {
      localStorage.setItem("solusikos_auth", JSON.stringify({ userId }));
    } catch {
      // Ignore storage errors
    }

    // Use a promise-based approach for more reliable navigation
    await new Promise((resolve) => setTimeout(resolve, 500));

    dispatch({ type: "LOGIN", userId });
    toast.success(`Masuk sebagai ${user.name}`);

    const targetPath = getRolePath(user.role);
    router.push(targetPath);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground">
              Masuk ke Domira
            </h1>
            <p className="mt-2 text-muted-foreground">
              Pilih akun demo atau masukkan kredensial Anda
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Demo Accounts Section */}
            <div className="order-2 lg:order-1">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Info className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-card-foreground">
                      Akun Demo
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Pilih untuk eksplorasi fitur
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {demoAccounts.map((acc) => {
                    const Icon = acc.icon;
                    const isSelected = selectedAccount === acc.id;
                    return (
                      <button
                        key={acc.id}
                        onClick={() => handleDemoLogin(acc.id)}
                        disabled={loading || selectedAccount !== null}
                        className={cn(
                          "flex items-center gap-4 rounded-xl border p-4 text-left transition-all",
                          isSelected
                            ? `${acc.bgLight} ${acc.borderColor} scale-[0.98]`
                            : "border-border hover:border-primary/30 hover:bg-accent/50",
                          selectedAccount !== null &&
                            !isSelected &&
                            "opacity-50 cursor-not-allowed",
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white transition-transform",
                            acc.color,
                            isSelected && "animate-pulse",
                          )}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-card-foreground">
                              {acc.label}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ({acc.name})
                            </span>
                          </div>
                          <p className="mt-0.5 text-sm text-muted-foreground line-clamp-1">
                            {acc.description}
                          </p>
                        </div>
                        <ChevronRight
                          className={cn(
                            "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                            isSelected && "translate-x-1",
                          )}
                        />
                      </button>
                    );
                  })}
                </div>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Ini adalah prototype demo. Tidak ada data nyata yang
                  digunakan.
                </p>
              </div>
            </div>

            {/* Login Form Section */}
            <div className="order-1 lg:order-2">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h2 className="mb-6 text-lg font-semibold text-card-foreground">
                  Masuk dengan Email
                </h2>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Email
                    </label>
                    <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 focus-within:ring-2 focus-within:ring-ring">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@email.com"
                        className="w-full bg-transparent py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Password
                    </label>
                    <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 focus-within:ring-2 focus-within:ring-ring">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Masukkan password"
                        className="w-full bg-transparent py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-muted-foreground">
                      <input
                        type="checkbox"
                        className="rounded border-border"
                      />
                      Ingat saya
                    </label>
                    <button
                      type="button"
                      className="text-sm text-primary hover:underline"
                    >
                      Lupa password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || selectedAccount !== null}
                    className="mt-2 rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                  >
                    {loading ? "Memproses..." : "Masuk"}
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Belum punya akun?{" "}
                  <Link
                    href="/daftar"
                    className="font-medium text-primary hover:underline"
                  >
                    Daftar sekarang
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
