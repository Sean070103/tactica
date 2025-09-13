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
import { TrendingUp, Users, Target, Map, BookOpen, Trophy, Zap, Star, Eye, Clock } from "lucide-react"

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
        <section className="text-center mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-chart-3/5 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Master Your Mobile Legends Strategy
              </h2>
              <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto leading-relaxed">
                Advanced draft assistance, tactical map analysis, and pro-level insights to dominate the Land of Dawn
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animation-delay-200">
              <Link href="/draft-assistant" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg group touch-manipulation">
                  <Target className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="hidden xs:inline">Start Draft Analysis</span>
                  <span className="xs:hidden">Draft Analysis</span>
                </Button>
              </Link>
              <Link href="/map-tactics" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-lg group border-2 touch-manipulation">
                  <Map className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="hidden xs:inline">Explore Map Tactics</span>
                  <span className="xs:hidden">Map Tactics</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group animate-fade-in-up animation-delay-300">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <CardTitle className="group-hover:text-primary transition-colors duration-300">Draft Assistant</CardTitle>
              <CardDescription>
                AI-powered hero recommendations, counter picks, and synergy analysis for optimal team composition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/draft-assistant">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10 transition-all duration-300 group-hover:translate-x-1"
                >
                  Launch Draft Tool →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-chart-3/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group animate-fade-in-up animation-delay-400">
            <CardHeader>
              <div className="w-12 h-12 bg-chart-3/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Map className="w-6 h-6 text-chart-3 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <CardTitle className="group-hover:text-chart-3 transition-colors duration-300">Tactical Map</CardTitle>
              <CardDescription>
                Interactive jungle pathing, rotation timings, and strategic positioning for every hero and role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/map-tactics">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-chart-3 hover:text-chart-3 hover:bg-chart-3/10 transition-all duration-300 group-hover:translate-x-1"
                >
                  View Map Tactics →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-chart-1/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group animate-fade-in-up animation-delay-500">
            <CardHeader>
              <div className="w-12 h-12 bg-chart-1/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-6 h-6 text-chart-1 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <CardTitle className="group-hover:text-chart-1 transition-colors duration-300">Pro Strategies</CardTitle>
              <CardDescription>
                Curated library of MPL team compositions, rotations, and winning strategies from professional matches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/pro-strategies">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-chart-1 hover:text-chart-1 hover:bg-chart-1/10 transition-all duration-300 group-hover:translate-x-1"
                >
                  Browse Strategies →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* Dashboard Analytics */}
        <section className="animate-fade-in-up animation-delay-600">
          <h3 className="text-2xl font-bold mb-6 text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Live Meta Analytics
          </h3>
          <Tabs defaultValue="heroes" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted/50 backdrop-blur-sm border border-border/50">
              <TabsTrigger value="heroes" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
                Hero Meta
              </TabsTrigger>
              <TabsTrigger value="roles" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
                Role Distribution
              </TabsTrigger>
              <TabsTrigger value="trends" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
                Win Rate Trends
              </TabsTrigger>
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
                      <div key={hero.hero} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-all duration-300 hover:shadow-md group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <span className="text-sm font-bold text-primary">#{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold group-hover:text-primary transition-colors duration-300">{hero.hero}</h4>
                            <div className="flex gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                Pick: {hero.pickRate}%
                              </span>
                              <span className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                Ban: {hero.banRate}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary group-hover:scale-110 transition-transform duration-300">{hero.winRate}%</div>
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Insights</CardTitle>
                    <CardDescription>Key metrics and recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-primary/10 rounded-lg">
                          <div className="text-2xl font-bold text-primary">68%</div>
                          <div className="text-sm text-muted-foreground">Avg Win Rate</div>
                        </div>
                        <div className="text-center p-4 bg-chart-3/10 rounded-lg">
                          <div className="text-2xl font-bold text-chart-3">+12%</div>
                          <div className="text-sm text-muted-foreground">Improvement</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium">Best Role</span>
                          </div>
                          <Badge variant="outline" className="text-xs">Assassin</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span className="text-sm font-medium">Improvement Area</span>
                          </div>
                          <Badge variant="outline" className="text-xs">Support</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm font-medium">Streak</span>
                          </div>
                          <Badge variant="outline" className="text-xs">3 Wins</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Gamification */}
        <section className="mt-12 animate-fade-in-up animation-delay-500">
          <h3 className="text-2xl font-bold mb-6 text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Your Progress & Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20 hover:border-yellow-500/30 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Achievements</h4>
                    <p className="text-sm text-muted-foreground">12/25 unlocked</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Draft Master</span>
                    <Badge variant="outline" className="text-xs bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                      ✓ Unlocked
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Meta Analyst</span>
                    <Badge variant="outline" className="text-xs bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                      ✓ Unlocked
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pro Strategist</span>
                    <Badge variant="outline" className="text-xs bg-gray-500/20 text-gray-500 border-gray-500/30">
                      Locked
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Rank Progress</h4>
                    <p className="text-sm text-muted-foreground">Mythic Glory</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Current Rank</span>
                      <span className="font-semibold">2,450 pts</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">550 pts to next rank</div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Win Streak</span>
                    <Badge variant="outline" className="text-xs bg-green-500/20 text-green-500 border-green-500/30">
                      5 wins
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-500/30 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Leaderboard</h4>
                    <p className="text-sm text-muted-foreground">Your position</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Global Rank</span>
                    <Badge variant="outline" className="text-xs bg-green-500/20 text-green-500 border-green-500/30">
                      #1,247
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Region Rank</span>
                    <Badge variant="outline" className="text-xs bg-green-500/20 text-green-500 border-green-500/30">
                      #89
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">This Week</span>
                    <Badge variant="outline" className="text-xs bg-green-500/20 text-green-500 border-green-500/30">
                      +23
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Live Matches */}
        <section className="mt-12 animate-fade-in-up animation-delay-600">
          <h3 className="text-2xl font-bold mb-6 text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Live Professional Matches
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-primary/5 to-chart-3/5 border-primary/20 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-green-500">LIVE</span>
                  </div>
                  <Badge variant="outline" className="text-xs">MPL ID S12</Badge>
                </div>
                <div className="text-center mb-4">
                  <div className="text-lg font-bold">ONIC Esports</div>
                  <div className="text-sm text-muted-foreground">vs</div>
                  <div className="text-lg font-bold">RRQ Hoshi</div>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    12.5K viewers
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Game 2/3
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-chart-1/5 to-chart-4/5 border-chart-1/20 hover:border-chart-1/30 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-orange-500">DRAFT</span>
                  </div>
                  <Badge variant="outline" className="text-xs">MPL PH S13</Badge>
                </div>
                <div className="text-center mb-4">
                  <div className="text-lg font-bold">Blacklist International</div>
                  <div className="text-sm text-muted-foreground">vs</div>
                  <div className="text-lg font-bold">ECHO Philippines</div>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    8.9K viewers
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    Pick Phase
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mt-12 animate-fade-in-up animation-delay-700">
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-chart-3/10 border-primary/20 hover:border-primary/30 transition-all duration-500 hover:shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-chart-3/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="p-8 relative">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Ready to Dominate?
                  </h3>
                  <p className="text-muted-foreground text-pretty text-lg">
                    Join thousands of players using ML Tactica to climb the ranks and master their gameplay
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg group touch-manipulation">
                    <Star className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="hidden xs:inline">Get Pro Access</span>
                    <span className="xs:hidden">Pro Access</span>
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-lg group border-2 touch-manipulation">
                    <Eye className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="hidden xs:inline">View Demo</span>
                    <span className="xs:hidden">Demo</span>
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
