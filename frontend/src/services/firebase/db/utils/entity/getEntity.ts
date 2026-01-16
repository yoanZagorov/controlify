import type { DocumentData, DocumentReference } from 'firebase/firestore'
import { getDoc } from 'firebase/firestore'

import { capitalize } from '#/utils/str'

// Used to get a single entity - reused for almost all single-entity reads.
// It attaches the document id to the returned data and preserves the
// underlying Firestore field types (e.g. Timestamps).
export default async function getEntity<T extends DocumentData>(
  docRef: DocumentReference<T>,
  docId: string,
  entityName: string,
): Promise<T & { id: string }> {
  try {
    const docSnapshot = await getDoc(docRef)

    if (!docSnapshot.exists()) {
      throw new Error(
        `${capitalize(entityName)} with the id ${docId} doesn't seem to exist`,
      )
    }

    return {
      ...docSnapshot.data(),
      id: docSnapshot.id,
    } as T & { id: string }
  } catch (error) {
    throw new Error(`Error fetching ${entityName} with the id ${docId}`, {
      cause: error,
    })
  }
}
