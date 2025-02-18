# **MD-Hygiene – E-Commerce- und Angebotsverwaltungssystem**

## 🚀 **Projektbeschreibung**
MD-Hygiene ist ein **E-Commerce- und Angebotsverwaltungssystem**, das sowohl für **Einzelkunden als auch für Unternehmen** entwickelt wurde. Diese Plattform umfasst **Produktverwaltung, Bestellprozesse, Angebotsverwaltung und Rechnungsstellung**.

Das Projekt wurde mit **React + Vite** entwickelt und verwendet **Redux Toolkit** für das globale State-Management. Während der Entwicklung wurde **JSON Server** zur Datenverwaltung genutzt, und das System kann nahtlos mit einer **echten API** verbunden werden, wenn es live geht.

---

## 🌍 **Live-Demo und Benutzerrollen**
🔗 **Live-Demo:** *(Noch keine URL verfügbar.)*  
🖼️ **Demo-Bilder:** *(Screenshots des Projekts können hier eingefügt werden.)*

Das System bietet **drei verschiedene Benutzertypen**:

1️⃣ **Gastbenutzer** – Kann Produkte ansehen und in den Warenkorb legen, aber nicht kaufen.  
2️⃣ **Registrierter Benutzer** – Kann Bestellungen aufgeben, Bestellverlauf und Rechnungen einsehen.  
3️⃣ **Administrator** – Hat umfassende Rechte für Produkt-, Bestell- und Benutzerverwaltung.  

Alle Benutzerrollen sind durch ein **Autorisierungssystem geschützt**, das verschiedene Zugriffsrechte gewährt.

---

## ⚙️ **Funktionen**
### 🛒 **Funktionen für Kunden**
✔️ Produkte **anzeigen, als Favoriten speichern, in den Warenkorb legen und kaufen**  
✔️ **Bestellungen aufgeben und den Bestellstatus verfolgen**  
✔️ **Benachrichtigungen erhalten** (via Toastify)  
✔️ **Bestellverlauf und Rechnungen einsehen**  
✔️ **Rechnungen als PDF herunterladen**  

### 🏢 **Admin-Funktionen**
✔️ **Bestellungen verwalten und Status ändern**  
✔️ **Automatische Rechnungserstellung bei Versand der Bestellung**  
✔️ **Produkte hinzufügen, Lagerbestand verwalten und Preise festlegen**  
✔️ **Benutzer aktivieren, deaktivieren und verwalten**  

### 📑 **Angebotsverwaltung (B2B-Funktion)**
✔️ **Individuelle Angebote für Unternehmen erstellen**  
✔️ **Steuern, Versandkosten und Preise individuell anpassen**  
✔️ **Angebote als PDF generieren und per E-Mail versenden**  
✔️ **Angebotsstatus verwalten ("Gesendet", "Ausstehend", "Akzeptiert", "Abgelehnt")**  

### 📜 **Rechnungsverwaltung**
✔️ **Automatische Rechnungserstellung**  
✔️ **Steuerberechnungen gemäß deutscher Gesetzgebung**  
✔️ **Rechnungen als PDF herunterladen und teilen**  
✔️ **Dynamische Verwaltung von Firmendaten**  

---

## 🔧 **Verwendete Technologien**
### 📌 **Frontend**
- **React.js + Vite** – Modernes Frontend-Framework
- **Redux Toolkit** – Globales State-Management
- **React Router** – Navigation und Routing
- **Styled Components** – UI-Design und Themes
- **Framer Motion** – UI-Animationen
- **Toastify** – Benutzerbenachrichtigungen

### 📌 **Backend**
- **JSON Server** – API-Simulation während der Entwicklung
- **Echte API-Integration** – Live-Version kann mit einer echten API verbunden werden

### 📌 **Datenmanagement**
- **RTK Query & Axios** – API-Kommunikation
- **Redux Persist** – Persistente Speicherung von Benutzerinformationen

---

## 🛠 **Projekt-Setup und Installation**
### 📥 **Abhängigkeiten installieren**
```sh
npm install
```

### 🚀 **Entwicklungsmodus starten**
```sh
npm run dev
```

### 📦 **JSON Server (API für die Entwicklungsumgebung starten)**
```sh
npm install -g json-server
json-server --watch data.json --port 5000
```
**Hinweis:** JSON Server ruft Daten aus der Datei `data.json` ab und simuliert API-Anfragen.

---

## 🔄 **Beitragen zum Projekt**
Wenn du zum Projekt beitragen möchtest, folge diesen Schritten:

1. **Forke dieses Repository**  
2. **Erstelle einen neuen Branch** (`feature/neue-funktion`)  
3. **Führe deine Änderungen durch und committe sie** (`git commit -m 'Neue Funktion hinzugefügt'`)  
4. **Push deinen Branch** (`git push origin feature/neue-funktion`)  
5. **Erstelle eine Pull Request (PR)**  

---

## 📩 **Kontakt**
Falls du Fragen hast oder Feedback geben möchtest, kannst du mich gerne kontaktieren. 😊

