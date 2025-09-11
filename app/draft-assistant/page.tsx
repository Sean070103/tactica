"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Users, Target, Shield, Sword, Star, X, Plus, ArrowLeft, BarChart3 } from "lucide-react"
import Link from "next/link"

// Mock hero database
const heroes = [
  {
    id: 1,
    name: "Paquito",
    role: "Fighter",
    tier: "S",
    counters: ["Chou", "Aldous"],
    synergies: ["Estes", "Rafaela"],
    winRate: 68,
  },
  {
    id: 2,
    name: "Ling",
    role: "Assassin",
    tier: "S",
    counters: ["Saber", "Natalia"],
    synergies: ["Angela", "Diggie"],
    winRate: 65,
  },
  {
    id: 3,
    name: "Fanny",
    role: "Assassin",
    tier: "S+",
    counters: ["Khufra", "Franco"],
    synergies: ["Estes", "Angela"],
    winRate: 72,
  },
  {
    id: 4,
    name: "Gusion",
    role: "Assassin",
    tier: "A",
    counters: ["Chou", "Saber"],
    synergies: ["Diggie", "Rafaela"],
    winRate: 63,
  },
  {
    id: 5,
    name: "Lancelot",
    role: "Assassin",
    tier: "A",
    counters: ["Khufra", "Chou"],
    synergies: ["Angela", "Estes"],
    winRate: 61,
  },
  {
    id: 6,
    name: "Chou",
    role: "Fighter",
    tier: "S",
    counters: ["Esmeralda", "Yu Zhong"],
    synergies: ["Diggie", "Rafaela"],
    winRate: 64,
  },
  {
    id: 7,
    name: "Aldous",
    role: "Fighter",
    tier: "A",
    counters: ["Karrie", "Claude"],
    synergies: ["Estes", "Angela"],
    winRate: 59,
  },
  {
    id: 8,
    name: "Estes",
    role: "Support",
    tier: "S",
    counters: ["Ling", "Fanny"],
    synergies: ["Paquito", "Aldous"],
    winRate: 66,
  },
  {
    id: 9,
    name: "Angela",
    role: "Support",
    tier: "A",
    counters: ["Franco", "Khufra"],
    synergies: ["Fanny", "Ling"],
    winRate: 62,
  },
  {
    id: 10,
    name: "Khufra",
    role: "Tank",
    tier: "S",
    counters: ["Esmeralda", "Karrie"],
    synergies: ["Gusion", "Lancelot"],
    winRate: 67,
  },
]

const roles = ["Tank", "Fighter", "Assassin", "Mage", "Marksman", "Support"]
const lanes = ["EXP Lane", "Jungle", "Mid Lane", "Gold Lane", "Roam"]

interface DraftState {
  allyTeam: typeof heroes
  enemyTeam: typeof heroes
}

export default function DraftAssistantPage() {
  const [draft, setDraft] = useState<DraftState>({
    allyTeam: [],
    enemyTeam: [],
  })
  const [selectedHero, setSelectedHero] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<string>("all")

  const filteredHeroes = heroes.filter((hero) => {
    const matchesSearch = hero.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || hero.role === selectedRole
    const notInDraft = !draft.allyTeam.find((h) => h.id === hero.id) && !draft.enemyTeam.find((h) => h.id === hero.id)
    return matchesSearch && matchesRole && notInDraft
  })

  const addHeroToTeam = (hero: (typeof heroes)[0], team: "ally" | "enemy") => {
    if (team === "ally" && draft.allyTeam.length < 5) {
      setDraft((prev) => ({ ...prev, allyTeam: [...prev.allyTeam, hero] }))
    } else if (team === "enemy" && draft.enemyTeam.length < 5) {
      setDraft((prev) => ({ ...prev, enemyTeam: [...prev.enemyTeam, hero] }))
    }
    setSelectedHero("")
  }

  const removeHeroFromTeam = (heroId: number, team: "ally" | "enemy") => {
    if (team === "ally") {
      setDraft((prev) => ({ ...prev, allyTeam: prev.allyTeam.filter((h) => h.id !== heroId) }))
    } else {
      setDraft((prev) => ({ ...prev, enemyTeam: prev.enemyTeam.filter((h) => h.id !== heroId) }))
    }
  }

  const getCounterRecommendations = () => {
    const enemyHeroes = draft.enemyTeam.map((h) => h.name)
    const recommendations = heroes
      .filter(
        (hero) =>
          enemyHeroes.some((enemy) => hero.counters.includes(enemy)) &&
          !draft.allyTeam.find((ally) => ally.id === hero.id),
      )
      .slice(0, 5)
    return recommendations
  }

  const getSynergyScore = () => {
    if (draft.allyTeam.length < 2) return 0
    let synergyCount = 0
    let totalPairs = 0

    for (let i = 0; i < draft.allyTeam.length; i++) {
      for (let j = i + 1; j < draft.allyTeam.length; j++) {
        totalPairs++
        if (
          draft.allyTeam[i].synergies.includes(draft.allyTeam[j].name) ||
          draft.allyTeam[j].synergies.includes(draft.allyTeam[i].name)
        ) {
          synergyCount++
        }
      }
    }

    return totalPairs > 0 ? Math.round((synergyCount / totalPairs) * 100) : 0
  }

  const getTeamComposition = (team: typeof heroes) => {
    const composition = roles.reduce(
      (acc, role) => {
        acc[role] = team.filter((hero) => hero.role === role).length
        return acc
      },
      {} as Record<string, number>,
    )
    return composition
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
                <h1 className="text-2xl font-bold text-balance">Draft Assistant</h1>
                <p className="text-sm text-muted-foreground">AI-powered hero selection and counter analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                <Target className="w-3 h-3 mr-1" />
                Live Analysis
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Draft Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Team Drafts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ally Team */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-chart-3">
                    <Shield className="w-5 h-5" />
                    Your Team ({draft.allyTeam.length}/5)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {draft.allyTeam.map((hero, index) => (
                    <div
                      key={hero.id}
                      className="flex items-center justify-between p-3 bg-chart-3/10 rounded-lg border border-chart-3/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-chart-3/20 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-chart-3">{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-semibold">{hero.name}</div>
                          <div className="text-xs text-muted-foreground">{hero.role}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {hero.tier}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => removeHeroFromTeam(hero.id, "ally")}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {Array.from({ length: 5 - draft.allyTeam.length }).map((_, index) => (
                    <div
                      key={index}
                      className="p-3 border-2 border-dashed border-border rounded-lg text-center text-muted-foreground"
                    >
                      <Plus className="w-6 h-6 mx-auto mb-1" />
                      <div className="text-sm">Select Hero</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Enemy Team */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <Sword className="w-5 h-5" />
                    Enemy Team ({draft.enemyTeam.length}/5)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {draft.enemyTeam.map((hero, index) => (
                    <div
                      key={hero.id}
                      className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border border-destructive/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-destructive/20 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-destructive">{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-semibold">{hero.name}</div>
                          <div className="text-xs text-muted-foreground">{hero.role}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {hero.tier}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => removeHeroFromTeam(hero.id, "enemy")}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {Array.from({ length: 5 - draft.enemyTeam.length }).map((_, index) => (
                    <div
                      key={index}
                      className="p-3 border-2 border-dashed border-border rounded-lg text-center text-muted-foreground"
                    >
                      <Plus className="w-6 h-6 mx-auto mb-1" />
                      <div className="text-sm">Select Hero</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Hero Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Hero Selection</CardTitle>
                <CardDescription>Choose heroes for your draft analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="Search heroes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Roles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-80 overflow-y-auto">
                  {filteredHeroes.map((hero) => (
                    <div key={hero.id} className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <div className="text-sm font-semibold mb-1">{hero.name}</div>
                      <div className="text-xs text-muted-foreground mb-2">{hero.role}</div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs h-7 bg-transparent"
                          onClick={() => addHeroToTeam(hero, "ally")}
                          disabled={draft.allyTeam.length >= 5}
                        >
                          + Ally
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs h-7 bg-transparent"
                          onClick={() => addHeroToTeam(hero, "enemy")}
                          disabled={draft.enemyTeam.length >= 5}
                        >
                          + Enemy
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Panel */}
          <div className="space-y-6">
            {/* Team Synergy Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Team Synergy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{getSynergyScore()}%</div>
                    <div className="text-sm text-muted-foreground">Synergy Score</div>
                  </div>
                  <Progress value={getSynergyScore()} className="h-2" />
                  <div className="text-xs text-muted-foreground text-center">
                    Based on hero synergies and role composition
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Counter Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-chart-1" />
                  Counter Picks
                </CardTitle>
                <CardDescription>Recommended heroes against enemy team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getCounterRecommendations().length > 0 ? (
                    getCounterRecommendations().map((hero) => (
                      <div
                        key={hero.id}
                        className="flex items-center justify-between p-3 bg-chart-1/10 rounded-lg border border-chart-1/20"
                      >
                        <div>
                          <div className="font-semibold text-sm">{hero.name}</div>
                          <div className="text-xs text-muted-foreground">{hero.role}</div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-xs mb-1">
                            {hero.tier}
                          </Badge>
                          <div className="text-xs text-chart-1">{hero.winRate}% WR</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-4">
                      <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <div className="text-sm">Add enemy heroes to see counter recommendations</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Team Composition */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-chart-3" />
                  Team Composition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {roles.map((role) => {
                    const allyCount = getTeamComposition(draft.allyTeam)[role] || 0
                    const enemyCount = getTeamComposition(draft.enemyTeam)[role] || 0
                    return (
                      <div key={role} className="flex items-center justify-between">
                        <div className="text-sm font-medium">{role}</div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-chart-3/20 rounded text-xs flex items-center justify-center text-chart-3">
                            {allyCount}
                          </div>
                          <div className="text-xs text-muted-foreground">vs</div>
                          <div className="w-6 h-6 bg-destructive/20 rounded text-xs flex items-center justify-center text-destructive">
                            {enemyCount}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Button className="w-full" disabled={draft.allyTeam.length === 0}>
                    <Star className="w-4 h-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => setDraft({ allyTeam: [], enemyTeam: [] })}
                  >
                    Clear All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
