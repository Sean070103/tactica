"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Users, Target, Map, BookOpen, Trophy, Zap, Star } from "lucide-react"

const metaData = [
  { hero: "Paquito", winRate: 68, pickRate: 24, banRate: 45 },
  { hero: "Ling", winRate: 65, pickRate: 18, banRate: 52 },
  { hero: "Fanny", winRate: 72, pickRate: 12, banRate: 38 },
  { hero: "Gusion", winRate: 63, pickRate: 22, banRate: 41 },
  { hero: "Lancelot", winRate: 61, pickRate: 28, banRate: 35 },
]

const roleDistribution = [
  { name: "Assassin", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Marksman", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Mage", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Tank", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Support", value: 8, color: "hsl(var(--chart-5))" },
]

const matchHistory = [
  { match: 1, winRate: 45 },
  { match: 2, winRate: 52 },
  { match: 3, winRate: 48 },
  { match: 4, winRate: 65 },
  { match: 5, winRate: 72 },
  { match: 6, winRate: 68 },
  { match: 7, winRate: 75 },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-balance">ML Tactica</h1>
                <p className="text-sm text-muted-foreground">Professional Mobile Legends Strategy Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                <Zap className="w-3 h-3 mr-1" />
                Pro Version
              </Badge>
              <Button variant="outline">Sign In</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-balance">Master Your Mobile Legends Strategy</h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto">
            Advanced draft assistance, tactical map analysis, and pro-level insights to dominate the Land of Dawn
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/draft-assistant">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Target className="w-5 h-5 mr-2" />
                Start Draft Analysis
              </Button>
            </Link>
            <Link href="/map-tactics">
              <Button size="lg" variant="outline">
                <Map className="w-5 h-5 mr-2" />
                Explore Map Tactics
              </Button>
            </Link>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Draft Assistant</CardTitle>
              <CardDescription>
                AI-powered hero recommendations, counter picks, and synergy analysis for optimal team composition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/draft-assistant">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10"
                >
                  Launch Draft Tool →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-chart-3/20 rounded-lg flex items-center justify-center mb-4">
                <Map className="w-6 h-6 text-chart-3" />
              </div>
              <CardTitle>Tactical Map</CardTitle>
              <CardDescription>
                Interactive jungle pathing, rotation timings, and strategic positioning for every hero and role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/map-tactics">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-chart-3 hover:text-chart-3 hover:bg-chart-3/10"
                >
                  View Map Tactics →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-chart-1/20 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-chart-1" />
              </div>
              <CardTitle>Pro Strategies</CardTitle>
              <CardDescription>
                Curated library of MPL team compositions, rotations, and winning strategies from professional matches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/pro-strategies">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-chart-1 hover:text-chart-1 hover:bg-chart-1/10"
                >
                  Browse Strategies →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* Dashboard Analytics */}
        <section>
          <h3 className="text-2xl font-bold mb-6 text-balance">Live Meta Analytics</h3>
          <Tabs defaultValue="heroes" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted">
              <TabsTrigger value="heroes">Hero Meta</TabsTrigger>
              <TabsTrigger value="roles">Role Distribution</TabsTrigger>
              <TabsTrigger value="trends">Win Rate Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="heroes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Top Meta Heroes
                  </CardTitle>
                  <CardDescription>Current patch win rates and pick/ban statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {metaData.map((hero, index) => (
                      <div key={hero.hero} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-primary">#{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold">{hero.hero}</h4>
                            <div className="flex gap-4 text-sm text-muted-foreground">
                              <span>Pick: {hero.pickRate}%</span>
                              <span>Ban: {hero.banRate}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">{hero.winRate}%</div>
                          <div className="text-sm text-muted-foreground">Win Rate</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="roles" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Role Meta Distribution</CardTitle>
                  <CardDescription>Current meta role preferences in ranked matches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={roleDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {roleDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Win Rate Trends</CardTitle>
                  <CardDescription>Your performance over the last 7 matches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={matchHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                          dataKey="match"
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fill: "hsl(var(--muted-foreground))" }}
                        />
                        <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="winRate"
                          stroke="hsl(var(--primary))"
                          strokeWidth={3}
                          dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Quick Actions */}
        <section className="mt-12">
          <Card className="bg-gradient-to-r from-primary/10 to-chart-3/10 border-primary/20">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-balance">Ready to Dominate?</h3>
                  <p className="text-muted-foreground text-pretty">
                    Join thousands of players using ML Tactica to climb the ranks and master their gameplay
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Star className="w-5 h-5 mr-2" />
                    Get Pro Access
                  </Button>
                  <Button size="lg" variant="outline">
                    View Demo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 ML Tactica. Professional Mobile Legends Strategy Platform.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
