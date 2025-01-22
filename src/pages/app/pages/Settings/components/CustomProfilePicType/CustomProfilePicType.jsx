import { SvgIcon } from "@/components/SvgIcon";
import { useEffect, useRef } from "react";

export default function CustomProfilePicType({ profilePic, handleChange }) {
  return (
    <label htmlFor="profilePicInput" className="ml-auto">
      <div className="size-12 rounded-full border border-gray-dark">
        {profilePic ? (
          <img src={profilePic} className="size-full rounded-full object-cover" />
        ) : (
          <SvgIcon iconName="user-circle" className="size-full fill-gray-dark" />
        )}
        <input
          id="profilePicInput"
          type="file"
          accept="image/png, image/jpeg"
          className="absolute w-[0.1px] h-[0.1px] opacity-0 overflow-hidden -z-1"
          onChange={handleChange}
        />
      </div>
    </label>
  )
}