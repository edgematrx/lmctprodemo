import { createClient } from "@/lib/supabase/server"
import { CustomersList } from "@/components/customers/customers-list"
import { AddCustomerButton } from "@/components/customers/add-customer-button"

export default async function CustomersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: customers } = await supabase
    .from("customers")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage your buyer and seller contacts</p>
        </div>
        <AddCustomerButton />
      </div>

      <CustomersList initialCustomers={customers || []} userId={user.id} />
    </div>
  )
}
