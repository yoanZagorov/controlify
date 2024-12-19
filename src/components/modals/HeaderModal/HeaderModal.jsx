import { Button } from "@/components/Button";
import cn from "classnames";
import { ItemField } from "./components/ItemField";
import { useAutoFocus, useSelectInput } from "@/hooks";
import { useRef } from "react";

export default function HeaderModal({ header, items, btn, color }) {
  const headerInputRef = useRef(null);

  useAutoFocus({ ref: headerInputRef, selectOnFocus: true });
  useSelectInput(headerInputRef);

  const headerConfig = { type: "simple", ...header };
  const isHeaderSimple = headerConfig.type === "simple";

  const itemFields = items.map((item, index) => (
    <ItemField
      key={index}
      {...item}
      color={color}
      selectBtnProps={item.type === "select" ? { colorPalette: "secondaryDark" } : null}
    />
  ))

  const isUsingKeyboard = document.body.classList.contains("using-keyboard");

  const classes = {
    header: cn(
      "py-10 px-4 tab:px-6 flex items-end gap-4 rounded-t-lg font-semibold tracking-wide shadow",
    ),
    headerInput: cn(
      "w-full px-3 py-2 bg-transparent rounded border-none focus:outline-none",
      isHeaderSimple ? "text-2xl text-gray-light rounded" : "rounded-md",
      isUsingKeyboard && "focus:ring focus:ring-goldenrod"
    )
  }

  return (
    <div className="relative w-full h-full rounded-t-lg ml:rounded-lg bg-gray-light">
      <header className={classes.header} style={{ backgroundColor: color }}>
        {isHeaderSimple ? (
          <input
            ref={headerInputRef}
            value={header.content?.input?.value}
            onChange={header.content?.input?.handleChange}
            className={classes.headerInput}
          />
        ) : header.content.customInput ?
          header.content.customInput
          : (
            <>
              <label
                htmlFor={`header-modal-input-${header.content?.input?.id}`}
                className="text-gray-light text-2xl"
              >
                {header.content.labelText}
              </label>

              <input
                ref={headerInputRef}
                value={header.content?.input?.value}
                onChange={header.content?.input?.handleChange}
                className={classes.headerInput}
              />
            </>
          )
        }
      </header >

      <div className="mt-16 px-4 pb-4 tab:px-6 flex flex-col">
        <div className="flex flex-col gap-8">
          {itemFields}
        </div>

        <Button
          type="submit"
          size="l"
          disabled={btn.disabled}
          name="intent"
          value={btn.value}
          className="mt-12 ll:py-4 mm:self-center focus:ring-4"
        >
          {btn.text}
        </Button>
      </div>
    </div >
  )
}