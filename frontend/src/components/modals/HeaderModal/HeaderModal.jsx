import cn from "classnames";
import { useEffect, useRef } from "react";

import { useAutoFocus, useModal, useSelectInput } from "@/hooks";

import { Form } from "@/components/Form";
import { FieldContainer } from "./components/FieldContainer";
import { Field } from "./components/Field";
import { SvgIcon } from "@/components/SvgIcon";
import { ModalWrapper } from "../ModalWrapper";
import { DeletionConfirmationModal } from "../DeletionConfirmationModal";
import { useFetcher } from "react-router";

export default function HeaderModal({ entity, formProps, header, fields, color }) {
  const headerInputRef = useRef(null);

  useAutoFocus({ ref: headerInputRef, selectOnFocus: true });
  useSelectInput(headerInputRef);

  const headerConfig = { type: "simple", deleteEntityFetcher: null, ...header };
  const isHeaderSimple = headerConfig.type === "simple";

  const { deleteEntityFetcher } = headerConfig;
  const isDeleteBtn = !!deleteEntityFetcher;

  const {
    modalState: [isDeleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = [],
    hasTransitioned: hasDeleteConfirmationModalTransitioned,
    modalRef: deleteConfirmationModalRef
  } = isDeleteBtn ? useModal({ isBlocking: false, fetcher: deleteEntityFetcher }) : {};

  const itemFields = fields.map((field, index) => (
    <FieldContainer
      key={index}
      field={{
        Component: Field,
        props: {
          name: field.name,
          ...field.props,
          selectBtnProps: field.props.type !== "input" ? { ...field.props.selectBtnProps, colorPalette: "secondaryDark" } : null
        }
      }}
      modal={field.modal}
    />
  ))

  const isUsingKeyboard = document.body.classList.contains("using-keyboard");

  const classes = {
    headerInput: cn(
      "w-full px-3 py-2 bg-transparent rounded border-none focus:outline-none",
      isHeaderSimple
        ? cn(
          "text-2xl text-gray-light rounded",
          // isDeleteBtn && "w-4/5"
        )
        : "rounded-md",
      isUsingKeyboard && "focus:ring focus:ring-goldenrod"
    )
  }

  return (
    <>
      <Form
        {...formProps}
        btn={{
          ...formProps.btn,
          props: { ...formProps.btn.props, className: "mt-12 ll:py-4 self-center focus:ring-4" }
        }}
        className="relative w-full h-full flex flex-col rounded-t-lg ml:rounded-lg bg-gray-light"
      >
        <header
          className="py-10 px-4 tab:px-6 flex items-end gap-4 rounded-t-lg font-semibold tracking-wide shadow transition-colors"
          style={{ backgroundColor: color }}
        >
          {isHeaderSimple ?
            isDeleteBtn ? (
              <div className="flex items-center gap-6">
                <input
                  ref={headerInputRef}
                  required
                  {...header?.input.props}
                  className={classes.headerInput}
                />

                <button
                  type="button"
                  onClick={() => setDeleteConfirmationModalOpen(true)}
                  className="ml-auto flex justify-center items-center gap-6 size-10 min-w-10 rounded-md bg-gray-light focus-goldenrod"
                >
                  <SvgIcon iconName="trash-can" className="size-6 fill-red-dark" />
                </button>

                {(isDeleteConfirmationModalOpen || hasDeleteConfirmationModalTransitioned) &&
                  <ModalWrapper
                    type={{
                      layout: "nested"
                    }}
                    isModalOpen={isDeleteConfirmationModalOpen}
                    hasTransitioned={hasDeleteConfirmationModalTransitioned}
                    ref={deleteConfirmationModalRef}
                    minHeight="h-3/4"
                  >
                    <DeletionConfirmationModal
                      entity={entity}
                      // fetcher={deleteEntityFetcher}
                      // action={formProps.action}
                      closeModal={() => setDeleteConfirmationModalOpen(false)}
                    />
                  </ModalWrapper>
                }
              </div>
            ) : (
              <input
                ref={headerInputRef}
                required
                {...header?.input.props}
                className={classes.headerInput}
              />

            ) : header.customInput ?
              isDeleteBtn ? (
                <div className="flex items-center gap-6">
                  <header.customInput.Component {...header.customInput.props} />

                  <button
                    type="button"
                    onClick={() => setDeleteConfirmationModalOpen(true)}
                    className="ml-auto flex justify-center items-center gap-6 size-10 min-w-10 rounded-md bg-gray-light focus-goldenrod"
                  >
                    <SvgIcon iconName="trash-can" className="size-6 fill-red-dark" />
                  </button>

                  {(isDeleteConfirmationModalOpen || hasDeleteConfirmationModalTransitioned) &&
                    <ModalWrapper
                      type={{
                        layout: "nested"
                      }}
                      isModalOpen={isDeleteConfirmationModalOpen}
                      hasTransitioned={hasDeleteConfirmationModalTransitioned}
                      ref={deleteConfirmationModalRef}
                      minHeight="h-3/4"
                    >
                      <DeletionConfirmationModal
                        entity={entity}
                        // fetcher={deleteEntityFetcher}
                        // action={formProps.action}
                        closeModal={() => setDeleteConfirmationModalOpen(false)}
                      />
                    </ModalWrapper>
                  }
                </div>
              ) : (
                <header.customInput.Component {...header.customInput.props} />
              ) : (
                <>
                  <label
                    htmlFor={`header-modal-input-${header?.input?.id}`}
                    className="text-gray-light text-2xl"
                  >
                    {header.labelText}
                  </label>

                  <input
                    ref={headerInputRef}
                    value={header?.input?.value}
                    onChange={header?.input?.handleChange}
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
        </div>
      </Form>
    </>
  )
}