import { useSyncExternalStore } from 'react'

// Tiny client-side router: plain paths, no dependency.
// (The host needs to serve index.html for unknown paths, e.g. /package.)

export function navigate(to) {
  if (to === window.location.pathname) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  window.history.pushState(null, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

const subscribe = (callback) => {
  window.addEventListener('popstate', callback)
  return () => window.removeEventListener('popstate', callback)
}

export function usePath() {
  return useSyncExternalStore(subscribe, () => window.location.pathname)
}
