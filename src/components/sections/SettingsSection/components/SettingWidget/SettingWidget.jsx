import { useEffect, useRef } from "react";

import { capitalize } from "@/utils/str";

import { SvgIcon } from "@/components/SvgIcon";
import { Widget } from "@/components/widgets/Widget";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { useSelectInput } from "@/hooks";

export default function SettingWidget({ type = "select", name, iconName, displayValue, inputProps = {}, selectBtnProps = null }) {
  const inputPropsConfig = { type: "text", ...inputProps };

  const isInput = type === "input";
  const inputRef = isInput ? useRef(null) : null;
  isInput && useSelectInput(inputRef);

  return (
    <Widget className="flex items-center gap-3 text-gray-dark">
      <SvgIcon iconName={iconName} className="size-6 fill-current" />
      <span className="text-xs font-bold">{capitalize(name)}</span>

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
      )
      }
    </Widget>
  )
}