import { Button } from "@/components/Button";
import { Section } from "@/components/sections/Section";
import { SvgIcon } from "@/components/SvgIcon";
import { CategoriesTypeToggleSwitch } from "@/components/toggle-switches/CategoriesTypeToggleSwitch";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { getCategoriesByType } from "@/utils/category";
import { formatEntityName } from "@/utils/formatting";
import { capitalize } from "@/utils/str";
import { useState } from "react";
import { useRouteLoaderData } from "react-router";
import { CategoryItem } from "./components/CategoryItem";

export default function CategoriesSection({ className }) {
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

        <Button size="l" className="mt-8 mx-auto">
          add category
        </Button>
      </ContentWidget>
    </Section>
  )
}