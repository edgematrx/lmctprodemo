"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Vehicle, Customer } from "@/lib/types"
import { Plus, Loader2 } from "lucide-react"
import { generateVehicleTitle } from "@/lib/utils"

interface AddSaleButtonProps {
  vehicles: Vehicle[]
  customers: Customer[]
}

export function AddSaleButton({ vehicles, customers }: AddSaleButtonProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    vehicle_id: "",
    customer_id: "",
    sale_price: "",
    sale_date: new Date().toISOString().split("T")[0],
    payment_method: "",
    deposit_amount: "",
    warranty_type: "",
    warranty_months: "",
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setLoading(false)
      return
    }

    // Create sale
    await supabase.from("sales").insert({
      user_id: user.id,
      vehicle_id: formData.vehicle_id,
      customer_id: formData.customer_id,
      sale_price: parseFloat(formData.sale_price),
      sale_date: formData.sale_date,
      payment_method: formData.payment_method || null,
      deposit_amount: formData.deposit_amount ? parseFloat(formData.deposit_amount) : null,
      warranty_type: formData.warranty_type || null,
      warranty_months: formData.warranty_months ? parseInt(formData.warranty_months) : null,
      status: "completed",
    })

    // Update vehicle status to sold
    await supabase.from("vehicles").update({ status: "sold" }).eq("id", formData.vehicle_id)

    setLoading(false)
    setOpen(false)
    router.refresh()
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="w-4 h-4 mr-2" />
        Record Sale
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record New Sale</DialogTitle>
            <DialogDescription>Enter the sale details below</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Vehicle</Label>
              <Select
                value={formData.vehicle_id}
                onValueChange={(v) => setFormData(p => ({ ...p, vehicle_id: v }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {generateVehicleTitle(v)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Customer</Label>
              <Select
                value={formData.customer_id}
                onValueChange={(v) => setFormData(p => ({ ...p, customer_id: v }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sale_price">Sale Price ($)</Label>
                <Input
                  id="sale_price"
                  type="number"
                  value={formData.sale_price}
                  onChange={(e) => setFormData(p => ({ ...p, sale_price: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sale_date">Sale Date</Label>
                <Input
                  id="sale_date"
                  type="date"
                  value={formData.sale_date}
                  onChange={(e) => setFormData(p => ({ ...p, sale_date: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="payment_method">Payment Method</Label>
                <Select
                  value={formData.payment_method}
                  onValueChange={(v) => setFormData(p => ({ ...p, payment_method: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="eft">EFT/Bank Transfer</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deposit_amount">Deposit ($)</Label>
                <Input
                  id="deposit_amount"
                  type="number"
                  value={formData.deposit_amount}
                  onChange={(e) => setFormData(p => ({ ...p, deposit_amount: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Record Sale
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
