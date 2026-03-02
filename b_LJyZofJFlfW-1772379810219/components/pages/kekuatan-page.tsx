"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Lightbulb } from "lucide-react"

export function KekuatanPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold text-foreground">Kekuatan Asam dan Basa</h1>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          Kekuatan asam atau basa ditentukan oleh kemampuannya terionisasi dalam air.
          Makin besar derajat ionisasinya, makin kuat asam atau basa tersebut.
        </p>
      </section>

      {/* Derajat Ionisasi */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h3 className="text-lg font-bold text-card-foreground">Derajat Ionisasi (&alpha;)</h3>
              <p className="mt-2 text-card-foreground leading-relaxed">
                Derajat ionisasi menyatakan perbandingan jumlah zat yang terionisasi dengan jumlah zat mula-mula.
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center rounded-xl border-2 border-primary/30 bg-primary/5 p-6">
            <div className="text-center">
              <p className="font-mono text-lg font-bold text-primary">
                {"\u03B1 = jumlah zat terionisasi / jumlah zat mula-mula"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{"0 \u2264 \u03B1 \u2264 1"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Asam Kuat vs Asam Lemah */}
      <section>
        <h2 className="text-xl font-bold text-foreground">Kekuatan Asam</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Card className="border-acid/30">
            <CardContent className="p-6">
              <h4 className="text-lg font-bold text-acid">Asam Kuat</h4>
              <p className="mt-2 text-sm text-card-foreground leading-relaxed">
                Terionisasi sempurna dalam air (&alpha; = 1). Semua molekul asam terurai menjadi ion.
              </p>
              <div className="mt-3 rounded-lg bg-muted p-3 font-mono text-sm text-card-foreground">
                {"HA \u2192 H\u207A + A\u207B (sempurna)"}
              </div>
              <div className="mt-4 space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contoh:</p>
                <div className="flex flex-wrap gap-2">
                  {["HCl", "HBr", "HI", "H\u2082SO\u2084", "HNO\u2083", "HClO\u2084"].map((acid) => (
                    <span key={acid} className="rounded-md bg-acid/10 px-2 py-1 text-xs font-mono font-medium text-acid">
                      {acid}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 rounded-lg bg-muted p-3 text-sm text-card-foreground">
                <p className="font-semibold">Rumus [H&#8314;]:</p>
                <p className="mt-1 font-mono">{"[H\u207A] = Ma \u00D7 a"}</p>
                <p className="mt-1 text-xs text-muted-foreground">Ma = molaritas asam, a = valensi asam</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-acid/20">
            <CardContent className="p-6">
              <h4 className="text-lg font-bold text-acid/70">Asam Lemah</h4>
              <p className="mt-2 text-sm text-card-foreground leading-relaxed">
                Terionisasi sebagian dalam air (&alpha; {"<"} 1). Hanya sebagian molekul asam yang terurai.
              </p>
              <div className="mt-3 rounded-lg bg-muted p-3 font-mono text-sm text-card-foreground">
                {"HA \u21CC H\u207A + A\u207B (sebagian)"}
              </div>
              <div className="mt-4 space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contoh:</p>
                <div className="flex flex-wrap gap-2">
                  {["CH\u2083COOH", "HF", "H\u2082CO\u2083", "HCN", "H\u2082S", "HNO\u2082"].map((acid) => (
                    <span key={acid} className="rounded-md bg-acid/10 px-2 py-1 text-xs font-mono font-medium text-acid/70">
                      {acid}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 rounded-lg bg-muted p-3 text-sm text-card-foreground">
                <p className="font-semibold">Rumus [H&#8314;]:</p>
                <p className="mt-1 font-mono">{"[H\u207A] = \u221A(Ka \u00D7 Ma)"}</p>
                <p className="mt-1 text-xs text-muted-foreground">Ka = tetapan ionisasi asam</p>
                <p className="mt-1 font-mono text-xs">{"atau [H\u207A] = Ma \u00D7 \u03B1"}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Basa Kuat vs Basa Lemah */}
      <section>
        <h2 className="text-xl font-bold text-foreground">Kekuatan Basa</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Card className="border-base/30">
            <CardContent className="p-6">
              <h4 className="text-lg font-bold text-base">Basa Kuat</h4>
              <p className="mt-2 text-sm text-card-foreground leading-relaxed">
                Terionisasi sempurna dalam air (&alpha; = 1). Semua molekul basa terurai menjadi ion.
              </p>
              <div className="mt-3 rounded-lg bg-muted p-3 font-mono text-sm text-card-foreground">
                {"MOH \u2192 M\u207A + OH\u207B (sempurna)"}
              </div>
              <div className="mt-4 space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contoh:</p>
                <div className="flex flex-wrap gap-2">
                  {["NaOH", "KOH", "Ca(OH)\u2082", "Ba(OH)\u2082", "LiOH"].map((base) => (
                    <span key={base} className="rounded-md bg-base/10 px-2 py-1 text-xs font-mono font-medium text-base">
                      {base}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 rounded-lg bg-muted p-3 text-sm text-card-foreground">
                <p className="font-semibold">Rumus [OH&#8315;]:</p>
                <p className="mt-1 font-mono">{"[OH\u207B] = Mb \u00D7 b"}</p>
                <p className="mt-1 text-xs text-muted-foreground">Mb = molaritas basa, b = valensi basa</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-base/20">
            <CardContent className="p-6">
              <h4 className="text-lg font-bold text-base/70">Basa Lemah</h4>
              <p className="mt-2 text-sm text-card-foreground leading-relaxed">
                Terionisasi sebagian dalam air (&alpha; {"<"} 1). Hanya sebagian molekul basa yang terurai.
              </p>
              <div className="mt-3 rounded-lg bg-muted p-3 font-mono text-sm text-card-foreground">
                {"BOH \u21CC B\u207A + OH\u207B (sebagian)"}
              </div>
              <div className="mt-4 space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contoh:</p>
                <div className="flex flex-wrap gap-2">
                  {["NH\u2083", "NH\u2084OH", "Al(OH)\u2083", "Fe(OH)\u2083", "Be(OH)\u2082"].map((base) => (
                    <span key={base} className="rounded-md bg-base/10 px-2 py-1 text-xs font-mono font-medium text-base/70">
                      {base}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 rounded-lg bg-muted p-3 text-sm text-card-foreground">
                <p className="font-semibold">Rumus [OH&#8315;]:</p>
                <p className="mt-1 font-mono">{"[OH\u207B] = \u221A(Kb \u00D7 Mb)"}</p>
                <p className="mt-1 text-xs text-muted-foreground">Kb = tetapan ionisasi basa</p>
                <p className="mt-1 font-mono text-xs">{"atau [OH\u207B] = Mb \u00D7 \u03B1"}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Ka and Kb */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-card-foreground">Tetapan Ionisasi (Ka dan Kb)</h3>
          <p className="mt-2 text-card-foreground leading-relaxed">
            Tetapan ionisasi menyatakan kekuatan relatif suatu asam lemah atau basa lemah. Makin besar nilainya, makin kuat asam atau basa tersebut.
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border-2 border-acid/30 bg-acid/5 p-5">
              <p className="text-sm font-semibold text-acid">Tetapan Ionisasi Asam (Ka)</p>
              <div className="mt-3 space-y-2 font-mono text-sm text-card-foreground">
                <p>{"HA \u21CC H\u207A + A\u207B"}</p>
                <p>{"Ka = [H\u207A][A\u207B] / [HA]"}</p>
              </div>
            </div>
            <div className="rounded-xl border-2 border-base/30 bg-base/5 p-5">
              <p className="text-sm font-semibold text-base">Tetapan Ionisasi Basa (Kb)</p>
              <div className="mt-3 space-y-2 font-mono text-sm text-card-foreground">
                <p>{"BOH \u21CC B\u207A + OH\u207B"}</p>
                <p>{"Kb = [B\u207A][OH\u207B] / [BOH]"}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center rounded-xl border-2 border-primary/30 bg-primary/5 p-4">
            <p className="font-mono font-bold text-primary">{"Ka \u00D7 Kb = Kw = 10\u207B\u00B9\u2074"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Hubungan Ka, Kb, dan alpha */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-card-foreground">Hubungan Ka, Kb, dan Derajat Ionisasi</h3>
          <p className="mt-2 text-card-foreground leading-relaxed">
            Untuk asam lemah monoprotik (HA) dengan konsentrasi M:
          </p>
          <div className="mt-4 space-y-3 rounded-lg bg-muted p-5 font-mono text-sm text-card-foreground">
            <p>{"Ka = \u03B1\u00B2 \u00D7 M / (1 - \u03B1)"}</p>
            <p className="text-muted-foreground">{"Jika \u03B1 sangat kecil (\u03B1 << 1):"}</p>
            <p>{"Ka \u2248 \u03B1\u00B2 \u00D7 M"}</p>
            <p>{"Sehingga: \u03B1 \u2248 \u221A(Ka / M)"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Contoh */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-card-foreground">Tabel Ka Beberapa Asam Lemah</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="p-3 text-left font-semibold text-foreground">Asam</th>
                  <th className="p-3 text-left font-semibold text-foreground">Rumus</th>
                  <th className="p-3 text-left font-semibold text-foreground">Ka</th>
                  <th className="p-3 text-left font-semibold text-foreground">Kekuatan</th>
                </tr>
              </thead>
              <tbody className="text-card-foreground">
                <tr className="border-b border-border">
                  <td className="p-3">Asam format</td>
                  <td className="p-3 font-mono">HCOOH</td>
                  <td className="p-3 font-mono">{"1,8 \u00D7 10\u207B\u2074"}</td>
                  <td className="p-3">
                    <span className="inline-block h-2 w-16 rounded-full bg-acid/60" />
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3">Asam asetat</td>
                  <td className="p-3 font-mono">{"CH\u2083COOH"}</td>
                  <td className="p-3 font-mono">{"1,8 \u00D7 10\u207B\u2075"}</td>
                  <td className="p-3">
                    <span className="inline-block h-2 w-12 rounded-full bg-acid/45" />
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3">Asam karbonat</td>
                  <td className="p-3 font-mono">{"H\u2082CO\u2083"}</td>
                  <td className="p-3 font-mono">{"4,3 \u00D7 10\u207B\u2077"}</td>
                  <td className="p-3">
                    <span className="inline-block h-2 w-8 rounded-full bg-acid/30" />
                  </td>
                </tr>
                <tr>
                  <td className="p-3">Asam sianida</td>
                  <td className="p-3 font-mono">HCN</td>
                  <td className="p-3 font-mono">{"4,9 \u00D7 10\u207B\u00B9\u2070"}</td>
                  <td className="p-3">
                    <span className="inline-block h-2 w-4 rounded-full bg-acid/15" />
                  </td>
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
              {"Asam kuat: \u03B1 = 1, terionisasi sempurna. [H\u207A] = Ma \u00D7 a"}
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {"Asam lemah: \u03B1 < 1, terionisasi sebagian. [H\u207A] = \u221A(Ka \u00D7 Ma)"}
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {"Basa kuat: \u03B1 = 1, terionisasi sempurna. [OH\u207B] = Mb \u00D7 b"}
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {"Basa lemah: \u03B1 < 1, terionisasi sebagian. [OH\u207B] = \u221A(Kb \u00D7 Mb)"}
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {"Makin besar Ka/Kb, makin kuat asam/basa lemah tersebut"}
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
