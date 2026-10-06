import { StrictMode } from 'react'
import './i18n'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Public pages arrive as prerendered HTML (scripts/prerender.mjs), so React
// attaches to that markup instead of rebuilding it. Pages that weren't
// prerendered (listing details, account, dashboard) arrive with an empty
// #root and render from scratch as before.
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
