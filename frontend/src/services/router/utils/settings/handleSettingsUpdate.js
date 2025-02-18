import { db } from "@/services/firebase/firebase.config";
import { doc, updateDoc } from "firebase/firestore"
import { validateCurrency, validateEmail, validateFullName, validateProfilePic } from "@/utils/validation";
import getDataToChange from "../getDataToChange";
import { createSuccessResponse } from "../../responses";
import { deleteProfilePicFromCloudinary, uploadProfilePicToCloudinary } from "@/services/cloudinary";
import { getEntity } from "@/services/firebase/db/utils/entity";
import { updateAuthEmail } from "@/services/firebase/auth";
import { getCurrencies } from "@/services/firebase/db/currency";
import handleActionError from "../handleActionError";

export default async function handleSettingsUpdate(userId, formData) {
  // Normalize form data
  formData.fullName = formData.fullName.trim();
  formData.email = formData.email.toLowerCase().trim();

  const { profilePic, fullName, email, currency } = formData;

  try {
    const userDocRef = doc(db, `users/${userId}`);
    const oldUserData = await getEntity(userDocRef, userId, "user");

    const hasProfilePicChanged = profilePic.name
      ? oldUserData.profilePic?.name !== profilePic.name // If there is a name, a proper file was submitted so check if it's different from the old one
      : false; // No name means an empty file -> there weren't any changes

    const hasDataChanged = {
      profilePic: hasProfilePicChanged,
      fullName: oldUserData.fullName !== fullName,
      email: oldUserData.email !== email,
      currency: oldUserData.currency !== currency,
    }

    if (hasDataChanged.profilePic) {
      validateProfilePic(profilePic);

      // To do (Non-MVP): Delete the old profile pic first (if there is one)
      // if (oldUserData.profilePic) {
      //   await deleteProfilePicFromCloudinary(oldUserData.profilePic.publicId);
      // }

      // Upload the new pic
      const cloudinaryData = await uploadProfilePicToCloudinary(profilePic);

      const url = cloudinaryData.secure_url;
      // Store the file extension so it's easier to check if the file has changed in future settings updates
      const fileName = cloudinaryData.display_name.concat(`.${cloudinaryData.format}`);
      const publicId = cloudinaryData.public_id;

      // Modify the data to the format that will be stored in Firestore
      formData.profilePic = { publicId, name: fileName, url };
    }

    if (hasDataChanged.fullName) {
      validateFullName(fullName);
    }

    if (hasDataChanged.email) {
      // To do (Non-MVP): Find a way to commit all the changes (see the docs)
      validateEmail(email);
      await updateAuthEmail(email);
    }

    if (hasDataChanged.currency) {
      const supportedCurrencyCodes = (await getCurrencies()).map(currency => currency.code);
      validateCurrency(currency, supportedCurrencyCodes);
    }

    const dataToChange = getDataToChange(hasDataChanged, formData);

    await updateDoc(userDocRef, dataToChange);

    return createSuccessResponse({
      msg: `Successfully updated profile settings data!`,
      msgType: "success",
    })
  } catch (error) {
    return handleActionError(error, "Couldn't update your profile settings data. Please try again");
  }
}