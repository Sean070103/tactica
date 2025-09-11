"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Play, Eye, Calendar, Users, Target, Trophy, Filter, Search, BookOpen } from "lucide-react"
import Link from "next/link"

const proStrategies = [
  {
    id: 1,
    title: "ONIC Esports Perfect UBE Execution",
    team: "ONIC Esports",
    opponent: "RRQ Hoshi",
    patch: "1.8.44",
    strategyType: "UBE",
    duration: "12:34",
    views: 45200,
    date: "2024-01-15",
    thumbnail: "/mobile-legends-professional-match-onic-esports-tea.jpg",
    description: "Masterclass UBE strategy showcasing perfect timing and coordination in MPL ID Season 12 Finals",
    heroes: ["Paquito", "Ling", "Pharsa", "Granger", "Estes"],
    keyMoments: [
      "2:30 - Early Turtle Control",
      "5:45 - Perfect Team Fight",
      "8:20 - Lord Secure",
      "11:10 - Game Ending Push",
    ],
    tags: ["MPL ID", "Finals", "Team Fight", "Coordination"],
  },
  {
    id: 2,
    title: "Blacklist International Split Push Mastery",
    team: "Blacklist International",
    opponent: "Echo Philippines",
    patch: "1.8.42",
    strategyType: "Split Push",
    duration: "18:45",
    views: 38900,
    date: "2024-01-12",
    thumbnail: "/mobile-legends-blacklist-international-split-push-.jpg",
    description: "Innovative split push strategy that dominated MPL PH Season 12 with perfect map control",
    heroes: ["Fanny", "Chou", "Kagura", "Beatrix", "Rafaela"],
    keyMoments: [
      "3:15 - Lane Swap Setup",
      "7:30 - Split Push Initiation",
      "12:00 - Map Control",
      "16:20 - Victory Secured",
    ],
    tags: ["MPL PH", "Innovation", "Map Control", "Execution"],
  },
  {
    id: 3,
    title: "RRQ Hoshi Pick-Off Composition",
    team: "RRQ Hoshi",
    opponent: "EVOS Legends",
    patch: "1.8.44",
    strategyType: "Pick-Off",
    duration: "15:22",
    views: 52100,
    date: "2024-01-18",
    thumbnail: "/mobile-legends-rrq-hoshi-assassin-pick-off-strateg.jpg",
    description: "Deadly pick-off strategy featuring multiple assassins and perfect vision control",
    heroes: ["Ling", "Gusion", "Luo Yi", "Claude", "Khufra"],
    keyMoments: ["4:00 - First Pick-Off", "8:15 - Vision Control", "11:30 - Multiple Picks", "14:45 - Game Closer"],
    tags: ["MPL ID", "Assassin Meta", "Vision", "Execution"],
  },
  {
    id: 4,
    title: "ECHO Philippines Late Game Scaling",
    team: "ECHO Philippines",
    opponent: "Bren Esports",
    patch: "1.8.43",
    strategyType: "Late Game",
    duration: "24:18",
    views: 29800,
    date: "2024-01-10",
    thumbnail: "/mobile-legends-echo-philippines-late-game-team-com.jpg",
    description: "Masterful late game scaling strategy with perfect defensive play and team fight execution",
    heroes: ["Aldous", "Fanny", "Pharsa", "Melissa", "Angela"],
    keyMoments: ["6:00 - Defensive Setup", "12:30 - Scaling Phase", "18:45 - Power Spike", "22:00 - Team Fight Win"],
    tags: ["MPL PH", "Late Game", "Scaling", "Defense"],
  },
  {
    id: 5,
    title: "Falcons AP Bren Aggressive Early Game",
    team: "Falcons AP Bren",
    opponent: "Smart Omega",
    patch: "1.8.44",
    strategyType: "Early Game",
    duration: "9:45",
    views: 41300,
    date: "2024-01-20",
    thumbnail: "/mobile-legends-falcons-bren-early-game-aggressive-.jpg",
    description: "Lightning-fast early game strategy that secured victory in under 10 minutes",
    heroes: ["Paquito", "Ling", "Kagura", "Granger", "Diggie"],
    keyMoments: ["1:30 - Invade Success", "3:45 - First Blood", "6:20 - Snowball Effect", "9:00 - Victory"],
    tags: ["MPL PH", "Early Game", "Aggression", "Speed"],
  },
  {
    id: 6,
    title: "Team Secret Flex Pick Strategy",
    team: "Team Secret",
    opponent: "RSG Philippines",
    patch: "1.8.43",
    strategyType: "Flex Pick",
    duration: "16:33",
    views: 35700,
    date: "2024-01-08",
    thumbnail: "/mobile-legends-team-secret-flexible-draft-strategy.jpg",
    description: "Innovative flex pick strategy that confused opponents and secured draft advantage",
    heroes: ["Chou", "Gusion", "Luo Yi", "Beatrix", "Estes"],
    keyMoments: ["Draft Phase - Flex Picks", "5:20 - Lane Assignments", "10:15 - Adaptation", "15:00 - Victory"],
    tags: ["MPL PH", "Draft", "Flexibility", "Innovation"],
  },
]

const teams = [
  "All Teams",
  "ONIC Esports",
  "Blacklist International",
  "RRQ Hoshi",
  "ECHO Philippines",
  "Falcons AP Bren",
  "Team Secret",
]
const strategyTypes = ["All Types", "UBE", "Split Push", "Pick-Off", "Late Game", "Early Game", "Flex Pick"]
const patches = ["All Patches", "1.8.44", "1.8.43", "1.8.42"]

export default function ProStrategiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTeam, setSelectedTeam] = useState("All Teams")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedPatch, setSelectedPatch] = useState("All Patches")
  const [selectedStrategy, setSelectedStrategy] = useState<(typeof proStrategies)[0] | null>(null)

  const filteredStrategies = proStrategies.filter((strategy) => {
    const matchesSearch =
      strategy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      strategy.team.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTeam = selectedTeam === "All Teams" || strategy.team === selectedTeam
    const matchesType = selectedType === "All Types" || strategy.strategyType === selectedType
    const matchesPatch = selectedPatch === "All Patches" || strategy.patch === selectedPatch

    return matchesSearch && matchesTeam && matchesType && matchesPatch
  })

  const getStrategyTypeColor = (type: string) => {
    const colors = {
      UBE: "bg-primary/20 text-primary border-primary/30",
      "Split Push": "bg-chart-3/20 text-chart-3 border-chart-3/30",
      "Pick-Off": "bg-destructive/20 text-destructive border-destructive/30",
      "Late Game": "bg-chart-4/20 text-chart-4 border-chart-4/30",
      "Early Game": "bg-chart-1/20 text-chart-1 border-chart-1/30",
      "Flex Pick": "bg-chart-5/20 text-chart-5 border-chart-5/30",
    }
    return colors[type as keyof typeof colors] || "bg-muted/20 text-muted-foreground border-muted/30"
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-balance">Pro Play Strategy Library</h1>
                <p className="text-sm text-muted-foreground">Learn from the best MPL teams and strategies</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-chart-1/20 text-chart-1 border-chart-1/30">
                <Trophy className="w-3 h-3 mr-1" />
                MPL Strategies
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {selectedStrategy ? (
          /* Strategy Detail View */
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setSelectedStrategy(null)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Library
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Video Player */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-0">
                    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                      <img
                        src={selectedStrategy.thumbnail || "/placeholder.svg"}
                        alt={selectedStrategy.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Button size="lg" className="bg-primary hover:bg-primary/90">
                          <Play className="w-6 h-6 mr-2" />
                          Watch Strategy
                        </Button>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 rounded text-sm">
                        {selectedStrategy.duration}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Strategy Breakdown */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Strategy Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 bg-muted">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="moments">Key Moments</TabsTrigger>
                        <TabsTrigger value="analysis">Analysis</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Team Composition</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedStrategy.heroes.map((hero, index) => (
                              <Badge key={index} variant="outline">
                                {hero}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Strategy Description</h4>
                          <p className="text-muted-foreground">{selectedStrategy.description}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Tags</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedStrategy.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="moments" className="space-y-4">
                        {selectedStrategy.keyMoments.map((moment, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-sm font-bold text-primary">{index + 1}</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm">{moment}</p>
                            </div>
                          </div>
                        ))}
                      </TabsContent>

                      <TabsContent value="analysis" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card>
                            <CardContent className="p-4">
                              <h4 className="font-semibold mb-2">Strengths</h4>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                <li>• Perfect timing execution</li>
                                <li>• Excellent team coordination</li>
                                <li>• Strategic objective control</li>
                                <li>• Effective hero synergies</li>
                              </ul>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4">
                              <h4 className="font-semibold mb-2">Key Learnings</h4>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                <li>• Communication is crucial</li>
                                <li>• Map awareness wins games</li>
                                <li>• Timing beats mechanics</li>
                                <li>• Team synergy over individual skill</li>
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* Strategy Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{selectedStrategy.title}</CardTitle>
                    <CardDescription>
                      {selectedStrategy.team} vs {selectedStrategy.opponent}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Strategy Type</span>
                      <Badge className={getStrategyTypeColor(selectedStrategy.strategyType)}>
                        {selectedStrategy.strategyType}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Patch Version</span>
                      <Badge variant="outline">{selectedStrategy.patch}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Views</span>
                      <span className="text-sm font-medium">{selectedStrategy.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Date</span>
                      <span className="text-sm font-medium">
                        {new Date(selectedStrategy.date).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <Button className="w-full">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Add to Favorites
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Target className="w-4 h-4 mr-2" />
                        Practice This Strategy
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Users className="w-4 h-4 mr-2" />
                        Share with Team
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          /* Strategy Library View */
          <div className="space-y-8">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filter Strategies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search strategies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team} value={team}>
                          {team}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Strategy Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {strategyTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedPatch} onValueChange={setSelectedPatch}>
                    <SelectTrigger>
                      <SelectValue placeholder="Patch Version" />
                    </SelectTrigger>
                    <SelectContent>
                      {patches.map((patch) => (
                        <SelectItem key={patch} value={patch}>
                          {patch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Strategy Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStrategies.map((strategy) => (
                <Card
                  key={strategy.id}
                  className="cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => setSelectedStrategy(strategy)}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-video">
                      <img
                        src={strategy.thumbnail || "/placeholder.svg"}
                        alt={strategy.title}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
                        {strategy.duration}
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <Badge className={getStrategyTypeColor(strategy.strategyType)}>{strategy.strategyType}</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg line-clamp-2">{strategy.title}</CardTitle>
                    <CardDescription>
                      {strategy.team} vs {strategy.opponent}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {strategy.views.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(strategy.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {strategy.heroes.slice(0, 3).map((hero, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {hero}
                        </Badge>
                      ))}
                      {strategy.heroes.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{strategy.heroes.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredStrategies.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No strategies found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to see more results</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
