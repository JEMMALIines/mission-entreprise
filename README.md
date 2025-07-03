# mission-entreprise
<h1 align="center">🧾 Mission‑Entreprise | Automatic Cheque Processor</h1>

<p align="center">
  <img src="docs/images/logo_cheque.svg" width="120" alt="Logo">
</p>

<p align="center">
  <b>Un micro‑système complet pour la dématérialisation et la validation intelligente des chèques bancaires.</b><br>
  OCR/ICR → Validation des montants → Détection de signature via CNN → Décision ⇒ API JSON.
</p>

<p align="center">
  <a href="#-fonctionnalités">✨ Fonctionnalités</a> •
  <a href="#-architecture">🏗️ Architecture</a> •
  <a href="#-installation--lancement">🚀 Installation</a> •
  <a href="#-flux-de-données">🔄 Flux de données</a> •
  <a href="#-tests">🧪 Tests</a> •
  <a href="#-contribuer">🤝 Contribuer</a>
</p>

---

## ✨ Fonctionnalités
| Module | Description |
|--------|-------------|
| 🖼️ *Upload & Pré‑traitement* | Nettoyage d’image (OpenCV), redressement & débruitage |
| 🔠 *OCR / ICR* | Extraction texte + reconnaissance manuscrite (Tesseract + Keras-CTC) |
| 💰 *Validation Montant* | Croise le montant écrit & numérique (Pandas + règles heuristiques) |
| ✒️ *Signature CNN* | Recadrage ‑> CNN 8.1 (Conv 32/64/128 + Dense 512) pour classifier VALIDE / INVALIDE / SUSPECTE |
| ⚙️ *Decision Engine* | Agrège les scores, applique un seuil de confiance configurable |
| 🌐 *REST API* | Renvoie un JSON détaillé pour le front / ERP |

---

## 🏗️ Architecture

<img src="docs/images/cnn_architecture.png" width="350" alt="CNN Diagram"><br>
<img src="docs/images/data_flow_6_5_clean.pdf" width="500" alt="Data Flow">

---

## 🚀 Installation & lancement

```bash
# 1. Cloner le repo
git clone https://github.com/JEMMALIines/mission-entreprise.git
cd mission-entreprise

# 2. Front‑end (Angular 17)
cd cheque-processor-frontend
npm install
npm start         # http://localhost:4200

# 3. Back‑end (Python 3.11 – FastAPI)
cd ../cheque-processor-api
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload   # http://localhost:8000

# 4. Tests
pytest
