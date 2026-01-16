## **Tech Stack**

- **Frontend:** React, TypeScript, React Router, Tailwind CSS
- **Backend:** Node.js, Firebase Cloud Functions
- **Database:** Firebase Cloud Firestore
- **Authentication:** Firebase Authentication
- **Data Visualization:** Recharts
- **Image Storage and Transformation:** Cloudinary
- **Bundling:** Vite
- **Hosting:** Netlify
- **Version control:** Git

## **Environment Configuration**

This project uses Vite's mode system to manage three distinct environments:

- **`local-dev`**: Local development environment (used by `npm run dev`)
- **`test`**: E2E testing environment (used by Playwright tests)
- **`prod`**: Production environment (used by `npm run build`)

### Environment Files

Environment variables are configured using `.env` files in the `frontend/` directory:

- **`.env`**: Shared variables across all environments (currently empty)
- **`.env.local-dev`**: Local development configuration (uses test Firebase project)
- **`.env.test`**: Test environment configuration (uses test Firebase project)
- **`.env.prod`**: Production configuration (uses production Firebase project)

### File Loading Priority

Vite loads environment files in the following order (later files override earlier ones):

1. `.env` (always loaded)
2. `.env.local` (always loaded, gitignored)
3. `.env.[mode]` (mode-specific, e.g., `.env.local-dev`, `.env.test`, `.env.prod`)
4. `.env.[mode].local` (mode-specific local overrides, gitignored)

### Firebase Projects

- **Local Development & Testing**: Both `local-dev` and `test` environments use the test Firebase project (`controlify-test`) to avoid polluting production data during development and testing.
- **Production**: The `prod` environment uses the production Firebase project (`controlify-3bdd8`).

### Security

Firebase API keys are committed to the repository. This is safe because Firebase security relies on Firestore security rules, not API key secrecy. The API keys are public by design and are used to identify which Firebase project to connect to.

## **Local development**

1. Clone the repository

   ```
   git clone https://github.com/yoanZagorov/controlify.git
   cd controlify
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Start the project

   ```
   npm run dev
   ```

   This will start the Vite development server in `local-dev` mode, which loads `.env.local-dev` and uses the test Firebase project.

   **Note**: You can create a `.env.local-dev.local` file (gitignored) to override any environment variables for your local setup without affecting the committed configuration.