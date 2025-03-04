import cn from "classnames";
import { useRef } from "react";

import { useAutoFocus } from "@/hooks";

import { isObjTruthy } from "@/utils/obj";

import { Form } from "@/components/Form";
import { DeleteEntityHandlerContainer } from "@/components/containers/DeleteEntityHandlerContrainer";
import { Button } from "@/components/Button";

import { FormField } from "./components/FormField";
import { DeleteEntityBtn } from "./components/DeleteEntityBtn";
import { FormFieldContainer } from "./components/FormFieldContainer";

// A big modal component, used primaraly to house entire forms
export default function HeaderModal({ entity, formProps, submitBtn, header, parentModalRef, fields, color }) {
  const headerConfig = { type: "simple", deleteEntityFetcher: {}, autoFocus: false, ...header };

  const headerInputRef = useRef(null);
  headerConfig.autoFocus && useAutoFocus({ ref: headerInputRef, selectOnFocus: true });

  const isHeaderSimple = headerConfig.type === "simple";

  const { deleteEntityFetcher } = headerConfig;
  const isDeleteEntity = isObjTruthy(deleteEntityFetcher);

  const itemFields = fields.map((field, index) => {
    return field.modal ? (
      <FormFieldContainer
        key={index}
        field={{
          Component: FormField,
          props: {
            name: field.name,
            ...field.props,
            controlProps: { ...field.props.controlProps, colorPalette: "secondaryDark" }
          }
        }}
        modal={field.modal}
        parentModalRef={parentModalRef}
      />
    ) : (
      <FormField key={index} name={field.name} {...field.props} />
    )
  })

  const headerInputProps = isHeaderSimple
    ? {
      ref: headerInputRef,
      required: true,
      ...header.inputProps,
      className: cn(
        "w-full px-3 py-2 bg-transparent rounded text-2xl text-gray-light focus-goldenrod",
        header?.inputProps.className
      )
    } : {};

  const deleteEntityHandlerContainerProps = {
    modalType: "nested",
    entity,
    deleteEntityFetcher,
    deleteBtnComponent: {
      Component: DeleteEntityBtn
    },
    parentModalRef,
    isDeleteConfirmationBtnDisabled: formProps.fetcher.state === "submitting" || formProps.fetcher.state === "loading",
  }

  return (
    <>
      <Form
        {...formProps}
        btn={{ isBtn: false }}
        className="flex-1 relative h-full flex flex-col rounded-t-lg ml:rounded-lg"
      >
        <header
          className="py-10 px-4 tab:px-6 flex items-end gap-4 rounded-t-lg font-semibold tracking-wide shadow transition-colors"
          style={{ backgroundColor: color }}
        >
          {isHeaderSimple ?
            isDeleteEntity ? (
              <div className="flex items-center gap-6">
                <input {...headerInputProps} />
                <DeleteEntityHandlerContainer {...deleteEntityHandlerContainerProps} />
              </div>
            ) : (
              <input {...headerInputProps} />
            ) : isDeleteEntity ? (
              <div className="flex items-center gap-6">
                {header.CustomComponent}
                <DeleteEntityHandlerContainer {...deleteEntityHandlerContainerProps} />
              </div>
            ) : header.CustomComponent
          }
        </header >

        <div className="flex-1 pt-16 px-4 tab:px-6 pb-4 flex flex-col gap-12 ml:rounded-b-lg bg-gray-light overflow-auto"> {/* Handling the overflow here so the header can look fixed */}
          <div className="flex flex-col gap-8">
            {itemFields}
          </div>
          <Button size="l" {...submitBtn.props} type="submit" name="intent" className={cn("ll:py-4 self-center focus:ring-4", submitBtn.props?.className)}>
            {submitBtn.text}
          </Button>
        </div>
      </Form>
    </>
  )
}