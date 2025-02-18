import { SvgIcon } from "@/components/SvgIcon";
import { useEffect, useMemo } from "react";

export default function ProfilePicPreview({ profilePic, handleChange }) {
  const imgPreview = useMemo(
    () => (
      profilePic
        ? profilePic instanceof File
          ? URL.createObjectURL(profilePic) // create a profilePic preview on the fly, as the user chooses it, before submitting
          : profilePic.url // user already has a profile pic - display it
        : null), [profilePic]); // no profile pic yet

  // Cleanup to revoke the created object URL
  useEffect(() => {
    if (profilePic instanceof File) {
      return () => URL.revokeObjectURL(imgPreview); // Cleanup when profilePic changes or component unmounts
    }
  }, [profilePic, imgPreview]);

  return (
    <label htmlFor="profilePicInput" className="ml-auto">
      <div className="size-12 rounded-full cursor-pointer">
        {profilePic ? (
          <img src={imgPreview} className="size-full rounded-full object-cover" alt="Avatar" /> // Object cover is needed or else the image gets distorted
        ) : (
          <SvgIcon iconName="user-circle" className="size-full fill-gray-dark" />
        )}
        <input
          id="profilePicInput"
          type="file"
          accept="image/png, image/jpeg"
          name="profilePic"
          className="hidden" // Hide the native input
          onChange={handleChange}
        />
      </div>
    </label>
  )
}