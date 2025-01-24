export default async function uploadProfilePicToCloudinary(profilePic) {
  const url = "https://api.cloudinary.com/v1_1/controlify/upload";
  const formData = new FormData();

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