"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { glossaryTerms } from "@/lib/learning-data"
import { Search, BookMarked } from "lucide-react"

export function GlosariumPage() {
  const [search, setSearch] = useState("")

  const filteredTerms = glossaryTerms.filter(
    (t) =>
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold text-foreground">Glosarium</h1>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          Kumpulan istilah penting dalam materi Larutan Asam dan Basa.
        </p>
      </section>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari istilah..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Terms */}
      <div className="space-y-3">
        {filteredTerms.map((t) => (
          <Card key={t.term}>
            <CardContent className="flex items-start gap-3 p-4">
              <BookMarked className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="font-semibold text-card-foreground">{t.term}</p>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{t.definition}</p>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredTerms.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg bg-muted py-12 text-center">
            <Search className="h-8 w-8 text-muted-foreground" />
            <p className="mt-3 text-sm text-muted-foreground">
              Tidak ditemukan istilah untuk &quot;{search}&quot;
            </p>
          </div>
        )}
      </div>

      {/* Evaluasi Diri */}
      <section>
        <h2 className="text-xl font-bold text-foreground">Evaluasi Diri</h2>
        <p className="mt-1 text-sm text-muted-foreground">Refleksikan pemahamanmu tentang materi berikut:</p>
        <Card className="mt-4">
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                "Apakah kamu sudah memahami perbedaan teori asam-basa Arrhenius, Bronsted-Lowry, dan Lewis?",
                "Apakah kamu bisa menentukan pasangan asam-basa konjugasi dalam suatu reaksi?",
                "Apakah kamu bisa membedakan asam kuat dan asam lemah berdasarkan derajat ionisasi?",
                "Apakah kamu sudah bisa menghitung pH larutan asam kuat, asam lemah, basa kuat, dan basa lemah?",
                "Apakah kamu memahami cara kerja indikator asam-basa dan trayek pH-nya?",
                "Apakah kamu sudah mencoba latihan soal dan memahami pembahasannya?",
              ].map((question, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <p className="text-sm text-card-foreground leading-relaxed">{question}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Referensi */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-card-foreground">Referensi</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Buku Paket Kimia Kelas XI SMA/MA Kurikulum 2013 (Revisi)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Chang, Raymond. (2010). Chemistry, 10th Edition. McGraw-Hill.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Petrucci, R.H., et al. (2011). General Chemistry: Principles and Modern Applications.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
