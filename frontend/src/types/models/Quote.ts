// Represents the shape of a quote document as stored in Firestore.
export interface StoredQuote {
  author: string
  body: string
}

// Represents a quote object returned from the data fetching layer.
export type RetrievedQuote = StoredQuote & { id: string }

