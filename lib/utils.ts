import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-AU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function calculateProfit(salePrice: number, purchasePrice: number, expenses: number = 0): number {
  return salePrice - purchasePrice - expenses
}

export function generateVehicleTitle(vehicle: { year?: number; make?: string; model?: string; variant?: string }): string {
  const parts = [vehicle.year, vehicle.make, vehicle.model, vehicle.variant].filter(Boolean)
  return parts.join(' ')
}
