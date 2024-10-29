import { SelectModal } from "@/components/SelectModal";
import { SvgIcon } from "@/components/SvgIcon";
import { capitalize } from "@/utils/generic";
import { useState } from "react";

export default function TransactionFormField({ iconName, name, defaultOption }) {
  const [isSelectModalOpen, setSelectModalOpen] = useState(false);

  return (
    <div className="flex items-center gap-4 pb-7 border-b border-navy border-opacity-50">
      <SvgIcon iconName={iconName} className="w-8 h-8 fill-navy" />
      <span className="text-navy font-semibold">{capitalize(name)}</span>

      <button
        type="button"
        onClick={() => setSelectModalOpen(wasOpen => !wasOpen)}
        className="ml-auto w-24 flex justify-between items-center bg-gray-medium border px-2 py-1 font-bold rounded"
      >
        <span>{capitalize(defaultOption)}</span>
        <span>{">"}</span>
      </button>

      {isSelectModalOpen &&
        <SelectModal
          name={name}
          closeModal={() => setSelectModalOpen(false)}
          defaultOption={defaultOption}
        />
      }
    </div>
  )
}