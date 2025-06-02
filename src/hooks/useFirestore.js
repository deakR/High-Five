import { useState, useEffect, useCallback } from "react";
import { db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc, setDoc, collection, addDoc, onSnapshot } from "firebase/firestore";
import { getRandomEmoji } from "../utils/emojiUtils";

export const useFirestore = () => {
  const [popupMessages, setPopupMessages] = useState([]);

  // Fetch the current high-five count from Firestore
  const fetchHighFiveCount = useCallback(async () => {
    const docRef = doc(db, "highFiveCounter", "global");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().count;
    } else {
      // Initialize the counter if it doesn't exist
      await setDoc(docRef, { count: 0 });
      return 0;
    }
  }, []);

  // Increment the high-five counter without form
  const incrementHighFiveCount = useCallback(async () => {
    const highFiveRef = doc(db, "highFiveCounter", "global");
    const highFiveSnap = await getDoc(highFiveRef);
    if (highFiveSnap.exists()) {
      const newCount = highFiveSnap.data().count + 1;
      await updateDoc(highFiveRef, { count: newCount });
      return newCount;
    }
    return 0;
  }, []);

  // Submit high five with user details
  const submitHighFive = useCallback(async (name, city, country) => {
    const highFiveRef = doc(db, "highFiveCounter", "global");
    const highFiveSnap = await getDoc(highFiveRef);
    if (highFiveSnap.exists()) {
      const newCount = highFiveSnap.data().count + 1;
      await updateDoc(highFiveRef, { count: newCount });
      
      // Store user info in highFiveUsers collection
      await addDoc(collection(db, "highFiveUsers"), {
        name,
        location: `${city}, ${country}`,
        timestamp: new Date(),
      });
      
      return newCount;
    }
    return 0;
  }, []);

  // Listen for real-time updates in the highFiveUsers collection
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "highFiveUsers"), (snapshot) => {
      const messages = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          const timestamp = data.timestamp.toDate();
          const formattedDate = timestamp.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          });
          const formattedTime = timestamp.toLocaleTimeString();
          const randomEmoji = getRandomEmoji();
          return {
            message: `${data.name} from ${data.location} sent a High-Five! ${randomEmoji} at ${formattedTime} on ${formattedDate}`,
            timestamp: data.timestamp, // Keep the original timestamp for sorting
          };
        })
        .sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis()) // Sort by timestamp in descending order
        .slice(0, 5) // Limit to the newest 5 messages
        .map((item) => item.message); // Extract the message string after sorting

      setPopupMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  return {
    popupMessages,
    fetchHighFiveCount,
    incrementHighFiveCount,
    submitHighFive
  };
};