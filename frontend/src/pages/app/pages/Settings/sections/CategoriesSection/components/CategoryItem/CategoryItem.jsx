import { Button } from "@/components/Button";
import { CategoryContainer } from "@/components/containers/CategoryContainer";
import { Form } from "@/components/Form";
import { DeletionConfirmationModal } from "@/components/modals/DeletionConfirmationModal";
import { ModalWrapper } from "@/components/modals/ModalWrapper";
import { SvgIcon } from "@/components/SvgIcon";
import { useCategory, useLayout, useModal } from "@/hooks";
import { formatEntityNameForUI } from "@/utils/formatting";
import cn from "classnames";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";

export default function CategoryItem({ isExpanded, action, category: { id, iconName, name, color } }) {
  const { categoryData, defaultCategoryData, resetCategoryData } = useCategory();

  const updateCategoryFetcher = useFetcher({ key: "updateCategory" });
  const modal = useModal({ fetcher: updateCategoryFetcher });

  const deleteCategoryFetcher = useFetcher({ key: "deleteCategory" });
  const {
    modalState: [isDeletionConfirmationModalOpen, setDeletionConfirmationModalOpen] = [],
    hasTransitioned: hasDeletionConfirmationModalTransitioned,
    modalRef: deletionConfirmationModalRef
  } = useModal({ fetcher: deleteCategoryFetcher });

  const { modalState: [isModalOpen, setModalOpen] } = modal;

  const [hasCategoryDataChanged, setHasCategoryDataChanged] = useState(JSON.stringify(categoryData) === JSON.stringify(defaultCategoryData));

  // To do: Create a more sophisticated function to compare complex data types
  useEffect(() => {
    if (JSON.stringify(categoryData) === JSON.stringify(defaultCategoryData)) {
      setHasCategoryDataChanged(false);
    } else {
      setHasCategoryDataChanged(true);
    }
  }, [categoryData]);

  return (
    <>
      <CategoryContainer
        fetcher={updateCategoryFetcher}
        modal={modal}
        action={action}
        submitBtn={{
          text: "update category",
          props: {
            value: "updateCategory",
            disabled: !hasCategoryDataChanged
          }
        }}
        isDeleteBtn={true}
      >
        <div className="p-3 flex items-center gap-4 rounded-lg bg-gray-light" >
          <button
            onClick={() => setModalOpen(true)}
            className={cn(
              "relative flex justify-center items-center size-12 rounded-full focus-gray-dark",
              isExpanded ? "size-12" : "size-10"
            )}
            style={{ backgroundColor: color }}
          >
            <SvgIcon iconName={iconName} className="size-1/2 fill-gray-light" />

            {!isExpanded &&
              <div className="absolute -bottom-1.5 -right-1.5 flex justify-center items-center size-5 rounded-full bg-gray-medium">
                <SvgIcon iconName="pen" className="size-3 fill-gray-dark" />
              </div>
            }
          </button>

          <span className={cn("text-gray-dark font-semibold", isExpanded ? "text-base" : "text-sm")}>
            {formatEntityNameForUI(name)}
          </span>

          {isExpanded ? (
            <div className="ml-auto flex justify-center items-center gap-6">
              <Button
                colorPalette="secondaryDark"
                onClick={() => setModalOpen(true)}
              >
                Edit
              </Button>
              <Button
                colorPalette="dangerSecondary"
                onClick={() => setDeletionConfirmationModalOpen(true)}
              >
                {/* <SvgIcon iconName="trash-can" className="size-3 fill-red-dark" /> */}
                <span>Delete</span>
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setDeletionConfirmationModalOpen(true)}
              className="ml-auto flex justify-center items-center focus-goldenrod"
            >
              <SvgIcon iconName="trash-can" className="size-5 fill-red-dark" />
            </button>
          )}

        </div>
      </CategoryContainer >

      {(isDeletionConfirmationModalOpen || hasDeletionConfirmationModalTransitioned) &&
        <Form
          action={action}
          fetcher={deleteCategoryFetcher}
          className="absolute"
          fields={[{
            name: "id",
            value: id
          }]}
        >
          <ModalWrapper
            isModalOpen={isDeletionConfirmationModalOpen}
            hasTransitioned={hasDeletionConfirmationModalTransitioned}
            ref={deletionConfirmationModalRef}
            minHeight="h-[27.5%]"
          >
            <DeletionConfirmationModal
              entity="category"
              closeModal={() => setDeletionConfirmationModalOpen(false)}
            />
          </ModalWrapper>
        </Form>
      }
    </>
  )
}