export default async function dashboardAction({ request }) {
  try {
    const formData = request.formData();
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}