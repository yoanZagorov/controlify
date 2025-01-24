import { db } from "@/services/firebase/firebase.config";
import { doc, runTransaction } from "firebase/firestore"
import { validateCurrency, validateEmail, validateFullName } from "@/utils/validation";
import getDataToChange from "../getDataToChange";
import { createErrorResponse, createSuccessResponse } from "../../responses";
import { ValidationError } from "@/utils/errors";
import validateProfilePic from "./validateProfilePic";
import updateAuthEmail from "./updateAuthEmail";
import { redirect } from "react-router";
import uploadProfilePicToCloudinary from "./uploadProfilePicToCloudinary";

export default async function handleSettingsUpdate(userId, formData) {
  const userDocRef = doc(db, `users/${userId}`);

  const formattedFormData = {
    ...formData,
    fullName: formData.fullName.trim(),
    email: formData.email.toLowerCase()
  }

  const { profilePic, fullName, email, currency } = formattedFormData;

  try {
    await runTransaction(db, async (dbTransaction) => {
      const oldUserData = (await dbTransaction.get(userDocRef)).data();

      const oldProfilePicName = oldUserData.profilePic?.name || ""; // Default to an empty string so the comparison below correctly yields false if there is no profilePic

      const hasDataChanged = {
        profilePic: profilePic.name
          ? oldProfilePicName !== profilePic.name
          : false, // an empty file was submitted
        fullName: oldUserData.fullName !== fullName,
        email: oldUserData.email !== email,
        currency: oldUserData.currency !== currency,
      }

      if (hasDataChanged.profilePic) {
        validateProfilePic(profilePic);
        const cloudinaryData = await uploadProfilePicToCloudinary(oldUserData.profilePic?.publicId, profilePic);

        const url = cloudinaryData.secure_url;
        const fileName = cloudinaryData.display_name.concat(`.${cloudinaryData.format}`);
        const publicId = cloudinaryData.public_id;

        formattedFormData.profilePic = { publicId, name: fileName, url };
      }

      if (hasDataChanged.fullName) {
        validateFullName(fullName);
      }

      if (hasDataChanged.email) {
        validateEmail(email);
        await updateAuthEmail(email);
      }

      if (hasDataChanged.currency) {
        validateCurrency(currency);
      }

      const dataToChange = getDataToChange(hasDataChanged, formattedFormData);

      dbTransaction.update(userDocRef, dataToChange);
    });

    return createSuccessResponse({
      msg: `Successfully updated profile settings data!`,
      msgType: "success",
    })
  } catch (error) {
    console.error(error);

    if (error instanceof ValidationError) {
      return createErrorResponse(error.statusCode, error.message);
    }

    return createErrorResponse(500, error.message);
  }
}