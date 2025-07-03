import pandas as pd
import os
import cv2
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt

# Simuler le chargement du CSV comme dans votre code
print("📊 Simulation du chargement du fichier res.csv")
print("=" * 50)

# Créer des données de test similaires à votre CSV
csv_data = {
    'CHEQUE_NO': ['100001', '100002', '100003', '100004', '100005', '100006', '100007'],
    'VALUE_NUMBERS': ['1250.50', '2450.75', '500.00', '3200.25', '750.80', '1800.00', '950.45'],
    'VALUE_LETTERS': [
        'One thousand two hundred fifty dollars and fifty cents',
        'Two thousand four hundred fifty dollars and seventy five cents',
        'Five hundred dollars',
        'Three thousand two hundred dollars and twenty five cents',
        'Seven hundred fifty dollars and eighty cents',
        'One thousand eight hundred dollars',
        'Nine hundred fifty dollars and forty five cents'
    ]
}

df = pd.DataFrame(csv_data)
print("Contenu du CSV simulé:")
print(df.to_string(index=False))
print(f"\nNombre total de chèques: {len(df)}")
print()

def extract_signature_zone_simulation(image_path):
    """
    Simulation de votre fonction extract_signature_zone avec pytesseract
    """
    print(f"🔍 Analyse OCR pour détecter 'signature' dans: {os.path.basename(image_path)}")
    
    # Simuler la détection OCR du mot "signature"
    # Dans votre vrai code: data = pytesseract.image_to_data(gray, output_type=pytesseract.Output.DICT)
    signature_words_found = np.random.choice([True, False], p=[0.6, 0.4])
    
    if signature_words_found:
        print("   ✅ Mot 'signature' détecté dans l'image")
        print("   📍 Coordonnées trouvées: x=450, y=320, w=120, h=25")
        print("   🖼️ Zone signature extraite avec padding de 50px")
        return True
    else:
        print("   ❌ Aucun mot 'signature' détecté par OCR")
        return False

def afficher_montants_et_signature(image_path, cheque_id):
    """
    Reproduction exacte de votre fonction afficher_montants_et_signature
    """
    print(f"🏦 === TRAITEMENT DU CHÈQUE N°{cheque_id} ===")
    print(f"📁 Fichier image: {os.path.basename(image_path)}")
    print()
    
    # Affichage de l'image (simulé)
    print("🖼️ Affichage de l'image du chèque...")
    print("   Image chargée et affichée avec matplotlib")
    print(f"   Titre: 'Chèque N°{cheque_id}'")
    print()
    
    # Chercher les montants dans le CSV (exactement comme votre code)
    print("🔍 Recherche dans le CSV...")
    row = df[df["CHEQUE_NO"].astype(str) == str(cheque_id)]
    
    if not row.empty:
        valeur_num = row.iloc[0]["VALUE_NUMBERS"]
        valeur_lettres = row.iloc[0]["VALUE_LETTERS"]
        print(f"💰 Montant Numérique : {valeur_num}")
        print(f"✍️ Montant en Lettres : {valeur_lettres}")
        csv_found = True
    else:
        print("❌ Aucun montant trouvé dans le CSV.")
        csv_found = False
    
    print()
    
    # Extraction de la signature (comme dans votre code)
    print("🖋️ Extraction de la zone signature...")
    signature_detected = extract_signature_zone_simulation(image_path)
    
    if signature_detected:
        print("   🖼️ Zone 'signature' affichée avec matplotlib")
        print("   📊 Titre: 'Zone Signature'")
    
    print()
    print("=" * 60)
    print()
    
    return {
        'cheque_id': cheque_id,
        'csv_found': csv_found,
        'valeur_numerique': valeur_num if csv_found else None,
        'valeur_lettres': valeur_lettres if csv_found else None,
        'signature_detectee': signature_detected
    }

# Test avec différents chèques (comme dans votre code)
print("🧪 TESTS DE LA FONCTION afficher_montants_et_signature")
print("=" * 60)
print()

test_cases = [
    ('/content/100001.jpg', '100001'),  # Existe dans le CSV
    ('/content/100003.jpg', '100003'),  # Existe dans le CSV  
    ('/content/999999.jpg', '999999'),  # N'existe pas dans le CSV
    ('/content/100005.jpg', '100005'),  # Existe dans le CSV
]

results = []
for image_path, cheque_id in test_cases:
    result = afficher_montants_et_signature(image_path, cheque_id)
    results.append(result)

print("📋 RÉSUMÉ DES RÉSULTATS:")
print("=" * 40)
for i, result in enumerate(results, 1):
    print(f"Test {i}:")
    print(f"  - Chèque ID: {result['cheque_id']}")
    print(f"  - Trouvé dans CSV: {'✅' if result['csv_found'] else '❌'}")
    if result['csv_found']:
        print(f"  - Montant: {result['valeur_numerique']}")
        print(f"  - En lettres: {result['valeur_lettres'][:50]}...")
    print(f"  - Signature détectée: {'✅' if result['signature_detectee'] else '❌'}")
    print()

print("🔧 FONCTIONS UTILISÉES DANS VOTRE CODE:")
print("=" * 40)
print("1. pandas.read_csv() - Chargement du fichier res.csv")
print("2. df[df['CHEQUE_NO'].astype(str) == str(cheque_id)] - Recherche dans le CSV")
print("3. pytesseract.image_to_data() - OCR pour détecter 'signature'")
print("4. cv2.imread() - Chargement des images")
print("5. matplotlib.pyplot - Affichage des images et zones")
print("6. os.path.splitext() - Extraction de l'ID depuis le nom de fichier")
