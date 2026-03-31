"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Profile } from "@/lib/types"
import { Loader2, Save, Building, Shield, Mail } from "lucide-react"

interface SettingsFormProps {
  profile: Profile | null
  userEmail: string
}

export function SettingsForm({ profile, userEmail }: SettingsFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const [formData, setFormData] = useState({
    dealership_name: profile?.dealership_name || "",
    lmct_number: profile?.lmct_number || "",
    abn: profile?.abn || "",
    phone: profile?.phone || "",
    address: profile?.address || "",
    manager_pin: profile?.manager_pin || "",
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setLoading(false)
      return
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        dealership_name: formData.dealership_name || null,
        lmct_number: formData.lmct_number || null,
        abn: formData.abn || null,
        phone: formData.phone || null,
        address: formData.address || null,
        manager_pin: formData.manager_pin || null,
      })
      .eq("id", user.id)

    setLoading(false)

    if (error) {
      setMessage({ type: "error", text: "Failed to update settings" })
    } else {
      setMessage({ type: "success", text: "Settings updated successfully" })
      router.refresh()
    }
  }

  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList>
        <TabsTrigger value="profile">Dealership Profile</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Dealership Information
            </CardTitle>
            <CardDescription>
              Your dealership details for forms and documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dealership_name">Dealership Name</Label>
                  <Input
                    id="dealership_name"
                    value={formData.dealership_name}
                    onChange={(e) => setFormData(p => ({ ...p, dealership_name: e.target.value }))}
                    placeholder="Your Dealership Pty Ltd"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lmct_number">LMCT Number</Label>
                  <Input
                    id="lmct_number"
                    value={formData.lmct_number}
                    onChange={(e) => setFormData(p => ({ ...p, lmct_number: e.target.value }))}
                    placeholder="LMCT 12345"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="abn">ABN</Label>
                  <Input
                    id="abn"
                    value={formData.abn}
                    onChange={(e) => setFormData(p => ({ ...p, abn: e.target.value }))}
                    placeholder="XX XXX XXX XXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                    placeholder="(03) XXXX XXXX"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(p => ({ ...p, address: e.target.value }))}
                  placeholder="123 Main Street, Melbourne VIC 3000"
                />
              </div>

              {message && (
                <div className={`p-3 rounded-lg text-sm ${
                  message.type === "success" 
                    ? "bg-primary/10 text-primary" 
                    : "bg-destructive/10 text-destructive"
                }`}>
                  {message.text}
                </div>
              )}

              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
            <CardDescription>
              Manager PIN and access controls
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="manager_pin">Manager PIN</Label>
                <Input
                  id="manager_pin"
                  type="password"
                  value={formData.manager_pin}
                  onChange={(e) => setFormData(p => ({ ...p, manager_pin: e.target.value }))}
                  placeholder="4-6 digit PIN"
                  maxLength={6}
                />
                <p className="text-xs text-muted-foreground">
                  Used to protect sensitive operations like editing prices
                </p>
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save PIN
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Account Information
            </CardTitle>
            <CardDescription>
              Your account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input value={userEmail} disabled />
              <p className="text-xs text-muted-foreground">
                Contact support to change your email address
              </p>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Danger Zone</h4>
              <p className="text-sm text-muted-foreground mb-4">
                These actions are permanent and cannot be undone
              </p>
              <Button variant="destructive" disabled>
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
