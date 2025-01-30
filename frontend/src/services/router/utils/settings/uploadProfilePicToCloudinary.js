import { nanoid } from "nanoid";

export default async function uploadProfilePicToCloudinary(storedPublicId = "", profilePic) {
  const url = "https://api.cloudinary.com/v1_1/controlify/upload/";
  const formData = new FormData();

  // To do: implement backend to delete the old pic
  // storedPublicId && await deleteProfilePicFromCloudinary()

  formData.append("file", profilePic);
  formData.append("upload_preset", "profile-pic");

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to upload profile picture. Please try again.");
  }
}