## Lokale Dokumentation: Steuerung einer Azure-VM mit Azure Function App

### Überblick
Diese Aufgabe umfasst die Erstellung einer Azure Function App, die eine virtuelle Maschine (VM) automatisch zu bestimmten Zeiten startet und stoppt. 

Leider konnten wir keine benutzerdefinierte Rolle erstellen, um der Function App die notwendigen Berechtigungen zu gewähren. Daher kann die Funktion die VM derzeit nicht praktisch regulieren.

---

### Voraussetzungen
1. **Python-Umgebung**: Die Function App ist in Python geschrieben.
2. **Azure-CLI**: Zum Bereitstellen der Function App.
3. **Azure SDK für Python**: Die Bibliotheken `azure-mgmt-compute` und `azure-identity` werden verwendet.
4. **Azure Subscription ID**, **Ressourcengruppe** und **VM-Name**: Informationen zur Ziel-VM.

---

### Struktur der Function App
Die Function App ist so konzipiert, dass sie zwei Zeitplan-basierte Aufgaben ausführt:
- Start der VM um **08:00 Uhr**.
- Stoppen der VM um **18:00 Uhr**.

### Einschränkungen
Aufgrund der fehlenden benutzerdefinierten Rolle hat die Function App aktuell keine Berechtigung, die Ziel-VM zu steuern. Um diese Einschränkung zu beheben, sind folgende Schritte erforderlich:

1. **Benutzerdefinierte Rolle erstellen**:
   - Eine Rolle mit den Berechtigungen `Microsoft.Compute/virtualMachines/start` und `Microsoft.Compute/virtualMachines/deallocate` muss erstellt werden.
   - Diese Rolle muss der Function App oder ihrem Identitätsprinzipal zugewiesen werden.

3. **Alternative Lösung**:
   - Bis zur Bereitstellung der benutzerdefinierten Rolle kann die Steuerung der VM manuell oder über andere Automatisierungsmethoden erfolgen (z. B. Azure Logic Apps).

--- Hier aber leider auch: Azure Logic Apps sind nicht für Contributer Nutzer verfügbar,
      also hier auch ähnliches Problem.

### Kostenanalyse
- **24/7 Betrieb der VM**: Ca. **110 $ pro Monat** pro VM.
- **Regulierter Betrieb (8:00 - 20:00)**: Ca. **46 $ pro Monat** pro VM.
- **Einsparungen**: Pro VM können **ca. 785 $ pro Jahr** gespart werden.

---

### Fazit
Die Funktion wurde erfolgreich implementiert, kann jedoch aufgrund fehlender Berechtigungen nicht vollständig ausgeführt werden. Das Hinzufügen einer benutzerdefinierten Rolle ist der nächste erforderliche Schritt, um die Funktionalität zu gewährleisten.

