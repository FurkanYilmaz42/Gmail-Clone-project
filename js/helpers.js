//!  Yazi formatlayan  fonksiyon
const formatText = (text, max) => {
    
    if (text.length < max) {
      return text;

    } else {
      return text.slice(0, max) + "...";

    }
  };
  
  export { formatText };