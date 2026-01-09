import { cert, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import serviceAccountPrivateKey from './serviceAccountPrivateKey.json' with { type: 'json' }

initializeApp({ credential: cert(serviceAccountPrivateKey) })

export const db = getFirestore()
