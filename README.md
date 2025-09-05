# Fastighets- och kundhanteringsapp  
Detta projekt är en fullstackapplikation byggd med **Next.js**, **TypeScript**, **Prisma** och **MongoDB** som hanterar autentisering samt CRUD-funktionalitet för kunder och fastigheter. Backend är implementerat via Next.js API routes kopplat till Prisma och frontend består av återanvändbara komponenter som listar, skapar, uppdaterar och raderar data. Användarautentisering sker med registrering, inloggning och utloggning där lösenord krypteras med bcrypt och cookies används för sessionshantering.  

Applikationen testas med **Cypress E2E** där automatiserade tester täcker användarflöden för registrering, login, logout, CRUD på kunder och fastigheter samt validering av felaktiga inmatningar. Testerna körs mot en separat **testdatabas** som seedas om inför varje körning via `cy.task("reseed")`.  

Projektet versioneras med **Git & GitHub** och innehåller en README.md med instruktioner för installation, körning och testning.  

## Installation and Running the Project

### **1. Clone the Repository**
```sh
git clone https://github.com/smnmnssn/cypress-intro
cd cypress-intro
```
### **2. Install dependencies**
```sh
npm install
```

#### Start the Development Server:
```sh
npm run dev
```
#### Build for Production:
```sh
npm run build
npm run preview
```

#### Run automated tests:
```sh
npm test
```

