"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface OTPInputProps {
  value: string
  onChange: (value: string) => void
  length?: number
}

export function OTPInput({ value, onChange, length = 8 }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Pre-fill refs array
    inputRefs.current = inputRefs.current.slice(0, length)
  }, [length])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!e.currentTarget.value && index > 0) {
        inputRefs.current[index - 1]?.focus()
        inputRefs.current[index - 1]?.setSelectionRange(1, 1)

        // Update the value
        const newValue = value.slice(0, -1)
        onChange(newValue)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newChar = e.target.value.slice(-1)

    // Update the value
    const newValue = value.slice(0, index) + newChar + value.slice(index + 1)
    onChange(newValue)

    // Move to next input if available
    if (newChar && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length)

    onChange(pastedData.padEnd(length, ""))

    // Focus last input or the next empty input
    const focusIndex = Math.min(pastedData.length, length - 1)
    inputRefs.current[focusIndex]?.focus()
  }

  return (
    <div className="flex justify-center">
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          type="text"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          className="w-12 h-14 text-center text-2xl font-semibold rounded-lg border-2 bg-gray-900/50 border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      ))}
    </div>
  )
}

