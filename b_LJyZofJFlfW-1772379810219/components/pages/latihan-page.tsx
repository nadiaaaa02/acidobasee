"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { quizQuestions } from "@/lib/learning-data"
import type { StudentResult } from "@/lib/learning-data"
import { CheckCircle2, XCircle, RotateCcw, Trophy, ChevronLeft, ChevronRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LatihanPageProps {
  onSubmitResult?: (result: StudentResult) => void
}

export function LatihanPage({ onSubmitResult }: LatihanPageProps) {
  const [studentName, setStudentName] = useState("")
  const [nameSubmitted, setNameSubmitted] = useState(false)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const questionsPerPage = 5

  const totalPages = Math.ceil(quizQuestions.length / questionsPerPage)
  const currentQuestions = useMemo(
    () => quizQuestions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage),
    [currentPage]
  )

  const score = useMemo(() => {
    if (!submitted) return 0
    return quizQuestions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correctAnswer ? 1 : 0)
    }, 0)
  }, [answers, submitted])

  function handleAnswer(qid: number, optIndex: number) {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [qid]: optIndex }))
  }

  function handleSubmit() {
    setSubmitted(true)
    setCurrentPage(0)
    window.scrollTo({ top: 0, behavior: "smooth" })

    const finalScore = quizQuestions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correctAnswer ? 1 : 0)
    }, 0)

    if (onSubmitResult) {
      onSubmitResult({
        name: studentName,
        score: finalScore,
        total: quizQuestions.length,
        answers: { ...answers },
        timestamp: Date.now(),
      })
    }
  }

  function handleReset() {
    setAnswers({})
    setSubmitted(false)
    setCurrentPage(0)
    setStudentName("")
    setNameSubmitted(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const answeredCount = Object.keys(answers).length

  // Student name input gate
  if (!nameSubmitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-md animate-scale-in">
          <CardContent className="p-8">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Latihan Soal</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Masukkan nama kamu sebelum mengerjakan latihan soal. Terdapat {quizQuestions.length} soal pilihan ganda.
                </p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (studentName.trim()) setNameSubmitted(true)
                }}
                className="flex w-full flex-col gap-3"
              >
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Masukkan nama lengkap..."
                    className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    autoFocus
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!studentName.trim()}
                  size="lg"
                  className="w-full gap-2"
                >
                  Mulai Mengerjakan
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold text-foreground">Latihan Soal</h1>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          Selamat mengerjakan, <span className="font-semibold text-foreground">{studentName}</span>! Terdapat {quizQuestions.length} soal pilihan ganda.
        </p>
      </section>

      {/* Score card when submitted */}
      {submitted && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-4 p-8 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Trophy className="h-7 w-7" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {score}/{quizQuestions.length}
                </p>
                <p className="text-sm text-muted-foreground">
                  Skor kamu: {Math.round((score / quizQuestions.length) * 100)}%
                </p>
                <p className="text-xs text-muted-foreground">
                  {score >= 16 ? "Luar biasa!" : score >= 12 ? "Bagus sekali!" : score >= 8 ? "Terus belajar!" : "Jangan menyerah, pelajari ulang materinya!"}
                </p>
              </div>
            </div>
            <Button onClick={handleReset} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Ulangi
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Progress */}
      {!submitted && (
        <div className="flex items-center justify-between rounded-lg bg-muted p-4">
          <span className="text-sm text-muted-foreground">
            Terjawab: <span className="font-semibold text-foreground">{answeredCount}</span>/{quizQuestions.length}
          </span>
          <div className="h-2 w-32 rounded-full bg-border">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${(answeredCount / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {currentQuestions.map((q, idx) => {
          const globalIdx = currentPage * questionsPerPage + idx
          const selected = answers[q.id]
          const isCorrect = submitted && selected === q.correctAnswer

          return (
            <Card
              key={q.id}
              className={cn(
                submitted && selected !== undefined && !isCorrect && "border-destructive/30",
                submitted && isCorrect && "border-primary/30"
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground">
                    {globalIdx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-card-foreground leading-relaxed">{q.question}</p>
                    <span className="mt-1 inline-block text-xs text-muted-foreground">{q.category}</span>

                    <div className="mt-4 space-y-2">
                      {q.options.map((option, optIdx) => {
                        const isSelected = selected === optIdx
                        const isAnswer = q.correctAnswer === optIdx

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleAnswer(q.id, optIdx)}
                            disabled={submitted}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition-all",
                              !submitted && isSelected && "border-primary bg-primary/10 text-card-foreground",
                              !submitted && !isSelected && "border-border bg-card text-card-foreground hover:border-primary/30 hover:bg-muted/50",
                              submitted && isAnswer && "border-primary bg-primary/10 text-card-foreground",
                              submitted && isSelected && !isAnswer && "border-destructive bg-destructive/10 text-card-foreground",
                              submitted && !isAnswer && !isSelected && "border-border bg-card text-muted-foreground opacity-60"
                            )}
                          >
                            <span className={cn(
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium",
                              !submitted && isSelected && "bg-primary text-primary-foreground",
                              !submitted && !isSelected && "bg-muted text-muted-foreground",
                              submitted && isAnswer && "bg-primary text-primary-foreground",
                              submitted && isSelected && !isAnswer && "bg-destructive text-destructive-foreground",
                              submitted && !isAnswer && !isSelected && "bg-muted text-muted-foreground"
                            )}>
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="flex-1">{option}</span>
                            {submitted && isAnswer && <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />}
                            {submitted && isSelected && !isAnswer && <XCircle className="h-4 w-4 shrink-0 text-destructive" />}
                          </button>
                        )
                      })}
                    </div>

                    {submitted && (
                      <div className={cn(
                        "mt-4 rounded-lg p-4 text-sm leading-relaxed",
                        isCorrect ? "bg-primary/10 text-card-foreground" : "bg-destructive/10 text-card-foreground"
                      )}>
                        <p className="font-semibold">{isCorrect ? "Benar!" : "Salah."} Pembahasan:</p>
                        <p className="mt-1">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          disabled={currentPage === 0}
          onClick={() => {
            setCurrentPage((p) => p - 1)
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" /> Sebelumnya
        </Button>

        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentPage(i)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded text-xs font-medium transition-colors",
                currentPage === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <Button
          variant="outline"
          disabled={currentPage === totalPages - 1}
          onClick={() => {
            setCurrentPage((p) => p + 1)
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className="gap-1"
        >
          Selanjutnya <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Submit */}
      {!submitted && (
        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={answeredCount < quizQuestions.length}
            size="lg"
            className="gap-2 px-8"
          >
            <CheckCircle2 className="h-4 w-4" />
            Kumpulkan Jawaban ({answeredCount}/{quizQuestions.length})
          </Button>
        </div>
      )}
    </div>
  )
}
