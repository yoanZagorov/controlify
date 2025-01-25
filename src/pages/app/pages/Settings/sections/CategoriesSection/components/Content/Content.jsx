import { Section } from "@/components/sections/Section";
import { CategoriesTypeToggleSwitch } from "@/components/toggle-switches/CategoriesTypeToggleSwitch";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { getCategoriesByType } from "@/utils/category";
import { useState } from "react";
import { useFetcher, useRouteLoaderData } from "react-router";
import { CategoryItem } from "../CategoryItem";
import { Button } from "@/components/Button";
import { CategoryProvider } from "@/contexts";
import { formatEntityName } from "@/utils/formatting";

export default function Content({ openModal, className }) {
  const fetcher = useFetcher({ key: "updateCategory" });

  const { userData: { categories } } = useRouteLoaderData("app");

  const [activeOption, setActiveOption] = useState("expense");
  const isExpenseCategories = activeOption === "expense";

  const { expenseCategories, incomeCategories } = getCategoriesByType(categories);

  function renderCategoriesEls(categories) {
    return categories.map((category) =>
      <CategoryProvider
        key={category.id}
        prepopulatedCategoryData={{
          ...category,
          name: formatEntityName(category.name)
        }}
        type={category.type}
      >
        <CategoryItem
          fetcher={fetcher}
          action={"/app/settings"}
          category={category}
        />
      </CategoryProvider>
    );
  }

  const expenseCategoriesEls = renderCategoriesEls(expenseCategories);
  const incomeCategoriesEls = renderCategoriesEls(incomeCategories);


  return (
    <Section
      title="Categories"
      className={className}
    >
      <ContentWidget
        iconName="categories"
        title="all"
        content={{
          hasBackground: false,
          className: "mt-4 flex flex-col"
        }}
      >
        <CategoriesTypeToggleSwitch
          activeOption={activeOption}
          handleToggle={() => setActiveOption(prev => prev === "expense" ? "income" : "expense")}
        />

        <div className="mt-6 flex flex-col gap-4">
          {isExpenseCategories
            ? expenseCategoriesEls
            : incomeCategoriesEls
          }
        </div>

        <Button size="l" className="mt-8 mx-auto" onClick={openModal}>
          add category
        </Button>
      </ContentWidget>
    </Section>
  )
}