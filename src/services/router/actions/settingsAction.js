import { getAuthUserId } from "@/services/firebase/db/user";
import { handleAccountDeletion, handleSettingsUpdate } from "../utils/settings";
import { handleCategoryDeletion, handleCategorySubmission, handleCategoryUpdate } from "../utils/category";

export default async function settingsAction({ request }) {
  const userId = await getAuthUserId();

  const formData = Object.fromEntries(await request.formData());
  const { intent } = formData;

  if (intent === "updateSettings") {
    return (await handleSettingsUpdate(userId, formData));
  }

  if (intent === "addCategory") {
    return (await handleCategorySubmission(userId, formData));
  }

  if (intent === "updateCategory") {
    return (await handleCategoryUpdate(userId, formData));
  }

  if (intent === "deleteCategory") {
    return (await handleCategoryDeletion(userId, formData));
  }

  if (intent === "deleteAccount") {
    return (await handleAccountDeletion());
  }
}