import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { HostApp } from './HostApp.tsx'

ReactDOM.render(
  <StrictMode>
    <HostApp />
  </StrictMode>,
  document.getElementById('root'),
)
