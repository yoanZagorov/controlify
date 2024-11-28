export default async function walletAction({ request }) {
  const formData = Object.fromEntries(await request.formData());
  console.log(formData);

  const { name, currency, color, categories: unparsedCategories } = formData;

  const categories = JSON.parse(unparsedCategories);
  console.log(categories);

  return null;
}