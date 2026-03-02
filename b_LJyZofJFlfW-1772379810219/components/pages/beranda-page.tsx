"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, Beaker, BookOpen, FlaskConical, BarChart3, Palette } from "lucide-react"
import type { PageId } from "@/lib/learning-data"

function getPHInfo(ph: number) {
  if (ph < 3) return { label: "Asam Kuat", color: "#ef4444", desc: "Sangat korosif, contoh: HCl, H\u2082SO\u2084" }
  if (ph < 6) return { label: "Asam Lemah", color: "#f97316", desc: "Sedikit asam, contoh: CH\u2083COOH, H\u2082CO\u2083" }
  if (ph < 8) return { label: "Netral", color: "#22c55e", desc: "Tidak asam & tidak basa, contoh: air murni" }
  if (ph < 11) return { label: "Basa Lemah", color: "#3b82f6", desc: "Sedikit basa, contoh: NaHCO\u2083, NH\u2083" }
  return { label: "Basa Kuat", color: "#7c3aed", desc: "Sangat kaustik, contoh: NaOH, KOH" }
}

function getPHColor(ph: number) {
  if (ph <= 1) return "#ef4444"
  if (ph <= 2) return "#f87171"
  if (ph <= 3) return "#fb923c"
  if (ph <= 4) return "#f97316"
  if (ph <= 5) return "#facc15"
  if (ph <= 6) return "#eab308"
  if (ph <= 7) return "#22c55e"
  if (ph <= 8) return "#4ade80"
  if (ph <= 9) return "#2dd4bf"
  if (ph <= 10) return "#38bdf8"
  if (ph <= 11) return "#3b82f6"
  if (ph <= 12) return "#6366f1"
  if (ph <= 13) return "#8b5cf6"
  return "#7c3aed"
}

interface BerandaPageProps {
  onNavigate: (page: PageId) => void
}

export function BerandaPage({ onNavigate }: BerandaPageProps) {
  const [phValue, setPhValue] = useState([7])
  const phInfo = getPHInfo(phValue[0])

  const features = [
    { icon: BookOpen, label: "Teori Asam Basa", desc: "Arrhenius, Bronsted-Lowry, Lewis", page: "teori" as PageId },
    { icon: FlaskConical, label: "Kekuatan Asam Basa", desc: "Asam kuat, lemah, basa kuat, lemah", page: "kekuatan" as PageId },
    { icon: BarChart3, label: "Derajat Keasaman", desc: "Perhitungan pH dan pOH", page: "ph" as PageId },
    { icon: Palette, label: "Indikator", desc: "Alami dan sintesis", page: "indikator" as PageId },
  ]

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="animate-fade-in-up relative overflow-hidden rounded-2xl bg-card p-8 shadow-sm md:p-12">
        <div className="absolute inset-0 opacity-10" style={{
          background: "linear-gradient(135deg, #ef4444 0%, #f97316 15%, #eab308 30%, #22c55e 50%, #3b82f6 70%, #6366f1 85%, #7c3aed 100%)"
        }} />
        <div className="relative">
          <div className="flex items-center gap-2 text-primary">
            <Beaker className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Kimia Kelas XI</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-card-foreground md:text-5xl text-balance">
            Larutan Asam dan Basa
          </h1>
          <p className="mt-3 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Memahami Teori, Kesetimbangan, pH, dan Indikator asam basa melalui pembelajaran interaktif.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => onNavigate("teori")}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
            >
              Mulai Belajar <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onNavigate("latihan")}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium text-card-foreground transition-all hover:bg-muted hover:scale-[1.02] active:scale-[0.98]"
            >
              Kerjakan Latihan Soal
            </button>
          </div>
        </div>
      </section>

      {/* Interactive pH Scale */}
      <section className="animate-fade-in-up stagger-2">
        <h2 className="text-xl font-bold text-foreground">Skala pH Interaktif</h2>
        <p className="mt-1 text-sm text-muted-foreground">Geser slider untuk menjelajahi skala pH 0-14</p>
        <Card className="mt-4">
          <CardContent className="p-6 md:p-8">
            {/* pH Scale visual */}
            <div className="mb-6 flex h-10 overflow-hidden rounded-lg">
              {Array.from({ length: 15 }, (_, i) => (
                <div
                  key={i}
                  className="relative flex flex-1 items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: getPHColor(i), color: i < 6 || i > 10 ? "#fff" : "#000" }}
                >
                  {i}
                  {phValue[0] === i && (
                    <div className="absolute -bottom-1 h-3 w-3 rotate-45 bg-card border-b-2 border-r-2 border-foreground/20" />
                  )}
                </div>
              ))}
            </div>

            <Slider
              value={phValue}
              onValueChange={setPhValue}
              min={0}
              max={14}
              step={1}
              className="my-6"
            />

            <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/50 p-5">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white"
                style={{ backgroundColor: phInfo.color }}
              >
                {phValue[0]}
              </div>
              <div>
                <p className="text-lg font-bold text-foreground" style={{ color: phInfo.color }}>{phInfo.label}</p>
                <p className="text-sm text-muted-foreground">{phInfo.desc}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {"[H\u207A] = 10"}<sup>{-phValue[0]}</sup>{" M | [OH\u207B] = 10"}<sup>{-(14 - phValue[0])}</sup>{" M"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Feature cards */}
      <section className="animate-fade-in-up stagger-4">
        <h2 className="text-xl font-bold text-foreground">Materi Pembelajaran</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {features.map(({ icon: Icon, label, desc, page }, i) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`group flex items-start gap-4 rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-primary/30 hover:shadow-md hover:-translate-y-1 animate-scale-in stagger-${i + 4}`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-card-foreground">{label}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
