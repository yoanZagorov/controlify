import { readFileSync } from 'fs'
import { cert, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

// Support both production and test projects via environment variable
const isTest = process.env.FIREBASE_PROJECT === 'test'
const serviceAccountPath = isTest
  ? './serviceAccountPrivateKey.test.json'
  : './serviceAccountPrivateKey.json'

let serviceAccountPrivateKey
try {
  const fileContent = readFileSync(serviceAccountPath, 'utf8')
  serviceAccountPrivateKey = JSON.parse(fileContent)
} catch (error) {
  throw new Error(
    `Failed to load service account key from ${serviceAccountPath}. Please ensure the file exists. Error: ${error.message}`,
  )
}

initializeApp({ credential: cert(serviceAccountPrivateKey) })

export const db = getFirestore()
