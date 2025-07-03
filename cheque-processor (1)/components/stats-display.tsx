"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "@/components/charts"
import { Building, User, TrendingUp, Calendar, CheckCircle, XCircle } from "lucide-react"

interface Stats {
  total_cheques: number
  valid_signatures: number
  invalid_signatures: number
  unique_banks: number
  unique_users: number
  banks: Record<string, number>
  users: Record<string, number>
  ai_accuracy: number
  recent_activity: {
    date: string
    count: number
    valid: number
  }[]
}

interface StatsDisplayProps {
  stats: Stats
}

export function StatsDisplay({ stats }: StatsDisplayProps) {
  // Préparer les données pour les graphiques
  const bankData = Object.entries(stats.banks)
    .map(([name, count]) => ({
      name,
      value: count,
    }))
    .slice(0, 5)

  const userData = Object.entries(stats.users)
    .map(([name, count]) => ({
      name,
      value: count,
    }))
    .slice(0, 5)

  const activityData = stats.recent_activity.map((day) => ({
    name: day.date,
    total: day.count,
    valid: day.valid,
    invalid: day.count - day.valid,
  }))

  const validityData = [
    { name: "Valides", value: stats.valid_signatures },
    { name: "Invalides", value: stats.invalid_signatures },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Statistiques et Tendances
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="activity">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="activity" className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Activité</span>
              </TabsTrigger>
              <TabsTrigger value="validity" className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                <span>Validité</span>
              </TabsTrigger>
              <TabsTrigger value="banks" className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                <span>Banques</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>Utilisateurs</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="h-80">
              <LineChart
                data={activityData}
                title="Activité récente"
                xAxisKey="name"
                series={[
                  { key: "total", name: "Total", color: "#6366f1" },
                  { key: "valid", name: "Valides", color: "#22c55e" },
                  { key: "invalid", name: "Invalides", color: "#ef4444" },
                ]}
              />
            </TabsContent>

            <TabsContent value="validity" className="h-80">
              <PieChart data={validityData} title="Répartition des signatures" colors={["#22c55e", "#ef4444"]} />
            </TabsContent>

            <TabsContent value="banks" className="h-80">
              <BarChart data={bankData} title="Top 5 des banques" xAxisKey="name" yAxisKey="value" color="#8b5cf6" />
            </TabsContent>

            <TabsContent value="users" className="h-80">
              <BarChart
                data={userData}
                title="Top 5 des utilisateurs"
                xAxisKey="name"
                yAxisKey="value"
                color="#0ea5e9"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Performance de l'IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Précision globale</span>
                <span className="font-bold text-green-600">{stats.ai_accuracy}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Faux positifs</span>
                <span className="font-bold text-orange-600">3.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Faux négatifs</span>
                <span className="font-bold text-red-600">2.6%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">F1-Score</span>
                <span className="font-bold text-blue-600">0.941</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Temps moyen d'inférence</span>
                <span className="font-bold">1.2s</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              Détection de fraude
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Taux de détection</span>
                <span className="font-bold text-green-600">96.8%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Fraudes détectées (30j)</span>
                <span className="font-bold text-red-600">124</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Économies estimées</span>
                <span className="font-bold text-blue-600">$247,500</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Alertes générées</span>
                <span className="font-bold">312</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Temps moyen de réponse</span>
                <span className="font-bold">4.5min</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
