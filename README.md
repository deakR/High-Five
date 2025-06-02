# High-Five

**High-Five** is a playful, real-time web app that lets users send and track high-fives from around the world. Built with React and Firebase, it features a global high-five counter, a feed of recent high-fives, and a responsive, modern UI.

## Features

- 🌍 **Global High-Five Counter:** See the total number of high-fives sent by users everywhere, updated in real time.
- 🙌 **Send a High-Five:** Submit your name and location to add your high-five to the global tally and recent feed.
- 📰 **Recent High-Fives Feed:** View a live-updating list of the latest high-fives from around the world.
- 🌗 **Dark Mode:** Toggle between light and dark themes for comfortable viewing.
- 📱 **Responsive Design:** Works great on desktop and mobile devices.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm installed
- [Firebase project](https://firebase.google.com/) (for your own deployment)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/high-five.git
   cd high-five
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up Firebase:**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - In your project settings, find your web app’s Firebase config.

4. **Create a `.env` file in the root directory with your Firebase credentials:**
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_DATABASE_URL=your_database_url
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
   > **Note:** The `.env` file is required and should **not** be committed to version control. See `.gitignore`.

5. **Start the development server:**
   ```sh
   npm run dev
   ```

6. **Open [http://localhost:5173](http://localhost:5173) in your browser.**

## Deployment

This project is ready for Firebase Hosting. To deploy:

```sh
npm run build
firebase deploy
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

---

**Note:**  
If you clone this repo, you must create your own `.env` file with your Firebase credentials to run the app locally.