"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface MigrationStatus {
  vehicles: { total: number; migrated: number; status: 'pending' | 'running' | 'done' | 'error' }
  customers: { total: number; migrated: number; status: 'pending' | 'running' | 'done' | 'error' }
  sales: { total: number; migrated: number; status: 'pending' | 'running' | 'done' | 'error' }
  tasks: { total: number; migrated: number; status: 'pending' | 'running' | 'done' | 'error' }
}

export function DataMigration() {
  const [isMigrating, setIsMigrating] = useState(false)
  const [migrationComplete, setMigrationComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<MigrationStatus>({
    vehicles: { total: 0, migrated: 0, status: 'pending' },
    customers: { total: 0, migrated: 0, status: 'pending' },
    sales: { total: 0, migrated: 0, status: 'pending' },
    tasks: { total: 0, migrated: 0, status: 'pending' },
  })

  const checkLocalStorage = () => {
    const vehicles = JSON.parse(localStorage.getItem('lmct_vehicles') || '[]')
    const customers = JSON.parse(localStorage.getItem('lmct_customers') || '[]')
    const sales = JSON.parse(localStorage.getItem('lmct_sales') || '[]')
    const tasks = JSON.parse(localStorage.getItem('lmct_tasks') || '[]')

    return {
      vehicles,
      customers,
      sales,
      tasks,
      hasData: vehicles.length > 0 || customers.length > 0 || sales.length > 0 || tasks.length > 0
    }
  }

  const migrateData = async () => {
    setIsMigrating(true)
    setError(null)
    
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      setError("You must be logged in to migrate data")
      setIsMigrating(false)
      return
    }

    const localData = checkLocalStorage()

    try {
      // Migrate vehicles
      if (localData.vehicles.length > 0) {
        setStatus(prev => ({ ...prev, vehicles: { ...prev.vehicles, total: localData.vehicles.length, status: 'running' } }))
        
        for (const vehicle of localData.vehicles) {
          const { error } = await supabase.from('vehicles').insert({
            user_id: user.id,
            stock_number: vehicle.stockNumber || vehicle.stock_number,
            vin: vehicle.vin,
            rego: vehicle.rego,
            make: vehicle.make,
            model: vehicle.model,
            year: parseInt(vehicle.year) || new Date().getFullYear(),
            colour: vehicle.colour || vehicle.color,
            body_type: vehicle.bodyType || vehicle.body_type,
            transmission: vehicle.transmission,
            fuel_type: vehicle.fuelType || vehicle.fuel_type,
            odometer: parseInt(vehicle.odometer) || 0,
            purchase_price: parseFloat(vehicle.purchasePrice || vehicle.purchase_price) || 0,
            sale_price: parseFloat(vehicle.salePrice || vehicle.sale_price) || 0,
            status: vehicle.status || 'in_stock',
            purchase_date: vehicle.purchaseDate || vehicle.purchase_date || new Date().toISOString(),
            notes: vehicle.notes,
          })
          
          if (!error) {
            setStatus(prev => ({ 
              ...prev, 
              vehicles: { ...prev.vehicles, migrated: prev.vehicles.migrated + 1 } 
            }))
          }
        }
        
        setStatus(prev => ({ ...prev, vehicles: { ...prev.vehicles, status: 'done' } }))
      }

      // Migrate customers
      if (localData.customers.length > 0) {
        setStatus(prev => ({ ...prev, customers: { ...prev.customers, total: localData.customers.length, status: 'running' } }))
        
        for (const customer of localData.customers) {
          const { error } = await supabase.from('customers').insert({
            user_id: user.id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            license_number: customer.licenseNumber || customer.license_number,
            date_of_birth: customer.dateOfBirth || customer.date_of_birth,
            notes: customer.notes,
          })
          
          if (!error) {
            setStatus(prev => ({ 
              ...prev, 
              customers: { ...prev.customers, migrated: prev.customers.migrated + 1 } 
            }))
          }
        }
        
        setStatus(prev => ({ ...prev, customers: { ...prev.customers, status: 'done' } }))
      }

      // Migrate sales
      if (localData.sales.length > 0) {
        setStatus(prev => ({ ...prev, sales: { ...prev.sales, total: localData.sales.length, status: 'running' } }))
        
        for (const sale of localData.sales) {
          const { error } = await supabase.from('sales').insert({
            user_id: user.id,
            vehicle_description: sale.vehicleDescription || sale.vehicle_description || `${sale.make} ${sale.model}`,
            customer_name: sale.customerName || sale.customer_name,
            sale_price: parseFloat(sale.salePrice || sale.sale_price) || 0,
            sale_date: sale.saleDate || sale.sale_date || new Date().toISOString(),
            payment_method: sale.paymentMethod || sale.payment_method || 'cash',
            status: sale.status || 'completed',
            notes: sale.notes,
          })
          
          if (!error) {
            setStatus(prev => ({ 
              ...prev, 
              sales: { ...prev.sales, migrated: prev.sales.migrated + 1 } 
            }))
          }
        }
        
        setStatus(prev => ({ ...prev, sales: { ...prev.sales, status: 'done' } }))
      }

      // Migrate tasks
      if (localData.tasks.length > 0) {
        setStatus(prev => ({ ...prev, tasks: { ...prev.tasks, total: localData.tasks.length, status: 'running' } }))
        
        for (const task of localData.tasks) {
          const { error } = await supabase.from('tasks').insert({
            user_id: user.id,
            title: task.title,
            description: task.description,
            status: task.status || 'todo',
            priority: task.priority || 'medium',
            due_date: task.dueDate || task.due_date,
            vehicle_id: null,
          })
          
          if (!error) {
            setStatus(prev => ({ 
              ...prev, 
              tasks: { ...prev.tasks, migrated: prev.tasks.migrated + 1 } 
            }))
          }
        }
        
        setStatus(prev => ({ ...prev, tasks: { ...prev.tasks, status: 'done' } }))
      }

      setMigrationComplete(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Migration failed')
    } finally {
      setIsMigrating(false)
    }
  }

  const localData = typeof window !== 'undefined' ? checkLocalStorage() : { hasData: false, vehicles: [], customers: [], sales: [], tasks: [] }

  const StatusIcon = ({ status }: { status: 'pending' | 'running' | 'done' | 'error' }) => {
    switch (status) {
      case 'running':
        return <Loader2 className="h-4 w-4 animate-spin text-primary" />
      case 'done':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-muted" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Data Migration
        </CardTitle>
        <CardDescription>
          Migrate your existing data from localStorage to the cloud database
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!localData.hasData && !migrationComplete ? (
          <p className="text-muted-foreground text-sm">
            No existing data found in localStorage. Start fresh or check if you have data from the old LMCT PRO app.
          </p>
        ) : migrationComplete ? (
          <div className="rounded-lg bg-green-500/10 p-4 border border-green-500/20">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Migration Complete!</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Your data has been successfully migrated to the cloud.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <StatusIcon status={status.vehicles.status} />
                  <span>Vehicles</span>
                </div>
                <span className="text-muted-foreground">
                  {status.vehicles.migrated}/{localData.vehicles.length} records
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <StatusIcon status={status.customers.status} />
                  <span>Customers</span>
                </div>
                <span className="text-muted-foreground">
                  {status.customers.migrated}/{localData.customers.length} records
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <StatusIcon status={status.sales.status} />
                  <span>Sales</span>
                </div>
                <span className="text-muted-foreground">
                  {status.sales.migrated}/{localData.sales.length} records
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <StatusIcon status={status.tasks.status} />
                  <span>Tasks</span>
                </div>
                <span className="text-muted-foreground">
                  {status.tasks.migrated}/{localData.tasks.length} records
                </span>
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 border border-destructive/20">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <Button 
              onClick={migrateData} 
              disabled={isMigrating}
              className="w-full"
            >
              {isMigrating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Migrating...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Start Migration
                </>
              )}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
