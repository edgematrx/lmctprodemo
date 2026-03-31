export interface Profile {
  id: string
  email: string
  dealership_name: string | null
  lmct_number: string | null
  abn: string | null
  phone: string | null
  address: string | null
  manager_pin: string | null
  created_at: string
  updated_at: string
}

export interface Vehicle {
  id: string
  user_id: string
  stock_number: string | null
  vin: string | null
  rego: string | null
  year: number | null
  make: string | null
  model: string | null
  variant: string | null
  body_type: string | null
  transmission: string | null
  fuel_type: string | null
  colour: string | null
  odometer: number | null
  engine: string | null
  doors: number | null
  seats: number | null
  purchase_price: number | null
  purchase_date: string | null
  purchase_source: string | null
  asking_price: number | null
  floor_price: number | null
  expenses: number | null
  status: 'available' | 'reserved' | 'sold' | 'pending'
  notes: string | null
  images: string[] | null
  features: string[] | null
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  user_id: string
  name: string
  email: string | null
  phone: string | null
  address: string | null
  license_number: string | null
  date_of_birth: string | null
  notes: string | null
  type: 'buyer' | 'seller' | 'both'
  created_at: string
  updated_at: string
}

export interface Sale {
  id: string
  user_id: string
  vehicle_id: string
  customer_id: string
  sale_price: number
  sale_date: string
  payment_method: string | null
  deposit_amount: number | null
  trade_in_vehicle: string | null
  trade_in_value: number | null
  warranty_type: string | null
  warranty_months: number | null
  notes: string | null
  status: 'pending' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
  vehicle?: Vehicle
  customer?: Customer
}

export interface Task {
  id: string
  user_id: string
  title: string
  description: string | null
  due_date: string | null
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in_progress' | 'done'
  vehicle_id: string | null
  customer_id: string | null
  created_at: string
  updated_at: string
  vehicle?: Vehicle
  customer?: Customer
}

export interface ChatMessage {
  id: string
  user_id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

export interface EmailSettings {
  id: string
  user_id: string
  smtp_host: string | null
  smtp_port: number | null
  smtp_user: string | null
  smtp_pass: string | null
  from_email: string | null
  from_name: string | null
  created_at: string
  updated_at: string
}

export interface DashboardStats {
  totalVehicles: number
  availableVehicles: number
  totalSales: number
  totalRevenue: number
  totalProfit: number
  pendingTasks: number
}
