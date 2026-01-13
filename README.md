  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
---

## Realtime visitor counter (Firebase)  ✅

This project includes a small realtime visitor counter that uses Firebase Firestore. It listens for updates in realtime and increments a counter once per device when the page is first loaded.

Setup steps:

1. Create a Firebase project at https://console.firebase.google.com/ and enable **Firestore**.
2. Copy `.env.example` to `.env` at the project root and fill in the `VITE_FIREBASE_*` values from the Firebase project settings.
3. Install the Firebase SDK:

   ```bash
   npm i firebase
   ```

4. Start the dev server: `npm run dev` and open the app. The visitor counter is shown in the footer and updates in realtime.

Notes:
- The counter document is `counters/visitors` in Firestore. You can create rules and indexes as needed for production.
- For a production-ready deployment, secure Firestore rules and consider server-side protections to avoid inflated counts.
