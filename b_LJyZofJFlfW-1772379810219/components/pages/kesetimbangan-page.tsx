"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, CheckCircle2, ArrowRight } from "lucide-react"

export function KesetimbanganPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold text-foreground">Kesetimbangan Ion Air</h1>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          Memahami kesetimbangan ionisasi air dan hubungan antara konsentrasi ion H&#8314; dan OH&#8315;.
        </p>
      </section>

      {/* Ionisasi Air */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h3 className="text-lg font-bold text-card-foreground">Ionisasi Air (Autoprotolisis)</h3>
              <p className="mt-2 text-card-foreground leading-relaxed">
                Air murni mengalami ionisasi sendiri (autoprotolisis) menghasilkan ion H&#8314; dan OH&#8315; dalam jumlah yang sangat kecil:
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center rounded-lg bg-muted p-6">
            <p className="font-mono text-lg text-card-foreground">
              {"H\u2082O(l) \u21CC H\u207A(aq) + OH\u207B(aq)"}
            </p>
          </div>

          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Atau lebih tepatnya melibatkan dua molekul air:
          </p>
          <div className="mt-2 flex items-center justify-center rounded-lg bg-muted p-4">
            <p className="font-mono text-card-foreground">
              {"H\u2082O(l) + H\u2082O(l) \u21CC H\u2083O\u207A(aq) + OH\u207B(aq)"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Kw Section */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-card-foreground">Tetapan Kesetimbangan Air (Kw)</h3>
          <p className="mt-2 text-card-foreground leading-relaxed">
            Tetapan kesetimbangan ionisasi air disimbolkan dengan <span className="font-semibold">Kw</span> dan didefinisikan sebagai:
          </p>

          <div className="mt-4 flex items-center justify-center rounded-xl border-2 border-primary/30 bg-primary/5 p-6">
            <div className="text-center">
              <p className="font-mono text-xl font-bold text-primary">
                {"Kw = [H\u207A] \u00D7 [OH\u207B] = 10\u207B\u00B9\u2074"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">(pada suhu 25&#176;C)</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-acid/30 bg-acid/5 p-4 text-center">
              <p className="text-sm font-semibold text-acid">Larutan Asam</p>
              <p className="mt-2 font-mono text-sm text-card-foreground">{"[H\u207A] > [OH\u207B]"}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{"[H\u207A] > 10\u207B\u2077 M"}</p>
            </div>
            <div className="rounded-lg border border-neutral/30 bg-neutral/5 p-4 text-center">
              <p className="text-sm font-semibold text-neutral">Larutan Netral</p>
              <p className="mt-2 font-mono text-sm text-card-foreground">{"[H\u207A] = [OH\u207B]"}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{"[H\u207A] = 10\u207B\u2077 M"}</p>
            </div>
            <div className="rounded-lg border border-base/30 bg-base/5 p-4 text-center">
              <p className="text-sm font-semibold text-base">Larutan Basa</p>
              <p className="mt-2 font-mono text-sm text-card-foreground">{"[H\u207A] < [OH\u207B]"}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{"[H\u207A] < 10\u207B\u2077 M"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* pH & pOH */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-card-foreground">Konsep pH dan pOH</h3>
          <p className="mt-2 text-card-foreground leading-relaxed">
            Sorensen (1909) memperkenalkan skala pH untuk menyatakan konsentrasi ion H&#8314; secara lebih mudah.
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border-2 border-acid/30 bg-acid/5 p-5 text-center">
              <p className="text-sm font-semibold text-acid">pH (derajat keasaman)</p>
              <p className="mt-2 font-mono text-lg font-bold text-card-foreground">{"pH = -log [H\u207A]"}</p>
            </div>
            <div className="rounded-xl border-2 border-base/30 bg-base/5 p-5 text-center">
              <p className="text-sm font-semibold text-base">pOH (derajat kebasaan)</p>
              <p className="mt-2 font-mono text-lg font-bold text-card-foreground">{"pOH = -log [OH\u207B]"}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center rounded-xl border-2 border-primary/30 bg-primary/5 p-4">
            <p className="font-mono text-lg font-bold text-primary">{"pH + pOH = 14"}</p>
          </div>

          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Pada suhu 25&#176;C, hubungan ini selalu berlaku. Sehingga jika kita mengetahui pH, kita bisa mencari pOH, dan sebaliknya.
          </p>
        </CardContent>
      </Card>

      {/* Pengaruh Suhu */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-card-foreground">Pengaruh Suhu terhadap Kw</h3>
          <p className="mt-2 text-card-foreground leading-relaxed">
            Ionisasi air merupakan reaksi endotermis. Kenaikan suhu menyebabkan kesetimbangan bergeser ke kanan, sehingga nilai Kw meningkat.
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="p-3 text-left font-semibold text-foreground">Suhu (&#176;C)</th>
                  <th className="p-3 text-left font-semibold text-foreground">Kw</th>
                  <th className="p-3 text-left font-semibold text-foreground">pH air murni</th>
                </tr>
              </thead>
              <tbody className="text-card-foreground">
                <tr className="border-b border-border">
                  <td className="p-3">0</td>
                  <td className="p-3 font-mono">{"1,14 \u00D7 10\u207B\u00B9\u2075"}</td>
                  <td className="p-3">7,47</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3">25</td>
                  <td className="p-3 font-mono">{"1,01 \u00D7 10\u207B\u00B9\u2074"}</td>
                  <td className="p-3">7,00</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3">37</td>
                  <td className="p-3 font-mono">{"2,42 \u00D7 10\u207B\u00B9\u2074"}</td>
                  <td className="p-3">6,81</td>
                </tr>
                <tr>
                  <td className="p-3">60</td>
                  <td className="p-3 font-mono">{"9,61 \u00D7 10\u207B\u00B9\u2074"}</td>
                  <td className="p-3">6,51</td>
                </tr>
              </tbody>
            </table>
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
              {"Air mengalami ionisasi: H\u2082O \u21CC H\u207A + OH\u207B"}
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {"Kw = [H\u207A][OH\u207B] = 10\u207B\u00B9\u2074 pada 25\u00B0C"}
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {"pH = -log[H\u207A], pOH = -log[OH\u207B], pH + pOH = 14"}
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Kenaikan suhu meningkatkan Kw sehingga pH air murni kurang dari 7, tetapi tetap netral
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
