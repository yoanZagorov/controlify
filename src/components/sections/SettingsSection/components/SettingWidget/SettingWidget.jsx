import { capitalize } from "@/utils/str";

import { SvgIcon } from "@/components/SvgIcon";
import { Widget } from "@/components/widgets/Widget";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useEffect, useRef } from "react";
import { useBreakpoint } from "@/hooks";
import { Select } from "@/components/Select";

export default function SettingWidget({ name, type = "select", iconName, valueData, handleClick }) {
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
    <Widget className="flex items-center gap-3 text-gray-dark">
      <SvgIcon iconName={iconName} className="size-6 fill-current" />
      <span className="text-xs font-bold">{capitalize(name)}</span>

      {isInput ? (
        <Input
          inputRef={inputRef}
          size="l"
          variant="outline"
          type="text"
          defaultValue={valueData.displayValue}
          name={name}
          className="ml-auto w-full max-w-44 text-right font-semibold"
        />
      ) : (
        <>
          <input type="hidden" name={name} value={valueData.value} />
          <Select
            btnProps={{
              colorPalette: "secondaryLight",
              className: "ml-auto border-0 bg-gray-light",
              onClick: handleClick
            }}
            value={valueData.displayValue}
          />
        </>
      )
      }
    </Widget>
  )
}