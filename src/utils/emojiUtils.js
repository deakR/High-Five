// Array of emojis
const emojis = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃",
    "🥰", "😍", "🤩", "😘", "😗", "😙", "😚",
    "🎉", "🎊", "🎈", "🎆", "🎇", "🎁", "🎂", "✨", "🌟", "💫", "🌈",
    "🙌", "👏", "👍", "👌", "🤗", "🙆", "💃", "🕺",
    "🎵", "🎶", "🥳", "😻", "💖", "💝", "💞", "💕", "💓", "💗",
    "😎", "🤘", "🙌🏻"];
    
    // Function to get a random emoji
    export const getRandomEmoji = () => {
      const randomIndex = Math.floor(Math.random() * emojis.length);
      return emojis[randomIndex];
    };