"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Building, User, Filter, Loader2, DollarSign } from "lucide-react"

interface ChequeData {
  CHEQUE_NO: string
  USER1: string
  USER2: string
  VALUE_LETTERS: string
  VALUE_NUMBERS: string
  SIGNATURE_FILE: string
  BANK_NAME: string
  USER2NAME: string
  valid: string
}

interface SearchFormProps {
  csvData: ChequeData[]
}

export function SearchForm({ csvData }: SearchFormProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("cheque")
  const [bankFilter, setBankFilter] = useState("all")
  const [validityFilter, setValidityFilter] = useState("all")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<ChequeData[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  // Obtenir les banques uniques pour le filtre
  const uniqueBanks = Array.from(new Set(csvData.map((item) => item.BANK_NAME))).sort()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)
    setHasSearched(true)

    // Simuler une recherche
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Recherche dans les vraies données
    let filteredResults = csvData

    // Filtrer par terme de recherche
    if (searchQuery.trim()) {
      filteredResults = filteredResults.filter((item) => {
        switch (searchType) {
          case "cheque":
            return item.CHEQUE_NO.toLowerCase().includes(searchQuery.toLowerCase())
          case "user":
            return item.USER2NAME.toLowerCase().includes(searchQuery.toLowerCase())
          case "bank":
            return item.BANK_NAME.toLowerCase().includes(searchQuery.toLowerCase())
          case "all":
            return (
              item.CHEQUE_NO.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.USER2NAME.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.BANK_NAME.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.VALUE_NUMBERS.toLowerCase().includes(searchQuery.toLowerCase())
            )
          default:
            return true
        }
      })
    }

    // Filtrer par banque
    if (bankFilter !== "all") {
      filteredResults = filteredResults.filter((item) => item.BANK_NAME === bankFilter)
    }

    // Filtrer par validité
    if (validityFilter !== "all") {
      const isValid = validityFilter === "valid"
      filteredResults = filteredResults.filter((item) => (item.valid === "1") === isValid)
    }

    // Limiter les résultats à 20 pour la performance
    setResults(filteredResults.slice(0, 20))
    setIsSearching(false)
  }

  const getPredictionColor = (valid: string) => {
    return valid === "1" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Rechercher dans la base de données réelle ({csvData.length} chèques)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="simple" className="space-y-4">
            <TabsList>
              <TabsTrigger value="simple">Recherche simple</TabsTrigger>
              <TabsTrigger value="advanced">Recherche avancée</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSearch}>
              <TabsContent value="simple" className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="search-query">Rechercher</Label>
                    <Input
                      id="search-query"
                      placeholder="Numéro de chèque, nom d'utilisateur, banque..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="w-full md:w-48 space-y-2">
                    <Label htmlFor="search-type">Type</Label>
                    <Select value={searchType} onValueChange={setSearchType}>
                      <SelectTrigger id="search-type">
                        <SelectValue placeholder="Type de recherche" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cheque">N° de chèque</SelectItem>
                        <SelectItem value="user">Utilisateur</SelectItem>
                        <SelectItem value="bank">Banque</SelectItem>
                        <SelectItem value="all">Tous les champs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="self-end">
                    <Button type="submit" className="w-full md:w-auto" disabled={isSearching}>
                      {isSearching ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Recherche...
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4 mr-2" />
                          Rechercher
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="adv-search-query">Terme de recherche</Label>
                    <Input
                      id="adv-search-query"
                      placeholder="Numéro de chèque, nom d'utilisateur..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adv-search-type">Type de recherche</Label>
                    <Select value={searchType} onValueChange={setSearchType}>
                      <SelectTrigger id="adv-search-type">
                        <SelectValue placeholder="Type de recherche" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cheque">N° de chèque</SelectItem>
                        <SelectItem value="user">Utilisateur</SelectItem>
                        <SelectItem value="bank">Banque</SelectItem>
                        <SelectItem value="all">Tous les champs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bank-filter">Banque</Label>
                    <Select value={bankFilter} onValueChange={setBankFilter}>
                      <SelectTrigger id="bank-filter">
                        <SelectValue placeholder="Toutes les banques" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les banques</SelectItem>
                        {uniqueBanks.map((bank) => (
                          <SelectItem key={bank} value={bank}>
                            {bank}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="validity-filter">Validité</Label>
                    <Select value={validityFilter} onValueChange={setValidityFilter}>
                      <SelectTrigger id="validity-filter">
                        <SelectValue placeholder="Toutes les signatures" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les signatures</SelectItem>
                        <SelectItem value="valid">Signatures valides</SelectItem>
                        <SelectItem value="invalid">Signatures invalides</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="w-full md:w-auto" disabled={isSearching}>
                    {isSearching ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Recherche avancée...
                      </>
                    ) : (
                      <>
                        <Filter className="w-4 h-4 mr-2" />
                        Recherche avancée
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </form>
          </Tabs>
        </CardContent>
      </Card>

      {/* Résultats de recherche avec vraies données */}
      {hasSearched && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Résultats de recherche
              </div>
              <Badge variant="outline">{results.length} résultat(s)</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((result) => (
                  <div
                    key={result.CHEQUE_NO}
                    className="p-4 bg-white rounded-lg border hover:border-indigo-300 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-indigo-600" />
                          <h3 className="font-semibold">Chèque N°{result.CHEQUE_NO}</h3>
                          <Badge variant={result.valid === "1" ? "default" : "destructive"} className="ml-2">
                            {result.valid === "1" ? "Valide" : "Invalide"}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span>{result.VALUE_NUMBERS}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <Building className="w-4 h-4 text-purple-600" />
                            <span>{result.BANK_NAME}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4 text-orange-600" />
                            <span>{result.USER2NAME}</span>
                          </div>

                          <div className="text-xs text-gray-500">
                            USER1: {result.USER1} | USER2: {result.USER2}
                          </div>
                        </div>

                        <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                          <p>💰 En lettres: {result.VALUE_LETTERS}</p>
                          <p>📁 Signature: {result.SIGNATURE_FILE}</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <Badge className={getPredictionColor(result.valid)}>
                          {result.valid === "1" ? "VALIDE" : "INVALIDE"}
                        </Badge>
                        <Button variant="outline" size="sm" className="mt-2">
                          Voir détails
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500">{isSearching ? "Recherche en cours..." : "Aucun résultat trouvé"}</p>
                {!isSearching && searchQuery && (
                  <p className="text-sm text-gray-400 mt-2">Essayez de modifier vos critères de recherche</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
