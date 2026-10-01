import { useEffect } from 'react'
import HomePage from './HomePage.jsx'
import PackagePage from './PackagePage.jsx'
import { usePath } from './routing.js'
import { scrollToSection } from './scrollToSection.js'
import './App.css'

const routes = {
  '/package': PackagePage,
}

function App() {
  const path = usePath().replace(/\/+$/, '') || '/'
  const Route = routes[path] ?? HomePage

  // a new page always starts at the top; if the address has a #section (e.g. /#how) it
  // then scrolls down to that section
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })

    const id = window.location.hash.slice(1)
    if (!id) return

    // let the page finish laying out (web fonts shift things slightly) before measuring
    let cancelled = false
    let timer
    document.fonts.ready.then(() => {
      timer = setTimeout(() => {
        const target = document.getElementById(id)
        if (!cancelled && target) scrollToSection(target)
      }, 300)
    })
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [path])

  return <Route key={path} />
}

export default App
