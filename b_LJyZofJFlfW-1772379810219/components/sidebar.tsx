"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { navItems, type PageId } from "@/lib/learning-data"
import {
  Home,
  BookOpen,
  Scale,
  FlaskConical,
  BarChart3,
  Palette,
  PenTool,
  BookMarked,
  LayoutDashboard,
  Menu,
  X,
  Moon,
  Sun,
  Beaker,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const iconMap = {
  Home,
  BookOpen,
  Scale,
  FlaskConical,
  BarChart3,
  Palette,
  PenTool,
  BookMarked,
  LayoutDashboard,
}

interface SidebarProps {
  activePage: PageId
  onNavigate: (page: PageId) => void
  progress: number
  isDark: boolean
  onToggleDark: () => void
}

export function Sidebar({ activePage, onNavigate, progress, isDark, onToggleDark }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 flex items-center justify-center rounded-lg bg-sidebar p-2 text-sidebar-foreground shadow-lg lg:hidden"
        aria-label="Buka menu navigasi"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close button mobile */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-sidebar-foreground/70 hover:text-sidebar-foreground lg:hidden"
          aria-label="Tutup menu"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand */}
        <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary transition-transform hover:scale-110">
            <Beaker className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight text-sidebar-foreground">Larutan Asam & Basa</h1>
            <p className="text-xs text-sidebar-foreground/60">Kimia Kelas XI</p>
          </div>
        </div>

        {/* Progress */}
        <div className="px-5 py-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-sidebar-foreground/60">Progres Belajar</span>
            <span className="font-mono font-semibold text-sidebar-primary">{Math.round(progress)}%</span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-sidebar-accent">
            <div
              className="h-full rounded-full bg-sidebar-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 py-2" aria-label="Navigasi materi">
          <ul className="flex flex-col gap-1">
            {navItems.map((item, index) => {
              const Icon = iconMap[item.icon]
              const isActive = activePage === item.id
              return (
                <li key={item.id} className={`animate-slide-in-left stagger-${index + 1}`}>
                  {item.id === "dasbor" && (
                    <div className="my-2 border-t border-sidebar-border" />
                  )}
                  <button
                    onClick={() => {
                      onNavigate(item.id)
                      setMobileOpen(false)
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-200",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-sm"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground hover:translate-x-1"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Dark mode toggle */}
        <div className="border-t border-sidebar-border px-5 py-4">
          <Button
            variant="ghost"
            onClick={onToggleDark}
            className="flex w-full items-center justify-center gap-2 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="text-sm">{isDark ? "Mode Terang" : "Mode Gelap"}</span>
          </Button>
        </div>
      </aside>
    </>
  )
}
