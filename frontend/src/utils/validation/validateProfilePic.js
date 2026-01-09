import { ValidationError } from "#utils/errors";

export default function validateProfilePic(profilePic) {
  if (!profilePic) {
    throw new ValidationError("No profile picture file provided");
  }

  if (!profilePic instanceof File) {
    throw new Error("Invalid file object"); // Issue is most likely not in the user - return a generic error
  }

  const { name, size, type } = profilePic;

  if (!name) {
    throw new ValidationError("File name should not be empty. Please submit a file");
  }

  const VALID_FILE_TYPES = ["image/png", "image/jpeg"];
  if (!VALID_FILE_TYPES.includes(type)) {
    throw new ValidationError("Unsupported file type. Please try with another one");
  }

  const FIVE_MB = 5 * 1024 * 1024;
  if (size > FIVE_MB) {
    throw new ValidationError("File size should not exceed the maximum limit of 5MB. Please try with a smaller image");
  }
}