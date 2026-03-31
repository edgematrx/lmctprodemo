"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { ScanLine, Loader2, Plus, ExternalLink, Calculator } from "lucide-react"

interface ScannedVehicle {
  title: string
  year: number
  make: string
  model: string
  odometer: string
  price: number
  transmission: string
  fuel: string
  link?: string
}

export default function ScannerPage() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ScannedVehicle[]>([])

  async function handleScan() {
    if (!input.trim()) return
    setLoading(true)

    // Parse the input text to extract vehicle information
    // This is a simplified parser - in production you'd use AI or a more sophisticated parser
    const lines = input.split("\n").filter(l => l.trim())
    const vehicles: ScannedVehicle[] = []

    let currentVehicle: Partial<ScannedVehicle> = {}
    
    for (const line of lines) {
      const lowerLine = line.toLowerCase()
      
      // Try to extract year/make/model from a line like "2019 Toyota Camry"
      const yearMatch = line.match(/\b(20\d{2}|19\d{2})\b/)
      if (yearMatch) {
        if (currentVehicle.title) {
          vehicles.push(currentVehicle as ScannedVehicle)
        }
        currentVehicle = {
          title: line.trim(),
          year: parseInt(yearMatch[1]),
        }
        
        // Try to extract make/model
        const afterYear = line.substring(line.indexOf(yearMatch[1]) + 4).trim()
        const parts = afterYear.split(/\s+/)
        if (parts.length >= 1) currentVehicle.make = parts[0]
        if (parts.length >= 2) currentVehicle.model = parts.slice(1).join(" ")
      }
      
      // Extract odometer
      const kmMatch = line.match(/(\d{1,3}[,\s]?\d{3})\s*(km|kms|kilometres)/i)
      if (kmMatch && currentVehicle.title) {
        currentVehicle.odometer = kmMatch[1].replace(/[,\s]/g, "") + " km"
      }
      
      // Extract price
      const priceMatch = line.match(/\$\s*(\d{1,3}[,\s]?\d{3})/i)
      if (priceMatch && currentVehicle.title) {
        currentVehicle.price = parseInt(priceMatch[1].replace(/[,\s]/g, ""))
      }
      
      // Extract transmission
      if (lowerLine.includes("automatic") || lowerLine.includes("auto")) {
        currentVehicle.transmission = "Automatic"
      } else if (lowerLine.includes("manual")) {
        currentVehicle.transmission = "Manual"
      }
      
      // Extract fuel type
      if (lowerLine.includes("petrol")) {
        currentVehicle.fuel = "Petrol"
      } else if (lowerLine.includes("diesel")) {
        currentVehicle.fuel = "Diesel"
      } else if (lowerLine.includes("hybrid")) {
        currentVehicle.fuel = "Hybrid"
      } else if (lowerLine.includes("electric")) {
        currentVehicle.fuel = "Electric"
      }
    }
    
    if (currentVehicle.title) {
      vehicles.push(currentVehicle as ScannedVehicle)
    }

    setResults(vehicles)
    setLoading(false)
  }

  function calculateProfit(askingPrice: number, purchasePrice: number) {
    return askingPrice - purchasePrice
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Auction Scanner</h1>
        <p className="text-muted-foreground">
          Paste auction listings to analyze potential purchases
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScanLine className="h-5 w-5" />
              Paste Listings
            </CardTitle>
            <CardDescription>
              Copy and paste auction or listing text to extract vehicle details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste auction listings here...

Example:
2020 Toyota Camry SL
45,000 km
Automatic, Petrol
$28,500

2019 Mazda CX-5 GT
62,000 km  
Automatic, Diesel
$32,000"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
            <Button onClick={handleScan} disabled={loading || !input.trim()} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <ScanLine className="w-4 h-4 mr-2" />
                  Scan Listings
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Analysis Results
            </CardTitle>
            <CardDescription>
              {results.length} vehicle{results.length !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <ScanLine className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No vehicles scanned yet</p>
                <p className="text-sm">Paste listing text and click Scan</p>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((vehicle, index) => {
                  const estimatedRetail = vehicle.price ? Math.round(vehicle.price * 1.15) : 0
                  const potentialProfit = vehicle.price ? calculateProfit(estimatedRetail, vehicle.price) : 0
                  
                  return (
                    <div key={index} className="p-4 rounded-lg border border-border bg-muted/30">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{vehicle.title}</h3>
                        {vehicle.link && (
                          <a href={vehicle.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                          </a>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {vehicle.odometer && (
                          <Badge variant="outline">{vehicle.odometer}</Badge>
                        )}
                        {vehicle.transmission && (
                          <Badge variant="outline">{vehicle.transmission}</Badge>
                        )}
                        {vehicle.fuel && (
                          <Badge variant="outline">{vehicle.fuel}</Badge>
                        )}
                      </div>

                      {vehicle.price && (
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Auction Price</p>
                            <p className="font-medium">{formatCurrency(vehicle.price)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Est. Retail</p>
                            <p className="font-medium">{formatCurrency(estimatedRetail)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Potential</p>
                            <p className="font-medium text-primary">+{formatCurrency(potentialProfit)}</p>
                          </div>
                        </div>
                      )}

                      <div className="mt-3 pt-3 border-t border-border">
                        <Button size="sm" variant="outline" className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Add to Stock
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
