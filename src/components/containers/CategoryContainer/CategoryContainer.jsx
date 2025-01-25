import { ColorModal } from "@/components/modals/ColorModal";
import { HeaderModal } from "@/components/modals/HeaderModal";
import { IconModal } from "@/components/modals/IconModal";
import { ModalWrapper } from "@/components/modals/ModalWrapper";
import { SvgIcon } from "@/components/SvgIcon";
import { CategoriesTypeToggleSwitch } from "@/components/toggle-switches/CategoriesTypeToggleSwitch";
import { useCategory } from "@/hooks";
import { categoriesColors, categoriesIconNames } from "@/utils/category";

export default function CategoryContainer({ fetcher, modal, action, submitBtn, isDeleteBtn = false, children }) {
  const {
    modalState: [isModalOpen, setModalOpen],
    hasTransitioned,
    modalRef
  } = modal;

  const {
    categoryData: {
      id,
      name,
      type,
      iconName,
      color
    },
    updateCategoryData
  } = useCategory();

  const categoryDataConfig = [
    {
      formData: {
        name: "id",
        value: id
      },
    },
    {
      formData: {
        name: "name",
        value: name
      },
    },
    {
      formData: {
        name: "type",
        value: type.value
      },
      field: {
        name: "type",
        props: {
          iconName: "stats",
          type: "custom",
          customType: {
            Component: CategoriesTypeToggleSwitch,
            props: {
              activeOption: type.value,
              handleToggle: () => updateCategoryData({ type: { value: type.value === "expense" ? "income" : "expense" } }),
              className: "ml-auto",
              isToggleSwitchDisabled: type.isPreselected
            },
          }
        }
      }
    },
    {
      formData: {
        name: "iconName",
        value: iconName || ""
      },
      field: {
        name: "icon",
        props: {
          iconName: "categories",
          type: "select",
          displayValue: iconName ? (
            <div className="flex justify-center items-center size-10 rounded-full" style={{ backgroundColor: color }}>
              <SvgIcon iconName={iconName} className="size-1/2 fill-gray-light" />
            </div>
          ) : "Choose"
          // To do: decide if a custom component would look better
        },
        modal: {
          innerModal: {
            Component: IconModal,
            props: { iconNames: categoriesIconNames }
          },
          state: {
            value: iconName,
            updateState: (newIconName) => updateCategoryData({ iconName: newIconName })
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
            props: { colors: categoriesColors },
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
    <>
      {children}

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
              action,
              fields: categoryDataConfig.map(option => option.formData),
              btn: submitBtn
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
    </>
  )
}