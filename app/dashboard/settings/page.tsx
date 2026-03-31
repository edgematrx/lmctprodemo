import { createClient } from "@/lib/supabase/server"
import { SettingsForm } from "@/components/settings/settings-form"
import { DataMigration } from "@/components/settings/data-migration"

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your dealership profile and preferences
        </p>
      </div>

      <SettingsForm profile={profile} userEmail={user.email || ""} />

      <DataMigration />
    </div>
  )
}
