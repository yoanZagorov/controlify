import { COLORS, ICON_NAMES, VALIDATION_RULES } from "@/constants";

import { useCategory } from "@/hooks";

import { FullScreenModalWrapper } from "@/components/modal-wrappers/FullScreenModalWrapper";
import { ColorModal } from "@/components/modals/ColorModal";
import { HeaderModal } from "@/components/modals/HeaderModal";
import { IconModal } from "@/components/modals/IconModal";
import { SvgIcon } from "@/components/SvgIcon";
import { CategoriesTypeToggleSwitch } from "@/components/toggle-switches/CategoriesTypeToggleSwitch";

// Keeps the logic for a category operation. Used for both adding and editing
export default function CategoryContainer({ mode = "add", formProps, submitBtn, modal, children }) {
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
    ...(isEditMode ? [{
      formData: {
        name: "id",
        value: id
      }
    }] : []),
  ]

  // More performant than chaining .filter and .map - looping only once
  let headerModalFields = [];
  categoryDataConfig.forEach(option => { if (option.field) headerModalFields.push(option.field) });

  function handleNameInputChange(e) {
    const value = e.target.value;
    if (value === "" || VALIDATION_RULES.CATEGORY.NAME.CLIENT_REGEX.test(value)) {
      updateCategoryData({ name: value });
    };
  }

  return (
    <>
      {children}

      {(isModalOpen || hasTransitioned) &&
        <FullScreenModalWrapper
          isModalOpen={isModalOpen}
          hasTransitioned={hasTransitioned}
          modalRef={modalRef}
          layoutProps={{
            height: "h-[90dvh]",
            handleOverflow: false // Overflow is handled in the HeaderModal
          }}
        >
          <HeaderModal
            entity="category"
            formProps={{
              fields: categoryDataConfig.map(option => option.formData),
              ...formProps
            }}
            submitBtn={submitBtn}
            header={{
              type: "simple",
              inputProps: {
                value: name,
                minLength: VALIDATION_RULES.CATEGORY.NAME.MIN_LENGTH,
                maxLength: VALIDATION_RULES.CATEGORY.NAME.MAX_LENGTH,
                onChange: handleNameInputChange
              },
              autoFocus: mode === "add" ? true : false
            }}
            parentModalRef={modalRef}
            fields={headerModalFields}
            color={color}
          />
        </FullScreenModalWrapper>
      }
    </>
  )
}