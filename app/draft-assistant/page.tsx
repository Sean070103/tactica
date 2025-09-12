"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Users, Target, Shield, Sword, Star, X, Plus, ArrowLeft, BarChart3, TrendingUp, AlertTriangle, CheckCircle, Clock, Zap, Timer, RotateCcw, Save, History, Wifi, WifiOff, User, Settings, Heart, Share2, Copy, Download, Upload, Brain, Lightbulb, TrendingDown, Activity, Award, Crown, Target as TargetIcon, Play, Pause, Eye, Globe, Trophy, Medal, MessageSquare, Mic, MicOff, Video, VideoOff, Lock, Unlock, UserPlus, Hash } from "lucide-react"
import Link from "next/link"

// Enhanced hero database with more comprehensive data
const heroes = [
  {
    id: 1,
    name: "Paquito",
    role: "Fighter",
    tier: "S",
    lane: "EXP Lane",
    counters: ["Chou", "Aldous", "Yu Zhong"],
    synergies: ["Estes", "Rafaela", "Angela"],
    winRate: 68,
    pickRate: 24,
    banRate: 45,
    difficulty: "Medium",
    powerSpike: "Mid Game",
    description: "Versatile fighter with strong early game and team fight presence"
  },
  {
    id: 2,
    name: "Ling",
    role: "Assassin",
    tier: "S",
    lane: "Jungle",
    counters: ["Saber", "Natalia", "Franco"],
    synergies: ["Angela", "Diggie", "Estes"],
    winRate: 65,
    pickRate: 18,
    banRate: 52,
    difficulty: "Hard",
    powerSpike: "Late Game",
    description: "Mobile assassin with excellent mobility and burst damage"
  },
  {
    id: 3,
    name: "Fanny",
    role: "Assassin",
    tier: "S+",
    lane: "Jungle",
    counters: ["Khufra", "Franco", "Saber"],
    synergies: ["Estes", "Angela", "Diggie"],
    winRate: 72,
    pickRate: 12,
    banRate: 38,
    difficulty: "Very Hard",
    powerSpike: "Early Game",
    description: "High-skill assassin with incredible mobility and snowball potential"
  },
  {
    id: 4,
    name: "Gusion",
    role: "Assassin",
    tier: "A",
    lane: "Jungle",
    counters: ["Chou", "Saber", "Khufra"],
    synergies: ["Diggie", "Rafaela", "Angela"],
    winRate: 63,
    pickRate: 22,
    banRate: 41,
    difficulty: "Hard",
    powerSpike: "Mid Game",
    description: "Burst assassin with strong combo potential and mobility"
  },
  {
    id: 5,
    name: "Lancelot",
    role: "Assassin",
    tier: "A",
    lane: "Jungle",
    counters: ["Khufra", "Chou", "Franco"],
    synergies: ["Angela", "Estes", "Diggie"],
    winRate: 61,
    pickRate: 28,
    banRate: 35,
    difficulty: "Medium",
    powerSpike: "Mid Game",
    description: "Balanced assassin with good mobility and sustained damage"
  },
  {
    id: 6,
    name: "Chou",
    role: "Fighter",
    tier: "S",
    lane: "EXP Lane",
    counters: ["Esmeralda", "Yu Zhong", "Aldous"],
    synergies: ["Diggie", "Rafaela", "Estes"],
    winRate: 64,
    pickRate: 26,
    banRate: 48,
    difficulty: "Medium",
    powerSpike: "Early Game",
    description: "Versatile fighter with strong crowd control and mobility"
  },
  {
    id: 7,
    name: "Aldous",
    role: "Fighter",
    tier: "A",
    lane: "EXP Lane",
    counters: ["Karrie", "Claude", "Granger"],
    synergies: ["Estes", "Angela", "Rafaela"],
    winRate: 59,
    pickRate: 15,
    banRate: 25,
    difficulty: "Easy",
    powerSpike: "Late Game",
    description: "Scaling fighter with incredible late game potential"
  },
  {
    id: 8,
    name: "Estes",
    role: "Support",
    tier: "S",
    lane: "Roam",
    counters: ["Ling", "Fanny", "Gusion"],
    synergies: ["Paquito", "Aldous", "Fanny"],
    winRate: 66,
    pickRate: 20,
    banRate: 35,
    difficulty: "Easy",
    powerSpike: "Mid Game",
    description: "Healing support with strong team sustain and utility"
  },
  {
    id: 9,
    name: "Angela",
    role: "Support",
    tier: "A",
    lane: "Roam",
    counters: ["Franco", "Khufra", "Saber"],
    synergies: ["Fanny", "Ling", "Paquito"],
    winRate: 62,
    pickRate: 18,
    banRate: 28,
    difficulty: "Easy",
    powerSpike: "Mid Game",
    description: "Utility support with strong buffs and protection abilities"
  },
  {
    id: 10,
    name: "Khufra",
    role: "Tank",
    tier: "S",
    lane: "Roam",
    counters: ["Esmeralda", "Karrie", "Claude"],
    synergies: ["Gusion", "Lancelot", "Fanny"],
    winRate: 67,
    pickRate: 22,
    banRate: 42,
    difficulty: "Medium",
    powerSpike: "Early Game",
    description: "Crowd control tank with strong initiation and disruption"
  },
  {
    id: 11,
    name: "Granger",
    role: "Marksman",
    tier: "S",
    lane: "Gold Lane",
    counters: ["Aldous", "Esmeralda", "Yu Zhong"],
    synergies: ["Estes", "Rafaela", "Angela"],
    winRate: 70,
    pickRate: 25,
    banRate: 40,
    difficulty: "Medium",
    powerSpike: "Late Game",
    description: "High-damage marksman with strong late game scaling"
  },
  {
    id: 12,
    name: "Pharsa",
    role: "Mage",
    tier: "A",
    lane: "Mid Lane",
    counters: ["Ling", "Fanny", "Gusion"],
    synergies: ["Estes", "Rafaela", "Diggie"],
    winRate: 58,
    pickRate: 16,
    banRate: 20,
    difficulty: "Medium",
    powerSpike: "Mid Game",
    description: "Burst mage with strong area damage and mobility"
  },
  {
    id: 13,
    name: "Rafaela",
    role: "Support",
    tier: "A",
    lane: "Roam",
    counters: ["Ling", "Fanny", "Gusion"],
    synergies: ["Paquito", "Granger", "Pharsa"],
    winRate: 60,
    pickRate: 14,
    banRate: 15,
    difficulty: "Easy",
    powerSpike: "Early Game",
    description: "Utility support with healing and crowd control"
  },
  {
    id: 14,
    name: "Diggie",
    role: "Support",
    tier: "A",
    lane: "Roam",
    counters: ["Khufra", "Franco", "Saber"],
    synergies: ["Ling", "Fanny", "Gusion"],
    winRate: 55,
    pickRate: 12,
    banRate: 18,
    difficulty: "Medium",
    powerSpike: "Early Game",
    description: "Anti-crowd control support with strong utility"
  },
  {
    id: 15,
    name: "Saber",
    role: "Assassin",
    tier: "B",
    lane: "Jungle",
    counters: ["Ling", "Fanny", "Gusion"],
    synergies: ["Estes", "Rafaela", "Angela"],
    winRate: 52,
    pickRate: 8,
    banRate: 12,
    difficulty: "Easy",
    powerSpike: "Early Game",
    description: "Simple assassin with strong single-target burst"
  },
  {
    id: 16,
    name: "Claude",
    role: "Marksman",
    tier: "S",
    lane: "Gold Lane",
    counters: ["Aldous", "Esmeralda", "Yu Zhong"],
    synergies: ["Estes", "Rafaela", "Angela"],
    winRate: 69,
    pickRate: 22,
    banRate: 38,
    difficulty: "Medium",
    powerSpike: "Late Game",
    description: "Mobile marksman with excellent kiting and team fight presence"
  },
  {
    id: 17,
    name: "Beatrix",
    role: "Marksman",
    tier: "S",
    lane: "Gold Lane",
    counters: ["Aldous", "Esmeralda", "Yu Zhong"],
    synergies: ["Estes", "Rafaela", "Angela"],
    winRate: 71,
    pickRate: 28,
    banRate: 45,
    difficulty: "Hard",
    powerSpike: "Late Game",
    description: "Versatile marksman with multiple weapon modes and high damage output"
  },
  {
    id: 18,
    name: "Kagura",
    role: "Mage",
    tier: "S",
    lane: "Mid Lane",
    counters: ["Ling", "Fanny", "Gusion"],
    synergies: ["Estes", "Rafaela", "Diggie"],
    winRate: 66,
    pickRate: 20,
    banRate: 35,
    difficulty: "Hard",
    powerSpike: "Mid Game",
    description: "High-skill mage with exceptional mobility and burst damage"
  },
  {
    id: 19,
    name: "Luo Yi",
    role: "Mage",
    tier: "A",
    lane: "Mid Lane",
    counters: ["Ling", "Fanny", "Gusion"],
    synergies: ["Estes", "Rafaela", "Diggie"],
    winRate: 61,
    pickRate: 16,
    banRate: 25,
    difficulty: "Medium",
    powerSpike: "Mid Game",
    description: "Control mage with strong area denial and team fight presence"
  },
  {
    id: 20,
    name: "Yu Zhong",
    role: "Fighter",
    tier: "S",
    lane: "EXP Lane",
    counters: ["Paquito", "Chou", "Aldous"],
    synergies: ["Estes", "Rafaela", "Angela"],
    winRate: 67,
    pickRate: 24,
    banRate: 42,
    difficulty: "Medium",
    powerSpike: "Mid Game",
    description: "Dragon warrior with strong sustain and team fight disruption"
  },
  {
    id: 21,
    name: "Esmeralda",
    role: "Mage",
    tier: "S",
    lane: "EXP Lane",
    counters: ["Yu Zhong", "Aldous", "Paquito"],
    synergies: ["Estes", "Rafaela", "Angela"],
    winRate: 68,
    pickRate: 26,
    banRate: 48,
    difficulty: "Medium",
    powerSpike: "Mid Game",
    description: "Magic fighter with shield mechanics and strong lane presence"
  },
  {
    id: 22,
    name: "Franco",
    role: "Tank",
    tier: "A",
    lane: "Roam",
    counters: ["Ling", "Fanny", "Gusion"],
    synergies: ["Gusion", "Lancelot", "Fanny"],
    winRate: 58,
    pickRate: 18,
    banRate: 22,
    difficulty: "Medium",
    powerSpike: "Early Game",
    description: "Hook tank with strong pick potential and crowd control"
  },
  {
    id: 23,
    name: "Natalia",
    role: "Assassin",
    tier: "A",
    lane: "Jungle",
    counters: ["Ling", "Fanny", "Gusion"],
    synergies: ["Estes", "Rafaela", "Angela"],
    winRate: 59,
    pickRate: 14,
    banRate: 18,
    difficulty: "Hard",
    powerSpike: "Early Game",
    description: "Stealth assassin with strong ganking and vision control"
  },
  {
    id: 24,
    name: "Melissa",
    role: "Marksman",
    tier: "A",
    lane: "Gold Lane",
    counters: ["Aldous", "Esmeralda", "Yu Zhong"],
    synergies: ["Estes", "Rafaela", "Angela"],
    winRate: 63,
    pickRate: 16,
    banRate: 20,
    difficulty: "Medium",
    powerSpike: "Late Game",
    description: "Puppet master with unique mechanics and strong late game scaling"
  },
  {
    id: 25,
    name: "Karrie",
    role: "Marksman",
    tier: "A",
    lane: "Gold Lane",
    counters: ["Aldous", "Esmeralda", "Yu Zhong"],
    synergies: ["Estes", "Rafaela", "Angela"],
    winRate: 60,
    pickRate: 12,
    banRate: 15,
    difficulty: "Easy",
    powerSpike: "Late Game",
    description: "True damage marksman with strong tank-shredding capabilities"
  }
]

const roles = ["Tank", "Fighter", "Assassin", "Mage", "Marksman", "Support"]
const lanes = ["EXP Lane", "Jungle", "Mid Lane", "Gold Lane", "Roam"]

interface DraftState {
  allyTeam: typeof heroes
  enemyTeam: typeof heroes
  bannedHeroes: typeof heroes
  currentPhase: 'ban' | 'pick' | 'complete'
  currentTurn: 'ally' | 'enemy'
  turnNumber: number
}

interface MetaData {
  lastUpdated: string
  patchVersion: string
  isLive: boolean
}

interface UserProfile {
  id: string
  username: string
  rank: string
  favoriteHeroes: string[]
  preferredRoles: string[]
  playStyle: 'aggressive' | 'defensive' | 'balanced'
  experience: 'beginner' | 'intermediate' | 'advanced' | 'pro'
  totalDrafts: number
  winRate: number
  createdAt: string
}

interface DraftTemplate {
  id: string
  name: string
  description: string
  allyTeam: typeof heroes
  enemyTeam: typeof heroes
  bannedHeroes: typeof heroes
  tags: string[]
  isPublic: boolean
  author: string
  likes: number
  createdAt: string
}

interface AISuggestion {
  hero: typeof heroes[0]
  reason: string
  confidence: number
  type: 'pick' | 'ban' | 'counter'
  priority: 'high' | 'medium' | 'low'
}

interface AnalyticsData {
  heroCombinations: Record<string, { winRate: number; games: number }>
  metaTrends: Array<{ hero: string; trend: 'rising' | 'falling' | 'stable'; change: number }>
  patchImpact: Record<string, { before: number; after: number; change: number }>
  proPickRates: Record<string, number>
}

interface LiveMatch {
  id: string
  team1: string
  team2: string
  status: 'draft' | 'playing' | 'finished'
  currentPhase: 'ban' | 'pick' | 'complete'
  team1Picks: string[]
  team2Picks: string[]
  team1Bans: string[]
  team2Bans: string[]
  viewers: number
  tournament: string
  startTime: string
}

interface ProPlayer {
  id: string
  name: string
  team: string
  role: string
  signatureHeroes: string[]
  winRate: number
  kda: string
  mvpCount: number
  totalMatches: number
  rank: string
}

interface DraftRoom {
  id: string
  name: string
  description: string
  isPrivate: boolean
  password?: string
  maxUsers: number
  currentUsers: number
  owner: string
  status: 'waiting' | 'drafting' | 'completed'
  createdAt: string
  draft: DraftState
}

interface RoomUser {
  id: string
  username: string
  role: 'owner' | 'coach' | 'player' | 'spectator'
  isOnline: boolean
  isMuted: boolean
  isVideoOn: boolean
  lastSeen: string
  assignedSlot?: number
}

interface ChatMessage {
  id: string
  userId: string
  username: string
  message: string
  timestamp: string
  type: 'text' | 'system' | 'draft_action'
}

export default function DraftAssistantPage() {
  const [draft, setDraft] = useState<DraftState>({
    allyTeam: [],
    enemyTeam: [],
    bannedHeroes: [],
    currentPhase: 'ban',
    currentTurn: 'ally',
    turnNumber: 1,
  })
  const [selectedHero, setSelectedHero] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<string>("all")
  const [metaData, setMetaData] = useState<MetaData>({
    lastUpdated: new Date().toISOString(),
    patchVersion: "1.8.44",
    isLive: true,
  })
  const [draftHistory, setDraftHistory] = useState<DraftState[]>([])
  const [isSimulationMode, setIsSimulationMode] = useState(false)
  const [draftTimer, setDraftTimer] = useState(30)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'user_001',
    username: 'ProDrafter',
    rank: 'Mythic Glory',
    favoriteHeroes: ['Ling', 'Fanny', 'Gusion', 'Kagura', 'Beatrix'],
    preferredRoles: ['Assassin', 'Mage', 'Marksman'],
    playStyle: 'aggressive',
    experience: 'advanced',
    totalDrafts: 127,
    winRate: 68.5,
    createdAt: '2024-01-15T10:30:00Z'
  })
  const [draftTemplates, setDraftTemplates] = useState<DraftTemplate[]>([
    {
      id: 'template_001',
      name: 'Early Game Domination',
      description: 'Aggressive early game composition with strong ganking potential',
      allyTeam: [heroes[0], heroes[1], heroes[2], heroes[3], heroes[4]],
      enemyTeam: [],
      bannedHeroes: [heroes[5], heroes[6]],
      tags: ['Early Game', 'Aggressive', 'Ganking'],
      isPublic: true,
      author: 'ProDrafter',
      likes: 42,
      createdAt: '2024-01-20T14:30:00Z'
    },
    {
      id: 'template_002',
      name: 'Late Game Scaling',
      description: 'Composition focused on late game team fights and scaling',
      allyTeam: [heroes[7], heroes[8], heroes[9], heroes[10], heroes[11]],
      enemyTeam: [],
      bannedHeroes: [heroes[12], heroes[13]],
      tags: ['Late Game', 'Scaling', 'Team Fight'],
      isPublic: true,
      author: 'MetaMaster',
      likes: 28,
      createdAt: '2024-01-19T09:15:00Z'
    }
  ])
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([])
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    heroCombinations: {
      'Ling+Fanny': { winRate: 72, games: 156 },
      'Gusion+Kagura': { winRate: 68, games: 203 },
      'Beatrix+Claude': { winRate: 65, games: 189 },
      'Yu Zhong+Esmeralda': { winRate: 71, games: 167 },
      'Estes+Rafaela': { winRate: 63, games: 145 }
    },
    metaTrends: [
      { hero: 'Ling', trend: 'rising', change: 12.5 },
      { hero: 'Beatrix', trend: 'rising', change: 8.3 },
      { hero: 'Fanny', trend: 'falling', change: -5.2 },
      { hero: 'Gusion', trend: 'stable', change: 1.1 },
      { hero: 'Kagura', trend: 'rising', change: 6.7 }
    ],
    patchImpact: {
      'Ling': { before: 58, after: 69, change: 11 },
      'Beatrix': { before: 62, after: 71, change: 9 },
      'Fanny': { before: 68, after: 61, change: -7 },
      'Yu Zhong': { before: 64, after: 67, change: 3 }
    },
    proPickRates: {
      'Ling': 45,
      'Beatrix': 38,
      'Kagura': 35,
      'Yu Zhong': 32,
      'Gusion': 28
    }
  })
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [liveMatches, setLiveMatches] = useState<LiveMatch[]>([
    {
      id: 'match_001',
      team1: 'ONIC Esports',
      team2: 'RRQ Hoshi',
      status: 'draft',
      currentPhase: 'pick',
      team1Picks: ['Ling', 'Beatrix'],
      team2Picks: ['Kagura', 'Yu Zhong'],
      team1Bans: ['Fanny', 'Gusion'],
      team2Bans: ['Estes', 'Rafaela'],
      viewers: 12500,
      tournament: 'MPL ID Season 12',
      startTime: '2024-01-20T15:30:00Z'
    },
    {
      id: 'match_002',
      team1: 'EVOS Legends',
      team2: 'Alter Ego',
      status: 'playing',
      currentPhase: 'complete',
      team1Picks: ['Claude', 'Luo Yi', 'Franco', 'Natalia', 'Melissa'],
      team2Picks: ['Paquito', 'Chou', 'Aldous', 'Diggie', 'Angela'],
      team1Bans: ['Ling', 'Fanny', 'Gusion'],
      team2Bans: ['Beatrix', 'Kagura', 'Yu Zhong'],
      viewers: 8900,
      tournament: 'MPL ID Season 12',
      startTime: '2024-01-20T14:00:00Z'
    }
  ])
  const [proPlayers, setProPlayers] = useState<ProPlayer[]>([
    {
      id: 'player_001',
      name: 'Sanford',
      team: 'ONIC Esports',
      role: 'Jungle',
      signatureHeroes: ['Ling', 'Fanny', 'Gusion'],
      winRate: 78.5,
      kda: '8.2/2.1/6.4',
      mvpCount: 15,
      totalMatches: 45,
      rank: 'Mythic Glory'
    },
    {
      id: 'player_002',
      name: 'Butsss',
      team: 'RRQ Hoshi',
      role: 'Mid Lane',
      signatureHeroes: ['Kagura', 'Luo Yi', 'Cecilion'],
      winRate: 72.3,
      kda: '6.8/1.9/7.2',
      mvpCount: 12,
      totalMatches: 42,
      rank: 'Mythic Glory'
    },
    {
      id: 'player_003',
      name: 'Lemon',
      team: 'EVOS Legends',
      role: 'Gold Lane',
      signatureHeroes: ['Beatrix', 'Claude', 'Melissa'],
      winRate: 75.8,
      kda: '7.5/2.3/5.8',
      mvpCount: 18,
      totalMatches: 48,
      rank: 'Mythic Glory'
    }
  ])
  const [showLiveMatches, setShowLiveMatches] = useState(false)
  const [showProPlayers, setShowProPlayers] = useState(false)
  // What-If simulator state
  const [whatIfSlotIndex, setWhatIfSlotIndex] = useState<number | null>(null)
  const [whatIfHeroId, setWhatIfHeroId] = useState<number | null>(null)
  const [whatIfResult, setWhatIfResult] = useState<{
    currentScore: number
    simulatedScore: number
    scoreDelta: number
    currentComposition: Record<string, number>
    simulatedComposition: Record<string, number>
  } | null>(null)
  // Team collaboration state
  const [currentRoom, setCurrentRoom] = useState<DraftRoom | null>(null)
  const [roomUsers, setRoomUsers] = useState<RoomUser[]>([])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [showCollaboration, setShowCollaboration] = useState(false)
  const [isInRoom, setIsInRoom] = useState(false)
  const [currentUser, setCurrentUser] = useState<RoomUser>({
    id: 'user_001',
    username: 'ProDrafter',
    role: 'owner',
    isOnline: true,
    isMuted: false,
    isVideoOn: false,
    lastSeen: new Date().toISOString()
  })

  // Real-time meta data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMetaData(prev => ({
        ...prev,
        lastUpdated: new Date().toISOString(),
        isLive: Math.random() > 0.1, // Simulate occasional connection issues
      }))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Draft timer simulation
  useEffect(() => {
    if (isSimulationMode && draftTimer > 0) {
      const timer = setTimeout(() => {
        setDraftTimer(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [draftTimer, isSimulationMode])

  // AI Suggestions generation
  useEffect(() => {
    const generateAISuggestions = () => {
      const suggestions: AISuggestion[] = []
      const availableHeroes = heroes.filter(hero => 
        !draft.allyTeam.find(h => h.id === hero.id) &&
        !draft.enemyTeam.find(h => h.id === hero.id) &&
        !draft.bannedHeroes.find(h => h.id === hero.id)
      )

      // High priority picks based on current meta
      const metaHeroes = availableHeroes.filter(hero => 
        analyticsData.proPickRates[hero.name] > 30
      ).slice(0, 3)

      metaHeroes.forEach(hero => {
        suggestions.push({
          hero,
          reason: `High meta pick (${analyticsData.proPickRates[hero.name]}% pro pick rate)`,
          confidence: 85,
          type: 'pick',
          priority: 'high'
        })
      })

      // Counter suggestions based on enemy team
      if (draft.enemyTeam.length > 0) {
        const enemyRoles = draft.enemyTeam.map(h => h.role)
        const counterHeroes = availableHeroes.filter(hero => 
          hero.counters.some(counter => 
            draft.enemyTeam.some(enemy => enemy.name === counter)
          )
        ).slice(0, 2)

        counterHeroes.forEach(hero => {
          const counteredEnemies = draft.enemyTeam.filter(enemy => 
            hero.counters.includes(enemy.name)
          )
          suggestions.push({
            hero,
            reason: `Counters ${counteredEnemies.map(e => e.name).join(', ')}`,
            confidence: 75,
            type: 'counter',
            priority: 'high'
          })
        })
      }

      // Synergy suggestions based on ally team
      if (draft.allyTeam.length > 0) {
        const allyNames = draft.allyTeam.map(h => h.name)
        const synergyHeroes = availableHeroes.filter(hero => 
          hero.synergies.some(synergy => allyNames.includes(synergy))
        ).slice(0, 2)

        synergyHeroes.forEach(hero => {
          const synergies = hero.synergies.filter(synergy => 
            allyNames.includes(synergy)
          )
          suggestions.push({
            hero,
            reason: `Synergizes with ${synergies.join(', ')}`,
            confidence: 70,
            type: 'pick',
            priority: 'medium'
          })
        })
      }

      // Ban suggestions for strong heroes
      const banCandidates = availableHeroes
        .filter(hero => analyticsData.proPickRates[hero.name] > 40)
        .slice(0, 2)

      banCandidates.forEach(hero => {
        suggestions.push({
          hero,
          reason: `Strong meta hero, consider banning`,
          confidence: 80,
          type: 'ban',
          priority: 'high'
        })
      })

      setAiSuggestions(suggestions.slice(0, 6))
    }

    generateAISuggestions()
  }, [draft, analyticsData])

  const filteredHeroes = heroes.filter((hero) => {
    const matchesSearch = hero.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || hero.role === selectedRole
    const notInDraft = !draft.allyTeam.find((h) => h.id === hero.id) && 
                      !draft.enemyTeam.find((h) => h.id === hero.id) &&
                      !draft.bannedHeroes.find((h) => h.id === hero.id)
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

  const banHero = (hero: (typeof heroes)[0]) => {
    if (draft.bannedHeroes.length < 6) {
      setDraft((prev) => ({ ...prev, bannedHeroes: [...prev.bannedHeroes, hero] }))
    }
  }

  const saveDraft = useCallback(() => {
    setDraftHistory(prev => [...prev, draft])
  }, [draft])

  const resetDraft = useCallback(() => {
    setDraft({
      allyTeam: [],
      enemyTeam: [],
      bannedHeroes: [],
      currentPhase: 'ban',
      currentTurn: 'ally',
      turnNumber: 1,
    })
    setDraftTimer(30)
  }, [])

  const startSimulation = useCallback(() => {
    setIsSimulationMode(true)
    setDraftTimer(30)
  }, [])

  const stopSimulation = useCallback(() => {
    setIsSimulationMode(false)
    setDraftTimer(30)
  }, [])

  const loadTemplate = useCallback((template: DraftTemplate) => {
    setDraft({
      allyTeam: template.allyTeam,
      enemyTeam: template.enemyTeam,
      bannedHeroes: template.bannedHeroes,
      currentPhase: 'pick',
      currentTurn: 'ally',
      turnNumber: 1,
    })
    setShowTemplates(false)
  }, [])

  const saveAsTemplate = useCallback(() => {
    const newTemplate: DraftTemplate = {
      id: `template_${Date.now()}`,
      name: `Draft ${draftHistory.length + 1}`,
      description: 'Custom draft composition',
      allyTeam: draft.allyTeam,
      enemyTeam: draft.enemyTeam,
      bannedHeroes: draft.bannedHeroes,
      tags: ['Custom'],
      isPublic: false,
      author: userProfile.username,
      likes: 0,
      createdAt: new Date().toISOString()
    }
    setDraftTemplates(prev => [...prev, newTemplate])
  }, [draft, draftHistory.length, userProfile.username])

  const shareDraft = useCallback(() => {
    const draftData = {
      allyTeam: draft.allyTeam.map(h => h.name),
      enemyTeam: draft.enemyTeam.map(h => h.name),
      bannedHeroes: draft.bannedHeroes.map(h => h.name),
      timestamp: new Date().toISOString()
    }
    navigator.clipboard.writeText(JSON.stringify(draftData, null, 2))
    // In a real app, this would generate a shareable link
  }, [draft])

  const exportDraft = useCallback(() => {
    const draftData = {
      allyTeam: draft.allyTeam,
      enemyTeam: draft.enemyTeam,
      bannedHeroes: draft.bannedHeroes,
      analysis: {
        teamScore: getTeamScore(),
        compositionScore: getCompositionScore(),
        powerSpikes: getPowerSpikeAnalysis(),
        strengths: getTeamStrengths(),
        weaknesses: getTeamWeaknesses()
      },
      timestamp: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(draftData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `draft_${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [draft])

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

  const getTeamScore = () => {
    if (draft.allyTeam.length === 0) return 0
    
    const avgWinRate = draft.allyTeam.reduce((sum, hero) => sum + hero.winRate, 0) / draft.allyTeam.length
    const synergyScore = getSynergyScore()
    const compositionScore = getCompositionScore()
    
    return Math.round((avgWinRate + synergyScore + compositionScore) / 3)
  }

  const getCompositionScore = () => {
    const composition = getTeamComposition(draft.allyTeam)
    const idealComposition = { Tank: 1, Fighter: 1, Assassin: 1, Mage: 1, Marksman: 1 }
    
    let score = 0
    Object.keys(idealComposition).forEach(role => {
      const current = composition[role] || 0
      const ideal = idealComposition[role as keyof typeof idealComposition]
      score += Math.min(current, ideal) * 20 // 20 points per correct role
    })
    
    return Math.min(score, 100)
  }

  const getPowerSpikeAnalysis = () => {
    const spikes = draft.allyTeam.reduce((acc, hero) => {
      acc[hero.powerSpike] = (acc[hero.powerSpike] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    return spikes
  }

  const getDifficultyAnalysis = () => {
    const difficulties = draft.allyTeam.reduce((acc, hero) => {
      acc[hero.difficulty] = (acc[hero.difficulty] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    return difficulties
  }

  const getTeamStrengths = () => {
    const strengths = []
    const composition = getTeamComposition(draft.allyTeam)
    const powerSpikes = getPowerSpikeAnalysis()
    
    if (composition.Tank >= 1) strengths.push("Strong Frontline")
    if (composition.Assassin >= 1) strengths.push("Good Burst Damage")
    if (composition.Support >= 1) strengths.push("Team Sustain")
    if (powerSpikes["Early Game"] >= 2) strengths.push("Early Game Dominance")
    if (powerSpikes["Late Game"] >= 2) strengths.push("Late Game Scaling")
    
    return strengths
  }

  const getTeamWeaknesses = () => {
    const weaknesses = []
    const composition = getTeamComposition(draft.allyTeam)
    
    if (composition.Tank === 0) weaknesses.push("No Frontline Tank")
    if (composition.Support === 0) weaknesses.push("No Support/Healer")
    if (composition.Marksman === 0) weaknesses.push("No Physical DPS")
    if (composition.Mage === 0) weaknesses.push("No Magic Damage")
    if (draft.allyTeam.length < 5) weaknesses.push("Incomplete Team")
    
    return weaknesses
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

  // Helpers for What-If simulator
  const getTeamScoreFor = (team: typeof heroes) => {
    if (team.length === 0) return 0
    const avgWinRate = team.reduce((sum, hero) => sum + hero.winRate, 0) / team.length
    // Approximate synergy score for arbitrary team
    let synergyCount = 0
    let totalPairs = 0
    for (let i = 0; i < team.length; i++) {
      for (let j = i + 1; j < team.length; j++) {
        totalPairs++
        if (team[i].synergies.includes(team[j].name) || team[j].synergies.includes(team[i].name)) {
          synergyCount++
        }
      }
    }
    const synergyScore = totalPairs > 0 ? Math.round((synergyCount / totalPairs) * 100) : 0
    // Composition score for arbitrary team
    const composition = getTeamComposition(team)
    const idealComposition = { Tank: 1, Fighter: 1, Assassin: 1, Mage: 1, Marksman: 1 }
    let compositionScore = 0
    Object.keys(idealComposition).forEach((role) => {
      const current = composition[role] || 0
      const ideal = idealComposition[role as keyof typeof idealComposition]
      compositionScore += Math.min(current, ideal) * 20
    })
    compositionScore = Math.min(compositionScore, 100)
    return Math.round((avgWinRate + synergyScore + compositionScore) / 3)
  }

  const simulateWhatIf = () => {
    if (whatIfSlotIndex === null || whatIfHeroId === null) return
    if (whatIfSlotIndex < 0 || whatIfSlotIndex >= draft.allyTeam.length) return
    const replacement = heroes.find((h) => h.id === whatIfHeroId)
    if (!replacement) return
    const simulatedTeam = draft.allyTeam.map((h, idx) => (idx === whatIfSlotIndex ? replacement : h))
    const currentScore = getTeamScoreFor(draft.allyTeam)
    const simulatedScore = getTeamScoreFor(simulatedTeam)
    const currentComposition = getTeamComposition(draft.allyTeam)
    const simulatedComposition = getTeamComposition(simulatedTeam)
    setWhatIfResult({
      currentScore,
      simulatedScore,
      scoreDelta: simulatedScore - currentScore,
      currentComposition,
      simulatedComposition,
    })
  }

  // Collaboration functions
  const createRoom = useCallback(() => {
    const newRoom: DraftRoom = {
      id: `room_${Date.now()}`,
      name: `${currentUser.username}'s Draft Room`,
      description: 'Team draft practice session',
      isPrivate: false,
      maxUsers: 8,
      currentUsers: 1,
      owner: currentUser.id,
      status: 'waiting',
      createdAt: new Date().toISOString(),
      draft: draft
    }
    setCurrentRoom(newRoom)
    setRoomUsers([currentUser])
    setIsInRoom(true)
    setShowCollaboration(true)
    
    // Add system message
    const systemMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      userId: 'system',
      username: 'System',
      message: `${currentUser.username} created the draft room`,
      timestamp: new Date().toISOString(),
      type: 'system'
    }
    setChatMessages([systemMessage])
  }, [currentUser, draft])

  const joinRoom = useCallback((roomId: string) => {
    // Simulate joining a room
    const mockRoom: DraftRoom = {
      id: roomId,
      name: 'Team Practice Session',
      description: 'Professional draft practice',
      isPrivate: false,
      maxUsers: 8,
      currentUsers: 3,
      owner: 'user_002',
      status: 'drafting',
      createdAt: new Date().toISOString(),
      draft: draft
    }
    setCurrentRoom(mockRoom)
    setRoomUsers([
      currentUser,
      {
        id: 'user_002',
        username: 'CoachMike',
        role: 'coach',
        isOnline: true,
        isMuted: false,
        isVideoOn: true,
        lastSeen: new Date().toISOString()
      },
      {
        id: 'user_003',
        username: 'ProPlayer',
        role: 'player',
        isOnline: true,
        isMuted: false,
        isVideoOn: false,
        lastSeen: new Date().toISOString(),
        assignedSlot: 1
      }
    ])
    setIsInRoom(true)
    setShowCollaboration(true)
  }, [currentUser, draft])

  const leaveRoom = useCallback(() => {
    setCurrentRoom(null)
    setRoomUsers([])
    setChatMessages([])
    setIsInRoom(false)
    setShowCollaboration(false)
  }, [])

  const sendMessage = useCallback(() => {
    if (!newMessage.trim()) return
    
    const message: ChatMessage = {
      id: `msg_${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      message: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text'
    }
    
    setChatMessages(prev => [...prev, message])
    setNewMessage("")
  }, [newMessage, currentUser])

  const toggleMute = useCallback(() => {
    setCurrentUser(prev => ({ ...prev, isMuted: !prev.isMuted }))
  }, [])

  const toggleVideo = useCallback(() => {
    setCurrentUser(prev => ({ ...prev, isVideoOn: !prev.isVideoOn }))
  }, [])

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
              <Badge variant="secondary" className={`${metaData.isLive ? 'bg-green-500/20 text-green-500 border-green-500/30' : 'bg-red-500/20 text-red-500 border-red-500/30'}`}>
                {metaData.isLive ? <Wifi className="w-3 h-3 mr-1" /> : <WifiOff className="w-3 h-3 mr-1" />}
                {metaData.isLive ? 'Live Data' : 'Offline'}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Patch {metaData.patchVersion}
              </Badge>
              {isSimulationMode && (
                <Badge variant="destructive" className="bg-orange-500/20 text-orange-500 border-orange-500/30">
                  <Timer className="w-3 h-3 mr-1" />
                  {draftTimer}s
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowUserProfile(!showUserProfile)}
                className="hidden sm:flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                {userProfile.username}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTemplates(!showTemplates)}
                className="hidden sm:flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Templates
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="hidden sm:flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Analytics
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLiveMatches(!showLiveMatches)}
                className="hidden sm:flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Live Matches
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowProPlayers(!showProPlayers)}
                className="hidden sm:flex items-center gap-2"
              >
                <Crown className="w-4 h-4" />
                Pro Players
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCollaboration(!showCollaboration)}
                className="hidden sm:flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                {isInRoom ? 'Room' : 'Collaborate'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* User Profile Panel */}
        {showUserProfile && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                User Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-semibold">Username</div>
                  <div className="text-lg">{userProfile.username}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold">Rank</div>
                  <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                    {userProfile.rank}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold">Win Rate</div>
                  <div className="text-lg font-bold text-green-500">{userProfile.winRate}%</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold">Total Drafts</div>
                  <div className="text-lg">{userProfile.totalDrafts}</div>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div>
                  <div className="text-sm font-semibold mb-2">Favorite Heroes</div>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.favoriteHeroes.map((hero, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {hero}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold mb-2">Preferred Roles</div>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.preferredRoles.map((role, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="font-semibold">Play Style:</span> {userProfile.playStyle}
                  </div>
                  <div>
                    <span className="font-semibold">Experience:</span> {userProfile.experience}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Team Collaboration Panel */}
        {showCollaboration && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Team Collaboration
              </CardTitle>
              <CardDescription>Real-time draft collaboration with your team</CardDescription>
            </CardHeader>
            <CardContent>
              {!isInRoom ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-border rounded-lg">
                      <h4 className="font-semibold mb-2">Create Room</h4>
                      <p className="text-sm text-muted-foreground mb-3">Start a new draft session with your team</p>
                      <Button onClick={createRoom} className="w-full">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Create Draft Room
                      </Button>
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                      <h4 className="font-semibold mb-2">Join Room</h4>
                      <p className="text-sm text-muted-foreground mb-3">Enter a room code to join an existing session</p>
                      <div className="flex gap-2">
                        <Input placeholder="Room ID" className="flex-1" />
                        <Button onClick={() => joinRoom('demo_room')} variant="outline">
                          <Hash className="w-4 h-4 mr-2" />
                          Join
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Room Info */}
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-semibold">{currentRoom?.name}</div>
                      <div className="text-sm text-muted-foreground">{currentRoom?.description}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={currentRoom?.status === 'drafting' ? 'default' : 'outline'}>
                        {currentRoom?.status}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={leaveRoom}>
                        Leave
                      </Button>
                    </div>
                  </div>

                  {/* Room Users */}
                  <div>
                    <h4 className="font-semibold mb-2">Room Members ({roomUsers.length}/{currentRoom?.maxUsers})</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {roomUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                            <span className="text-sm font-medium">{user.username}</span>
                            <Badge variant="outline" className="text-xs">
                              {user.role}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            {user.isMuted && <MicOff className="w-3 h-3 text-muted-foreground" />}
                            {user.isVideoOn && <Video className="w-3 h-3 text-muted-foreground" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chat */}
                  <div>
                    <h4 className="font-semibold mb-2">Team Chat</h4>
                    <div className="border border-border rounded-lg h-48 overflow-y-auto p-3 space-y-2">
                      {chatMessages.map((message) => (
                        <div key={message.id} className={`text-sm ${message.type === 'system' ? 'text-muted-foreground italic' : ''}`}>
                          {message.type === 'system' ? (
                            <div className="text-center text-xs text-muted-foreground">{message.message}</div>
                          ) : (
                            <div>
                              <span className="font-semibold text-primary">{message.username}:</span> {message.message}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={sendMessage} size="sm">
                        Send
                      </Button>
                    </div>
                  </div>

                  {/* Voice/Video Controls */}
                  <div className="flex items-center justify-center gap-4 p-3 bg-muted/30 rounded-lg">
                    <Button
                      variant={currentUser.isMuted ? "destructive" : "outline"}
                      size="sm"
                      onClick={toggleMute}
                    >
                      {currentUser.isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant={currentUser.isVideoOn ? "default" : "outline"}
                      size="sm"
                      onClick={toggleVideo}
                    >
                      {currentUser.isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    </Button>
                    <div className="text-sm text-muted-foreground">
                      {currentUser.isMuted ? 'Muted' : 'Unmuted'} • {currentUser.isVideoOn ? 'Video On' : 'Video Off'}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* What-If Simulator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              What-If Simulator
            </CardTitle>
            <CardDescription>Replace an ally pick and see the impact instantly</CardDescription>
          </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Select value={whatIfSlotIndex !== null ? String(whatIfSlotIndex) : undefined} onValueChange={(v) => setWhatIfSlotIndex(Number(v))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select ally slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {draft.allyTeam.map((h, idx) => (
                      <SelectItem key={h.id} value={String(idx)}>Slot {idx + 1}: {h.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={whatIfHeroId !== null ? String(whatIfHeroId) : undefined} onValueChange={(v) => setWhatIfHeroId(Number(v))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select replacement hero" />
                  </SelectTrigger>
                  <SelectContent>
                    {heroes.filter(h => !draft.allyTeam.find(a => a.id === h.id) && !draft.bannedHeroes.find(b => b.id === h.id)).map((h) => (
                      <SelectItem key={h.id} value={String(h.id)}>{h.name} • {h.role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button onClick={simulateWhatIf} disabled={whatIfSlotIndex === null || whatIfHeroId === null}>
                  Simulate
                </Button>
              </div>

              {whatIfResult && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-xs text-muted-foreground">Current</div>
                      <div className="text-xl font-bold text-chart-3">{whatIfResult.currentScore}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Delta</div>
                      <div className={`text-xl font-bold ${whatIfResult.scoreDelta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {whatIfResult.scoreDelta >= 0 ? '+' : ''}{whatIfResult.scoreDelta}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Simulated</div>
                      <div className="text-xl font-bold text-primary">{whatIfResult.simulatedScore}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-semibold">Composition change</div>
                    {roles.map((role) => (
                      <div key={role} className="flex items-center justify-between text-xs">
                        <span>{role}</span>
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                            {whatIfResult.currentComposition[role] || 0}
                          </span>
                          <span>→</span>
                          <span className="w-6 h-6 bg-primary/10 text-primary rounded flex items-center justify-center">
                            {whatIfResult.simulatedComposition[role] || 0}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

        {/* AI Suggestions Panel */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              AI-Powered Draft Suggestions
            </CardTitle>
            <CardDescription>Smart recommendations based on current meta and team composition</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className={`p-4 rounded-lg border transition-colors ${
                  suggestion.priority === 'high' ? 'bg-red-50 border-red-200' :
                  suggestion.priority === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        suggestion.type === 'pick' ? 'bg-green-500' :
                        suggestion.type === 'ban' ? 'bg-red-500' :
                        'bg-blue-500'
                      }`} />
                      <div className="font-semibold text-sm">{suggestion.hero.name}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {suggestion.confidence}%
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    {suggestion.reason}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs h-7"
                      onClick={() => addHeroToTeam(suggestion.hero, "ally")}
                      disabled={draft.allyTeam.length >= 5}
                    >
                      Pick
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs h-7"
                      onClick={() => banHero(suggestion.hero)}
                      disabled={draft.bannedHeroes.length >= 6}
                    >
                      Ban
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analytics Dashboard */}
        {showAnalytics && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Advanced Analytics Dashboard
              </CardTitle>
              <CardDescription>Meta trends, win rates, and performance insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Meta Trends */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Meta Trends
                  </h4>
                  <div className="space-y-2">
                    {analyticsData.metaTrends.map((trend, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            trend.trend === 'rising' ? 'bg-green-500' :
                            trend.trend === 'falling' ? 'bg-red-500' :
                            'bg-gray-500'
                          }`} />
                          <span className="text-sm font-medium">{trend.hero}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs ${
                            trend.change > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {trend.change > 0 ? '+' : ''}{trend.change.toFixed(1)}%
                          </span>
                          {trend.trend === 'rising' && <TrendingUp className="w-3 h-3 text-green-500" />}
                          {trend.trend === 'falling' && <TrendingDown className="w-3 h-3 text-red-500" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hero Combinations */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Top Hero Combinations
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(analyticsData.heroCombinations).map(([combo, data]) => (
                      <div key={combo} className="p-2 bg-muted/50 rounded">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{combo}</span>
                          <span className="text-xs text-muted-foreground">{data.games} games</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={data.winRate} className="flex-1 h-2" />
                          <span className="text-xs font-semibold text-green-600">{data.winRate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pro Pick Rates */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    Pro Pick Rates
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(analyticsData.proPickRates).map(([hero, rate]) => (
                      <div key={hero} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span className="text-sm font-medium">{hero}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={rate} className="w-20 h-2" />
                          <span className="text-xs font-semibold">{rate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Patch Impact */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Patch Impact
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(analyticsData.patchImpact).map(([hero, data]) => (
                      <div key={hero} className="p-2 bg-muted/50 rounded">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{hero}</span>
                          <span className={`text-xs font-semibold ${
                            data.change > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {data.change > 0 ? '+' : ''}{data.change}%
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Before: {data.before}%</span>
                          <span>→</span>
                          <span>After: {data.after}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Live Matches Panel */}
        {showLiveMatches && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-primary" />
                Live Professional Matches
              </CardTitle>
              <CardDescription>Real-time draft tracking from ongoing MPL matches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {liveMatches.map((match) => (
                  <div key={match.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="font-semibold text-sm">{match.team1}</div>
                          <div className="text-xs text-muted-foreground">vs</div>
                          <div className="font-semibold text-sm">{match.team2}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={match.status === 'draft' ? 'default' : match.status === 'playing' ? 'secondary' : 'outline'}>
                            {match.status === 'draft' ? 'Draft Phase' : match.status === 'playing' ? 'In Progress' : 'Finished'}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Eye className="w-3 h-3" />
                            {match.viewers.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">{match.tournament}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(match.startTime).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    
                    {match.status === 'draft' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-semibold mb-2">{match.team1} Picks</div>
                          <div className="flex flex-wrap gap-1">
                            {match.team1Picks.map((hero, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {hero}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-sm font-semibold mb-2 mt-3">{match.team1} Bans</div>
                          <div className="flex flex-wrap gap-1">
                            {match.team1Bans.map((hero, index) => (
                              <Badge key={index} variant="destructive" className="text-xs">
                                {hero}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold mb-2">{match.team2} Picks</div>
                          <div className="flex flex-wrap gap-1">
                            {match.team2Picks.map((hero, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {hero}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-sm font-semibold mb-2 mt-3">{match.team2} Bans</div>
                          <div className="flex flex-wrap gap-1">
                            {match.team2Bans.map((hero, index) => (
                              <Badge key={index} variant="destructive" className="text-xs">
                                {hero}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pro Players Panel */}
        {showProPlayers && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-primary" />
                Professional Players
              </CardTitle>
              <CardDescription>Top players and their signature strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {proPlayers.map((player) => (
                  <div key={player.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold">{player.name}</div>
                        <div className="text-sm text-muted-foreground">{player.team}</div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {player.role}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-green-600">{player.winRate}%</div>
                        <div className="text-xs text-muted-foreground">Win Rate</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <div className="text-xs font-semibold mb-1">Signature Heroes</div>
                        <div className="flex flex-wrap gap-1">
                          {player.signatureHeroes.map((hero, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {hero}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <div className="font-semibold">KDA</div>
                          <div className="text-muted-foreground">{player.kda}</div>
                        </div>
                        <div>
                          <div className="font-semibold">MVP</div>
                          <div className="text-muted-foreground">{player.mvpCount}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <Trophy className="w-3 h-3" />
                          {player.totalMatches} matches
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {player.rank}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Draft Templates Panel */}
        {showTemplates && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Draft Templates
              </CardTitle>
              <CardDescription>Load pre-made compositions or save your own</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {draftTemplates.map((template) => (
                  <div key={template.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold">{template.name}</div>
                        <div className="text-sm text-muted-foreground">{template.description}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => loadTemplate(template)}
                        >
                          Load
                        </Button>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Heart className="w-3 h-3" />
                          {template.likes}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {template.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      by {template.author} • {new Date(template.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Draft Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Simulation Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="w-5 h-5 text-primary" />
                  Draft Simulation
                </CardTitle>
                <CardDescription>Practice with realistic ban/pick phases and timers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button 
                    onClick={startSimulation} 
                    disabled={isSimulationMode}
                    className="w-full h-12 sm:h-auto"
                  >
                    <Timer className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Start Simulation</span>
                    <span className="sm:hidden">Start</span>
                  </Button>
                  <Button 
                    onClick={stopSimulation} 
                    variant="outline"
                    disabled={!isSimulationMode}
                    className="w-full h-12 sm:h-auto"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Stop</span>
                    <span className="sm:hidden">Stop</span>
                  </Button>
                  <Button 
                    onClick={resetDraft} 
                    variant="outline"
                    className="w-full h-12 sm:h-auto"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Reset Draft</span>
                    <span className="sm:hidden">Reset</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Ban Phase */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <X className="w-5 h-5" />
                  Banned Heroes ({draft.bannedHeroes.length}/6)
                </CardTitle>
                <CardDescription>Heroes banned from the match</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
                  {draft.bannedHeroes.map((hero) => (
                    <div key={hero.id} className="p-2 bg-destructive/10 rounded-lg border border-destructive/20 text-center">
                      <div className="text-xs font-semibold">{hero.name}</div>
                      <div className="text-xs text-muted-foreground">{hero.role}</div>
                    </div>
                  ))}
                  {Array.from({ length: 6 - draft.bannedHeroes.length }).map((_, index) => (
                    <div key={index} className="p-2 border-2 border-dashed border-border rounded-lg text-center text-muted-foreground">
                      <X className="w-4 h-4 mx-auto mb-1" />
                      <div className="text-xs">Ban Slot</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                  {filteredHeroes.map((hero) => (
                    <div key={hero.id} className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors border border-border/50">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-sm font-semibold">{hero.name}</div>
                          <div className="text-xs text-muted-foreground">{hero.role} • {hero.lane}</div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              hero.tier === 'S+' ? 'bg-red-500/20 text-red-500 border-red-500/30' :
                              hero.tier === 'S' ? 'bg-orange-500/20 text-orange-500 border-orange-500/30' :
                              hero.tier === 'A' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' :
                              'bg-gray-500/20 text-gray-500 border-gray-500/30'
                            }`}
                          >
                            {hero.tier}
                          </Badge>
                          <div className="text-xs text-muted-foreground">{hero.winRate}% WR</div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {hero.description}
                      </div>
                      
                      <div className="flex items-center justify-between mb-2 text-xs">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {hero.powerSpike}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {hero.difficulty}
                        </div>
                      </div>
                      
                      <div className="flex gap-1 sm:gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs h-8 sm:h-7 bg-transparent hover:bg-chart-3/10 hover:border-chart-3/30 touch-manipulation"
                          onClick={() => addHeroToTeam(hero, "ally")}
                          disabled={draft.allyTeam.length >= 5}
                        >
                          <span className="hidden sm:inline">+ Ally</span>
                          <span className="sm:hidden">+A</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs h-8 sm:h-7 bg-transparent hover:bg-destructive/10 hover:border-destructive/30 touch-manipulation"
                          onClick={() => addHeroToTeam(hero, "enemy")}
                          disabled={draft.enemyTeam.length >= 5}
                        >
                          <span className="hidden sm:inline">+ Enemy</span>
                          <span className="sm:hidden">+E</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-8 sm:h-7 w-8 sm:w-auto bg-transparent hover:bg-red-500/10 hover:border-red-500/30 touch-manipulation"
                          onClick={() => banHero(hero)}
                          disabled={draft.bannedHeroes.length >= 6}
                          title="Ban Hero"
                        >
                          <X className="w-3 h-3" />
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
            {/* Overall Team Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Overall Team Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">{getTeamScore()}</div>
                    <div className="text-sm text-muted-foreground">Team Rating</div>
                  </div>
                  <Progress value={getTeamScore()} className="h-3" />
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-semibold text-chart-1">{getCompositionScore()}</div>
                      <div className="text-muted-foreground">Composition</div>
                  </div>
                    <div className="text-center">
                      <div className="font-semibold text-chart-2">{getSynergyScore()}</div>
                      <div className="text-muted-foreground">Synergy</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-chart-3">
                        {draft.allyTeam.length > 0 ? Math.round(draft.allyTeam.reduce((sum, hero) => sum + hero.winRate, 0) / draft.allyTeam.length) : 0}
                      </div>
                      <div className="text-muted-foreground">Win Rate</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Strengths & Weaknesses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Team Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold">Strengths</span>
                  </div>
                  <div className="space-y-1">
                    {getTeamStrengths().length > 0 ? (
                      getTeamStrengths().map((strength, index) => (
                        <div key={index} className="text-xs bg-green-500/10 text-green-700 px-2 py-1 rounded">
                          {strength}
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-muted-foreground">Add heroes to see strengths</div>
                    )}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-semibold">Weaknesses</span>
                  </div>
                  <div className="space-y-1">
                    {getTeamWeaknesses().map((weakness, index) => (
                      <div key={index} className="text-xs bg-orange-500/10 text-orange-700 px-2 py-1 rounded">
                        {weakness}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Power Spike Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Power Spikes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(getPowerSpikeAnalysis()).map(([spike, count]) => (
                    <div key={spike} className="flex items-center justify-between">
                      <span className="text-sm">{spike}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full" 
                            style={{ width: `${(count / draft.allyTeam.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-6">{count}</span>
                      </div>
                    </div>
                  ))}
                  {draft.allyTeam.length === 0 && (
                    <div className="text-xs text-muted-foreground text-center py-2">
                      Add heroes to see power spike analysis
                    </div>
                  )}
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

            {/* Draft History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5 text-chart-4" />
                  Draft History
                </CardTitle>
                <CardDescription>Your saved draft compositions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {draftHistory.length > 0 ? (
                    draftHistory.map((savedDraft, index) => (
                      <div key={index} className="p-2 bg-muted/50 rounded-lg border border-border/50">
                        <div className="text-xs font-semibold mb-1">Draft #{index + 1}</div>
                        <div className="text-xs text-muted-foreground">
                          {savedDraft.allyTeam.length} allies • {savedDraft.enemyTeam.length} enemies • {savedDraft.bannedHeroes.length} bans
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-muted-foreground text-center py-4">
                      No saved drafts yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Button 
                    className="w-full h-12 sm:h-auto" 
                    onClick={saveDraft}
                    disabled={draft.allyTeam.length === 0 && draft.enemyTeam.length === 0}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-12 sm:h-auto bg-transparent"
                    onClick={saveAsTemplate}
                    disabled={draft.allyTeam.length === 0 && draft.enemyTeam.length === 0}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Save as Template
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-10 bg-transparent"
                      onClick={shareDraft}
                      disabled={draft.allyTeam.length === 0 && draft.enemyTeam.length === 0}
                    >
                      <Share2 className="w-4 h-4 mr-1" />
                      <span className="hidden sm:inline">Share</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-10 bg-transparent"
                      onClick={exportDraft}
                      disabled={draft.allyTeam.length === 0 && draft.enemyTeam.length === 0}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      <span className="hidden sm:inline">Export</span>
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full h-12 sm:h-auto bg-transparent"
                    onClick={resetDraft}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
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
