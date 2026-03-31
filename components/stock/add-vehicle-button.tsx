"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { VehicleDialog } from "./vehicle-dialog"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export function AddVehicleButton() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="w-4 h-4 mr-2" />
        Add Vehicle
      </Button>
      <VehicleDialog
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
