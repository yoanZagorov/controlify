import { useRef } from 'react'

import { useSelectInput } from '#/hooks'
import { capitalizeEveryWord } from '#/utils/str'

import { SvgIcon } from '#/components/SvgIcon'
import { Widget } from '#/components/widgets/Widget'
import { Input } from '#/components/Input'
import { Select } from '#/components/Select'

// UI for the form field
// controlProps refer to either input/selectBtn, depending on the type
export default function SettingWidgetFormField({
  type = 'select',
  name,
  iconName,
  displayValue,
  controlProps = {},
  customComponent = {},
}) {
  const isInput = type === 'input'
  const inputRef = isInput ? useRef(null) : null
  isInput && useSelectInput(inputRef)

  return (
    <Widget className="flex items-center gap-3 text-gray-dark">
      <SvgIcon iconName={iconName} className="size-6 min-w-6 fill-current" />
      <span className="text-xs font-bold">{capitalizeEveryWord(name)}</span>

      {isInput ? (
        <Input
          inputRef={inputRef}
          size="l"
          variant="outline"
          required
          value={displayValue}
          {...controlProps}
          className="ml-auto w-2/3 ml:w-1/2 text-right font-semibold"
        />
      ) : type === 'custom' ? (
        <customComponent.Component {...customComponent.props} />
      ) : (
        <Select
          btnProps={{
            ...controlProps,
            className: 'ml-auto border-0 bg-gray-light',
            'data-actionable': true,
          }}
          value={displayValue}
        />
      )}
    </Widget>
  )
}
