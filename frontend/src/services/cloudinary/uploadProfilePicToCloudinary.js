import { HTTP_STATUS_CODES } from '#constants'
import { StatusCodeError } from '#utils/errors'

// Upload the profile pic chosen by the user to Cloudinary
// Return the response data to store some of it in Firestore
export default async function uploadProfilePicToCloudinary(profilePic) {
  const UPLOAD_URL = 'https://api.cloudinary.com/v1_1/controlify/upload/'
  const formData = new FormData()

  formData.append('file', profilePic)
  formData.append('upload_preset', 'profile-pic')

  try {
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) {
      throw new StatusCodeError('Error uploading profile picture', res.status) // res.status represents the error code
    }

    const data = await res.json()

    return data
  } catch (error) {
    throw new StatusCodeError(
      "We couldn't upload your image to our servers. Please try again",
      error.statusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, // If the error comes from the !res.ok check, throw the status. If the status is unknown, default to 500
      { cause: error },
    )
  }
}
