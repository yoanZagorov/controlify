import { andToAmpersand, dashToSpace, capitalizeEveryWord } from '../str'

export default function formatEntityNameForUI(entityName) {
  const entityNameNoDashes = dashToSpace(entityName)
  const entityNameAndToAmpersand = andToAmpersand(entityNameNoDashes)
  const formattedEntityName = capitalizeEveryWord(entityNameAndToAmpersand)

  return formattedEntityName
}
