"use client"

import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDate, generateVehicleTitle } from "@/lib/utils"
import type { Sale, Vehicle, Customer } from "@/lib/types"
import { DollarSign, TrendingUp, Car } from "lucide-react"

interface SalesListProps {
  initialSales: Sale[]
  vehicles: Vehicle[]
  customers: Customer[]
  userId: string
}

async function fetchSales(userId: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from("sales")
    .select("*, vehicles(*), customers(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
  return data || []
}

export function SalesList({ initialSales, userId }: SalesListProps) {
  const { data: sales } = useSWR(
    ["sales", userId],
    () => fetchSales(userId),
    { fallbackData: initialSales }
  )

  const totalRevenue = sales?.reduce((sum, s) => sum + (s.sale_price || 0), 0) || 0
  const totalProfit = sales?.reduce((sum, s) => {
    const purchasePrice = s.vehicle?.purchase_price || 0
    return sum + (s.sale_price || 0) - purchasePrice
  }, 0) || 0

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sales?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{formatCurrency(totalProfit)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Sales List */}
      {sales?.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <DollarSign className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No sales recorded yet</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sales?.map((sale) => {
                const profit = (sale.sale_price || 0) - (sale.vehicle?.purchase_price || 0)
                return (
                  <div 
                    key={sale.id} 
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">
                          {sale.vehicle ? generateVehicleTitle(sale.vehicle) : "Unknown Vehicle"}
                        </h3>
                        <Badge variant={sale.status === "completed" ? "success" : "warning"}>
                          {sale.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Sold to: {sale.customer?.name || "Unknown"} | {formatDate(sale.sale_date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatCurrency(sale.sale_price)}</p>
                      <p className={`text-sm ${profit >= 0 ? "text-primary" : "text-destructive"}`}>
                        {profit >= 0 ? "+" : ""}{formatCurrency(profit)} profit
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
