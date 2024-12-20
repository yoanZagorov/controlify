export default async function walletsAction({ request, params }) {
  const formData = Object.fromEntries(await request.formData());

  console.log(formData);
  console.log(JSON.parse(formData.categories));
}