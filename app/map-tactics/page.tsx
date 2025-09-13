"use client"

import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Map, Clock, Target, Zap, TreePine, Crown, Flame, Shield, Sword, Gem, Star } from "lucide-react"
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
  { id: 1, name: "Blue Buff", x: 20, y: 30, respawn: 90, gold: 60, exp: 80, type: "buff", icon: Shield, color: "blue" },
  { id: 2, name: "Red Buff", x: 80, y: 70, respawn: 90, gold: 60, exp: 80, type: "buff", icon: Sword, color: "red" },
  { id: 3, name: "Lithowanderer", x: 50, y: 50, respawn: 45, gold: 40, exp: 60, type: "neutral", icon: Gem, color: "purple" },
  { id: 4, name: "Rockursa", x: 30, y: 60, respawn: 45, gold: 35, exp: 50, type: "neutral", icon: TreePine, color: "green" },
  { id: 5, name: "Firetooth", x: 70, y: 40, respawn: 45, gold: 35, exp: 50, type: "neutral", icon: Flame, color: "orange" },
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
  { id: 1, name: "Turtle", x: 50, y: 65, respawn: 180, reward: "Gold & EXP Boost", icon: Shield, color: "emerald", priority: "high" },
  { id: 2, name: "Lord", x: 50, y: 20, respawn: 420, reward: "Lane Push Power", icon: Crown, color: "gold", priority: "critical" },
  { id: 3, name: "Crab", x: 35, y: 45, respawn: 90, reward: "Vision & Gold", icon: Star, color: "cyan", priority: "medium" },
  { id: 4, name: "Crab", x: 65, y: 55, respawn: 90, reward: "Vision & Gold", icon: Star, color: "cyan", priority: "medium" },
]

export default function MapTacticsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Initialize state from URL params
  const [selectedHero, setSelectedHero] = useState<string>(searchParams.get("hero") || "Ling")
  const [gamePhase, setGamePhase] = useState<string>(searchParams.get("phase") || "Early Game (0-5min)")
  const [timeSlider, setTimeSlider] = useState([parseInt(searchParams.get("time") || "5")])
  const [showPaths, setShowPaths] = useState(searchParams.get("paths") !== "false")
  const [showObjectives, setShowObjectives] = useState(searchParams.get("objectives") !== "false")
  const [showJungle, setShowJungle] = useState(searchParams.get("jungle") !== "false")

  // View transform state
  const [scale, setScale] = useState(parseFloat(searchParams.get("scale") || "1"))
  const [translate, setTranslate] = useState({ 
    x: parseFloat(searchParams.get("x") || "0"), 
    y: parseFloat(searchParams.get("y") || "0") 
  })
  const [isPanning, setIsPanning] = useState(false)
  const lastPanPoint = useRef<{ x: number; y: number } | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [cursorPct, setCursorPct] = useState<{ x: number; y: number } | null>(null)
  
  // Touch gesture state
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(null)
  const [lastTouchCenter, setLastTouchCenter] = useState<{ x: number; y: number } | null>(null)

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

  // Touch gesture handlers
  const getTouchDistance = useCallback((touches: TouchList) => {
    if (touches.length < 2) return 0
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.sqrt(dx * dx + dy * dy)
  }, [])

  const getTouchCenter = useCallback((touches: TouchList) => {
    if (touches.length === 0) return { x: 0, y: 0 }
    if (touches.length === 1) return { x: touches[0].clientX, y: touches[0].clientY }
    
    const x = (touches[0].clientX + touches[1].clientX) / 2
    const y = (touches[0].clientY + touches[1].clientY) / 2
    return { x, y }
  }, [])

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    if (e.touches.length === 1) {
      setIsPanning(true)
      lastPanPoint.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    } else if (e.touches.length === 2) {
      setLastTouchDistance(getTouchDistance(e.touches))
      setLastTouchCenter(getTouchCenter(e.touches))
    }
  }, [getTouchDistance, getTouchCenter])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    
    if (e.touches.length === 1 && isPanning && lastPanPoint.current) {
      const dx = e.touches[0].clientX - lastPanPoint.current.x
      const dy = e.touches[0].clientY - lastPanPoint.current.y
      setTranslate((t) => ({ x: t.x + dx, y: t.y + dy }))
      lastPanPoint.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    } else if (e.touches.length === 2 && lastTouchDistance && lastTouchCenter) {
      const currentDistance = getTouchDistance(e.touches)
      const currentCenter = getTouchCenter(e.touches)
      
      // Pinch to zoom
      if (currentDistance !== lastTouchDistance) {
        const scaleChange = currentDistance / lastTouchDistance
        const newScale = clamp(scale * scaleChange, 0.6, 3)
        
        // Zoom to center of pinch
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect()
          const centerX = currentCenter.x - rect.left
          const centerY = currentCenter.y - rect.top
          
          const scaleRatio = newScale / scale
          const newTranslate = {
            x: centerX - scaleRatio * (centerX - translate.x),
            y: centerY - scaleRatio * (centerY - translate.y),
          }
          
          setScale(newScale)
          setTranslate(newTranslate)
        }
      }
      
      // Two-finger pan
      const dx = currentCenter.x - lastTouchCenter.x
      const dy = currentCenter.y - lastTouchCenter.y
      setTranslate((t) => ({ x: t.x + dx, y: t.y + dy }))
      
      setLastTouchDistance(currentDistance)
      setLastTouchCenter(currentCenter)
    }
  }, [isPanning, scale, translate, lastTouchDistance, lastTouchCenter, getTouchDistance, getTouchCenter])

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      setIsPanning(false)
      lastPanPoint.current = null
      setLastTouchDistance(null)
      setLastTouchCenter(null)
    } else if (e.touches.length === 1) {
      setLastTouchDistance(null)
      setLastTouchCenter(null)
    }
  }, [])

  // URL persistence
  const updateURL = useCallback((updates: Record<string, string | number | boolean>) => {
    const params = new URLSearchParams(searchParams.toString())
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === true || value === false) {
        params.set(key, value.toString())
      } else {
        params.set(key, value.toString())
      }
    })
    
    router.replace(`?${params.toString()}`, { scroll: false })
  }, [router, searchParams])

  // Update URL when state changes
  useEffect(() => {
    updateURL({
      hero: selectedHero,
      phase: gamePhase,
      time: timeSlider[0],
      paths: showPaths,
      objectives: showObjectives,
      jungle: showJungle,
      scale: scale,
      x: translate.x,
      y: translate.y
    })
  }, [selectedHero, gamePhase, timeSlider, showPaths, showObjectives, showJungle, scale, translate, updateURL])

  const transformStyle = useMemo(() => ({
    transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
    transformOrigin: "0 0",
  }), [scale, translate])

  // Memoized derived state
  const currentRotations = useMemo(() => 
    rotationPaths[gamePhase as keyof typeof rotationPaths] || [], 
    [gamePhase]
  )
  
  const heroRotation = useMemo(() => 
    currentRotations.find((r) => r.hero === selectedHero), 
    [currentRotations, selectedHero]
  )

  // Memoized color classes
  const jungleColorClasses = useMemo(() => ({
    blue: "bg-blue-500/20 border-blue-500 text-blue-500",
    red: "bg-red-500/20 border-red-500 text-red-500",
    purple: "bg-purple-500/20 border-purple-500 text-purple-500",
    green: "bg-green-500/20 border-green-500 text-green-500",
    orange: "bg-orange-500/20 border-orange-500 text-orange-500"
  }), [])

  const objectiveColorClasses = useMemo(() => ({
    emerald: "bg-emerald-500/20 border-emerald-500 text-emerald-500",
    gold: "bg-yellow-500/20 border-yellow-500 text-yellow-500",
    cyan: "bg-cyan-500/20 border-cyan-500 text-cyan-500"
  }), [])

  const priorityClasses = useMemo(() => ({
    critical: "ring-2 ring-yellow-400/50 animate-pulse",
    high: "ring-2 ring-emerald-400/50",
    medium: ""
  }), [])

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
                  className="relative w-full h-full bg-gradient-to-br from-chart-4/20 to-chart-3/20 rounded-lg border-2 border-border overflow-hidden cursor-grab touch-none"
                  onWheel={onWheel}
                  onMouseDown={onMouseDown}
                  onMouseMove={onMouseMove}
                  onMouseUp={endPan}
                  onMouseLeave={endPan}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
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
                    jungleCreeps.map((creep) => {
                      const IconComponent = creep.icon
                      return (
                      <div
                        key={creep.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                          style={{ left: `calc(${creep.x}% * ${scale})`, top: `calc(${creep.y}% * ${scale})`, ...transformStyle }}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 hover:scale-110 transition-all duration-300 hover:shadow-lg ${jungleColorClasses[creep.color as keyof typeof jungleColorClasses]}`}>
                            <IconComponent className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                          </div>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                            <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 text-xs shadow-xl">
                              <div className="font-semibold text-sm mb-1">{creep.name}</div>
                              <div className="text-muted-foreground mb-1 capitalize">{creep.type}</div>
                              <div className="flex gap-2 text-xs">
                                <span className="text-yellow-500 flex items-center gap-1">
                                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                                  {creep.gold}G
                                </span>
                                <span className="text-blue-500 flex items-center gap-1">
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                  {creep.exp}XP
                                </span>
                                <span className="text-green-500 flex items-center gap-1">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                  {creep.respawn}s
                                </span>
                        </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}

                  {/* Map Objectives */}
                  {showObjectives &&
                    mapObjectives.map((objective) => {
                      const IconComponent = objective.icon
                      return (
                      <div
                        key={objective.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                          style={{ left: `calc(${objective.x}% * ${scale})`, top: `calc(${objective.y}% * ${scale})`, ...transformStyle }}
                        >
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 hover:scale-110 transition-all duration-300 hover:shadow-lg ${objectiveColorClasses[objective.color as keyof typeof objectiveColorClasses]} ${priorityClasses[objective.priority as keyof typeof priorityClasses]}`}>
                            <IconComponent className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                          </div>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                            <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 text-xs shadow-xl min-w-48">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="font-semibold text-sm">{objective.name}</div>
                                <Badge variant="outline" className="text-xs capitalize">{objective.priority}</Badge>
                        </div>
                              <div className="text-muted-foreground mb-1">{objective.reward}</div>
                              <div className="text-green-500 text-xs flex items-center gap-1">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                Respawn: {objective.respawn}s
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}

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
                    <Button size="sm" variant="outline" onClick={() => setScale((s) => clamp(s * 1.2, 0.6, 3))} className="hidden sm:flex">
                      +
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setScale((s) => clamp(s / 1.2, 0.6, 3))} className="hidden sm:flex">
                      -
                    </Button>
                    <Button size="sm" variant="secondary" onClick={resetView} className="text-xs sm:text-sm">
                      Reset
                    </Button>
                  </div>
                  
                  {/* Mobile zoom controls */}
                  <div className="absolute top-4 left-4 flex gap-2 sm:hidden">
                    <Button size="sm" variant="outline" onClick={() => setScale((s) => clamp(s * 1.2, 0.6, 3))} className="w-8 h-8 p-0">
                      +
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setScale((s) => clamp(s / 1.2, 0.6, 3))} className="w-8 h-8 p-0">
                      -
                    </Button>
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-4 right-4 bg-card/95 rounded-lg border border-border p-3 text-xs space-y-2 w-64 shadow-lg">
                    <div className="font-semibold text-sm mb-2">Legend</div>
                    <div className="space-y-1">
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
                    </div>
                    <div className="border-t border-border pt-2 mt-2">
                      <div className="text-xs font-medium text-muted-foreground mb-1">Jungle Camps</div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center">
                          <Shield className="w-2 h-2 text-blue-500" />
                        </div>
                        <span>Buff</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center">
                          <Gem className="w-2 h-2 text-purple-500" />
                        </div>
                        <span>Neutral</span>
                      </div>
                    </div>
                    <div className="border-t border-border pt-2 mt-2">
                      <div className="text-xs font-medium text-muted-foreground mb-1">Objectives</div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-4 rounded-full bg-yellow-500/20 border border-yellow-500 flex items-center justify-center ring-1 ring-yellow-400/50">
                          <Crown className="w-2 h-2 text-yellow-500" />
                        </div>
                        <span>Critical</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center ring-1 ring-emerald-400/50">
                          <Shield className="w-2 h-2 text-emerald-500" />
                        </div>
                        <span>High Priority</span>
                      </div>
                    </div>
                    <div className="border-t border-border pt-2 mt-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-0.5 bg-primary/70" />
                        <span>Rotation Path</span>
                      </div>
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
