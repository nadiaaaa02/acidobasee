"use client"

import { useState, useEffect, useCallback } from "react"
import { Sidebar } from "@/components/sidebar"
import { BerandaPage } from "@/components/pages/beranda-page"
import { TeoriPage } from "@/components/pages/teori-page"
import { KesetimbanganPage } from "@/components/pages/kesetimbangan-page"
import { KekuatanPage } from "@/components/pages/kekuatan-page"
import { PhPage } from "@/components/pages/ph-page"
import { IndikatorPage } from "@/components/pages/indikator-page"
import { LatihanPage } from "@/components/pages/latihan-page"
import { GlosariumPage } from "@/components/pages/glosarium-page"
import { DasborPage } from "@/components/pages/dasbor-page"
import type { PageId, StudentResult } from "@/lib/learning-data"

const PAGE_ORDER: PageId[] = [
  "beranda", "teori", "kesetimbangan", "kekuatan", "ph", "indikator", "latihan", "glosarium", "dasbor"
]

export default function Home() {
  const [activePage, setActivePage] = useState<PageId>("beranda")
  const [isDark, setIsDark] = useState(false)
  const [visitedPages, setVisitedPages] = useState<Set<PageId>>(new Set(["beranda"]))
  const [studentResults, setStudentResults] = useState<StudentResult[]>([])
  const [resultsLoaded, setResultsLoaded] = useState(false)

  // Load saved results from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("kimia-student-results")
      if (saved) {
        const parsed: StudentResult[] = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setStudentResults(parsed)
        }
      }
    } catch {
      // ignore parse errors
    }
    setResultsLoaded(true)
  }, [])

  // Save results to localStorage whenever they change
  useEffect(() => {
    if (!resultsLoaded) return
    try {
      localStorage.setItem("kimia-student-results", JSON.stringify(studentResults))
    } catch {
      // ignore storage errors
    }
  }, [studentResults, resultsLoaded])

  // Initialize dark mode from system preference
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDark(prefersDark)
  }, [])

  // Apply dark class to html element
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  const handleNavigate = useCallback((page: PageId) => {
    setActivePage(page)
    setVisitedPages((prev) => new Set([...prev, page]))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleSubmitResult = useCallback((result: StudentResult) => {
    setStudentResults((prev) => [...prev, result])
  }, [])

  const handleClearResults = useCallback(() => {
    setStudentResults([])
  }, [])

  const progress = (visitedPages.size / PAGE_ORDER.length) * 100

  function renderPage() {
    switch (activePage) {
      case "beranda":
        return <BerandaPage onNavigate={handleNavigate} />
      case "teori":
        return <TeoriPage />
      case "kesetimbangan":
        return <KesetimbanganPage />
      case "kekuatan":
        return <KekuatanPage />
      case "ph":
        return <PhPage />
      case "indikator":
        return <IndikatorPage />
      case "latihan":
        return <LatihanPage onSubmitResult={handleSubmitResult} />
      case "glosarium":
        return <GlosariumPage />
      case "dasbor":
        return <DasborPage results={studentResults} onClearResults={handleClearResults} />
      default:
        return <BerandaPage onNavigate={handleNavigate} />
    }
  }

  // Find prev/next pages for navigation footer
  const currentIndex = PAGE_ORDER.indexOf(activePage)
  const prevPage = currentIndex > 0 ? PAGE_ORDER[currentIndex - 1] : null
  const nextPage = currentIndex < PAGE_ORDER.length - 1 ? PAGE_ORDER[currentIndex + 1] : null

  const pageLabels: Record<PageId, string> = {
    beranda: "Beranda",
    teori: "Teori Asam Basa",
    kesetimbangan: "Kesetimbangan Ion",
    kekuatan: "Kekuatan Asam Basa",
    ph: "Derajat Keasaman",
    indikator: "Indikator Asam Basa",
    latihan: "Latihan Soal",
    glosarium: "Glosarium",
    dasbor: "Dasbor Guru",
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        progress={progress}
        isDark={isDark}
        onToggleDark={() => setIsDark((d) => !d)}
      />

      {/* Main content */}
      <main className="min-h-screen lg:pl-72">
        <div className="mx-auto max-w-4xl px-4 py-8 pt-16 lg:px-8 lg:pt-8">
          <div key={activePage} className="animate-fade-in-up">
            {renderPage()}
          </div>

          {/* Page navigation footer */}
          <div className="animate-fade-in mt-12 flex items-center justify-between border-t border-border pt-6">
            {prevPage ? (
              <button
                onClick={() => handleNavigate(prevPage)}
                className="group flex flex-col items-start text-left transition-transform hover:-translate-x-1"
              >
                <span className="text-xs text-muted-foreground">Sebelumnya</span>
                <span className="mt-0.5 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {pageLabels[prevPage]}
                </span>
              </button>
            ) : (
              <div />
            )}

            {nextPage ? (
              <button
                onClick={() => handleNavigate(nextPage)}
                className="group flex flex-col items-end text-right transition-transform hover:translate-x-1"
              >
                <span className="text-xs text-muted-foreground">Selanjutnya</span>
                <span className="mt-0.5 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {pageLabels[nextPage]}
                </span>
              </button>
            ) : (
              <div />
            )}
          </div>

          {/* Footer */}
          <footer className="mt-8 border-t border-border py-6 text-center text-xs text-muted-foreground">
            <p>Website Pembelajaran Kimia Kelas XI - Larutan Asam dan Basa</p>
          </footer>
        </div>
      </main>
    </div>
  )
}
