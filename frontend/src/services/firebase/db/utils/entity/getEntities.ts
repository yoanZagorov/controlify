import type {
  CollectionReference,
  DocumentData,
  QueryConstraint,
} from 'firebase/firestore'
import { getDocs, query as firebaseQuery } from 'firebase/firestore'

import { HTTP_STATUS_CODES } from '#/constants'
import { StatusCodeError } from '#/utils/errors'

// Used to get a collection of entities - reused for almost all of the multi-entity reads.
// It attaches the document id to each item and preserves the underlying Firestore field types.
export default async function getEntities<T extends DocumentData>(
  collectionRef: CollectionReference<T>,
  entities: string,
  query: QueryConstraint[] = [],
): Promise<(T & { id: string })[]> {
  try {
    // If the query is provided, it gets spread and applied. If there isn't a query,
    // the plain collectionRef is used and all documents are retrieved.
    const querySnapshot = await getDocs(firebaseQuery(collectionRef, ...query))

    if (querySnapshot.empty) {
      throw new StatusCodeError(
        `No matching documents found in "${entities}" with the given query parameters`,
        HTTP_STATUS_CODES.NOT_FOUND,
      )
    }

    const docs = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))

    return docs as (T & { id: string })[]
  } catch (error) {
    throw new Error(`Error fetching ${entities}`, { cause: error })
  }
}
