import { doc, limit, orderBy, where } from 'firebase/firestore'

// Get a query for a random doc
// This may make more sense to be placed in the general utils dir, but leave it as this for now
export default async function getRandomDocQuery(collectionRef) {
  const randomId = doc(collectionRef).id

  // Using arrays since that is how queries in the application are implemented
  const randomDocQuery = [
    where('__name__', '>=', randomId),
    orderBy('__name__'),
    limit(1),
  ]

  // Just get the first document in the collection if the query fails
  const fallback = [limit(1)]

  // Return an array to name the first variable more concretely in the caller
  return [randomDocQuery, fallback]
}
