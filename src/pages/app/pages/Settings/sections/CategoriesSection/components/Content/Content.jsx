import { Section } from "@/components/sections/Section";
import { CategoriesTypeToggleSwitch } from "@/components/toggle-switches/CategoriesTypeToggleSwitch";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { getCategoriesByType } from "@/utils/category";
import { useState } from "react";
import { useRouteLoaderData } from "react-router";
import { CategoryItem } from "../CategoryItem";
import { Button } from "@/components/Button";

export default function Content({ className, openModal }) {
  const { userData: { categories } } = useRouteLoaderData("app");

  const [activeOption, setActiveOption] = useState("expense");
  const isExpenseCategories = activeOption === "expense";

  const { expenseCategories, incomeCategories } = getCategoriesByType(categories);

  const expenseCategoriesEls = expenseCategories.map((category) =>
    <CategoryItem key={category.id} {...category} handleClick={() => console.log("Expense CategoryItem clicked!")} />
  );

  const incomeCategoriesEls = incomeCategories.map((category) =>
    <CategoryItem key={category.id} {...category} handleClick={() => console.log("Income CategoryItem clicked!")} />
  )

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