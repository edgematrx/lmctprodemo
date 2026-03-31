import { createClient } from "@/lib/supabase/server"
import { FormsBuilder } from "@/components/forms/forms-builder"

export default async function FormsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const [vehiclesRes, customersRes, profileRes] = await Promise.all([
    supabase.from("vehicles").select("*").eq("user_id", user.id),
    supabase.from("customers").select("*").eq("user_id", user.id),
    supabase.from("profiles").select("*").eq("id", user.id).single(),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Forms & Documents</h1>
        <p className="text-muted-foreground">
          Generate VicRoads transfer forms, contracts, and invoices
        </p>
      </div>

      <FormsBuilder 
        vehicles={vehiclesRes.data || []} 
        customers={customersRes.data || []}
        profile={profileRes.data}
      />
    </div>
  )
}
