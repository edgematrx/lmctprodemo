import { createClient } from "@/lib/supabase/server"
import { MarketIntel } from "@/components/intel/market-intel"

export default async function IntelPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const [vehiclesRes, salesRes] = await Promise.all([
    supabase.from("vehicles").select("*").eq("user_id", user.id),
    supabase.from("sales").select("*, vehicles(*)").eq("user_id", user.id),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Market Intelligence</h1>
        <p className="text-muted-foreground">
          Analytics and insights for your dealership
        </p>
      </div>

      <MarketIntel 
        vehicles={vehiclesRes.data || []} 
        sales={salesRes.data || []} 
      />
    </div>
  )
}
