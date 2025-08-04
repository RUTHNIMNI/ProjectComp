import React, { useState } from "react"; // ייבוא React ו- useState כדי שנוכל להשתמש ב-state בתוך הקומפוננטה.

import LikeCount from "./LikeCount";
  
export default function LikeButton() {
  // הגדרת ה-state באמצעות useState
  const [counter, setCounter] = useState(0);

  // פונקציה להעלאת המונה בלחיצה
  const handleCounterLike = () => {
    setCounter(counter + 1);
  }
 return (
  <div>
    <LikeCount counter={counter} />
    <button onClick={handleCounterLike}>❤️ Likes: {counter}</button>
  </div>
);

}   

