import { useRef } from "react";

import { useSelectInput } from "@/hooks";
import { capitalizeEveryWord } from "@/utils/str";

import { SvgIcon } from "@/components/SvgIcon";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";

export default function FieldContainer({ type = "select", name, iconName, displayValue, inputProps = {}, selectBtnProps = null }) {
  const inputPropsConfig = { type: "text", ...inputProps };

  const isInput = type === "input";
  const inputRef = isInput ? useRef(null) : null;
  isInput && useSelectInput(inputRef);

  return (
    <div className="flex items-center gap-4 pb-7 border-b border-opacity-50 border-gray-dark">
      <SvgIcon iconName={iconName} className="size-6 min-w-6 min-h-6 fill-gray-dark" />
      <span className="text-sm font-bold text-gray-dark">{capitalizeEveryWord(name)}</span>

      {isInput ? (
        <Input
          inputRef={inputRef}
          size="l"
          variant="outline"
          required
          value={displayValue}
          {...inputPropsConfig}
          className="ml-auto w-full max-w-44 text-right font-semibold"
        />
      ) : (
        <Select
          btnProps={{
            ...selectBtnProps,
            className: "ml-auto border-0 bg-gray-light",
          }}
          value={displayValue}
        />
      )}
    </div>
  )
}