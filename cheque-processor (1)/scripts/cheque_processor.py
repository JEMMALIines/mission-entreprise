import pandas as pd
import os
import cv2
import pytesseract
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt

# Simuler les données CSV comme dans votre code
csv_data = {
    'CHEQUE_NO': ['12345', '67890', '11111', '22222', '33333'],
    'VALUE_NUMBERS': ['1250.00', '2450.75', '500.00', '3200.50', '750.25'],
    'VALUE_LETTERS': [
        'One thousand two hundred fifty dollars',
        'Two thousand four hundred fifty dollars and seventy five cents',
        'Five hundred dollars',
        'Three thousand two hundred dollars and fifty cents',
        'Seven hundred fifty dollars and twenty five cents'
    ]
}

# Créer le DataFrame
df = pd.DataFrame(csv_data)
print("📊 Données CSV chargées:")
print(df)
print("\n" + "="*50 + "\n")

def extract_signature_zone_simulation(image_path):
    """
    Simule la fonction extract_signature_zone de votre code
    """
    print(f"🔍 Recherche de zone signature dans: {os.path.basename(image_path)}")
    
    # Simuler la détection OCR du mot "signature"
    # Dans votre vrai code, cela utilise pytesseract.image_to_data()
    signature_found = np.random.choice([True, False], p=[0.7, 0.3])
    
    if signature_found:
        print("✅ Zone 'signature' détectée")
        return True
    else:
        print("❌ Aucun mot 'signature' détecté")
        return False

def afficher_montants(image_path, cheque_id):
    """
    Reproduction exacte de votre fonction afficher_montants
    """
    print(f"🏦 Traitement du chèque N°{cheque_id}")
    print(f"📁 Fichier image: {os.path.basename(image_path)}")
    
    # Chercher les montants dans le CSV (comme dans votre code)
    row = df[df["CHEQUE_NO"].astype(str) == str(cheque_id)]
    
    if not row.empty:
        valeur_num = row.iloc[0]["VALUE_NUMBERS"]
        valeur_lettres = row.iloc[0]["VALUE_LETTERS"]
        print(f"💰 Montant Numérique : {valeur_num}")
        print(f"✍️ Montant en Lettres : {valeur_lettres}")
        
        # Extraction de la signature (comme dans votre code)
        signature_detected = extract_signature_zone_simulation(image_path)
        
        return {
            'cheque_id': cheque_id,
            'valeur_numerique': valeur_num,
            'valeur_lettres': valeur_lettres,
            'signature_detectee': signature_detected,
            'success': True
        }
    else:
        print("❌ Aucun montant trouvé pour ce numéro de chèque.")
        return {
            'cheque_id': cheque_id,
            'error': 'Aucun montant trouvé dans le CSV',
            'success': False
        }

# Test de la fonction avec différents IDs de chèques
print("🧪 Test de la fonction afficher_montants:\n")

test_cases = [
    ('/content/12345.jpg', '12345'),
    ('/content/67890.jpg', '67890'),
    ('/content/99999.jpg', '99999'),  # Ce chèque n'existe pas dans le CSV
]

results = []
for image_path, cheque_id in test_cases:
    print(f"--- Test avec chèque {cheque_id} ---")
    result = afficher_montants(image_path, cheque_id)
    results.append(result)
    print()

print("📋 Résumé des résultats:")
for i, result in enumerate(results):
    print(f"Test {i+1}: {result}")
