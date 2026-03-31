"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CustomerDialog } from "./customer-dialog"
import { Plus } from "lucide-react"

export function AddCustomerButton() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="w-4 h-4 mr-2" />
        Add Customer
      </Button>
      <CustomerDialog
        open={open}
        onOpenChange={setOpen}
        onSave={() => {
          setOpen(false)
          router.refresh()
        }}
      />
    </>
  )
}
