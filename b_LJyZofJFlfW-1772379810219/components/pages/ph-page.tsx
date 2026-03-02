"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Calculator, CheckCircle2 } from "lucide-react"

type CalcType = "asamKuat" | "asamLemah" | "basaKuat" | "basaLemah"

const calcTabs: { id: CalcType; label: string }[] = [
  { id: "asamKuat", label: "Asam Kuat" },
  { id: "asamLemah", label: "Asam Lemah" },
  { id: "basaKuat", label: "Basa Kuat" },
  { id: "basaLemah", label: "Basa Lemah" },
]

export function PhPage() {
  const [calcType, setCalcType] = useState<CalcType>("asamKuat")
  const [molaritas, setMolaritas] = useState("")
  const [valensi, setValensi] = useState("1")
  const [ka, setKa] = useState("")
  const [kb, setKb] = useState("")

  function calculateResult() {
    const m = parseFloat(molaritas)
    const v = parseInt(valensi)
    if (isNaN(m) || m <= 0) return null

    switch (calcType) {
      case "asamKuat": {
        if (isNaN(v) || v <= 0) return null
        const hPlus = m * v
        const pH = -Math.log10(hPlus)
        const pOH = 14 - pH
        const ohMinus = Math.pow(10, -pOH)
        return { hPlus, ohMinus, pH, pOH }
      }
      case "asamLemah": {
        const kaVal = parseFloat(ka)
        if (isNaN(kaVal) || kaVal <= 0) return null
        const hPlus = Math.sqrt(kaVal * m)
        const pH = -Math.log10(hPlus)
        const pOH = 14 - pH
        const ohMinus = Math.pow(10, -pOH)
        return { hPlus, ohMinus, pH, pOH }
      }
      case "basaKuat": {
        if (isNaN(v) || v <= 0) return null
        const ohMinus = m * v
        const pOH = -Math.log10(ohMinus)
        const pH = 14 - pOH
        const hPlus = Math.pow(10, -pH)
        return { hPlus, ohMinus, pH, pOH }
      }
      case "basaLemah": {
        const kbVal = parseFloat(kb)
        if (isNaN(kbVal) || kbVal <= 0) return null
        const ohMinus = Math.sqrt(kbVal * m)
        const pOH = -Math.log10(ohMinus)
        const pH = 14 - pOH
        const hPlus = Math.pow(10, -pH)
        return { hPlus, ohMinus, pH, pOH }
      }
    }
  }

  const result = calculateResult()

  function formatSci(num: number) {
    if (num >= 0.01 && num <= 1000) return num.toPrecision(4)
    return num.toExponential(2)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold text-foreground">Derajat Keasaman (pH)</h1>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          Hitung pH dan pOH larutan asam maupun basa. Gunakan kalkulator interaktif di bawah ini.
        </p>
      </section>

      {/* Rumus Ringkasan */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-acid/30 bg-acid/5">
          <CardContent className="p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-acid">Asam Kuat</p>
            <p className="mt-2 font-mono text-sm text-card-foreground">{"[H\u207A] = Ma \u00D7 a"}</p>
          </CardContent>
        </Card>
        <Card className="border-acid/20 bg-acid/5">
          <CardContent className="p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-acid/70">Asam Lemah</p>
            <p className="mt-2 font-mono text-sm text-card-foreground">{"[H\u207A] = \u221A(Ka\u00B7Ma)"}</p>
          </CardContent>
        </Card>
        <Card className="border-base/30 bg-base/5">
          <CardContent className="p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-base">Basa Kuat</p>
            <p className="mt-2 font-mono text-sm text-card-foreground">{"[OH\u207B] = Mb \u00D7 b"}</p>
          </CardContent>
        </Card>
        <Card className="border-base/20 bg-base/5">
          <CardContent className="p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-base/70">Basa Lemah</p>
            <p className="mt-2 font-mono text-sm text-card-foreground">{"[OH\u207B] = \u221A(Kb\u00B7Mb)"}</p>
          </CardContent>
        </Card>
      </div>

      {/* Calculator */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold text-card-foreground">Kalkulator pH</h3>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex flex-wrap gap-2">
            {calcTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCalcType(tab.id)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  calcType === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Input fields */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="molaritas" className="text-card-foreground">
                Molaritas (M)
              </Label>
              <Input
                id="molaritas"
                type="number"
                step="any"
                min="0"
                placeholder="contoh: 0.1"
                value={molaritas}
                onChange={(e) => setMolaritas(e.target.value)}
                className="mt-1"
              />
            </div>

            {(calcType === "asamKuat" || calcType === "basaKuat") && (
              <div>
                <Label htmlFor="valensi" className="text-card-foreground">
                  Valensi ({calcType === "asamKuat" ? "a" : "b"})
                </Label>
                <Input
                  id="valensi"
                  type="number"
                  min="1"
                  max="3"
                  placeholder="contoh: 1"
                  value={valensi}
                  onChange={(e) => setValensi(e.target.value)}
                  className="mt-1"
                />
              </div>
            )}

            {calcType === "asamLemah" && (
              <div>
                <Label htmlFor="ka" className="text-card-foreground">
                  Ka (tetapan ionisasi)
                </Label>
                <Input
                  id="ka"
                  type="number"
                  step="any"
                  min="0"
                  placeholder="contoh: 1.8e-5"
                  value={ka}
                  onChange={(e) => setKa(e.target.value)}
                  className="mt-1"
                />
              </div>
            )}

            {calcType === "basaLemah" && (
              <div>
                <Label htmlFor="kb" className="text-card-foreground">
                  Kb (tetapan ionisasi)
                </Label>
                <Input
                  id="kb"
                  type="number"
                  step="any"
                  min="0"
                  placeholder="contoh: 1.8e-5"
                  value={kb}
                  onChange={(e) => setKb(e.target.value)}
                  className="mt-1"
                />
              </div>
            )}
          </div>

          {/* Result */}
          {result && (
            <div className="mt-6 rounded-xl border-2 border-primary/30 bg-primary/5 p-6">
              <h4 className="font-bold text-primary">Hasil Perhitungan</h4>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-card p-4 text-center shadow-sm">
                  <p className="text-xs text-muted-foreground">pH</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">{result.pH.toFixed(2)}</p>
                </div>
                <div className="rounded-lg bg-card p-4 text-center shadow-sm">
                  <p className="text-xs text-muted-foreground">pOH</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">{result.pOH.toFixed(2)}</p>
                </div>
                <div className="rounded-lg bg-card p-4 text-center shadow-sm">
                  <p className="text-xs text-muted-foreground">[H&#8314;]</p>
                  <p className="mt-1 text-lg font-bold font-mono text-foreground">{formatSci(result.hPlus)} M</p>
                </div>
                <div className="rounded-lg bg-card p-4 text-center shadow-sm">
                  <p className="text-xs text-muted-foreground">[OH&#8315;]</p>
                  <p className="mt-1 text-lg font-bold font-mono text-foreground">{formatSci(result.ohMinus)} M</p>
                </div>
              </div>

              {/* Visual pH bar */}
              <div className="mt-4">
                <div className="flex h-8 overflow-hidden rounded-lg">
                  {Array.from({ length: 15 }, (_, i) => {
                    const colors = ["#ef4444","#f87171","#fb923c","#f97316","#facc15","#eab308","#a3e635","#22c55e","#4ade80","#2dd4bf","#38bdf8","#3b82f6","#6366f1","#8b5cf6","#7c3aed"]
                    return (
                      <div
                        key={i}
                        className="flex flex-1 items-center justify-center text-xs font-bold"
                        style={{
                          backgroundColor: colors[i],
                          color: i < 5 || i > 11 ? "#fff" : "#000",
                          opacity: Math.abs(i - result.pH) < 0.6 ? 1 : 0.3,
                          transform: Math.abs(i - result.pH) < 0.6 ? "scaleY(1.2)" : "scaleY(1)",
                        }}
                      >
                        {i}
                      </div>
                    )
                  })}
                </div>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Larutan bersifat{" "}
                  <span className="font-semibold text-foreground">
                    {result.pH < 7 ? "asam" : result.pH > 7 ? "basa" : "netral"}
                  </span>
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contoh Soal */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-card-foreground">Contoh Soal dan Penyelesaian</h3>

          <div className="mt-4 space-y-6">
            <div className="rounded-lg border border-border p-4">
              <p className="font-semibold text-card-foreground">Soal 1: Hitunglah pH larutan HCl 0,01 M!</p>
              <div className="mt-3 space-y-1 rounded-lg bg-muted p-4 font-mono text-sm text-card-foreground">
                <p>{"HCl \u2192 asam kuat, \u03B1 = 1, a = 1"}</p>
                <p>{"[H\u207A] = Ma \u00D7 a = 0,01 \u00D7 1 = 0,01 M"}</p>
                <p>{"pH = -log [H\u207A] = -log 0,01 = -log 10\u207B\u00B2 = 2"}</p>
              </div>
            </div>

            <div className="rounded-lg border border-border p-4">
              <p className="font-semibold text-card-foreground">{"Soal 2: Hitunglah pH larutan CH\u2083COOH 0,1 M (Ka = 10\u207B\u2075)!"}</p>
              <div className="mt-3 space-y-1 rounded-lg bg-muted p-4 font-mono text-sm text-card-foreground">
                <p>{"CH\u2083COOH \u2192 asam lemah"}</p>
                <p>{"[H\u207A] = \u221A(Ka \u00D7 Ma) = \u221A(10\u207B\u2075 \u00D7 0,1)"}</p>
                <p>{"[H\u207A] = \u221A(10\u207B\u2076) = 10\u207B\u00B3 M"}</p>
                <p>{"pH = -log 10\u207B\u00B3 = 3"}</p>
              </div>
            </div>

            <div className="rounded-lg border border-border p-4">
              <p className="font-semibold text-card-foreground">{"Soal 3: Hitunglah pH larutan Ca(OH)\u2082 0,05 M!"}</p>
              <div className="mt-3 space-y-1 rounded-lg bg-muted p-4 font-mono text-sm text-card-foreground">
                <p>{"Ca(OH)\u2082 \u2192 basa kuat, b = 2"}</p>
                <p>{"[OH\u207B] = Mb \u00D7 b = 0,05 \u00D7 2 = 0,1 M"}</p>
                <p>{"pOH = -log 0,1 = 1"}</p>
                <p>{"pH = 14 - pOH = 14 - 1 = 13"}</p>
              </div>
            </div>
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
              {"pH = -log[H\u207A] dan pOH = -log[OH\u207B]"}
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              pH + pOH = 14 (pada 25&#176;C)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {"pH < 7: asam, pH = 7: netral, pH > 7: basa"}
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {"Asam kuat: [H\u207A] = Ma \u00D7 a | Asam lemah: [H\u207A] = \u221A(Ka \u00D7 Ma)"}
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
