import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { Car, DollarSign, TrendingUp, ListTodo, Users, Package } from "lucide-react"
import Link from "next/link"

async function getDashboardStats(userId: string) {
  const supabase = await createClient()

  const [vehiclesRes, salesRes, customersRes, tasksRes] = await Promise.all([
    supabase.from("vehicles").select("*").eq("user_id", userId),
    supabase.from("sales").select("*, vehicles(purchase_price)").eq("user_id", userId),
    supabase.from("customers").select("id").eq("user_id", userId),
    supabase.from("tasks").select("id, status").eq("user_id", userId).neq("status", "done"),
  ])

  const vehicles = vehiclesRes.data || []
  const sales = salesRes.data || []
  const customers = customersRes.data || []
  const pendingTasks = tasksRes.data || []

  const availableVehicles = vehicles.filter(v => v.status === "available").length
  const totalRevenue = sales.reduce((sum, s) => sum + (s.sale_price || 0), 0)
  const totalProfit = sales.reduce((sum, s) => {
    const purchasePrice = s.vehicles?.purchase_price || 0
    return sum + (s.sale_price || 0) - purchasePrice
  }, 0)

  return {
    totalVehicles: vehicles.length,
    availableVehicles,
    totalSales: sales.length,
    totalRevenue,
    totalProfit,
    pendingTasks: pendingTasks.length,
    totalCustomers: customers.length,
    recentVehicles: vehicles.slice(0, 5),
    recentSales: sales.slice(0, 5),
  }
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const stats = await getDashboardStats(user.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your dealership performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVehicles}</div>
            <p className="text-xs text-muted-foreground">
              {stats.availableVehicles} available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSales}</div>
            <p className="text-xs text-muted-foreground">vehicles sold</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">total sales value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{formatCurrency(stats.totalProfit)}</div>
            <p className="text-xs text-muted-foreground">gross profit</p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">in your database</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <ListTodo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingTasks}</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/dashboard/tasks" className="text-primary hover:underline">
                View all tasks
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Vehicles */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Stock</CardTitle>
              <CardDescription>Your latest vehicle additions</CardDescription>
            </div>
            <Link href="/dashboard/stock" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {stats.recentVehicles.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Car className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No vehicles in stock yet</p>
              <Link href="/dashboard/stock" className="text-primary hover:underline text-sm">
                Add your first vehicle
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.recentVehicles.map((vehicle) => (
                <div key={vehicle.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {vehicle.stock_number || "No stock #"} | {vehicle.rego || "No rego"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(vehicle.asking_price || 0)}</p>
                    <Badge variant={vehicle.status === "available" ? "success" : "secondary"}>
                      {vehicle.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
