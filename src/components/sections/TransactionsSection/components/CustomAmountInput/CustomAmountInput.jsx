import { useRef } from "react";
import cn from "classnames"
import { useAutoFocus, useModal } from "@/hooks";
import { SvgIcon } from "@/components/SvgIcon";
import { ModalWrapper } from "@/components/modals/ModalWrapper";
import { DeletionConfirmationModal } from "@/components/modals/DeletionConfirmationModal";

export default function CustomAmountInput({ value, handleChange, isExpense, currency, isDeleteBtn = false }) {
  const {
    modalState: [isDeleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = [],
    hasTransitioned: hasDeleteConfirmationModalTransitioned,
    modalRef: deleteConfirmationModalRef
  } = isDeleteBtn ? useModal({}) : {};

  const amountInputRef = useRef(null);
  useAutoFocus({ ref: amountInputRef });

  const isUsingKeyboard = document.body.classList.contains("using-keyboard");

  const classes = {
    amountValue: cn(
      "flex gap-2 items-end mm:text-lg",
      isExpense ? "text-red-light" : "text-green-light"
    ),
    amountInput: cn(
      "rounded bg-navy focus:outline-none transition-[box-shadow]",
      isDeleteBtn ? "w-[60%]" : "w-full",
      isUsingKeyboard && "focus:ring focus:ring-goldenrod"
    )
  }

  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="transactionAmount"
        className="text-gray-light text-2xl"
      >
        Amount:
      </label>

      <span
        className={classes.amountValue}
      >
        <span className="text-nowrap">{isExpense ? "-" : "+"}{currency}</span>
        <input
          ref={amountInputRef}
          required
          type="number"
          step={0.01}
          id="transactionAmount"
          min={1}
          onChange={handleChange}
          value={value}
          className={classes.amountInput}
        />
      </span>

      {isDeleteBtn &&
        <>
          <button type="button" className="ml-auto size-6" onClick={() => setDeleteConfirmationModalOpen(true)}>
            <SvgIcon iconName="trash-can" className="size-full fill-red-light" />
          </button>

          {(isDeleteConfirmationModalOpen || hasDeleteConfirmationModalTransitioned) &&
            <ModalWrapper
              type={{
                layout: "nested",
              }}
              isModalOpen={isDeleteConfirmationModalOpen}
              hasTransitioned={hasDeleteConfirmationModalTransitioned}
              ref={deleteConfirmationModalRef}
              minHeight="h-[75%]"
            >
              <DeletionConfirmationModal
                entity="transaction"
                closeModal={() => setDeleteConfirmationModalOpen(false)}
              />
            </ModalWrapper>
          }
        </>
      }
    </div>
  )
}