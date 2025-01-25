import { CategoryContainer } from "@/components/containers/CategoryContainer";
import { SvgIcon } from "@/components/SvgIcon";
import { useCategory, useModal } from "@/hooks";
import { formatEntityName } from "@/utils/formatting";
import { useEffect, useState } from "react";

export default function CategoryItem({ fetcher, action, category: { iconName, name, color } }) {
  const { categoryData, defaultCategoryData, resetCategoryData } = useCategory();
  const modal = useModal({ fetcher });

  const { modalState: [isModalOpen, setModalOpen] } = modal;

  const [hasCategoryDataChanged, setHasCategoryDataChanged] = useState(JSON.stringify(categoryData) === JSON.stringify(defaultCategoryData))

  // To do: Create a more sophisticated function to compare complex data types
  useEffect(() => {
    if (JSON.stringify(categoryData) === JSON.stringify(defaultCategoryData)) {
      setHasCategoryDataChanged(false);
    } else {
      setHasCategoryDataChanged(true);
    }
  }, [categoryData]);

  return (
    <CategoryContainer
      fetcher={fetcher}
      modal={modal}
      action={action}
      submitBtn={{
        text: "update category",
        props: {
          value: "updateCategory",
          disabled: !hasCategoryDataChanged
        }
      }}
    >
      <button className="p-3 flex items-center gap-4 rounded-lg bg-gray-light" onClick={() => setModalOpen(true)}>
        <div className="flex justify-center items-center size-8 rounded-full" style={{ backgroundColor: color }}>
          <SvgIcon iconName={iconName} className="size-1/2 fill-gray-light" />
        </div>

        <span className="text-sm text-gray-dark font-semibold">
          {formatEntityName(name)}
        </span>

        <SvgIcon iconName="pen" className="ml-auto size-4 fill--gray-dark" />
      </button>
    </CategoryContainer>
  )
}