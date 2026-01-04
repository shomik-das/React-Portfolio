import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppSettingsProvider } from './context/AppSettingsContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ProjectProvider } from './context/projectContext.tsx'
import { BlogProvider } from './context/BlogContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ProjectProvider>
      <BlogProvider>
      <AppSettingsProvider>
        <App />
      </AppSettingsProvider>
      </BlogProvider>
    </ProjectProvider>
  </BrowserRouter>,
)
