"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Filter, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/md3/button"
import { Card } from "@/components/md3/card"
import { Chip } from "@/components/md3/chip"

interface FilterSection {
  id: string
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

interface MobileFilterSheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  sections: FilterSection[]
  onApply?: () => void
  onClear?: () => void
  activeFiltersCount?: number
}

export function MobileFilterSheet({
  isOpen,
  onClose,
  title = "Filtros",
  sections,
  onApply,
  onClear,
  activeFiltersCount = 0,
}: MobileFilterSheetProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(
    sections.filter((s) => s.defaultOpen).map((s) => s.id),
  )

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-background rounded-t-3xl z-50 max-h-[85vh] overflow-hidden md:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                <h2 className="text-lg font-semibold">{title}</h2>
                {activeFiltersCount > 0 && (
                  <Chip variant="filled" size="sm" className="bg-primary text-primary-foreground">
                    {activeFiltersCount}
                  </Chip>
                )}
              </div>
              <Button variant="text" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(85vh-140px)]">
              <div className="p-4 space-y-4">
                {sections.map((section) => (
                  <Card key={section.id} className="overflow-hidden">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-medium">{section.title}</span>
                      {expandedSections.includes(section.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                    <AnimatePresence>
                      {expandedSections.includes(section.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 border-t">{section.children}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t p-4 bg-background">
              <div className="flex gap-3">
                <Button variant="outlined" className="flex-1" onClick={onClear}>
                  Limpar
                </Button>
                <Button
                  variant="filled"
                  className="flex-1"
                  onClick={() => {
                    onApply?.()
                    onClose()
                  }}
                >
                  Aplicar Filtros
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Componente para trigger do filtro mobile
interface MobileFilterTriggerProps {
  onClick: () => void
  activeFiltersCount?: number
  className?: string
}

export function MobileFilterTrigger({ onClick, activeFiltersCount = 0, className = "" }: MobileFilterTriggerProps) {
  return (
    <Button variant="outlined" onClick={onClick} className={`relative ${className}`}>
      <Filter className="h-4 w-4 mr-2" />
      Filtros
      {activeFiltersCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {activeFiltersCount}
        </span>
      )}
    </Button>
  )
}
