# 📬 MQ Messages App

Application de gestion des messages **IBM MQ Series** avec une interface web moderne et une API REST.

---

## 📦 Architecture du projet

MQ-MESSAGES-APP/
├── src/ # Backend NestJS (API)
│ ├── messages/ # Module de gestion des messages MQ
│ ├── partners/ # Module de gestion des partenaires
│ └── shared/ # Code partagé (DTOs, utils, etc.)
├── mq-messages-front/ # Frontend React
└── .vscode/ # Configurations pour VS Code


---

## ⚙️ Technologies utilisées

- 🔧 **NestJS** — API REST modulaire
- 🎨 **React** — Interface utilisateur moderne
- 🧪 **Swagger** — Documentation interactive de l'API
- 🗃️ **MongoDB** — Base de données NoSQL (`mongodb://localhost:27017`)

---

## 🚀 Installation & Lancement

### 📥 Installation des dépendances

```bash
# Tout installer (backend + frontend)
npm run install:all

# Ou séparément
npm run install:backend    # Backend uniquement
npm run install:frontend   # Frontend uniquement

🧪 Lancer en mode développement

# Lancer le backend (NestJS, port 3001)
npm run start:backend

# Lancer le frontend (React, port 3000)
npm run start:frontend

# Lancer les deux ensemble
npm run dev

🏗️ Build pour la production
npm run build:backend      # Build du backend
npm run build:frontend     # Build du frontend
npm run build              # Build complet

🌐 URLs importantes
 🔧 API Backend : http://localhost:3001

🎨 Frontend : http://localhost:3000

📚 Swagger API : http://localhost:3001/api

🗃️ MongoDB : mongodb://localhost:27017 (par défaut dans l'application)

## 🧪 Jeux de test / Utilisateurs de démo


Voici des comptes pour tester les rôles dans l'application :

- **admin** / `admin123` → accès complet à toutes les fonctionnalités
- **user** / `user123` → accès aux messages et partenaires
- **viewer** / `viewer123` → lecture seule
