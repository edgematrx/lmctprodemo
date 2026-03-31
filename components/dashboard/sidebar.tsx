"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Car,
  LayoutDashboard,
  Package,
  DollarSign,
  Users,
  ScanLine,
  FileText,
  ListTodo,
  BarChart3,
  Settings,
  MessageSquare,
} from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Stock",
    href: "/dashboard/stock",
    icon: Package,
  },
  {
    title: "Sales",
    href: "/dashboard/sales",
    icon: DollarSign,
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Scanner",
    href: "/dashboard/scanner",
    icon: ScanLine,
  },
  {
    title: "Listing Builder",
    href: "/dashboard/listing",
    icon: FileText,
  },
  {
    title: "Forms",
    href: "/dashboard/forms",
    icon: FileText,
  },
  {
    title: "Tasks",
    href: "/dashboard/tasks",
    icon: ListTodo,
  },
  {
    title: "Market Intel",
    href: "/dashboard/intel",
    icon: BarChart3,
  },
  {
    title: "AI Assistant",
    href: "/dashboard/assistant",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex w-64 border-r border-border flex-col bg-card">
      <div className="p-4 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Car className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg">LMCT PRO</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/dashboard" && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.title}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
