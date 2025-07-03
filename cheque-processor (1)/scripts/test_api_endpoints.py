import requests
import json

print("🧪 TEST DES ENDPOINTS API DU PROJET SMARTCHEQUE AI")
print("=" * 55)

# URL de base (à adapter selon votre environnement)
BASE_URL = "http://localhost:3000"  # Pour le développement local

def test_health_endpoint():
    """Test de l'endpoint de santé"""
    print("\n1️⃣ Test de l'endpoint /api/health")
    print("-" * 35)
    
    try:
        response = requests.get(f"{BASE_URL}/api/health", timeout=5)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ API Health: {data.get('status', 'unknown')}")
            print(f"📅 Timestamp: {data.get('timestamp', 'N/A')}")
        else:
            print(f"❌ Erreur: {response.status_code}")
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Erreur de connexion: {e}")

def test_stats_endpoint():
    """Test de l'endpoint des statistiques"""
    print("\n2️⃣ Test de l'endpoint /api/stats")
    print("-" * 33)
    
    try:
        response = requests.get(f"{BASE_URL}/api/stats", timeout=5)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Total chèques: {data.get('total_cheques', 'N/A')}")
            print(f"✅ Signatures valides: {data.get('valid_signatures', 'N/A')}")
            print(f"✅ Précision IA: {data.get('ai_accuracy', 'N/A')}%")
        else:
            print(f"❌ Erreur: {response.status_code}")
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Erreur de connexion: {e}")

def test_analyze_signature_endpoint():
    """Test de l'endpoint d'analyse de signature"""
    print("\n3️⃣ Test de l'endpoint /api/analyze-signature")
    print("-" * 43)
    
    try:
        # Créer des données de test simulées
        files = {
            'image': ('test_cheque.jpg', b'fake_image_data', 'image/jpeg')
        }
        data = {
            'chequeId': '10000'
        }
        
        response = requests.post(
            f"{BASE_URL}/api/analyze-signature", 
            files=files, 
            data=data, 
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Prédiction: {result.get('prediction', 'N/A')}")
            print(f"✅ Confiance: {result.get('confidence', 'N/A')}")
            print(f"✅ Niveau de risque: {result.get('risk_level', 'N/A')}")
            print(f"✅ Authentique: {result.get('is_authentic', 'N/A')}")
        else:
            print(f"❌ Erreur: {response.status_code}")
            print(f"Response: {response.text[:200]}...")
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Erreur de connexion: {e}")

# Exécuter les tests
print("🚀 Démarrage des tests d'API...")
print("⚠️ Assurez-vous que le serveur Next.js est démarré (npm run dev)")

test_health_endpoint()
test_stats_endpoint()
test_analyze_signature_endpoint()

print("\n" + "=" * 55)
print("✅ Tests terminés!")
print("\n💡 CONSEILS DE DÉBOGAGE:")
print("-" * 25)
print("1. Vérifiez que le serveur Next.js est démarré")
print("2. Vérifiez l'URL de base dans le script")
print("3. Consultez les logs du serveur pour plus de détails")
print("4. Utilisez les outils de développement du navigateur")
print("5. Vérifiez que tous les endpoints sont correctement définis")
