import { NextResponse } from "next/server"

export async function GET() {
  // Simuler des statistiques
  const stats = {
    total_cheques: 5842,
    valid_signatures: 4953,
    invalid_signatures: 889,
    unique_banks: 12,
    unique_users: 347,
    ai_accuracy: 94.2,
    banks: {
      "Banque Nationale": 1245,
      Desjardins: 1102,
      RBC: 987,
      TD: 876,
      BMO: 743,
    },
    users: {
      "Jean Dupont": 42,
      "Marie Tremblay": 38,
      "Robert Gagnon": 35,
      "Sophie Bergeron": 32,
      "Michel Côté": 29,
    },
    recent_activity: [
      { date: "2023-06-05", count: 124, valid: 105 },
      { date: "2023-06-06", count: 132, valid: 112 },
      { date: "2023-06-07", count: 118, valid: 98 },
      { date: "2023-06-08", count: 145, valid: 125 },
      { date: "2023-06-09", count: 156, valid: 132 },
      { date: "2023-06-10", count: 112, valid: 95 },
      { date: "2023-06-11", count: 98, valid: 82 },
    ],
  }

  return NextResponse.json(stats)
}
