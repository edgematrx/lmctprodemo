import { createClient } from "@/lib/supabase/server"
import { StockList } from "@/components/stock/stock-list"
import { AddVehicleButton } from "@/components/stock/add-vehicle-button"

export default async function StockPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Stock Management</h1>
          <p className="text-muted-foreground">Manage your vehicle inventory</p>
        </div>
        <AddVehicleButton />
      </div>

      <StockList initialVehicles={vehicles || []} userId={user.id} />
    </div>
  )
}
