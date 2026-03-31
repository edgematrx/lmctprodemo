import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Car } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <CardTitle>Authentication Error</CardTitle>
          <CardDescription>
            Something went wrong during authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Please try signing in again. If the problem persists, contact support.
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/auth/login">
              <Button className="w-full">
                Try Again
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="w-full gap-2">
                <Car className="w-4 h-4" />
                Return Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
