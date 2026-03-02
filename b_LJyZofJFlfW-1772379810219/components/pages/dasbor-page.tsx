"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { quizQuestions } from "@/lib/learning-data"
import type { StudentResult } from "@/lib/learning-data"
import {
  Lock,
  LogOut,
  Users,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  XCircle,
  BarChart3,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  FileText,
  ClipboardList,
  Target,
  Lightbulb,
  Award,
  ArrowUpDown,
  Hash,
  Trash2,
} from "lucide-react"

const TEACHER_PASSWORD = "123kimia"

interface DasborPageProps {
  results: StudentResult[]
  onClearResults?: () => void
}

export function DasborPage({ results, onClearResults }: DasborPageProps) {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [expandedStudent, setExpandedStudent] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<"ringkasan" | "data" | "analisis" | "kunci" | "rekomendasi">("ringkasan")
  const [sortOrder, setSortOrder] = useState<"name" | "score-asc" | "score-desc" | "time">("time")
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (password === TEACHER_PASSWORD) {
      setAuthenticated(true)
      setError("")
    } else {
      setError("Password salah. Silakan coba lagi.")
      setPassword("")
    }
  }

  // --- Analytics computations ---
  const analytics = useMemo(() => {
    if (results.length === 0) return null

    const totalStudents = results.length
    const avgScore = results.reduce((s, r) => s + r.score, 0) / totalStudents
    const avgPercentage = (avgScore / quizQuestions.length) * 100
    const highestScore = Math.max(...results.map((r) => r.score))
    const lowestScore = Math.min(...results.map((r) => r.score))

    // Score distribution
    const passed = results.filter((r) => (r.score / r.total) * 100 >= 75).length
    const notPassed = totalStudents - passed

    // Per-question error analysis
    const questionErrors: { qId: number; question: string; category: string; errorCount: number; errorRate: number }[] = quizQuestions.map((q) => {
      const errorCount = results.reduce((count, r) => {
        if (r.answers[q.id] !== undefined && r.answers[q.id] !== q.correctAnswer) {
          return count + 1
        }
        return count
      }, 0)
      return {
        qId: q.id,
        question: q.question,
        category: q.category,
        errorCount,
        errorRate: totalStudents > 0 ? (errorCount / totalStudents) * 100 : 0,
      }
    })

    // Sort by error rate descending
    const sortedErrors = [...questionErrors].sort((a, b) => b.errorRate - a.errorRate)
    const topErrors = sortedErrors.filter((e) => e.errorCount > 0).slice(0, 5)

    // Category analysis
    const categoryMap = new Map<string, { total: number; errors: number }>()
    quizQuestions.forEach((q) => {
      if (!categoryMap.has(q.category)) {
        categoryMap.set(q.category, { total: 0, errors: 0 })
      }
      const cat = categoryMap.get(q.category)!
      cat.total += totalStudents
      results.forEach((r) => {
        if (r.answers[q.id] !== undefined && r.answers[q.id] !== q.correctAnswer) {
          cat.errors++
        }
      })
    })

    const categoryAnalysis = Array.from(categoryMap.entries())
      .map(([name, data]) => ({
        name,
        errorRate: data.total > 0 ? (data.errors / data.total) * 100 : 0,
        errors: data.errors,
        total: data.total,
      }))
      .sort((a, b) => b.errorRate - a.errorRate)

    return {
      totalStudents,
      avgScore,
      avgPercentage,
      highestScore,
      lowestScore,
      passed,
      notPassed,
      topErrors,
      categoryAnalysis,
      questionErrors,
    }
  }, [results])

  // Detailed per-question answer distribution
  const questionDistributions = useMemo(() => {
    if (results.length === 0) return []
    return quizQuestions.map((q) => {
      const distribution = q.options.map((_, optIdx) => {
        const count = results.filter((r) => r.answers[q.id] === optIdx).length
        return { optIdx, count, pct: (count / results.length) * 100 }
      })
      const unanswered = results.filter((r) => r.answers[q.id] === undefined).length
      const correctCount = results.filter((r) => r.answers[q.id] === q.correctAnswer).length
      const difficulty = ((results.length - correctCount) / results.length) * 100
      return {
        question: q,
        distribution,
        unanswered,
        correctCount,
        difficulty,
      }
    })
  }, [results])

  // Sorted results for Data Siswa tab
  const sortedResults = useMemo(() => {
    const copy = results.map((r, i) => ({ ...r, originalIndex: i }))
    switch (sortOrder) {
      case "name":
        return copy.sort((a, b) => a.name.localeCompare(b.name))
      case "score-asc":
        return copy.sort((a, b) => a.score - b.score)
      case "score-desc":
        return copy.sort((a, b) => b.score - a.score)
      case "time":
      default:
        return copy.sort((a, b) => b.timestamp - a.timestamp)
    }
  }, [results, sortOrder])

  // Follow-up suggestions based on weak categories
  const followUpSuggestions = useMemo(() => {
    if (!analytics) return []
    const suggestions: { category: string; suggestion: string; priority: "tinggi" | "sedang" | "rendah" }[] = []

    analytics.categoryAnalysis.forEach((cat) => {
      if (cat.errorRate > 50) {
        suggestions.push({
          category: cat.name,
          suggestion: `Ulangi penjelasan konsep ${cat.name} secara menyeluruh. Berikan contoh tambahan dan diskusi kelompok.`,
          priority: "tinggi",
        })
      } else if (cat.errorRate > 25) {
        suggestions.push({
          category: cat.name,
          suggestion: `Review singkat materi ${cat.name}. Berikan latihan soal tambahan untuk penguatan.`,
          priority: "sedang",
        })
      } else if (cat.errorRate > 10) {
        suggestions.push({
          category: cat.name,
          suggestion: `Siswa sudah cukup memahami ${cat.name}. Berikan pengayaan atau soal tingkat lanjut.`,
          priority: "rendah",
        })
      }
    })

    return suggestions
  }, [analytics])

  // ---- Password gate ----
  if (!authenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-md animate-scale-in">
          <CardContent className="p-8">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Dasbor Guru</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Halaman ini hanya dapat diakses oleh guru. Masukkan password untuk melanjutkan.
                </p>
              </div>
              <form onSubmit={handleLogin} className="flex w-full flex-col gap-3">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setError("")
                    }}
                    placeholder="Masukkan password..."
                    className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {error && (
                  <p className="text-sm text-destructive animate-fade-in">{error}</p>
                )}
                <Button type="submit" disabled={!password.trim()} size="lg" className="w-full gap-2">
                  <Lock className="h-4 w-4" />
                  Masuk
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ---- Dashboard content ----
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dasbor Guru</h1>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Analisis hasil latihan siswa, identifikasi kesalahan umum, dan panduan tindak lanjut.
          </p>
          {results.length > 0 && (
            <p className="mt-1 text-xs text-muted-foreground">
              Data tersimpan secara lokal. {results.length} hasil latihan tercatat.
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {results.length > 0 && (
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowClearConfirm(true)}
                className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Hapus Data</span>
              </Button>

              {showClearConfirm && (
                <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-lg border border-border bg-card p-4 shadow-lg animate-scale-in">
                  <p className="text-sm font-semibold text-foreground">Hapus semua data siswa?</p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Tindakan ini akan menghapus seluruh {results.length} hasil latihan siswa secara permanen.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1"
                      onClick={() => {
                        onClearResults?.()
                        setShowClearConfirm(false)
                      }}
                    >
                      Ya, Hapus
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowClearConfirm(false)}
                    >
                      Batal
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
          <Button
            variant="outline"
            onClick={() => {
              setAuthenticated(false)
              setPassword("")
            }}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Keluar</span>
          </Button>
        </div>
      </section>

      {/* Empty state */}
      {!analytics ? (
        <Card className="animate-scale-in">
          <CardContent className="flex flex-col items-center gap-4 p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Belum Ada Data</h3>
            <p className="max-w-sm text-sm text-muted-foreground">
              Belum ada siswa yang menyelesaikan latihan soal. Data akan muncul setelah siswa mengumpulkan jawaban.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total Siswa", value: analytics.totalStudents, icon: Users, color: "text-primary" },
              { label: "Rata-rata Skor", value: `${analytics.avgScore.toFixed(1)}/${quizQuestions.length}`, icon: TrendingUp, color: "text-primary" },
              { label: "Tuntas (>= 75%)", value: analytics.passed, icon: CheckCircle2, color: "text-emerald-600 dark:text-emerald-400" },
              { label: "Belum Tuntas", value: analytics.notPassed, icon: XCircle, color: "text-red-500 dark:text-red-400" },
            ].map((stat, i) => (
              <Card key={stat.label} className={`animate-fade-in-up stagger-${i + 1}`}>
                <CardContent className="flex items-center gap-4 p-5">
                  <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10", stat.color)}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Score overview bar */}
          <Card className="animate-fade-in-up stagger-3">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Distribusi Nilai
              </h3>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex h-8 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="flex items-center justify-center bg-emerald-500 text-xs font-bold text-white transition-all duration-500"
                      style={{ width: `${(analytics.passed / analytics.totalStudents) * 100}%` }}
                    >
                      {analytics.passed > 0 && `${analytics.passed}`}
                    </div>
                    <div
                      className="flex items-center justify-center bg-red-400 text-xs font-bold text-white transition-all duration-500"
                      style={{ width: `${(analytics.notPassed / analytics.totalStudents) * 100}%` }}
                    >
                      {analytics.notPassed > 0 && `${analytics.notPassed}`}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Tuntas ({Math.round((analytics.passed / analytics.totalStudents) * 100)}%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" /> Belum Tuntas ({Math.round((analytics.notPassed / analytics.totalStudents) * 100)}%)
                </span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 rounded-lg bg-muted p-4 text-center text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Skor Tertinggi</p>
                  <p className="text-lg font-bold text-foreground">{analytics.highestScore}/{quizQuestions.length}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Rata-rata</p>
                  <p className="text-lg font-bold text-foreground">{analytics.avgScore.toFixed(1)}/{quizQuestions.length}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Skor Terendah</p>
                  <p className="text-lg font-bold text-foreground">{analytics.lowestScore}/{quizQuestions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top errors */}
          {analytics.topErrors.length > 0 && (
            <Card className="animate-fade-in-up stagger-4">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Soal dengan Kesalahan Terbanyak
                </h3>
                <div className="mt-4 space-y-3">
                  {analytics.topErrors.map((err, i) => {
                    const q = quizQuestions.find((q) => q.id === err.qId)!
                    return (
                      <div key={err.qId} className="rounded-lg border border-border p-4 transition-all hover:border-primary/20">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 flex-1">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                              {i + 1}
                            </span>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground leading-relaxed">
                                Soal {err.qId}: {err.question.slice(0, 80)}{err.question.length > 80 ? "..." : ""}
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground">{err.category}</p>
                            </div>
                          </div>
                          <span className={cn(
                            "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                            err.errorRate > 50 ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                            err.errorRate > 25 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                            "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          )}>
                            {err.errorCount} salah ({err.errorRate.toFixed(0)}%)
                          </span>
                        </div>
                        <div className="mt-2 pl-9">
                          <p className="text-xs text-primary font-medium">Jawaban benar: {String.fromCharCode(65 + q.correctAnswer)}. {q.options[q.correctAnswer]}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Category analysis */}
          <Card className="animate-fade-in-up stagger-5">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Analisis per Kategori
              </h3>
              <div className="mt-4 space-y-3">
                {analytics.categoryAnalysis.map((cat) => (
                  <div key={cat.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">{cat.name}</span>
                      <span className={cn(
                        "text-xs font-semibold",
                        cat.errorRate > 50 ? "text-red-500" : cat.errorRate > 25 ? "text-amber-500" : "text-emerald-500"
                      )}>
                        {cat.errorRate.toFixed(0)}% kesalahan
                      </span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-700",
                          cat.errorRate > 50 ? "bg-red-400" : cat.errorRate > 25 ? "bg-amber-400" : "bg-emerald-400"
                        )}
                        style={{ width: `${cat.errorRate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Follow-up suggestions */}
          {followUpSuggestions.length > 0 && (
            <Card className="animate-fade-in-up stagger-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Panduan Tindak Lanjut Pembelajaran
                </h3>
                <div className="mt-4 space-y-3">
                  {followUpSuggestions.map((s) => (
                    <div
                      key={s.category}
                      className={cn(
                        "rounded-lg border-l-4 p-4",
                        s.priority === "tinggi" && "border-l-red-500 bg-red-50 dark:bg-red-900/10",
                        s.priority === "sedang" && "border-l-amber-500 bg-amber-50 dark:bg-amber-900/10",
                        s.priority === "rendah" && "border-l-emerald-500 bg-emerald-50 dark:bg-emerald-900/10"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-semibold",
                          s.priority === "tinggi" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                          s.priority === "sedang" && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                          s.priority === "rendah" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        )}>
                          Prioritas {s.priority}
                        </span>
                        <span className="text-sm font-semibold text-foreground">{s.category}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.suggestion}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Student detail list */}
          <Card className="animate-fade-in-up stagger-7">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Daftar Hasil Siswa
              </h3>
              <div className="mt-4 space-y-2">
                {results.map((r, i) => {
                  const pct = (r.score / r.total) * 100
                  const isPassed = pct >= 75
                  const isExpanded = expandedStudent === i

                  return (
                    <div key={`${r.name}-${r.timestamp}`} className="rounded-lg border border-border overflow-hidden transition-all hover:border-primary/20">
                      <button
                        onClick={() => setExpandedStudent(isExpanded ? null : i)}
                        className="flex w-full items-center gap-4 p-4 text-left"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground">
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{r.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(r.timestamp).toLocaleString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                            isPassed ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          )}>
                            {r.score}/{r.total} ({pct.toFixed(0)}%)
                          </span>
                          {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="border-t border-border bg-muted/30 p-4 animate-fade-in">
                          <p className="text-xs font-semibold text-muted-foreground mb-2">Detail Jawaban:</p>
                          <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10">
                            {quizQuestions.map((q) => {
                              const isCorrect = r.answers[q.id] === q.correctAnswer
                              const wasAnswered = r.answers[q.id] !== undefined
                              return (
                                <div
                                  key={q.id}
                                  className={cn(
                                    "flex h-8 items-center justify-center rounded text-xs font-medium",
                                    !wasAnswered && "bg-muted text-muted-foreground",
                                    wasAnswered && isCorrect && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
                                    wasAnswered && !isCorrect && "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                                  )}
                                  title={`Soal ${q.id}: ${isCorrect ? "Benar" : wasAnswered ? `Salah (Jawaban: ${String.fromCharCode(65 + r.answers[q.id])}, Benar: ${String.fromCharCode(65 + q.correctAnswer)})` : "Tidak dijawab"}`}
                                >
                                  {q.id}
                                </div>
                              )
                            })}
                          </div>
                          <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                              Benar: {r.score}
                            </span>
                            <span className="flex items-center gap-1">
                              <XCircle className="h-3 w-3 text-red-400" />
                              Salah: {r.total - r.score}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* ====== DETAILED ANALYSIS TABS ====== */}
          <Card className="animate-fade-in-up stagger-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                <ClipboardList className="h-5 w-5 text-primary" />
                Analisis Detail
              </h3>

              {/* Tab nav */}
              <div className="flex flex-wrap gap-1.5 rounded-lg bg-muted p-1">
                {([
                  { id: "ringkasan" as const, label: "Ringkasan", icon: FileText },
                  { id: "data" as const, label: "Data Siswa", icon: Users },
                  { id: "analisis" as const, label: "Analisis Soal", icon: BarChart3 },
                  { id: "kunci" as const, label: "Kunci Jawaban", icon: Target },
                  { id: "rekomendasi" as const, label: "Rekomendasi", icon: Lightbulb },
                ]).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-all",
                      activeTab === tab.id
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <tab.icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="mt-6 animate-fade-in" key={activeTab}>

                {/* === RINGKASAN TAB === */}
                {activeTab === "ringkasan" && (
                  <div className="space-y-6">
                    <div className="rounded-lg bg-muted/50 p-5">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        Ringkasan Keseluruhan
                      </h4>
                      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                        <div className="rounded-lg bg-card p-3 text-center border border-border">
                          <p className="text-xs text-muted-foreground">Total Peserta</p>
                          <p className="text-2xl font-bold text-foreground">{analytics.totalStudents}</p>
                        </div>
                        <div className="rounded-lg bg-card p-3 text-center border border-border">
                          <p className="text-xs text-muted-foreground">Rata-rata Nilai</p>
                          <p className="text-2xl font-bold text-foreground">{analytics.avgPercentage.toFixed(1)}%</p>
                        </div>
                        <div className="rounded-lg bg-card p-3 text-center border border-border">
                          <p className="text-xs text-muted-foreground">Skor Tertinggi</p>
                          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{analytics.highestScore}/{quizQuestions.length}</p>
                        </div>
                        <div className="rounded-lg bg-card p-3 text-center border border-border">
                          <p className="text-xs text-muted-foreground">Skor Terendah</p>
                          <p className="text-2xl font-bold text-red-500 dark:text-red-400">{analytics.lowestScore}/{quizQuestions.length}</p>
                        </div>
                        <div className="rounded-lg bg-card p-3 text-center border border-border">
                          <p className="text-xs text-muted-foreground">Tuntas ({'>'}= 75%)</p>
                          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{analytics.passed} <span className="text-sm font-normal text-muted-foreground">({((analytics.passed / analytics.totalStudents) * 100).toFixed(0)}%)</span></p>
                        </div>
                        <div className="rounded-lg bg-card p-3 text-center border border-border">
                          <p className="text-xs text-muted-foreground">Belum Tuntas</p>
                          <p className="text-2xl font-bold text-red-500 dark:text-red-400">{analytics.notPassed} <span className="text-sm font-normal text-muted-foreground">({((analytics.notPassed / analytics.totalStudents) * 100).toFixed(0)}%)</span></p>
                        </div>
                      </div>
                    </div>

                    {/* Score ranges breakdown */}
                    <div className="rounded-lg bg-muted/50 p-5">
                      <h4 className="font-semibold text-foreground mb-3">Distribusi Rentang Nilai</h4>
                      <div className="space-y-2.5">
                        {[
                          { label: "90-100% (Sangat Baik)", min: 90, color: "bg-emerald-500" },
                          { label: "75-89% (Baik / Tuntas)", min: 75, max: 89, color: "bg-sky-500" },
                          { label: "60-74% (Cukup)", min: 60, max: 74, color: "bg-amber-500" },
                          { label: "< 60% (Perlu Perbaikan)", max: 59, color: "bg-red-400" },
                        ].map((range) => {
                          const count = results.filter((r) => {
                            const pct = (r.score / r.total) * 100
                            if (range.min !== undefined && range.max !== undefined) return pct >= range.min && pct <= range.max
                            if (range.min !== undefined) return pct >= range.min
                            if (range.max !== undefined) return pct <= range.max
                            return false
                          }).length
                          const barPct = analytics.totalStudents > 0 ? (count / analytics.totalStudents) * 100 : 0
                          return (
                            <div key={range.label} className="flex items-center gap-3">
                              <span className="w-44 shrink-0 text-xs text-foreground font-medium">{range.label}</span>
                              <div className="flex-1 h-5 rounded-full bg-muted overflow-hidden">
                                <div className={cn("h-full rounded-full transition-all duration-700", range.color)} style={{ width: `${barPct}%` }} />
                              </div>
                              <span className="w-14 shrink-0 text-right text-xs font-semibold text-foreground">{count} siswa</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Category mastery summary */}
                    <div className="rounded-lg bg-muted/50 p-5">
                      <h4 className="font-semibold text-foreground mb-3">Penguasaan per Kategori Materi</h4>
                      <div className="space-y-3">
                        {analytics.categoryAnalysis.map((cat) => {
                          const mastery = 100 - cat.errorRate
                          return (
                            <div key={cat.name} className="flex items-center gap-3">
                              <span className="w-40 shrink-0 text-xs font-medium text-foreground">{cat.name}</span>
                              <div className="flex-1 h-5 rounded-full bg-muted overflow-hidden">
                                <div
                                  className={cn(
                                    "h-full rounded-full transition-all duration-700",
                                    mastery >= 75 ? "bg-emerald-500" : mastery >= 50 ? "bg-amber-500" : "bg-red-400"
                                  )}
                                  style={{ width: `${mastery}%` }}
                                />
                              </div>
                              <span className={cn(
                                "w-14 shrink-0 text-right text-xs font-semibold",
                                mastery >= 75 ? "text-emerald-600 dark:text-emerald-400" : mastery >= 50 ? "text-amber-600 dark:text-amber-400" : "text-red-500 dark:text-red-400"
                              )}>
                                {mastery.toFixed(0)}%
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* === DATA SISWA TAB === */}
                {activeTab === "data" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">{results.length} siswa terdaftar</p>
                      <div className="flex items-center gap-2">
                        <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                        <select
                          value={sortOrder}
                          onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
                          className="rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          <option value="time">Waktu (terbaru)</option>
                          <option value="name">Nama (A-Z)</option>
                          <option value="score-desc">Skor (tertinggi)</option>
                          <option value="score-asc">Skor (terendah)</option>
                        </select>
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-muted">
                            <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground">No</th>
                            <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground">Nama Siswa</th>
                            <th className="px-3 py-2.5 text-center text-xs font-semibold text-muted-foreground">Skor</th>
                            <th className="px-3 py-2.5 text-center text-xs font-semibold text-muted-foreground">Persentase</th>
                            <th className="px-3 py-2.5 text-center text-xs font-semibold text-muted-foreground">Status</th>
                            <th className="px-3 py-2.5 text-center text-xs font-semibold text-muted-foreground">Benar</th>
                            <th className="px-3 py-2.5 text-center text-xs font-semibold text-muted-foreground">Salah</th>
                            <th className="px-3 py-2.5 text-right text-xs font-semibold text-muted-foreground">Waktu</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {sortedResults.map((r, i) => {
                            const pct = (r.score / r.total) * 100
                            const isPassed = pct >= 75
                            return (
                              <tr key={`${r.name}-${r.timestamp}`} className="hover:bg-muted/40 transition-colors">
                                <td className="px-3 py-2.5 text-xs text-muted-foreground">{i + 1}</td>
                                <td className="px-3 py-2.5 text-xs font-medium text-foreground">{r.name}</td>
                                <td className="px-3 py-2.5 text-center text-xs font-semibold text-foreground">{r.score}/{r.total}</td>
                                <td className="px-3 py-2.5 text-center text-xs font-semibold text-foreground">{pct.toFixed(0)}%</td>
                                <td className="px-3 py-2.5 text-center">
                                  <span className={cn(
                                    "rounded-full px-2 py-0.5 text-xs font-semibold",
                                    isPassed ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                  )}>
                                    {isPassed ? "Tuntas" : "Belum Tuntas"}
                                  </span>
                                </td>
                                <td className="px-3 py-2.5 text-center text-xs text-emerald-600 dark:text-emerald-400 font-medium">{r.score}</td>
                                <td className="px-3 py-2.5 text-center text-xs text-red-500 dark:text-red-400 font-medium">{r.total - r.score}</td>
                                <td className="px-3 py-2.5 text-right text-xs text-muted-foreground">
                                  {new Date(r.timestamp).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* === ANALISIS SOAL TAB === */}
                {activeTab === "analisis" && (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground mb-4">Klik soal untuk melihat distribusi jawaban siswa.</p>
                    {questionDistributions.map((qd) => {
                      const isOpen = expandedQuestion === qd.question.id
                      return (
                        <div key={qd.question.id} className="rounded-lg border border-border overflow-hidden transition-all hover:border-primary/20">
                          <button
                            onClick={() => setExpandedQuestion(isOpen ? null : qd.question.id)}
                            className="flex w-full items-center gap-3 p-4 text-left"
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground">
                              {qd.question.id}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-foreground truncate">{qd.question.question}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{qd.question.category}</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className={cn(
                                "rounded-full px-2 py-0.5 text-xs font-semibold",
                                qd.difficulty > 60 ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                                qd.difficulty > 30 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                                "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                              )}>
                                {qd.difficulty > 60 ? "Sulit" : qd.difficulty > 30 ? "Sedang" : "Mudah"}
                              </span>
                              <span className="text-xs text-muted-foreground">{qd.correctCount}/{results.length}</span>
                              {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                            </div>
                          </button>

                          {isOpen && (
                            <div className="border-t border-border bg-muted/30 p-4 animate-fade-in space-y-3">
                              <p className="text-xs text-foreground leading-relaxed">{qd.question.question}</p>
                              <div className="space-y-1.5">
                                {qd.question.options.map((opt, optIdx) => {
                                  const dist = qd.distribution[optIdx]
                                  const isCorrectOpt = optIdx === qd.question.correctAnswer
                                  return (
                                    <div key={optIdx} className="flex items-center gap-2">
                                      <span className={cn(
                                        "flex h-5 w-5 shrink-0 items-center justify-center rounded text-xs font-bold",
                                        isCorrectOpt ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
                                      )}>
                                        {String.fromCharCode(65 + optIdx)}
                                      </span>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                          <div className="flex-1 h-4 rounded bg-muted overflow-hidden">
                                            <div
                                              className={cn(
                                                "h-full rounded transition-all duration-500",
                                                isCorrectOpt ? "bg-emerald-400 dark:bg-emerald-500" : dist.count > 0 ? "bg-red-300 dark:bg-red-500/60" : "bg-transparent"
                                              )}
                                              style={{ width: `${dist.pct}%` }}
                                            />
                                          </div>
                                          <span className="text-xs text-muted-foreground w-16 text-right shrink-0">{dist.count} ({dist.pct.toFixed(0)}%)</span>
                                        </div>
                                        <p className={cn("text-xs mt-0.5 truncate", isCorrectOpt ? "text-emerald-700 dark:text-emerald-400 font-medium" : "text-muted-foreground")}>{opt}</p>
                                      </div>
                                    </div>
                                  )
                                })}
                                {qd.unanswered > 0 && (
                                  <p className="text-xs text-muted-foreground mt-1">Tidak dijawab: {qd.unanswered} siswa</p>
                                )}
                              </div>
                              <div className="rounded-lg bg-card border border-border p-3">
                                <p className="text-xs font-semibold text-primary mb-1">Pembahasan:</p>
                                <p className="text-xs text-muted-foreground leading-relaxed">{qd.question.explanation}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* === KUNCI JAWABAN TAB === */}
                {activeTab === "kunci" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Kunci jawaban lengkap beserta pembahasan untuk seluruh {quizQuestions.length} soal.</p>
                    <div className="overflow-x-auto rounded-lg border border-border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-muted">
                            <th className="px-3 py-2.5 text-center text-xs font-semibold text-muted-foreground w-12">No</th>
                            <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground">Soal</th>
                            <th className="px-3 py-2.5 text-center text-xs font-semibold text-muted-foreground w-20">Jawaban</th>
                            <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground">Kategori</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {quizQuestions.map((q) => (
                            <tr key={q.id} className="hover:bg-muted/40 transition-colors">
                              <td className="px-3 py-2.5 text-center text-xs font-bold text-foreground">{q.id}</td>
                              <td className="px-3 py-2.5 text-xs text-foreground leading-relaxed max-w-xs">{q.question.slice(0, 100)}{q.question.length > 100 ? "..." : ""}</td>
                              <td className="px-3 py-2.5 text-center">
                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                                  {String.fromCharCode(65 + q.correctAnswer)}
                                </span>
                              </td>
                              <td className="px-3 py-2.5 text-xs text-muted-foreground">{q.category}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Detailed answer key with explanations */}
                    <div className="space-y-3 mt-6">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        Pembahasan Lengkap
                      </h4>
                      {quizQuestions.map((q) => (
                        <div key={q.id} className="rounded-lg border border-border p-4 space-y-2">
                          <div className="flex items-start gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{q.id}</span>
                            <div className="flex-1">
                              <p className="text-xs font-medium text-foreground leading-relaxed">{q.question}</p>
                              <div className="mt-2 space-y-0.5">
                                {q.options.map((opt, idx) => (
                                  <p key={idx} className={cn(
                                    "text-xs leading-relaxed",
                                    idx === q.correctAnswer ? "font-semibold text-emerald-700 dark:text-emerald-400" : "text-muted-foreground"
                                  )}>
                                    {String.fromCharCode(65 + idx)}. {opt} {idx === q.correctAnswer && "(Benar)"}
                                  </p>
                                ))}
                              </div>
                              <div className="mt-2 rounded bg-muted/50 p-2">
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  <span className="font-semibold text-primary">Pembahasan:</span> {q.explanation}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* === REKOMENDASI TINDAK LANJUT TAB === */}
                {activeTab === "rekomendasi" && (
                  <div className="space-y-6">
                    {/* Overall assessment */}
                    <div className={cn(
                      "rounded-lg border-l-4 p-5",
                      analytics.avgPercentage >= 75 ? "border-l-emerald-500 bg-emerald-50 dark:bg-emerald-900/10" :
                      analytics.avgPercentage >= 50 ? "border-l-amber-500 bg-amber-50 dark:bg-amber-900/10" :
                      "border-l-red-500 bg-red-50 dark:bg-red-900/10"
                    )}>
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        Penilaian Keseluruhan
                      </h4>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {analytics.avgPercentage >= 75
                          ? `Secara keseluruhan, siswa sudah menguasai materi dengan baik (rata-rata ${analytics.avgPercentage.toFixed(1)}%). ${analytics.passed} dari ${analytics.totalStudents} siswa telah mencapai KKM. Lanjutkan ke materi pengayaan dan soal HOTS.`
                          : analytics.avgPercentage >= 50
                          ? `Pemahaman siswa masih perlu ditingkatkan (rata-rata ${analytics.avgPercentage.toFixed(1)}%). ${analytics.notPassed} dari ${analytics.totalStudents} siswa belum tuntas. Perlu dilakukan remedial pada topik-topik yang masih lemah.`
                          : `Sebagian besar siswa belum menguasai materi (rata-rata ${analytics.avgPercentage.toFixed(1)}%). ${analytics.notPassed} dari ${analytics.totalStudents} siswa belum tuntas. Perlu dilakukan pengulangan materi secara menyeluruh.`
                        }
                      </p>
                    </div>

                    {/* Per-category action plan */}
                    <div className="rounded-lg bg-muted/50 p-5">
                      <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                        Rencana Tindak Lanjut per Kategori
                      </h4>
                      <div className="space-y-4">
                        {analytics.categoryAnalysis.map((cat) => {
                          const mastery = 100 - cat.errorRate
                          const questionsInCat = quizQuestions.filter((q) => q.category === cat.name)
                          const hardestInCat = analytics.questionErrors
                            ? analytics.questionErrors
                                .filter((qe: { category: string }) => qe.category === cat.name)
                                .sort((a: { errorRate: number }, b: { errorRate: number }) => b.errorRate - a.errorRate)
                                .slice(0, 2)
                            : []

                          return (
                            <div key={cat.name} className="rounded-lg border border-border bg-card p-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Hash className="h-4 w-4 text-muted-foreground" />
                                  <span className="font-semibold text-foreground text-sm">{cat.name}</span>
                                  <span className="text-xs text-muted-foreground">({questionsInCat.length} soal)</span>
                                </div>
                                <span className={cn(
                                  "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                                  mastery >= 75 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                                  mastery >= 50 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                                  "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                )}>
                                  Penguasaan: {mastery.toFixed(0)}%
                                </span>
                              </div>

                              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                <div className={cn(
                                  "h-full rounded-full transition-all duration-700",
                                  mastery >= 75 ? "bg-emerald-500" : mastery >= 50 ? "bg-amber-500" : "bg-red-400"
                                )} style={{ width: `${mastery}%` }} />
                              </div>

                              {hardestInCat.length > 0 && (
                                <div>
                                  <p className="text-xs font-semibold text-muted-foreground mb-1">Soal paling sulit di kategori ini:</p>
                                  <div className="space-y-1">
                                    {hardestInCat.map((qe: { qId: number; question: string; errorRate: number }) => (
                                      <p key={qe.qId} className="text-xs text-muted-foreground">
                                        Soal {qe.qId} - {qe.question.slice(0, 60)}... <span className="text-red-500 font-medium">({qe.errorRate.toFixed(0)}% salah)</span>
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className={cn(
                                "rounded-md p-3 text-xs leading-relaxed",
                                mastery >= 75 ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300" :
                                mastery >= 50 ? "bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300" :
                                "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                              )}>
                                <span className="font-semibold">Rekomendasi: </span>
                                {mastery >= 75
                                  ? `Siswa sudah menguasai materi ${cat.name}. Berikan soal pengayaan tingkat HOTS dan diskusi penerapan konsep dalam kehidupan sehari-hari.`
                                  : mastery >= 50
                                  ? `Lakukan review singkat materi ${cat.name}. Gunakan metode diskusi kelompok dan berikan latihan soal tambahan pada sub-topik yang masih lemah.`
                                  : `Ulangi penjelasan materi ${cat.name} secara menyeluruh. Gunakan media visual, demonstrasi, dan contoh nyata. Lakukan remedial teaching sebelum melanjutkan ke materi berikutnya.`
                                }
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Students needing attention */}
                    {analytics.notPassed > 0 && (
                      <div className="rounded-lg bg-muted/50 p-5">
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          Siswa yang Memerlukan Perhatian Khusus
                        </h4>
                        <div className="space-y-2">
                          {results
                            .filter((r) => (r.score / r.total) * 100 < 75)
                            .sort((a, b) => a.score - b.score)
                            .map((r, i) => {
                              const pct = (r.score / r.total) * 100
                              const wrongCategories = new Map<string, number>()
                              quizQuestions.forEach((q) => {
                                if (r.answers[q.id] !== undefined && r.answers[q.id] !== q.correctAnswer) {
                                  wrongCategories.set(q.category, (wrongCategories.get(q.category) || 0) + 1)
                                }
                              })
                              const weakestCat = Array.from(wrongCategories.entries()).sort((a, b) => b[1] - a[1])
                              return (
                                <div key={`${r.name}-${r.timestamp}`} className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                    {i + 1}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <p className="text-sm font-medium text-foreground">{r.name}</p>
                                      <span className="text-xs font-semibold text-red-500">{pct.toFixed(0)}%</span>
                                    </div>
                                    {weakestCat.length > 0 && (
                                      <p className="mt-1 text-xs text-muted-foreground">
                                        Kelemahan: {weakestCat.slice(0, 3).map(([cat, count]) => `${cat} (${count} salah)`).join(", ")}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                        </div>
                      </div>
                    )}

                    {/* General recommendations */}
                    <div className="rounded-lg bg-muted/50 p-5">
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        Rekomendasi Umum untuk Guru
                      </h4>
                      <div className="space-y-2">
                        {[
                          "Lakukan program remedial untuk siswa yang belum tuntas dengan pendekatan individual atau kelompok kecil.",
                          "Gunakan metode pembelajaran berbasis masalah (Problem-Based Learning) untuk meningkatkan pemahaman konsep.",
                          "Manfaatkan media visual seperti animasi reaksi kimia dan simulasi pH untuk membantu siswa memahami konsep abstrak.",
                          "Berikan tugas proyek sederhana seperti menguji pH bahan-bahan di rumah menggunakan indikator alami.",
                          "Lakukan penilaian formatif berkala untuk memantau progres pemahaman siswa sebelum ujian akhir.",
                          "Ajak siswa berdiskusi tentang penerapan konsep asam-basa dalam kehidupan sehari-hari (makanan, obat, produk rumah tangga).",
                        ].map((rec, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary mt-0.5">
                              {i + 1}
                            </span>
                            <p className="text-xs text-muted-foreground leading-relaxed">{rec}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
