import { useRef } from "react";

import { useSelectInput } from "@/hooks";
import { capitalizeEveryWord } from "@/utils/str";

import { SvgIcon } from "@/components/SvgIcon";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";

// UI for the form field
// controlProps refer to either input/selectBtn, depending on what is the type
export default function FormField({ type = "select", name, iconName, displayValue, controlProps = {}, customComponent = {} }) {
  const isInput = type === "input";

  const inputRef = isInput ? useRef(null) : null;
  isInput && useSelectInput(inputRef);

  return (
    <div className="flex items-center gap-4 pb-7 border-b border-opacity-50 border-gray-dark">
      <SvgIcon iconName={iconName} className="size-6 min-w-6 fill-gray-dark" />
      <span className="text-sm font-bold text-gray-dark">{capitalizeEveryWord(name)}</span>

      {isInput ? (
        <Input
          inputRef={inputRef}
          size="l"
          variant="outline"
          required
          value={displayValue}
          {...controlProps}
          className="ml-auto w-full max-w-44 text-right font-semibold"
        />
      ) : type === "custom" ? (
        <customComponent.Component {...customComponent.props} />
      ) : type === "customBtn" ? (
        <customComponent.Component {...customComponent.props} {...controlProps} />
      ) : (
        <Select
          btnProps={{
            ...controlProps,
            className: "ml-auto border-0 bg-gray-light",
          }}
          value={displayValue}
        />
      )}
    </div>
  )
}