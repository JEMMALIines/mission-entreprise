import pandas as pd
import requests
from io import StringIO

# URL du nouveau fichier CSV
csv_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/res-XZYmdNszeH4erzCoPBGOtkWzUjVHrG.csv"

print("📥 ANALYSE DU NOUVEAU FICHIER CSV")
print("=" * 50)

try:
    # Télécharger et charger le CSV
    response = requests.get(csv_url)
    response.raise_for_status()
    
    df = pd.read_csv(StringIO(response.text))
    
    print(f"✅ CSV chargé avec succès!")
    print(f"📊 Nombre de chèques: {len(df)}")
    print(f"📋 Colonnes: {list(df.columns)}")
    print()
    
    # Afficher les premières lignes
    print("🔍 APERÇU DES DONNÉES:")
    print("-" * 30)
    print(df.head(10).to_string(index=False))
    print()
    
    # Analyse détaillée de chaque colonne
    print("📊 ANALYSE DÉTAILLÉE DES COLONNES:")
    print("-" * 40)
    
    for col in df.columns:
        print(f"\n• {col}:")
        print(f"  - Type: {df[col].dtype}")
        print(f"  - Valeurs uniques: {df[col].nunique()}")
        print(f"  - Valeurs nulles: {df[col].isnull().sum()}")
        if df[col].nunique() < 20:
            print(f"  - Valeurs: {df[col].unique()[:10].tolist()}")
        else:
            print(f"  - Exemples: {df[col].dropna().head(5).tolist()}")
    
    print("\n" + "=" * 50)
    
    # Analyse spécifique de la validité des signatures
    print("\n🖋️ ANALYSE DE LA VALIDITÉ DES SIGNATURES:")
    print("-" * 45)
    
    if 'valid' in df.columns:
        valid_counts = df['valid'].value_counts()
        print(f"Distribution des valeurs 'valid': {dict(valid_counts)}")
        
        # Calculer les pourcentages
        total = len(df)
        for value, count in valid_counts.items():
            percentage = (count / total) * 100
            status = "VALIDE" if str(value) == "1" else "INVALIDE"
            print(f"  • {status} ({value}): {count} chèques ({percentage:.1f}%)")
    
    print("\n🏦 ANALYSE DES BANQUES:")
    print("-" * 25)
    bank_counts = df['BANK_NAME'].value_counts()
    print(f"Nombre de banques uniques: {len(bank_counts)}")
    for bank, count in bank_counts.head(10).items():
        print(f"  • {bank}: {count} chèques")
    
    print("\n👥 ANALYSE DES UTILISATEURS:")
    print("-" * 30)
    user_counts = df['USER2NAME'].value_counts()
    print(f"Nombre d'utilisateurs uniques: {len(user_counts)}")
    for user, count in user_counts.head(10).items():
        print(f"  • {user}: {count} chèques")
    
    print("\n💰 ANALYSE DES MONTANTS:")
    print("-" * 25)
    # Convertir VALUE_NUMBERS en numérique pour l'analyse
    df['VALUE_NUMBERS_NUMERIC'] = pd.to_numeric(df['VALUE_NUMBERS'], errors='coerce')
    
    print(f"Montant minimum: {df['VALUE_NUMBERS_NUMERIC'].min()}")
    print(f"Montant maximum: {df['VALUE_NUMBERS_NUMERIC'].max()}")
    print(f"Montant moyen: {df['VALUE_NUMBERS_NUMERIC'].mean():.2f}")
    print(f"Montant médian: {df['VALUE_NUMBERS_NUMERIC'].median():.2f}")
    
    print("\n🔍 EXEMPLES DE CHÈQUES AVEC TOUTES LES INFORMATIONS:")
    print("-" * 55)
    
    for i in range(min(5, len(df))):
        row = df.iloc[i]
        print(f"\n--- Chèque {row['CHEQUE_NO']} ---")
        print(f"💰 Montant: {row['VALUE_NUMBERS']}")
        print(f"✍️ En lettres: {row['VALUE_LETTERS'][:50]}...")
        print(f"🏦 Banque: {row['BANK_NAME']}")
        print(f"👤 Utilisateur: {row['USER2NAME']}")
        print(f"🖋️ Signature: {row['SIGNATURE_FILE']}")
        print(f"✅ Validité: {'VALIDE' if str(row['valid']) == '1' else 'INVALIDE'}")
    
    print("\n" + "=" * 50)
    print("✅ ANALYSE TERMINÉE - Données prêtes pour l'interface!")

except Exception as e:
    print(f"❌ Erreur lors du chargement: {e}")
    import traceback
    traceback.print_exc()
