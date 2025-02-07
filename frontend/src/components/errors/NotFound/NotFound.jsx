import { HTTP_STATUS_CODES } from "@/constants";
import { ErrorWrapper } from "../ErrorWrapper";

export default function NotFound() {
  return (
    <ErrorWrapper
      error={{
        title: `${HTTP_STATUS_CODES.NOT_FOUND} Error - Page Not Found!`,
        msg: "Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or the URL could be incorrect."
      }}
    />
  )
}
