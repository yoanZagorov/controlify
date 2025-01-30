import { useEffect, useRef } from "react";

import { capitalizeEveryWord } from "@/utils/str";

import { SvgIcon } from "@/components/SvgIcon";
import { Widget } from "@/components/widgets/Widget";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { useSelectInput } from "@/hooks";
import cn from "classnames";

export default function SettingWidget({ type = "select", name, iconName, displayValue, inputProps = {}, selectBtnProps = null, customType = {} }) {
  const isInput = type === "input";
  const isCustom = type === "custom";

  const inputPropsConfig = { type: "text", size: "l", ...inputProps };

  const inputRef = isInput ? useRef(null) : null;
  isInput && useSelectInput(inputRef);

  return (
    <Widget className="flex items-center gap-3 text-gray-dark">
      <SvgIcon iconName={iconName} className="size-6 min-w-6 max-w-6 fill-current" />
      <span className="text-xs font-bold">{capitalizeEveryWord(name)}</span>

      {isInput ? (
        <Input
          inputRef={inputRef}
          variant="outline"
          required
          value={displayValue}
          {...inputPropsConfig}
          className="ml-auto max-w-44 ml:max-w-48 tab:max-w-56 text-right font-semibold"
        />
      ) : isCustom ? (
        <customType.Component {...customType.props} />
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