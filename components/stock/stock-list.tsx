"use client"

import { useState } from "react"
import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { VehicleDialog } from "./vehicle-dialog"
import { formatCurrency, generateVehicleTitle } from "@/lib/utils"
import type { Vehicle } from "@/lib/types"
import { Car, Search, Edit, Trash2 } from "lucide-react"

interface StockListProps {
  initialVehicles: Vehicle[]
  userId: string
}

async function fetchVehicles(userId: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from("vehicles")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
  return data || []
}

export function StockList({ initialVehicles, userId }: StockListProps) {
  const { data: vehicles, mutate } = useSWR(
    ["vehicles", userId],
    () => fetchVehicles(userId),
    { fallbackData: initialVehicles }
  )

  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)

  const filteredVehicles = vehicles?.filter((v) => {
    const matchesSearch = 
      generateVehicleTitle(v).toLowerCase().includes(search.toLowerCase()) ||
      v.stock_number?.toLowerCase().includes(search.toLowerCase()) ||
      v.rego?.toLowerCase().includes(search.toLowerCase()) ||
      v.vin?.toLowerCase().includes(search.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || v.status === statusFilter
    
    return matchesSearch && matchesStatus
  }) || []

  async function handleDelete(vehicleId: string) {
    if (!confirm("Are you sure you want to delete this vehicle?")) return
    
    const supabase = createClient()
    await supabase.from("vehicles").delete().eq("id", vehicleId)
    mutate()
  }

  const statusCounts = {
    all: vehicles?.length || 0,
    available: vehicles?.filter(v => v.status === "available").length || 0,
    reserved: vehicles?.filter(v => v.status === "reserved").length || 0,
    sold: vehicles?.filter(v => v.status === "sold").length || 0,
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by make, model, stock #, rego, or VIN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All ({statusCounts.all})</SelectItem>
            <SelectItem value="available">Available ({statusCounts.available})</SelectItem>
            <SelectItem value="reserved">Reserved ({statusCounts.reserved})</SelectItem>
            <SelectItem value="sold">Sold ({statusCounts.sold})</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Vehicle List */}
      {filteredVehicles.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Car className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">
              {search || statusFilter !== "all"
                ? "No vehicles match your filters"
                : "No vehicles in stock yet"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredVehicles.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center">
                {vehicle.images && vehicle.images[0] ? (
                  <img 
                    src={vehicle.images[0]} 
                    alt={generateVehicleTitle(vehicle)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Car className="h-12 w-12 text-muted-foreground opacity-50" />
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold">{generateVehicleTitle(vehicle)}</h3>
                    <p className="text-sm text-muted-foreground">
                      {vehicle.stock_number && `#${vehicle.stock_number}`}
                      {vehicle.stock_number && vehicle.rego && " | "}
                      {vehicle.rego}
                    </p>
                  </div>
                  <Badge variant={
                    vehicle.status === "available" ? "success" :
                    vehicle.status === "reserved" ? "warning" :
                    vehicle.status === "sold" ? "secondary" : "outline"
                  }>
                    {vehicle.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div>
                    <span className="text-muted-foreground">Odometer:</span>
                    <p>{vehicle.odometer ? `${vehicle.odometer.toLocaleString()} km` : "-"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Transmission:</span>
                    <p>{vehicle.transmission || "-"}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Asking Price</p>
                    <p className="text-lg font-bold text-primary">
                      {formatCurrency(vehicle.asking_price || 0)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setEditingVehicle(vehicle)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(vehicle.id)}
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {editingVehicle && (
        <VehicleDialog
          vehicle={editingVehicle}
          open={!!editingVehicle}
          onOpenChange={(open) => !open && setEditingVehicle(null)}
          onSave={() => {
            setEditingVehicle(null)
            mutate()
          }}
        />
      )}
    </div>
  )
}
