import pandas as pd
import requests
from io import StringIO

# URL du fichier CSV réel
csv_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/res-GrqTwtxRIUZlY7tJZu0YQTlcp1O0pm.csv"

print("📥 Chargement du fichier CSV réel...")
print("=" * 50)

try:
    # Télécharger le CSV
    response = requests.get(csv_url)
    response.raise_for_status()
    
    # Charger dans pandas
    df = pd.read_csv(StringIO(response.text))
    
    print(f"✅ CSV chargé avec succès!")
    print(f"📊 Nombre de chèques: {len(df)}")
    print(f"📋 Colonnes: {list(df.columns)}")
    print()
    
    # Afficher les premières lignes
    print("🔍 Aperçu des données:")
    print(df.head(10).to_string(index=False))
    print()
    
    # Statistiques
    print("📈 STATISTIQUES:")
    print("=" * 30)
    print(f"• Nombre total de chèques: {len(df)}")
    print(f"• Banques uniques: {df['BANK_NAME'].nunique()}")
    print(f"• Utilisateurs uniques (USER2NAME): {df['USER2NAME'].nunique()}")
    print()
    
    # Exemples de banques
    print("🏦 Banques dans le dataset:")
    bank_counts = df['BANK_NAME'].value_counts()
    for bank, count in bank_counts.head(5).items():
        print(f"   • {bank}: {count} chèques")
    print()
    
    # Exemples de montants
    print("💰 Exemples de montants:")
    for i in range(min(5, len(df))):
        cheque_no = df.iloc[i]['CHEQUE_NO']
        value_num = df.iloc[i]['VALUE_NUMBERS']
        value_letters = df.iloc[i]['VALUE_LETTERS']
        print(f"   • Chèque {cheque_no}: {value_num} ({value_letters[:50]}...)")
    print()
    
    # Test de la fonction afficher_montants avec les vraies données
    print("🧪 TEST DE LA FONCTION afficher_montants:")
    print("=" * 45)
    
    def afficher_montants_real(cheque_id):
        """Version avec les vraies données CSV"""
        print(f"🏦 Traitement du chèque N°{cheque_id}")
        
        # Recherche dans le CSV (exactement comme votre code)
        row = df[df["CHEQUE_NO"].astype(str) == str(cheque_id)]
        
        if not row.empty:
            valeur_num = row.iloc[0]["VALUE_NUMBERS"]
            valeur_lettres = row.iloc[0]["VALUE_LETTERS"]
            bank_name = row.iloc[0]["BANK_NAME"]
            user_name = row.iloc[0]["USER2NAME"]
            signature_file = row.iloc[0]["SIGNATURE_FILE"]
            
            print(f"💰 Montant Numérique : {valeur_num}")
            print(f"✍️ Montant en Lettres : {valeur_lettres}")
            print(f"🏦 Banque : {bank_name}")
            print(f"👤 Utilisateur : {user_name}")
            print(f"🖋️ Fichier signature : {signature_file}")
            
            return {
                'found': True,
                'valeur_numerique': valeur_num,
                'valeur_lettres': valeur_lettres,
                'bank_name': bank_name,
                'user_name': user_name,
                'signature_file': signature_file
            }
        else:
            print("❌ Aucun montant trouvé pour ce numéro de chèque.")
            return {'found': False}
    
    # Tests avec les premiers chèques du dataset
    test_cheques = df['CHEQUE_NO'].head(3).tolist()
    test_cheques.append('999999')  # Un chèque qui n'existe pas
    
    for cheque_id in test_cheques:
        print(f"\n--- Test avec chèque {cheque_id} ---")
        result = afficher_montants_real(cheque_id)
        print()

except Exception as e:
    print(f"❌ Erreur lors du chargement: {e}")
