// Transform the user's profile pic to reduce size
// g_face - uses AI to focus on the face in the picture
export default function transformUserProfilePic(user) {
  const transformations =
    'c_crop,g_face,h_1200,w_1200/c_scale,w_128/q_auto:best,f_auto'

  user.profilePic.url = user.profilePic.url.replace(
    '/upload/',
    `/upload/${transformations}/`,
  )
}
