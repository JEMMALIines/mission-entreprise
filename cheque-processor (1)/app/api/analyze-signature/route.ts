import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("image") as File
    const chequeId = formData.get("chequeId") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Simuler le délai de traitement de l'IA
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simuler l'analyse de deep learning
    const isValid = Math.random() > 0.4
    const confidence = 0.7 + Math.random() * 0.25

    // Générer des scores de confiance simulés
    let validScore, invalidScore, suspectScore

    if (isValid) {
      validScore = confidence
      invalidScore = (1 - confidence) * 0.7
      suspectScore = (1 - confidence) * 0.3
    } else {
      invalidScore = confidence
      validScore = (1 - confidence) * 0.6
      suspectScore = (1 - confidence) * 0.4
    }

    // Normaliser les scores
    const total = validScore + invalidScore + suspectScore
    validScore /= total
    invalidScore /= total
    suspectScore /= total

    // Déterminer la prédiction finale
    let prediction: string
    let riskLevel: string

    if (validScore > 0.6) {
      prediction = "VALIDE"
      riskLevel = "FAIBLE"
    } else if (invalidScore > 0.6) {
      prediction = "INVALIDE"
      riskLevel = "ÉLEVÉ"
    } else {
      prediction = "SUSPECTE"
      riskLevel = "MOYEN"
    }

    // Construire la réponse de l'analyse IA
    const aiAnalysis = {
      prediction,
      confidence: Number(confidence.toFixed(3)),
      confidence_scores: {
        valide: Number(validScore.toFixed(3)),
        invalide: Number(invalidScore.toFixed(3)),
        suspecte: Number(suspectScore.toFixed(3)),
      },
      risk_level: riskLevel,
      is_authentic: isValid,
      requires_manual_review: confidence < 0.8 || prediction === "SUSPECTE",
      analysis: {
        entropy: Number((Math.random() * 2).toFixed(3)),
        uncertainty: Number((Math.random() * 0.5).toFixed(3)),
        cheque_id: chequeId,
        timestamp: new Date().toISOString(),
      },
    }

    return NextResponse.json(aiAnalysis)
  } catch (error) {
    console.error("Erreur lors de l'analyse IA:", error)
    return NextResponse.json({ error: "Erreur lors de l'analyse de la signature" }, { status: 500 })
  }
}
