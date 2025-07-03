import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Dropout, Flatten, Dense
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import tensorflow as tf

print("🧠 CRÉATION DU MODÈLE DE DEEP LEARNING POUR LA CLASSIFICATION DE SIGNATURES")
print("=" * 75)

# Vérifier si TensorFlow est disponible
print(f"📚 TensorFlow version: {tf.__version__}")
print(f"🖥️ GPU disponible: {'Oui' if tf.config.list_physical_devices('GPU') else 'Non'}")
print()

# Définir les paramètres du modèle
IMG_HEIGHT = 150
IMG_WIDTH = 150
BATCH_SIZE = 32
EPOCHS = 15
NUM_CLASSES = 2  # Valide ou Invalide

print(f"📐 Paramètres du modèle:")
print(f"   • Taille d'image: {IMG_WIDTH}x{IMG_HEIGHT} pixels")
print(f"   • Batch size: {BATCH_SIZE}")
print(f"   • Epochs: {EPOCHS}")
print(f"   • Classes: {NUM_CLASSES} (Valide/Invalide)")
print()

# Créer le modèle CNN
def create_signature_model():
    model = Sequential([
        # Première couche de convolution
        Conv2D(32, (3, 3), activation='relu', input_shape=(IMG_HEIGHT, IMG_WIDTH, 3)),
        MaxPooling2D(2, 2),
        
        # Deuxième couche de convolution
        Conv2D(64, (3, 3), activation='relu'),
        MaxPooling2D(2, 2),
        
        # Troisième couche de convolution
        Conv2D(128, (3, 3), activation='relu'),
        MaxPooling2D(2, 2),
        
        # Aplatir les caractéristiques
        Flatten(),
        
        # Couches denses (fully connected)
        Dense(512, activation='relu'),
        Dropout(0.5),  # Pour éviter le surapprentissage
        Dense(NUM_CLASSES, activation='softmax')  # Sortie: valide ou invalide
    ])
    
    # Compiler le modèle
    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    return model

# Créer le modèle
model = create_signature_model()

# Afficher le résumé du modèle
print("🏗️ ARCHITECTURE DU MODÈLE:")
print("-" * 40)
model.summary(print_fn=lambda x: print(f"   {x}"))
print()

# Simuler l'entraînement (puisque nous n'avons pas de données d'entraînement réelles)
print("🔄 SIMULATION DE L'ENTRAÎNEMENT DU MODÈLE")
print("-" * 40)

# Générer des données d'entraînement synthétiques pour la démonstration
print("📊 Génération de données synthétiques pour la démonstration...")
X_train = np.random.rand(500, IMG_HEIGHT, IMG_WIDTH, 3)
y_train = np.random.randint(0, NUM_CLASSES, size=(500,))
y_train_categorical = keras.utils.to_categorical(y_train, NUM_CLASSES)

X_val = np.random.rand(100, IMG_HEIGHT, IMG_WIDTH, 3)
y_val = np.random.randint(0, NUM_CLASSES, size=(100,))
y_val_categorical = keras.utils.to_categorical(y_val, NUM_CLASSES)

print(f"✅ Données générées:")
print(f"   • Entraînement: {X_train.shape[0]} images")
print(f"   • Validation: {X_val.shape[0]} images")
print()

# Simuler l'entraînement (juste quelques epochs pour la démonstration)
print("🏋️ Entraînement du modèle (simulation)...")
history = model.fit(
    X_train, y_train_categorical,
    epochs=3,  # Réduit pour la démonstration
    batch_size=BATCH_SIZE,
    validation_data=(X_val, y_val_categorical),
    verbose=1
)

print("\n✅ Entraînement terminé!")

# Simuler l'évaluation du modèle
print("\n📏 ÉVALUATION DU MODÈLE")
print("-" * 25)
test_loss, test_acc = model.evaluate(X_val, y_val_categorical, verbose=0)
print(f"   • Précision sur données de test: {test_acc:.4f}")
print(f"   • Perte sur données de test: {test_loss:.4f}")

# Simuler des prédictions
print("\n🔮 EXEMPLE DE PRÉDICTIONS")
print("-" * 25)
# Générer quelques images de test synthétiques
test_images = np.random.rand(5, IMG_HEIGHT, IMG_WIDTH, 3)
predictions = model.predict(test_images)

for i, pred in enumerate(predictions):
    predicted_class = np.argmax(pred)
    confidence = pred[predicted_class]
    status = "VALIDE" if predicted_class == 1 else "INVALIDE"
    print(f"   • Image {i+1}: {status} (confiance: {confidence:.2f})")

# Sauvegarder le modèle (commenté car c'est une simulation)
# model.save('signature_classifier.h5')
print("\n💾 Le modèle pourrait être sauvegardé pour une utilisation future")

print("\n🎯 COMMENT UTILISER CE MODÈLE DANS LE PROJET")
print("-" * 40)
print("""
1. Entraîner le modèle avec de vraies images de signatures
2. Sauvegarder le modèle entraîné
3. Créer une API FastAPI/Flask qui:
   - Charge le modèle
   - Reçoit des images de signatures
   - Prétraite les images
   - Fait des prédictions
   - Renvoie les résultats
4. Intégrer l'API avec l'interface React/Next.js
""")

print("\n🚀 PROCHAINES ÉTAPES")
print("-" * 20)
print("1. Collecter un dataset de signatures valides et invalides")
print("2. Prétraiter les images (redimensionnement, normalisation)")
print("3. Entraîner le modèle sur les vraies données")
print("4. Évaluer et ajuster le modèle")
print("5. Déployer le modèle via une API")
print("6. Intégrer l'API avec l'interface utilisateur")
