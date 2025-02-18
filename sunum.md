# **MD-Hygiene – E-Commerce- und Angebotsverwaltungssystem Präsentation**

## **📌 1. Einführung (Begrüßung und Projektvorstellung – 1 Minute)**
Hallo und herzlich willkommen! Heute werde ich Ihnen **MD-Hygiene** vorstellen. 
Dieses Projekt ist ein **modernes E-Commerce- und Angebotsverwaltungssystem**, das sowohl für **Einzelkunden als auch für Unternehmen** konzipiert wurde.

Sowohl **Einzelkunden** als auch **Geschäftskunden** können Produkte ansehen, sie in den Warenkorb legen, Bestellungen aufgeben und ihre Bestellungen verfolgen. 
Administratoren können **Bestellungen verwalten, Rechnungen generieren, Lagerbestände prüfen und Angebote für Geschäftskunden erstellen.**

Die Plattform wurde mit **React + Vite** entwickelt und verwendet **Redux Toolkit** für das globale State-Management. 
Während der Entwicklung wurde **JSON Server** zur Verwaltung von Daten eingesetzt, und das System kann nahtlos mit einer echten API integriert werden, sobald es live geht.

---

## **📌 2. Einkaufsprozess eines Kunden (3 Minuten)**
Nun werden wir den **Einkaufsprozess eines Kunden in unserem System** Schritt für Schritt durchgehen.

### **1️⃣ Startseite (Home Page)**
- Die Startseite zeigt **beliebte Produkte und Kategorien**.
- Nutzer können **Produkte als Favoriten markieren und in den Warenkorb legen.**
- Durch Klicken auf eine Kategorie können **Produkte gefiltert werden.**
- Produktdetails können durch Anklicken eines Produkts eingesehen werden.

### **2️⃣ Warenkorb-Verwaltung (Cart)**
- Nutzer können **ihre ausgewählten Produkte im Warenkorb einsehen.**
- **Steuern und Versandkosten werden automatisch berechnet.**
- **Produktmengen können erhöht oder verringert werden.**
- Vor dem Kauf wird der Gesamtpreis angezeigt.
- Durch Klicken auf die Schaltfläche **"Zur Kasse"** wird der Bezahlvorgang eingeleitet.

### **3️⃣ Bestellung abschließen (Checkout)**
- Der Kunde gibt seine Rechnungs- und Versandinformationen ein.
- Die Bestellung wird im **Redux Store und in der Datenbank gespeichert.**
- Der Nutzer kann seine Bestellungen unter **Bestellverlauf** einsehen.

---

## **📌 3. Admin-Panel und Bestellverwaltung (3 Minuten)**
Nun schauen wir uns die **Aufgaben eines Administrators** im System an.

### **📦 Bestellverwaltung**
Der Administrator kann **Bestellungen einsehen und deren Status aktualisieren.**
📦 **Bestellstatus:**
1. **Pending (Offen)** → Bestellung wurde aufgegeben, aber noch nicht bearbeitet.
2. **Processing (In Bearbeitung)** → Bestellung wurde bestätigt und wird vorbereitet.
3. **Shipped (Versandt)** → Bestellung wurde verschickt, Rechnung wurde generiert.
4. **Delivered (Geliefert)** → Bestellung wurde erfolgreich zugestellt.
5. **Archived (Archiviert)** → Bestellung wurde ins Archiv verschoben.

Jede Statusänderung sendet **automatisch eine Benachrichtigung an den Nutzer.**

### **📜 Rechnungsverwaltung**
- Sobald eine Bestellung als "Shipped" markiert wird, wird **automatisch eine Rechnung generiert.**
- Sowohl der Administrator als auch der Kunde können **die Rechnung als PDF herunterladen.**
- **Rechnungen werden gemäß der deutschen Steuergesetzgebung erstellt.**
- **Firmendaten und Bankverbindungen können dynamisch verwaltet werden.**

---

## **📌 4. Angebotsverwaltung (Angebot-Modul) (2 Minuten)**
Dieses System bietet nicht nur E-Commerce-Funktionen, sondern auch **eine spezielle Angebotsverwaltung für Geschäftskunden**.

- **Administratoren können personalisierte Angebote für Unternehmen erstellen.**
- Produkte können hinzugefügt werden, **mit individuellen Preisen und Steuern.**
- **Angebote können als PDF generiert und per E-Mail versendet werden.**
- Angebotsstatus kann überwacht werden: **"Gesendet", "Ausstehend", "Akzeptiert", "Abgelehnt"**.

Auf diese Weise können **maßgeschneiderte Angebote für B2B-Kunden bereitgestellt werden.**

---

## **📌 5. Eingesetzte Technologien (1 Minute)**
Das Projekt verwendet eine **moderne und skalierbare Architektur**, bestehend aus:
- **React + Vite** – Schnelle Frontend-Entwicklung
- **Redux Toolkit** – Globales State-Management
- **JSON Server** – API-Simulation in der Entwicklungsphase
- **RTK Query & Axios** – API-Verwaltung
- **Styled Components** – UI-Design und Theming
- **Framer Motion** – Animationen
- **Toastify** – Benutzerbenachrichtigungen

Diese Kombination ermöglicht **eine reaktionsschnelle, performante und erweiterbare Lösung**.

---

## **📌 6. Zukünftige Entwicklungen (1 Minute)**
Welche Funktionen sind für die nächste Version geplant?

✅ **Lagerverwaltung** – Produkte und Verfügbarkeit werden besser verwaltet.  
✅ **Verkaufsanalysen & Berichte** – Verkaufsstatistiken für Admins.  
✅ **Benachrichtigungssystem & Logs** – Systemereignisse werden dokumentiert.  
✅ **Erweiterte Angebotsverwaltung** – Angebote mit Zahlungssystem integrieren.  

Sobald diese Features integriert sind, wird das System **noch leistungsfähiger und effizienter für Unternehmen.**

---

## **📌 7. Fazit und Abschluss (1 Minute)**
🚀 **MD-Hygiene ist ein vollständig entwickeltes und dynamisches E-Commerce- und Angebotsverwaltungssystem für Einzel- und Geschäftskunden.**

✅ **Bestellungen, Angebote und Rechnungen können nahtlos verwaltet werden.**
✅ **Das System ist flexibel und kann vom Admin jederzeit angepasst werden.**

🔜 **Nächster Schritt: Integration der Lagerverwaltung und des Benachrichtigungssystems!**

Vielen Dank für Ihre Aufmerksamkeit! 🎤 Jetzt beantworte ich gerne Ihre Fragen.

