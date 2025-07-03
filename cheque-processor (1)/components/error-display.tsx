"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorDisplayProps {
  error: string
  onRetry?: () => void
}

export function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-800">
          <AlertTriangle className="w-5 h-5" />
          Erreur de traitement
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-red-700">{error}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
            <RefreshCw className="w-4 h-4 mr-2" />
            Réessayer
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
