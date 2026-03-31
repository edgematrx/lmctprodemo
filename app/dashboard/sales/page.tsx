import { createClient } from "@/lib/supabase/server"
import { SalesList } from "@/components/sales/sales-list"
import { AddSaleButton } from "@/components/sales/add-sale-button"

export default async function SalesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const [salesRes, vehiclesRes, customersRes] = await Promise.all([
    supabase
      .from("sales")
      .select("*, vehicles(*), customers(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("vehicles")
      .select("*")
      .eq("user_id", user.id)
      .in("status", ["available", "reserved"]),
    supabase
      .from("customers")
      .select("*")
      .eq("user_id", user.id),
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Sales</h1>
          <p className="text-muted-foreground">Track your vehicle sales</p>
        </div>
        <AddSaleButton 
          vehicles={vehiclesRes.data || []} 
          customers={customersRes.data || []} 
        />
      </div>

      <SalesList 
        initialSales={salesRes.data || []} 
        vehicles={vehiclesRes.data || []}
        customers={customersRes.data || []}
        userId={user.id} 
      />
    </div>
  )
}
