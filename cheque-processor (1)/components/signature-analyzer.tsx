"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Eye, AlertTriangle, Clock } from "lucide-react"

interface AIAnalysis {
  prediction: string
  confidence: number
  confidence_scores: {
    invalide: number
    valide: number
    suspecte: number
  }
  risk_level: string
  is_authentic: boolean
  requires_manual_review: boolean
  analysis: {
    entropy: number
    uncertainty: number
    cheque_id: string
    timestamp: string
  }
}

interface SignatureAnalyzerProps {
  analysis: AIAnalysis
}

export function SignatureAnalyzer({ analysis }: SignatureAnalyzerProps) {
  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case "VALIDE":
        return "text-green-600"
      case "INVALIDE":
        return "text-red-600"
      case "SUSPECTE":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-800">
          <Brain className="w-5 h-5" />
          Analyse IA de la Signature
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Prédiction principale */}
        <div className="p-4 bg-white rounded-lg border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-700">Prédiction</h3>
            <Badge variant={analysis.is_authentic ? "default" : "destructive"}>
              {analysis.is_authentic ? "Authentique" : "Non Authentique"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <p className={`text-2xl font-bold ${getPredictionColor(analysis.prediction)}`}>{analysis.prediction}</p>
            <p className="text-lg font-semibold text-gray-700">
              {(analysis.confidence * 100).toFixed(1)}% de confiance
            </p>
          </div>
        </div>

        {/* Scores détaillés */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700">Scores par classe</h3>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-700">Valide</span>
              <span className="text-green-700">{(analysis.confidence_scores.valide * 100).toFixed(1)}%</span>
            </div>
            <Progress value={analysis.confidence_scores.valide * 100} className="h-2 bg-green-100" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-700">Invalide</span>
              <span className="text-red-700">{(analysis.confidence_scores.invalide * 100).toFixed(1)}%</span>
            </div>
            <Progress value={analysis.confidence_scores.invalide * 100} className="h-2 bg-red-100" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-orange-700">Suspecte</span>
              <span className="text-orange-700">{(analysis.confidence_scores.suspecte * 100).toFixed(1)}%</span>
            </div>
            <Progress value={analysis.confidence_scores.suspecte * 100} className="h-2 bg-orange-100" />
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 p-3 bg-white rounded-lg border">
            <Eye className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Révision manuelle</p>
              <p className="font-medium">{analysis.requires_manual_review ? "Requise" : "Non requise"}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-white rounded-lg border">
            <AlertTriangle className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Niveau de risque</p>
              <p className="font-medium">{analysis.risk_level}</p>
            </div>
          </div>
        </div>

        {/* Métriques techniques */}
        <div className="p-3 bg-white rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-purple-600" />
            <p className="text-sm font-medium text-gray-700">Métriques techniques</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            <p>Entropie: {analysis.analysis.entropy.toFixed(3)}</p>
            <p>Incertitude: {analysis.analysis.uncertainty.toFixed(3)}</p>
            <p>ID: {analysis.analysis.cheque_id}</p>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{formatTimestamp(analysis.analysis.timestamp)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
