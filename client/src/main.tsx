import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PersonalAccount } from './PersonalAccount'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersonalAccount />
  </StrictMode>,
)
