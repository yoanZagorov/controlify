import { ValidationError } from '#utils/errors'
import { isObjTruthy } from '#utils/obj'

// Utility used to get only the fields that should change when updating an entity
export default function getDataToChange(hasDataChanged, newData) {
  let dataToChange = {}

  for (const property in hasDataChanged) {
    if (hasDataChanged[property]) {
      dataToChange[property] = newData[property]
    }
  }

  if (!isObjTruthy(dataToChange)) {
    throw new ValidationError(
      "You haven't performed any changes. Please try again",
    )
  }

  return dataToChange
}
