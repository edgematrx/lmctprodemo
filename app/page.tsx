import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Car, 
  Shield, 
  BarChart3, 
  FileText, 
  Users, 
  Zap,
  CheckCircle,
  ArrowRight 
} from "lucide-react"

const features = [
  {
    icon: Car,
    title: "Stock Management",
    description: "Track your entire inventory with detailed vehicle records, images, and pricing"
  },
  {
    icon: BarChart3,
    title: "Sales Analytics",
    description: "Real-time insights into your sales performance, profit margins, and trends"
  },
  {
    icon: FileText,
    title: "VicRoads Forms",
    description: "Auto-fill transfer forms, contracts, and invoices with vehicle data"
  },
  {
    icon: Users,
    title: "Customer CRM",
    description: "Manage buyer and seller information with complete transaction history"
  },
  {
    icon: Shield,
    title: "Compliance Ready",
    description: "Built for Australian LMCT requirements with proper documentation"
  },
  {
    icon: Zap,
    title: "AI Assistant",
    description: "Get intelligent help with listings, pricing, and market analysis"
  }
]

const benefits = [
  "Unlimited vehicle listings",
  "Real-time profit tracking",
  "Auto-generated documents",
  "Auction scanner integration",
  "Market price intelligence",
  "Mobile responsive design"
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Car className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">LMCT PRO</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button>Get Started</Button>
            </Link>
          </nav>
          <div className="md:hidden">
            <Link href="/auth/login">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Built for Australian Dealers</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            The Complete Dealer
            <br />
            <span className="gradient-text">Management System</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
            Streamline your dealership operations with stock management, sales tracking, 
            compliance forms, and AI-powered insights. Built specifically for Licensed Motor Car Traders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/sign-up">
              <Button size="lg" className="gap-2">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline">
                View Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Run Your Dealership
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From inventory management to compliance documentation, LMCT PRO has you covered.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Built for the Way You Work
              </h2>
              <p className="text-muted-foreground mb-8">
                LMCT PRO understands the unique challenges of running a car dealership in Australia. 
                We have built every feature with real dealers in mind.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-border flex items-center justify-center">
                <div className="text-center">
                  <Car className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-20 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Dealership?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join hundreds of Australian dealers already using LMCT PRO to streamline their operations.
          </p>
          <Link href="/auth/sign-up">
            <Button size="lg" className="gap-2">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Car className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">LMCT PRO</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Built for Australian Licensed Motor Car Traders
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
