import { useFetcher, useRouteLoaderData } from "react-router";
import { useCategory, useLayout, useModal } from "@/hooks";
import cn from "classnames";
import { CategoryContainer } from "./components/CategoryContainer";
import { ROUTES } from "@/constants";
import { CategoriesContent } from "./components/CategoriesContent";

export default function CategoriesSection({ className }) {
  const { isSingleColLayout } = useLayout();

  const { categoryData: { iconName }, resetCategoryData } = useCategory();

  const fetcher = useFetcher({ key: "addCategory" });

  const modal = useModal({ fetcher, resetModalData: resetCategoryData });
  const { modalState: [isModalOpen, setModalOpen] } = modal;

  return (
    <CategoryContainer
      formProps={{
        fetcher,
        action: ROUTES.SETTINGS,
      }}
      submitBtn={{
        props: {
          value: "addCategory",
          disabled: !iconName
        },
        text: "add category"
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