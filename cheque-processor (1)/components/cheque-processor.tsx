"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, FileImage, AlertCircle } from "lucide-react"

interface ProcessingResult {
  chequeId: string
  numericalAmount: string
  writtenAmount: string
  signatureDetected: boolean
}

export function ChequeProcessor() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<ProcessingResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResult(null)
      setError(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".bmp"],
    },
    maxFiles: 1,
  })

  const processImage = async () => {
    if (!file) return

    setProcessing(true)
    setProgress(0)
    setError(null)

    try {
      // Simulate processing steps
      const steps = [
        { message: "Chargement de l'image...", progress: 20 },
        { message: "Prétraitement...", progress: 40 },
        { message: "Détection OCR...", progress: 60 },
        { message: "Extraction des montants...", progress: 80 },
        { message: "Finalisation...", progress: 100 },
      ]

      for (const step of steps) {
        setProgress(step.progress)
        await new Promise((resolve) => setTimeout(resolve, 500))
      }

      // Mock result
      const mockResult: ProcessingResult = {
        chequeId: file.name.replace(/\.[^/.]+$/, ""),
        numericalAmount: "2,450.75",
        writtenAmount: "Two thousand four hundred fifty dollars and seventy-five cents",
        signatureDetected: true,
      }

      setResult(mockResult)
    } catch (err) {
      setError("Erreur lors du traitement de l'image")
    } finally {
      setProcessing(false)
      setProgress(0)
    }
  }

  return (
    <div className="space-y-6">
      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Télécharger une image de chèque</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            {isDragActive ? (
              <p className="text-blue-600">Déposez l'image ici...</p>
            ) : (
              <div>
                <p className="text-gray-600 mb-2">
                  Glissez-déposez une image de chèque ici, ou cliquez pour sélectionner
                </p>
                <p className="text-sm text-gray-500">Formats supportés: JPG, PNG, BMP</p>
              </div>
            )}
          </div>

          {file && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileImage className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">{file.name}</span>
                  <span className="text-sm text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
                <Button onClick={processImage} disabled={processing}>
                  {processing ? "Traitement..." : "Analyser"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Processing Progress */}
      {processing && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Traitement en cours...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Résultats de l'extraction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Numéro de chèque</h3>
                <p className="text-lg font-mono">{result.chequeId}</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Montant numérique</h3>
                <p className="text-2xl font-bold text-green-800">${result.numericalAmount}</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Montant en lettres</h3>
                <p className="text-purple-800">{result.writtenAmount}</p>
              </div>

              <div className={`p-4 rounded-lg ${result.signatureDetected ? "bg-green-50" : "bg-red-50"}`}>
                <h3 className={`font-semibold mb-2 ${result.signatureDetected ? "text-green-900" : "text-red-900"}`}>
                  Signature
                </h3>
                <p className={result.signatureDetected ? "text-green-800" : "text-red-800"}>
                  {result.signatureDetected ? "✓ Signature détectée" : "✗ Aucune signature détectée"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
