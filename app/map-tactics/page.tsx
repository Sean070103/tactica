"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Map, Clock, Target, Zap, TreePine, Crown, Flame } from "lucide-react"
import Link from "next/link"

const heroes = [
  { id: 1, name: "Paquito", role: "Fighter", lane: "EXP Lane" },
  { id: 2, name: "Ling", role: "Assassin", lane: "Jungle" },
  { id: 3, name: "Fanny", role: "Assassin", lane: "Jungle" },
  { id: 4, name: "Gusion", role: "Assassin", lane: "Jungle" },
  { id: 5, name: "Lancelot", role: "Assassin", lane: "Jungle" },
  { id: 6, name: "Chou", role: "Fighter", lane: "EXP Lane" },
  { id: 7, name: "Granger", role: "Marksman", lane: "Gold Lane" },
  { id: 8, name: "Pharsa", role: "Mage", lane: "Mid Lane" },
  { id: 9, name: "Estes", role: "Support", lane: "Roam" },
  { id: 10, name: "Khufra", role: "Tank", lane: "Roam" },
]

const jungleCreeps = [
  { id: 1, name: "Blue Buff", x: 20, y: 30, respawn: 90, gold: 60, exp: 80 },
  { id: 2, name: "Red Buff", x: 80, y: 70, respawn: 90, gold: 60, exp: 80 },
  { id: 3, name: "Lithowanderer", x: 50, y: 50, respawn: 45, gold: 40, exp: 60 },
  { id: 4, name: "Rockursa", x: 30, y: 60, respawn: 45, gold: 35, exp: 50 },
  { id: 5, name: "Firetooth", x: 70, y: 40, respawn: 45, gold: 35, exp: 50 },
]

const rotationPaths = {
  "Early Game (0-5min)": [
    { hero: "Ling", path: "Blue Buff → Lithowanderer → Red Buff → Gank Mid", timing: "0:30 - 2:00" },
    { hero: "Fanny", path: "Red Buff → Rockursa → Blue Buff → Gank EXP", timing: "0:30 - 2:30" },
    { hero: "Paquito", path: "Lane Clear → Jungle Invade → River Control", timing: "1:00 - 3:00" },
  ],
  "Mid Game (5-15min)": [
    { hero: "Ling", path: "Turtle Control → Enemy Jungle → Team Fight", timing: "5:00 - 8:00" },
    { hero: "Fanny", path: "Split Push → Jungle Clear → Objective Contest", timing: "6:00 - 10:00" },
    { hero: "Paquito", path: "Team Fight → Tower Push → Map Control", timing: "7:00 - 12:00" },
  ],
  "Late Game (15min+)": [
    { hero: "Ling", path: "Lord Setup → Team Fight → Base Push", timing: "15:00+" },
    { hero: "Fanny", path: "Pick Off → Lord Control → End Game", timing: "18:00+" },
    { hero: "Paquito", path: "Front Line → Protect Carry → Victory", timing: "20:00+" },
  ],
}

const mapObjectives = [
  { id: 1, name: "Turtle", x: 50, y: 65, respawn: 180, reward: "Gold & EXP Boost" },
  { id: 2, name: "Lord", x: 50, y: 20, respawn: 420, reward: "Lane Push Power" },
  { id: 3, name: "Crab", x: 35, y: 45, respawn: 90, reward: "Vision & Gold" },
  { id: 4, name: "Crab", x: 65, y: 55, respawn: 90, reward: "Vision & Gold" },
]

export default function MapTacticsPage() {
  const [selectedHero, setSelectedHero] = useState<string>("Ling")
  const [gamePhase, setGamePhase] = useState<string>("Early Game (0-5min)")
  const [timeSlider, setTimeSlider] = useState([5])
  const [showPaths, setShowPaths] = useState(true)
  const [showObjectives, setShowObjectives] = useState(true)
  const [showJungle, setShowJungle] = useState(true)

  // View transform state
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const lastPanPoint = useRef<{ x: number; y: number } | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [cursorPct, setCursorPct] = useState<{ x: number; y: number } | null>(null)

  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

  const resetView = useCallback(() => {
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }, [])

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const delta = -e.deltaY
    const zoomIntensity = 0.0015
    const newScale = clamp(scale * (1 + delta * zoomIntensity), 0.6, 3)

    // Zoom to cursor: adjust translate so the point under cursor stays put
    const scaleRatio = newScale / scale
    const newTranslate = {
      x: mouseX - scaleRatio * (mouseX - translate.x),
      y: mouseY - scaleRatio * (mouseY - translate.y),
    }

    setScale(newScale)
    setTranslate(newTranslate)
  }, [scale, translate])

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setIsPanning(true)
    lastPanPoint.current = { x: e.clientX, y: e.clientY }
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning && lastPanPoint.current) {
      const dx = e.clientX - lastPanPoint.current.x
      const dy = e.clientY - lastPanPoint.current.y
      setTranslate((t) => ({ x: t.x + dx, y: t.y + dy }))
      lastPanPoint.current = { x: e.clientX, y: e.clientY }
    }

    // live coordinates in % (before transform)
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top
      // invert transform
      const ix = (px - translate.x) / scale
      const iy = (py - translate.y) / scale
      const xp = clamp((ix / rect.width) * 100, 0, 100)
      const yp = clamp((iy / rect.height) * 100, 0, 100)
      setCursorPct({ x: xp, y: yp })
    }
  }, [isPanning, scale, translate])

  const endPan = useCallback(() => {
    setIsPanning(false)
    lastPanPoint.current = null
  }, [])

  const transformStyle = useMemo(() => ({
    transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
    transformOrigin: "0 0",
  }), [scale, translate])

  const currentRotations = rotationPaths[gamePhase as keyof typeof rotationPaths] || []
  const heroRotation = currentRotations.find((r) => r.hero === selectedHero)

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
                <h1 className="text-2xl font-bold text-balance">Interactive Map Tactics</h1>
                <p className="text-sm text-muted-foreground">Strategic positioning and rotation analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-chart-3/20 text-chart-3 border-chart-3/30">
                <Map className="w-3 h-3 mr-1" />
                Live Map
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Hero Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hero Selection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedHero} onValueChange={setSelectedHero}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Hero" />
                  </SelectTrigger>
                  <SelectContent>
                    {heroes.map((hero) => (
                      <SelectItem key={hero.id} value={hero.name}>
                        {hero.name} ({hero.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={gamePhase} onValueChange={setGamePhase}>
                  <SelectTrigger>
                    <SelectValue placeholder="Game Phase" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(rotationPaths).map((phase) => (
                      <SelectItem key={phase} value={phase}>
                        {phase}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Map Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Map Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Game Time: {timeSlider[0]} min</label>
                  <Slider
                    value={timeSlider}
                    onValueChange={setTimeSlider}
                    max={25}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Rotation Paths</span>
                    <Button
                      variant={showPaths ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowPaths(!showPaths)}
                    >
                      <Target className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Objectives</span>
                    <Button
                      variant={showObjectives ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowObjectives(!showObjectives)}
                    >
                      <Crown className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Jungle Camps</span>
                    <Button
                      variant={showJungle ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowJungle(!showJungle)}
                    >
                      <TreePine className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Rotation */}
            {heroRotation && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    {selectedHero} Rotation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <div className="font-semibold text-primary mb-1">Path:</div>
                      <div className="text-muted-foreground">{heroRotation.path}</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold text-chart-1 mb-1">Timing:</div>
                      <div className="text-muted-foreground">{heroRotation.timing}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Interactive Map */}
          <div className="lg:col-span-3">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="w-5 h-5 text-chart-3" />
                  Land of Dawn - Strategic Map
                </CardTitle>
                <CardDescription>Interactive map showing rotations, objectives, and tactical positions</CardDescription>
              </CardHeader>
              <CardContent className="h-full p-6">
                <div
                  ref={containerRef}
                  className="relative w-full h-full bg-gradient-to-br from-chart-4/20 to-chart-3/20 rounded-lg border-2 border-border overflow-hidden cursor-grab"
                  onWheel={onWheel}
                  onMouseDown={onMouseDown}
                  onMouseMove={onMouseMove}
                  onMouseUp={endPan}
                  onMouseLeave={endPan}
                >
                  {/* Map Background */}
                  <div className="absolute inset-0" style={transformStyle}>
                    <div className="absolute inset-0 bg-[url('/newmap.webp')] bg-cover bg-center opacity-30"></div>
                  </div>

                  {/* Lane Markers */}
                  <div className="absolute top-4 left-4 bg-chart-3/20 px-3 py-1 rounded text-sm font-semibold text-chart-3">
                    EXP Lane
                  </div>
                  <div className="absolute top-4 right-4 bg-chart-1/20 px-3 py-1 rounded text-sm font-semibold text-chart-1">
                    Gold Lane
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary/20 px-3 py-1 rounded text-sm font-semibold text-primary">
                    Mid Lane
                  </div>

                  {/* Jungle Camps */}
                  {showJungle &&
                    jungleCreeps.map((creep) => (
                      <div
                        key={creep.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                        style={{ left: `calc(${creep.x}% * ${scale})`, top: `calc(${creep.y}% * ${scale})`, ...transformStyle }}
                      >
                        <div className="w-8 h-8 bg-muted/80 rounded-full flex items-center justify-center border-2 border-border hover:border-primary transition-colors">
                          <TreePine className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-card border border-border rounded px-2 py-1 text-xs whitespace-nowrap">
                            <div className="font-semibold">{creep.name}</div>
                            <div className="text-muted-foreground">
                              {creep.gold}G • {creep.exp}XP • {creep.respawn}s
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* Map Objectives */}
                  {showObjectives &&
                    mapObjectives.map((objective) => (
                      <div
                        key={objective.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                        style={{ left: `calc(${objective.x}% * ${scale})`, top: `calc(${objective.y}% * ${scale})`, ...transformStyle }}
                      >
                        <div className="w-10 h-10 bg-chart-1/20 rounded-full flex items-center justify-center border-2 border-chart-1 hover:bg-chart-1/30 transition-colors">
                          <Crown className="w-5 h-5 text-chart-1" />
                        </div>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-card border border-border rounded px-2 py-1 text-xs whitespace-nowrap">
                            <div className="font-semibold">{objective.name}</div>
                            <div className="text-muted-foreground">
                              {objective.reward} • {objective.respawn}s
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* Rotation Paths */}
                  {showPaths && heroRotation && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={transformStyle}>
                      <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--primary))" />
                        </marker>
                      </defs>

                      {/* Example rotation path for selected hero */}
                      <path
                        d="M 20% 30% Q 35% 45% 50% 50% Q 65% 55% 80% 70%"
                        stroke="hsl(var(--primary))"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="8,4"
                        markerEnd="url(#arrowhead)"
                        className="animate-pulse"
                      />
                    </svg>
                  )}

                  {/* Crosshair and coordinates */}
                  {cursorPct && (
                    <>
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute left-0 right-0" style={{ top: `calc(${cursorPct.y}% * ${scale})` }}>
                          <div className="border-t border-dashed border-border" />
                        </div>
                        <div className="absolute top-0 bottom-0" style={{ left: `calc(${cursorPct.x}% * ${scale})` }}>
                          <div className="border-l border-dashed border-border" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-card/90 px-3 py-2 rounded-lg border border-border text-xs">
                        {cursorPct.x.toFixed(1)}%, {cursorPct.y.toFixed(1)}%
                      </div>
                    </>
                  )}

                  {/* View controls */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setScale((s) => clamp(s * 1.2, 0.6, 3))}>+
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setScale((s) => clamp(s / 1.2, 0.6, 3))}>-
                    </Button>
                    <Button size="sm" variant="secondary" onClick={resetView}>Reset
                    </Button>
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-4 right-4 bg-card/90 rounded-lg border border-border p-3 text-xs space-y-2 w-56">
                    <div className="font-semibold text-sm mb-1">Legend</div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-chart-3" />
                      <span>EXP Lane</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-chart-1" />
                      <span>Gold Lane</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span>Mid Lane</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-border flex items-center justify-center bg-muted/80">
                        <span className="block w-2 h-2 bg-muted-foreground rounded" />
                      </div>
                      <span>Jungle Camp</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-chart-1 flex items-center justify-center bg-chart-1/20">
                        <span className="block w-2 h-2 bg-chart-1 rounded" />
                      </div>
                      <span>Objective</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-0.5 bg-primary/70" />
                      <span>Rotation Path</span>
                    </div>
                  </div>

                  {/* Hero Position Indicator */}
                  <div className="absolute bottom-4 left-4 bg-primary/20 px-3 py-2 rounded-lg border border-primary/30">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold">{selectedHero} Position</span>
                    </div>
                  </div>

                  {/* Time Indicator */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-card/90 px-4 py-2 rounded-lg border border-border">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold">{timeSlider[0]}:00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tactical Information */}
            <div className="mt-6">
              <Tabs defaultValue="rotations" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-muted">
                  <TabsTrigger value="rotations">Rotations</TabsTrigger>
                  <TabsTrigger value="objectives">Objectives</TabsTrigger>
                  <TabsTrigger value="timings">Timings</TabsTrigger>
                </TabsList>

                <TabsContent value="rotations" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentRotations.map((rotation, index) => (
                      <Card
                        key={index}
                        className={`cursor-pointer transition-colors ${
                          rotation.hero === selectedHero ? "border-primary bg-primary/5" : "hover:border-primary/50"
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">{rotation.hero}</h4>
                              <Badge variant="outline" className="text-xs">
                                {rotation.timing}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{rotation.path}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="objectives" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mapObjectives.map((objective) => (
                      <Card key={objective.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-chart-1/20 rounded-full flex items-center justify-center">
                              <Crown className="w-5 h-5 text-chart-1" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{objective.name}</h4>
                              <p className="text-sm text-muted-foreground">{objective.reward}</p>
                              <p className="text-xs text-muted-foreground">Respawn: {objective.respawn}s</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="timings" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
                          <h4 className="font-semibold">First Turtle</h4>
                          <p className="text-2xl font-bold text-primary">3:00</p>
                          <p className="text-sm text-muted-foreground">Optimal contest timing</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <Crown className="w-8 h-8 mx-auto mb-2 text-chart-1" />
                          <h4 className="font-semibold">Lord Spawn</h4>
                          <p className="text-2xl font-bold text-chart-1">8:00</p>
                          <p className="text-sm text-muted-foreground">First Lord appearance</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <Flame className="w-8 h-8 mx-auto mb-2 text-destructive" />
                          <h4 className="font-semibold">Power Spike</h4>
                          <p className="text-2xl font-bold text-destructive">4:00</p>
                          <p className="text-sm text-muted-foreground">Ultimate availability</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
