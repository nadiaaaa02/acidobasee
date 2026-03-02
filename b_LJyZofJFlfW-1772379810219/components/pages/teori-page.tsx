"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Lightbulb, ArrowRight, CheckCircle2 } from "lucide-react"

type Theory = "arrhenius" | "bronstedLowry" | "lewis"

const theories: { id: Theory; title: string; subtitle: string }[] = [
  { id: "arrhenius", title: "Arrhenius", subtitle: "Svante Arrhenius (1887)" },
  { id: "bronstedLowry", title: "Bronsted-Lowry", subtitle: "J.N. Bronsted & T.M. Lowry (1923)" },
  { id: "lewis", title: "Lewis", subtitle: "Gilbert N. Lewis (1923)" },
]

export function TeoriPage() {
  const [activeTheory, setActiveTheory] = useState<Theory>("arrhenius")

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold text-foreground">Teori Asam Basa</h1>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          Sepanjang sejarah, konsep asam dan basa telah berkembang melalui tiga teori utama. Masing-masing teori
          memberikan perspektif yang berbeda dan semakin luas dalam menjelaskan sifat asam-basa suatu zat.
        </p>
      </section>

      {/* Theory Tabs */}
      <div className="flex flex-wrap gap-2">
        {theories.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTheory(t.id)}
            className={cn(
              "rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
              activeTheory === t.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {t.title}
          </button>
        ))}
      </div>

      {/* Arrhenius */}
      {activeTheory === "arrhenius" && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h3 className="text-lg font-bold text-card-foreground">Teori Arrhenius (1887)</h3>
                  <p className="mt-2 text-card-foreground leading-relaxed">
                    Menurut Svante Arrhenius, definisi asam dan basa didasarkan pada perilaku zat dalam pelarut air (akuatik).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-acid/30 bg-acid/5">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-acid">Asam Arrhenius</h4>
                <p className="mt-2 text-card-foreground leading-relaxed">
                  Zat yang dalam air dapat menghasilkan ion hidrogen (H&#8314;).
                </p>
                <div className="mt-4 space-y-2 rounded-lg bg-card p-4 font-mono text-sm text-card-foreground">
                  <p>{"HCl(aq) \u2192 H\u207A(aq) + Cl\u207B(aq)"}</p>
                  <p>{"H\u2082SO\u2084(aq) \u2192 2H\u207A(aq) + SO\u2084\u00B2\u207B(aq)"}</p>
                  <p>{"CH\u2083COOH(aq) \u21CC H\u207A(aq) + CH\u2083COO\u207B(aq)"}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-base/30 bg-base/5">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-base">Basa Arrhenius</h4>
                <p className="mt-2 text-card-foreground leading-relaxed">
                  Zat yang dalam air dapat menghasilkan ion hidroksida (OH&#8315;).
                </p>
                <div className="mt-4 space-y-2 rounded-lg bg-card p-4 font-mono text-sm text-card-foreground">
                  <p>{"NaOH(aq) \u2192 Na\u207A(aq) + OH\u207B(aq)"}</p>
                  <p>{"Ca(OH)\u2082(aq) \u2192 Ca\u00B2\u207A(aq) + 2OH\u207B(aq)"}</p>
                  <p>{"Ba(OH)\u2082(aq) \u2192 Ba\u00B2\u207A(aq) + 2OH\u207B(aq)"}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <h4 className="font-bold text-card-foreground">Keterbatasan Teori Arrhenius</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  Hanya berlaku dalam pelarut air (larutan akuatik)
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  Tidak dapat menjelaskan sifat basa NH&#8323; yang tidak memiliki gugus OH&#8315;
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  Tidak berlaku untuk reaksi asam-basa dalam fase gas atau pelarut lain
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bronsted-Lowry */}
      {activeTheory === "bronstedLowry" && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h3 className="text-lg font-bold text-card-foreground">Teori Bronsted-Lowry (1923)</h3>
                  <p className="mt-2 text-card-foreground leading-relaxed">
                    Johannes Bronsted dan Thomas Lowry mendefinisikan asam-basa berdasarkan transfer proton (H&#8314;), sehingga teori ini lebih luas dibandingkan Arrhenius.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-acid/30 bg-acid/5">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-acid">Asam Bronsted-Lowry</h4>
                <p className="mt-2 text-card-foreground leading-relaxed">
                  Spesi yang <span className="font-semibold">mendonorkan proton</span> (H&#8314;) kepada spesi lain. Disebut juga <em>donor proton</em>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-base/30 bg-base/5">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-base">Basa Bronsted-Lowry</h4>
                <p className="mt-2 text-card-foreground leading-relaxed">
                  Spesi yang <span className="font-semibold">menerima proton</span> (H&#8314;) dari spesi lain. Disebut juga <em>akseptor proton</em>.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Conjugate pair example */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-bold text-card-foreground">Pasangan Asam-Basa Konjugasi</h4>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Setiap reaksi asam-basa Bronsted-Lowry menghasilkan pasangan konjugasi. Asam konjugasi adalah basa yang telah menerima H&#8314;, dan basa konjugasi adalah asam yang telah melepaskan H&#8314;.
              </p>

              <div className="mt-4 overflow-x-auto rounded-lg bg-muted p-5">
                <div className="min-w-[400px] space-y-4 font-mono text-sm">
                  <div className="text-card-foreground">
                    <p className="text-center">{"NH\u2083(aq) + H\u2082O(l) \u21CC NH\u2084\u207A(aq) + OH\u207B(aq)"}</p>
                    <div className="mt-3 flex justify-center gap-8 text-xs">
                      <span className="rounded bg-base/20 px-2 py-1 text-base">Basa</span>
                      <span className="rounded bg-acid/20 px-2 py-1 text-acid">Asam</span>
                      <span className="rounded bg-acid/20 px-2 py-1 text-acid">Asam konj.</span>
                      <span className="rounded bg-base/20 px-2 py-1 text-base">Basa konj.</span>
                    </div>
                  </div>
                  <hr className="border-border" />
                  <div className="text-card-foreground">
                    <p className="text-center">{"HCl(aq) + H\u2082O(l) \u2192 H\u2083O\u207A(aq) + Cl\u207B(aq)"}</p>
                    <div className="mt-3 flex justify-center gap-8 text-xs">
                      <span className="rounded bg-acid/20 px-2 py-1 text-acid">Asam</span>
                      <span className="rounded bg-base/20 px-2 py-1 text-base">Basa</span>
                      <span className="rounded bg-acid/20 px-2 py-1 text-acid">Asam konj.</span>
                      <span className="rounded bg-base/20 px-2 py-1 text-base">Basa konj.</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h4 className="font-bold text-card-foreground">Zat Amfiprotik</h4>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Zat yang dapat berperan sebagai asam maupun basa disebut <span className="font-semibold text-foreground">amfiprotik</span>. Contoh: H&#8322;O, HCO&#8323;&#8315;, HSO&#8324;&#8315;.
              </p>
              <div className="mt-4 space-y-2 rounded-lg bg-muted p-4 font-mono text-sm text-card-foreground">
                <p>{"Sebagai asam: H\u2082O + NH\u2083 \u21CC OH\u207B + NH\u2084\u207A"}</p>
                <p>{"Sebagai basa: H\u2082O + HCl \u2192 H\u2083O\u207A + Cl\u207B"}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Lewis */}
      {activeTheory === "lewis" && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h3 className="text-lg font-bold text-card-foreground">Teori Lewis (1923)</h3>
                  <p className="mt-2 text-card-foreground leading-relaxed">
                    Gilbert N. Lewis mendefinisikan asam-basa berdasarkan transfer pasangan elektron. Teori ini paling luas cakupannya karena tidak memerlukan adanya proton.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-acid/30 bg-acid/5">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-acid">Asam Lewis</h4>
                <p className="mt-2 text-card-foreground leading-relaxed">
                  Spesi yang <span className="font-semibold">menerima pasangan elektron</span> (akseptor elektron). Biasanya memiliki orbital kosong.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Contoh: BF&#8323;, AlCl&#8323;, H&#8314;, Fe&#179;&#8314;
                </p>
              </CardContent>
            </Card>

            <Card className="border-base/30 bg-base/5">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-base">Basa Lewis</h4>
                <p className="mt-2 text-card-foreground leading-relaxed">
                  Spesi yang <span className="font-semibold">mendonorkan pasangan elektron</span> (donor elektron). Biasanya memiliki pasangan elektron bebas.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Contoh: NH&#8323;, H&#8322;O, OH&#8315;, F&#8315;
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <h4 className="font-bold text-card-foreground">Contoh Reaksi Lewis</h4>
              <div className="mt-4 space-y-4 rounded-lg bg-muted p-5 font-mono text-sm text-card-foreground">
                <div>
                  <p>{"BF\u2083 + F\u207B \u2192 BF\u2084\u207B"}</p>
                  <p className="mt-1 text-xs text-muted-foreground font-sans">
                    BF&#8323; (asam Lewis, menerima elektron) + F&#8315; (basa Lewis, mendonorkan elektron)
                  </p>
                </div>
                <hr className="border-border" />
                <div>
                  <p>{"H\u2082O + CO\u2082 \u2192 H\u2082CO\u2083"}</p>
                  <p className="mt-1 text-xs text-muted-foreground font-sans">
                    H&#8322;O (basa Lewis) memberikan pasangan elektron kepada CO&#8322; (asam Lewis)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Comparison Table */}
      <section>
        <h2 className="text-xl font-bold text-foreground">Perbandingan Tiga Teori</h2>
        <Card className="mt-4">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="p-4 text-left font-semibold text-foreground">Aspek</th>
                    <th className="p-4 text-left font-semibold text-foreground">Arrhenius</th>
                    <th className="p-4 text-left font-semibold text-foreground">Bronsted-Lowry</th>
                    <th className="p-4 text-left font-semibold text-foreground">Lewis</th>
                  </tr>
                </thead>
                <tbody className="text-card-foreground">
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium">Definisi Asam</td>
                    <td className="p-4">Menghasilkan H&#8314; dalam air</td>
                    <td className="p-4">Donor proton</td>
                    <td className="p-4">Akseptor pasangan elektron</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium">Definisi Basa</td>
                    <td className="p-4">Menghasilkan OH&#8315; dalam air</td>
                    <td className="p-4">Akseptor proton</td>
                    <td className="p-4">Donor pasangan elektron</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium">Pelarut</td>
                    <td className="p-4">Hanya air</td>
                    <td className="p-4">Semua pelarut</td>
                    <td className="p-4">Semua pelarut</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Cakupan</td>
                    <td className="p-4">Paling sempit</td>
                    <td className="p-4">Lebih luas</td>
                    <td className="p-4">Paling luas</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Key takeaways */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-6">
          <h3 className="flex items-center gap-2 font-bold text-primary">
            <CheckCircle2 className="h-5 w-5" />
            Poin Penting
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-card-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Arrhenius: Asam = penghasil H&#8314;, Basa = penghasil OH&#8315; (hanya dalam air)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Bronsted-Lowry: Asam = donor proton, Basa = akseptor proton
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Lewis: Asam = akseptor pasangan elektron, Basa = donor pasangan elektron
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Zat amfiprotik (seperti H&#8322;O) dapat berlaku sebagai asam maupun basa
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
