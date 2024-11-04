import cn from "classnames";
import { useState } from "react";

import { useMountTransition } from "@/hooks";

export default function Wallets() {
  const [isVisible, setVisible] = useState(false);
  const hasTransitioned = useMountTransition(isVisible, 3000);

  // Deferred animation logic
  const classes = cn(
    "mt-4 p-6 h-1/2 w-full text-gray-medium transition-all duration-[3000ms] bg-goldenrod fixed",
    {
      "-bottom-full": (isVisible && !hasTransitioned) || (!isVisible && hasTransitioned),
      "bottom-0": isVisible && hasTransitioned
    }
  )

  return (
    <div className="mt-24">
      <button className="border" onClick={() => setVisible(prev => !prev)}>Set visible</button>
      {(isVisible || hasTransitioned) &&
        <div className={classes}>I am hidden!</div>
        // <div className={`element ${hasMounted && "hidden"}`}>I am hidden!</div>
      }
    </div>
  )
}
