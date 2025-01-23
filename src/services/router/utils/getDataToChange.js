export default function getDataToChange(hasDataChanged, newData) {
  const dataToChange = {};

  for (const property in hasDataChanged) {
    if (hasDataChanged[property]) {
      dataToChange[property] = newData[property];
    };
  }

  if (Object.keys(dataToChange).length === 0) {
    throw new Error("You haven't performed any changes!");
  }

  return dataToChange;
}