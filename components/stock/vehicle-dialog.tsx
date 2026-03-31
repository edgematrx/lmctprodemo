"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Vehicle } from "@/lib/types"
import { Loader2 } from "lucide-react"

interface VehicleDialogProps {
  vehicle?: Vehicle | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: () => void
}

const bodyTypes = ["Sedan", "Hatchback", "SUV", "Wagon", "Ute", "Coupe", "Convertible", "Van"]
const transmissions = ["Automatic", "Manual", "CVT"]
const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric", "LPG"]

export function VehicleDialog({ vehicle, open, onOpenChange, onSave }: VehicleDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    stock_number: vehicle?.stock_number || "",
    vin: vehicle?.vin || "",
    rego: vehicle?.rego || "",
    year: vehicle?.year?.toString() || "",
    make: vehicle?.make || "",
    model: vehicle?.model || "",
    variant: vehicle?.variant || "",
    body_type: vehicle?.body_type || "",
    transmission: vehicle?.transmission || "",
    fuel_type: vehicle?.fuel_type || "",
    colour: vehicle?.colour || "",
    odometer: vehicle?.odometer?.toString() || "",
    engine: vehicle?.engine || "",
    doors: vehicle?.doors?.toString() || "",
    seats: vehicle?.seats?.toString() || "",
    purchase_price: vehicle?.purchase_price?.toString() || "",
    purchase_date: vehicle?.purchase_date || "",
    purchase_source: vehicle?.purchase_source || "",
    asking_price: vehicle?.asking_price?.toString() || "",
    floor_price: vehicle?.floor_price?.toString() || "",
    expenses: vehicle?.expenses?.toString() || "",
    status: vehicle?.status || "available",
    notes: vehicle?.notes || "",
  })

  function handleChange(field: string, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setLoading(false)
      return
    }

    const vehicleData = {
      user_id: user.id,
      stock_number: formData.stock_number || null,
      vin: formData.vin || null,
      rego: formData.rego || null,
      year: formData.year ? parseInt(formData.year) : null,
      make: formData.make || null,
      model: formData.model || null,
      variant: formData.variant || null,
      body_type: formData.body_type || null,
      transmission: formData.transmission || null,
      fuel_type: formData.fuel_type || null,
      colour: formData.colour || null,
      odometer: formData.odometer ? parseInt(formData.odometer) : null,
      engine: formData.engine || null,
      doors: formData.doors ? parseInt(formData.doors) : null,
      seats: formData.seats ? parseInt(formData.seats) : null,
      purchase_price: formData.purchase_price ? parseFloat(formData.purchase_price) : null,
      purchase_date: formData.purchase_date || null,
      purchase_source: formData.purchase_source || null,
      asking_price: formData.asking_price ? parseFloat(formData.asking_price) : null,
      floor_price: formData.floor_price ? parseFloat(formData.floor_price) : null,
      expenses: formData.expenses ? parseFloat(formData.expenses) : null,
      status: formData.status as Vehicle["status"],
      notes: formData.notes || null,
    }

    if (vehicle?.id) {
      await supabase.from("vehicles").update(vehicleData).eq("id", vehicle.id)
    } else {
      await supabase.from("vehicles").insert(vehicleData)
    }

    setLoading(false)
    onSave()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{vehicle ? "Edit Vehicle" : "Add New Vehicle"}</DialogTitle>
          <DialogDescription>
            {vehicle ? "Update the vehicle details below" : "Enter the vehicle details below"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stock_number">Stock Number</Label>
                  <Input
                    id="stock_number"
                    value={formData.stock_number}
                    onChange={(e) => handleChange("stock_number", e.target.value)}
                    placeholder="e.g., STK001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rego">Registration</Label>
                  <Input
                    id="rego"
                    value={formData.rego}
                    onChange={(e) => handleChange("rego", e.target.value)}
                    placeholder="e.g., ABC123"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vin">VIN</Label>
                <Input
                  id="vin"
                  value={formData.vin}
                  onChange={(e) => handleChange("vin", e.target.value)}
                  placeholder="Vehicle Identification Number"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => handleChange("year", e.target.value)}
                    placeholder="e.g., 2020"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="make">Make</Label>
                  <Input
                    id="make"
                    value={formData.make}
                    onChange={(e) => handleChange("make", e.target.value)}
                    placeholder="e.g., Toyota"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => handleChange("model", e.target.value)}
                    placeholder="e.g., Camry"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="variant">Variant</Label>
                  <Input
                    id="variant"
                    value={formData.variant}
                    onChange={(e) => handleChange("variant", e.target.value)}
                    placeholder="e.g., SL"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="body_type">Body Type</Label>
                  <Select
                    value={formData.body_type}
                    onValueChange={(v) => handleChange("body_type", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select body type" />
                    </SelectTrigger>
                    <SelectContent>
                      {bodyTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transmission">Transmission</Label>
                  <Select
                    value={formData.transmission}
                    onValueChange={(v) => handleChange("transmission", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      {transmissions.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fuel_type">Fuel Type</Label>
                  <Select
                    value={formData.fuel_type}
                    onValueChange={(v) => handleChange("fuel_type", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      {fuelTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="colour">Colour</Label>
                  <Input
                    id="colour"
                    value={formData.colour}
                    onChange={(e) => handleChange("colour", e.target.value)}
                    placeholder="e.g., White"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="odometer">Odometer (km)</Label>
                  <Input
                    id="odometer"
                    type="number"
                    value={formData.odometer}
                    onChange={(e) => handleChange("odometer", e.target.value)}
                    placeholder="e.g., 50000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doors">Doors</Label>
                  <Input
                    id="doors"
                    type="number"
                    value={formData.doors}
                    onChange={(e) => handleChange("doors", e.target.value)}
                    placeholder="e.g., 4"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seats">Seats</Label>
                  <Input
                    id="seats"
                    type="number"
                    value={formData.seats}
                    onChange={(e) => handleChange("seats", e.target.value)}
                    placeholder="e.g., 5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="engine">Engine</Label>
                <Input
                  id="engine"
                  value={formData.engine}
                  onChange={(e) => handleChange("engine", e.target.value)}
                  placeholder="e.g., 2.5L 4-cylinder"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(v) => handleChange("status", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purchase_price">Purchase Price ($)</Label>
                  <Input
                    id="purchase_price"
                    type="number"
                    value={formData.purchase_price}
                    onChange={(e) => handleChange("purchase_price", e.target.value)}
                    placeholder="e.g., 15000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purchase_date">Purchase Date</Label>
                  <Input
                    id="purchase_date"
                    type="date"
                    value={formData.purchase_date}
                    onChange={(e) => handleChange("purchase_date", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchase_source">Purchase Source</Label>
                <Input
                  id="purchase_source"
                  value={formData.purchase_source}
                  onChange={(e) => handleChange("purchase_source", e.target.value)}
                  placeholder="e.g., Auction, Trade-in, Private"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="asking_price">Asking Price ($)</Label>
                  <Input
                    id="asking_price"
                    type="number"
                    value={formData.asking_price}
                    onChange={(e) => handleChange("asking_price", e.target.value)}
                    placeholder="e.g., 20000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="floor_price">Floor Price ($)</Label>
                  <Input
                    id="floor_price"
                    type="number"
                    value={formData.floor_price}
                    onChange={(e) => handleChange("floor_price", e.target.value)}
                    placeholder="Minimum acceptable price"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expenses">Additional Expenses ($)</Label>
                <Input
                  id="expenses"
                  type="number"
                  value={formData.expenses}
                  onChange={(e) => handleChange("expenses", e.target.value)}
                  placeholder="e.g., repairs, detailing, etc."
                />
              </div>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Any additional notes about this vehicle..."
                  className="min-h-[200px]"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {vehicle ? "Update Vehicle" : "Add Vehicle"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
