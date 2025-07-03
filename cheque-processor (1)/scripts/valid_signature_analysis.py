import pandas as pd
import requests
from io import StringIO

# Charger le CSV pour analyser la validité des signatures
csv_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/res-GrqTwtxRIUZlY7tJZu0YQTlcp1O0pm.csv"

print("🔍 ANALYSE DE LA VALIDITÉ DES SIGNATURES")
print("=" * 50)

try:
    response = requests.get(csv_url)
    df = pd.read_csv(StringIO(response.text))
    
    print(f"📊 Dataset chargé: {len(df)} chèques")
    print()
    
    # Analyser la colonne "valid"
    print("✅ ANALYSE DE LA COLONNE 'valid':")
    print("-" * 40)
    
    # Vérifier si la colonne existe
    if 'valid' in df.columns:
        valid_values = df['valid'].value_counts()
        print(f"• Valeurs uniques dans 'valid': {valid_values.index.tolist()}")
        print(f"• Distribution des valeurs: {dict(valid_values)}")
        
        # Exemples de chèques avec leur validité
        print("\n📝 EXEMPLES DE CHÈQUES AVEC VALIDITÉ:")
        for i in range(min(10, len(df))):
            cheque_no = df.iloc[i]['CHEQUE_NO']
            valid_value = df.iloc[i]['valid']
            signature_file = df.iloc[i]['SIGNATURE_FILE']
            print(f"   • Chèque {cheque_no}: Signature {signature_file} → Validité: {valid_value}")
        
        # Statistiques
        valid_count = df[df['valid'] == 1].shape[0]
        invalid_count = df[df['valid'] == 0].shape[0]
        other_count = df.shape[0] - valid_count - invalid_count
        
        print("\n📊 STATISTIQUES DE VALIDITÉ:")
        print(f"   • Signatures valides (1): {valid_count} ({valid_count/len(df)*100:.1f}%)")
        print(f"   • Signatures invalides (0): {invalid_count} ({invalid_count/len(df)*100:.1f}%)")
        if other_count > 0:
            print(f"   • Autres valeurs: {other_count} ({other_count/len(df)*100:.1f}%)")
    else:
        print("❌ La colonne 'valid' n'existe pas dans le CSV!")
        print("Colonnes disponibles:", df.columns.tolist())
    
except Exception as e:
    print(f"❌ Erreur: {e}")
