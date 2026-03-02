"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { indicatorData, naturalIndicators } from "@/lib/learning-data"
import { CheckCircle2 } from "lucide-react"

function getIndicatorColor(indicator: typeof indicatorData[0], ph: number) {
  if (ph < indicator.trayekMin) return { color: indicator.acidColor, label: indicator.acidLabel }
  if (ph > indicator.trayekMax) return { color: indicator.baseColor, label: indicator.baseLabel }
  return { color: indicator.neutralColor, label: indicator.neutralLabel }
}

export function IndikatorPage() {
  const [testPh, setTestPh] = useState([7])

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold text-foreground">Indikator Asam Basa</h1>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          Indikator asam basa adalah senyawa yang memberikan warna berbeda dalam larutan asam dan basa.
          Setiap indikator memiliki trayek pH (rentang pH perubahan warna) yang berbeda.
        </p>
      </section>

      {/* Interactive Indicator Test */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-card-foreground">Simulasi Indikator</h3>
          <p className="mt-1 text-sm text-muted-foreground">Geser slider pH untuk melihat perubahan warna setiap indikator</p>

          <div className="mt-4 flex items-center gap-4 rounded-lg bg-muted p-4">
            <span className="text-sm font-medium text-card-foreground shrink-0">pH: {testPh[0]}</span>
            <Slider
              value={testPh}
              onValueChange={setTestPh}
              min={0}
              max={14}
              step={1}
              className="flex-1"
            />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {indicatorData.map((indicator) => {
              const { color, label } = getIndicatorColor(indicator, testPh[0])
              return (
                <div
                  key={indicator.name}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all"
                >
                  <div
                    className="h-10 w-10 shrink-0 rounded-full border-2 border-border/50 transition-colors duration-500"
                    style={{ backgroundColor: color === "transparent" ? "var(--card)" : color }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">{indicator.name}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">
                      Trayek: {indicator.trayekMin} - {indicator.trayekMax}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Trayek Indikator Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-card-foreground">Tabel Indikator Sintesis</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="p-3 text-left font-semibold text-foreground">Indikator</th>
                  <th className="p-3 text-left font-semibold text-foreground">Trayek pH</th>
                  <th className="p-3 text-center font-semibold text-foreground">Warna Asam</th>
                  <th className="p-3 text-center font-semibold text-foreground">Warna Basa</th>
                </tr>
              </thead>
              <tbody className="text-card-foreground">
                {indicatorData.map((indicator) => (
                  <tr key={indicator.name} className="border-b border-border">
                    <td className="p-3 font-medium">{indicator.name}</td>
                    <td className="p-3 font-mono">{indicator.trayekMin} - {indicator.trayekMax}</td>
                    <td className="p-3 text-center">
                      <div className="inline-flex items-center gap-2">
                        <span
                          className="inline-block h-4 w-4 rounded-full border border-border/50"
                          style={{ backgroundColor: indicator.acidColor === "transparent" ? "var(--card)" : indicator.acidColor }}
                        />
                        <span className="text-xs">{indicator.acidLabel}</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="inline-flex items-center gap-2">
                        <span
                          className="inline-block h-4 w-4 rounded-full border border-border/50"
                          style={{ backgroundColor: indicator.baseColor === "transparent" ? "var(--card)" : indicator.baseColor }}
                        />
                        <span className="text-xs">{indicator.baseLabel}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Trayek Visual */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-card-foreground">Visualisasi Trayek pH</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Garis berwarna menunjukkan rentang pH di mana indikator mengalami perubahan warna
          </p>

          {/* pH scale header */}
          <div className="mt-4 flex pl-32">
            {Array.from({ length: 15 }, (_, i) => (
              <div key={i} className="flex flex-1 justify-center text-xs font-mono text-muted-foreground">
                {i}
              </div>
            ))}
          </div>

          <div className="mt-2 space-y-2">
            {indicatorData.map((indicator) => (
              <div key={indicator.name} className="flex items-center gap-2">
                <span className="w-30 shrink-0 text-xs font-medium text-card-foreground truncate">
                  {indicator.name}
                </span>
                <div className="relative flex-1 h-6">
                  {/* Background */}
                  <div className="absolute inset-0 rounded bg-muted" />
                  {/* Trayek bar */}
                  <div
                    className="absolute top-0 h-full rounded transition-all"
                    style={{
                      left: `${(indicator.trayekMin / 14) * 100}%`,
                      width: `${((indicator.trayekMax - indicator.trayekMin) / 14) * 100}%`,
                      background: `linear-gradient(to right, ${indicator.acidColor === "transparent" ? "#e5e7eb" : indicator.acidColor}, ${indicator.baseColor === "transparent" ? "#e5e7eb" : indicator.baseColor})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Natural Indicators */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-card-foreground">Indikator Alami</h3>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            Beberapa bahan alam dapat digunakan sebagai indikator asam-basa. Warna yang dihasilkan berbeda-beda 
            tergantung sifat larutan yang diuji.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {naturalIndicators.map((ni) => (
              <div key={ni.name} className="rounded-lg border border-border p-4">
                <p className="font-semibold text-card-foreground">{ni.name}</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="h-8 w-8 rounded-full border border-border/50"
                      style={{ backgroundColor: ni.acidColor }}
                    />
                    <span className="text-xs text-muted-foreground">Asam</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="h-8 w-8 rounded-full border border-border/50"
                      style={{ backgroundColor: ni.neutralColor }}
                    />
                    <span className="text-xs text-muted-foreground">Netral</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="h-8 w-8 rounded-full border border-border/50"
                      style={{ backgroundColor: ni.baseColor }}
                    />
                    <span className="text-xs text-muted-foreground">Basa</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Indikator Universal */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-card-foreground">Indikator Universal</h3>
          <p className="mt-2 text-card-foreground leading-relaxed">
            Indikator universal adalah campuran beberapa indikator yang memberikan perubahan warna pada rentang pH yang luas (0-14). 
            Tersedia dalam bentuk larutan dan kertas.
          </p>
          <div className="mt-4 flex h-10 overflow-hidden rounded-lg">
            {[
              "#ef4444","#f87171","#fb923c","#f97316","#facc15",
              "#eab308","#a3e635","#22c55e","#4ade80","#2dd4bf",
              "#38bdf8","#3b82f6","#6366f1","#8b5cf6","#7c3aed"
            ].map((color, i) => (
              <div
                key={i}
                className="flex flex-1 items-center justify-center text-xs font-bold"
                style={{ backgroundColor: color, color: i < 5 || i > 11 ? "#fff" : "#000" }}
              >
                {i}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Sangat Asam</span>
            <span>Netral</span>
            <span>Sangat Basa</span>
          </div>
        </CardContent>
      </Card>

      {/* Key Takeaways */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-6">
          <h3 className="flex items-center gap-2 font-bold text-primary">
            <CheckCircle2 className="h-5 w-5" />
            Poin Penting
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-card-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Setiap indikator memiliki trayek pH (rentang perubahan warna) yang berbeda
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Lakmus: merah dalam asam, biru dalam basa
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Fenolftalein: tak berwarna dalam asam, merah muda dalam basa (pH 8.3-10)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Indikator alami (kol ungu, kunyit, bunga sepatu) juga dapat digunakan
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Indikator universal memberikan warna berbeda pada setiap nilai pH (0-14)
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
