import { FieldValue } from 'firebase-admin/firestore'
import { db } from '../firebase.config.js'

// A one-time script to populate the currencies root Firestore collection programmatically
// Rates are relative to BGN (base currency)
// Note: BGN is pegged to EUR at 1.95583, but we're using current market rates for consistency
const currencies = [
  {
    code: 'BGN',
    conversionRate: 1,
    iconName: 'flag-bulgaria',
    isBase: true,
  },
  {
    code: 'EUR',
    conversionRate: 1.9558, // Fixed rate (BGN is pegged to EUR)
    iconName: 'flag-eu',
    isBase: false,
  },
  {
    code: 'USD',
    conversionRate: 1.6054, // Current rate: 1 USD = ~1.6054 BGN (as of Jan 2025)
    iconName: 'flag-usa',
    isBase: false,
  },
  {
    code: 'GBP',
    conversionRate: 1.9204, // Current rate: 1 GBP = ~1.9204 BGN (as of Jan 2025)
    iconName: 'flag-uk',
    isBase: false,
  },
]

async function populateCurrencies() {
  const batch = db.batch()
  const collectionRef = db.collection('currencies')

  currencies.forEach((currency) => {
    const docRef = collectionRef.doc()
    batch.set(docRef, {
      ...currency,
      createdAt: FieldValue.serverTimestamp(),
    })
  })

  try {
    await batch.commit()
    console.log('Currencies successfully populated!')
    process.exit(0)
  } catch (error) {
    console.error('Error populating currencies:', error)
    process.exit(1)
  }
}

// Run the script
populateCurrencies()
