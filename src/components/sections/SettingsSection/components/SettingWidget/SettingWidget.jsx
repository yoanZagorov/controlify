import { capitalize } from "@/utils/str";

import { SvgIcon } from "@/components/SvgIcon";
import { Widget } from "@/components/widgets/Widget";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useEffect, useRef } from "react";
import { useBreakpoint } from "@/hooks";

export default function SettingWidget({ type = "select", iconName, title, defaultValue, handleClick }) {
  // const {isMobileS} = useBreakpoint();
  const inputRef = useRef(null);
  useEffect(() => {
    function selectInput() {
      inputRef.current.select();
    }

    if (inputRef.current) {
      inputRef.current.addEventListener("focus", selectInput);
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("focus", selectInput);
      }
    }
  }, []);

  const isInput = type === "input";

  return (
    <Widget className="py-5 px-4 flex items-center gap-3 text-gray-dark">
      <SvgIcon iconName={iconName} className="size-6 fill-current" />
      <span className="text-xs font-bold">{capitalize(title)}</span>

      {isInput ? (
        <Input
          inputRef={inputRef}
          size="l"
          variant="outline"
          type="text"
          defaultValue={defaultValue}
          className="ml-auto w-full max-w-44 text-right font-semibold"
        />
      ) : (
        <Button colorPalette="secondaryLight" className="ml-auto flex items-center gap-3 border-0 bg-gray-light" onClick={handleClick}>
          <span>{defaultValue}</span>
          <span>{">"}</span>
        </Button>
      )
      }
    </Widget>
  )
}