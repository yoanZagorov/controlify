import { useEffect } from "react";

export default function useScrollLock(isLocked) {
  useEffect(() => {
    const initialOverflow = window.getComputedStyle(document.body).overflow;

    if (isLocked) {
      document.body.style.overflow = "hidden";
      console.log(window.getComputedStyle(document.body).overflow);
    }

    return () => document.body.style.overflow = initialOverflow;
  }, [isLocked]);
}

// export default function useScrollLock(isLocked, condition = true) {
//   useEffect(() => {
//     const initialOverflow = window.getComputedStyle(document.body).overflow;
//     console.log(window.getComputedStyle(document.body).overflow);

//     if (isLocked && condition) {
//       document.body.style.overflow = "hidden";
//       console.log(window.getComputedStyle(document.body).overflow);
//     }

//     return () => document.body.style.overflow = initialOverflow;
//   }, [isLocked]);
// }