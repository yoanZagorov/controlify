import { ColorModal } from "@/components/modals/ColorModal";
import { HeaderModal } from "@/components/modals/HeaderModal";
import { IconModal } from "@/components/modals/IconModal";
import { ModalWrapper } from "@/components/modals/ModalWrapper";
import { SvgIcon } from "@/components/SvgIcon";
import { CategoriesTypeToggleSwitch } from "@/components/toggle-switches/CategoriesTypeToggleSwitch";
import { COLORS, ICON_NAMES, VALIDATION_RULES } from "@/constants";
import { useCategory } from "@/hooks";

export default function CategoryContainer({ mode = "add", formProps, modal, children }) {
  const isEditMode = mode === "edit";

  const {
    modalState: [isModalOpen, setModalOpen],
    hasTransitioned,
    modalRef
  } = modal;

  const { categoryData, updateCategoryData } = useCategory();
  const { name, type, iconName, color } = categoryData;
  const { id } = isEditMode ? categoryData : {}; // Only needed to edit a category

  const categoryDataConfig = [
    ...(isEditMode ? [{
      formData: {
        name: "id",
        value: id
      }
    }] : []),
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
          customComponent: {
            Component: CategoriesTypeToggleSwitch,
            props: {
              activeOption: type.value,
              handleToggle: () => updateCategoryData({ type: { value: type.value === "expense" ? "income" : "expense" } }),
              className: "ml-auto",
              isToggleSwitchDisabled: type.isLocked
            },
          }
        }
      }
    },
    {
      formData: {
        name: "iconName",
        value: iconName
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
          // To do (Non-MVP): decide if a custom component would look better
        },
        modal: {
          innerModal: {
            Component: IconModal,
            props: { iconNames: ICON_NAMES.CATEGORIES }
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
            props: { colors: COLORS.ENTITIES.CATEGORY_COLORS, colorBrightness: "bright" },
          },
          state: {
            value: color,
            updateState: (newColorCode) => updateCategoryData({ color: newColorCode })
          }
        }
      }
    },
  ]

  // More performant than chaining .filter and .map - looping only once
  let headerModalFields = [];
  categoryDataConfig.forEach(option => { if (option.field) headerModalFields.push(option.field) });

  function handleNameInputChange(e) {
    const value = e.target.value;
    if (value === "" || VALIDATION_RULES.CATEGORY.NAME.CLIENT_REGEX.test(value)) {
      updateCategoryData({ name: value })
    };
  }

  return (
    <>
      {children}

      {(isModalOpen || hasTransitioned) &&
        <ModalWrapper
          isModalOpen={isModalOpen}
          hasTransitioned={hasTransitioned}
          ref={modalRef}
          minHeight="h-[90%]" // Keep it like this or on smaller screens it doesn't stretch to the bottom
        >
          <HeaderModal
            entity="category"
            formProps={{
              fields: categoryDataConfig.map(option => option.formData),
              ...formProps
            }}
            header={{
              type: "simple",
              inputProps: {
                value: name,
                minLength: VALIDATION_RULES.CATEGORY.NAME.MIN_LENGTH,
                maxLength: VALIDATION_RULES.CATEGORY.NAME.MAX_LENGTH,
                onChange: handleNameInputChange
              }
            }}
            fields={headerModalFields}
            color={color}
          />
        </ModalWrapper>
      }
    </>
  )
}