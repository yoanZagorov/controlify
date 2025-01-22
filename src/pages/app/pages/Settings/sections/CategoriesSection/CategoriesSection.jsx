import { Button } from "@/components/Button";
import { Section } from "@/components/sections/Section";
import { SvgIcon } from "@/components/SvgIcon";
import { CategoriesTypeToggleSwitch } from "@/components/toggle-switches/CategoriesTypeToggleSwitch";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { getCategoriesByType } from "@/utils/category";
import { formatEntityName } from "@/utils/formatting";
import { capitalize } from "@/utils/str";
import { useState } from "react";
import { useFetcher, useRouteLoaderData } from "react-router";
import { CategoryItem } from "./components/CategoryItem";
import { Content } from "./components/Content";
import { useCategory, useModal } from "@/hooks";
import { CategoryTypeModal } from "@/components/modals/CategoryTypeModal";
import { IconModal } from "@/components/modals/IconModal";
import { ColorModal } from "@/components/modals/ColorModal";
import { ModalWrapper } from "@/components/modals/ModalWrapper";
import { HeaderModal } from "@/components/modals/HeaderModal";
import cn from "classnames";

export default function CategoriesSection({ className }) {
  const fetcher = useFetcher({ key: "addCategory" });

  const {
    modalState: [isModalOpen, setModalOpen],
    hasTransitioned,
    modalRef
  } = useModal({ fetcher });

  const {
    categoryData: {
      name,
      type,
      icon,
      color
    },
    updateCategoryData
  } = useCategory();

  const categoryDataConfig = [
    {
      formData: {
        name: "name",
        value: name
      },
    },
    {
      formData: {
        name: "type",
        value: type
      },
      field: {
        name: "type",
        props: {
          iconName: "stats",
          type: "select",
          displayValue: capitalize(type),
        },
        modal: {
          innerModal: {
            Component: CategoryTypeModal,
          },
          state: {
            value: type,
            updateState: (newType) => updateCategoryData({ type: newType })
          }
        }
      }
    },
    {
      formData: {
        name: "icon",
        value: icon || ""
      },
      field: {
        name: "icon",
        props: {
          iconName: "categories",
          type: "select",
          displayValue: icon ? (
            <div className="size-6 rounded-full" style={{ backgroundColor: color }}>
              <SvgIcon iconName={icon} className="size-1/2 fill-gray-light" />
            </div>
          ) : "Choose"
        },
        modal: {
          innerModal: {
            Component: IconModal,
            // props: categoryIconNames // To do
          },
          state: {
            value: icon,
            updateState: (newIcon) => updateCategoryData({ icon: newIcon })
          }
        }
      }
    },
    {
      formData: {
        name: "color",
        value: color
      },
      field: {
        name: "color",
        props: {
          iconName: "paint-roller",
          type: "select",
          displayValue: <div className="size-6 rounded-full" style={{ backgroundColor: color }}></div>,
        },
        modal: {
          innerModal: {
            Component: ColorModal,
            // props: { colors: categoriesColors },
          },
          state: {
            value: color,
            updateState: (newColorCode) => updateCategoryData({ color: newColorCode })
          }
        }
      }
    },
  ]
  return (
    <div className={cn(className)}>
      <Content openModal={() => setModalOpen(true)} className="mt-12" />

      {(isModalOpen || hasTransitioned) &&
        <ModalWrapper
          isModalOpen={isModalOpen}
          hasTransitioned={hasTransitioned}
          ref={modalRef}
          minHeight="h-[90%]"
        >
          <HeaderModal
            formProps={{
              fetcher,
              action: "/app/settings",
              fields: categoryDataConfig.map(option => option.formData),
              btn: {
                text: "add category",
                props: {
                  value: "addCategory"
                }
              }
            }}
            header={{
              input: {
                props: {
                  value: name,
                  onChange: (e) => updateCategoryData({ name: e.target.value }), // To do: more robust checks
                  min: 2,
                  max: 50
                }
              }
            }}
            fields={categoryDataConfig.filter(option => option.field).map(option => option.field)}
            color={color}
          />
        </ModalWrapper>
      }
    </div>
  )
}