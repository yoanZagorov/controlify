import { useFetcher } from "react-router";
import cn from "classnames";

import { ROUTES } from "#constants";

import { useCategory, useLayout, useModal } from "#hooks";

import { CategoryContainer } from "./components/CategoryContainer";
import { CategoriesContent } from "./components/CategoriesContent";

// The Categories section for the Settings page
// To do: Move this to a separate route
export default function CategoriesSection({ className }) {
  const { isSingleColLayout } = useLayout();

  const { categoryData: { iconName }, resetCategoryData } = useCategory();

  const fetcher = useFetcher({ key: "addCategory" });

  const modal = useModal({ fetcher, resetModalData: resetCategoryData });
  const { modalState: [isModalOpen, setModalOpen] } = modal;

  return (
    <CategoryContainer
      formProps={{ fetcher, action: ROUTES.SETTINGS }}
      submitBtn={{
        text: "add category",
        props: {
          value: "addCategory",
          disabled: !iconName || fetcher.state === "submitting" || fetcher.state === "loading"
        }
      }}
      modal={modal}
    >
      <CategoriesContent
        openModal={() => setModalOpen(true)}
        type={isSingleColLayout ? "compact" : "expanded"}
        className={cn("mt-12", className)}
      />
    </CategoryContainer>
  )
}