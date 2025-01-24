import { SvgIcon } from "@/components/SvgIcon";

export default function CustomProfilePicType({ profilePic, handleChange }) {
  const imgPreview = profilePic
    ? profilePic instanceof File
      ? URL.createObjectURL(profilePic)
      : profilePic.url
    : null;

  return (
    <label htmlFor="profilePicInput" className="ml-auto">
      <div className="size-12 rounded-full border border-gray-dark cursor-pointer">
        {profilePic ? (
          <img src={imgPreview} className="size-full rounded-full object-cover" />
        ) : (
          <SvgIcon iconName="user-circle" className="size-full fill-gray-dark" />
        )}
        <input
          id="profilePicInput"
          type="file"
          accept="image/png, image/jpeg"
          name="profilePic"
          className="absolute w-[0.1px] h-[0.1px] opacity-0 overflow-hidden -z-1"
          onChange={handleChange}
        />
      </div>
    </label>
  )
}