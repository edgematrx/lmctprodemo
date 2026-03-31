import { createClient } from "@/lib/supabase/server"
import { ListingBuilder } from "@/components/listing/listing-builder"

export default async function ListingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "available")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Listing Builder</h1>
        <p className="text-muted-foreground">
          Generate professional listings for your vehicles
        </p>
      </div>

      <ListingBuilder vehicles={vehicles || []} />
    </div>
  )
}
