# High-Five

**High-Five** is a playful, real-time web app that lets users send and track high-fives from around the world. Built with React and Firebase, it features a global high-five counter, a feed of recent high-fives, and a responsive, modern UI.

---

## 🚀 Demo

[Live Demo](https://high-five-f3fac.web.app/)

---

## ✨ Features

- 🌍 **Global High-Five Counter:** See the total number of high-fives sent by users everywhere, updated in real time.
- 🙌 **Send a High-Five:** Submit your name and location to add your high-five to the global tally and recent feed.
- 📰 **Recent High-Fives Feed:** View a live-updating list of the latest high-fives from around the world.
- 🌗 **Dark Mode:** Toggle between light and dark themes for comfortable viewing.
- 📱 **Responsive Design:** Works great on desktop and mobile devices.

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Firebase project](https://firebase.google.com/) (for your own deployment)

### Local Development Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/deakR/High-Five.git
   cd High-Five
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up Firebase:**

   - Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - In your project settings, add a new web app and copy the Firebase config.

4. **Configure environment variables:**

   - Create a `.env` file in the root directory:
     ```
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_DATABASE_URL=your_database_url
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```
   - **Note:** Never commit your `.env` file. It is already in `.gitignore`.

5. **Start the development server:**
   ```sh
   npm run dev
   ```
   - The app will be available at [http://localhost:5173](http://localhost:5173).

---

## ⚡ Troubleshooting

- **Blank page or Firebase errors:** Double-check your `.env` values and make sure your Firebase project is set up correctly.
- **CORS issues:** Make sure your Firebase Firestore rules allow read/write for development.
- **API for countries/cities not loading:** The app uses [countriesnow.space](https://countriesnow.space/) API. If it’s down, country/city selection may not work.

---

## 🧑‍💻 Contributing

Contributions are welcome! To contribute:

1. **Fork** this repository.
2. **Clone** your fork and create a new branch:
   ```sh
   git checkout -b my-feature
   ```
3. **Make your changes** and commit them.
4. **Push** to your fork:
   ```sh
   git push origin my-feature
   ```
5. **Open a Pull Request** on GitHub.

**Tips:**

- Please open an issue first for major changes.
- Follow the existing code style and naming conventions.
- Make sure the app runs locally before submitting your PR.

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
