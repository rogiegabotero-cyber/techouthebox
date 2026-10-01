import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import logoLight from './assets/full-log-lightmode.svg'
import logoDark from './assets/full-logo.svg'
import Constellation from './Constellation.jsx'
import { Arrow } from './Art.jsx'
import Link from './Link.jsx'
import { scrollToSection } from './scrollToSection.js'

export const CONTACT_EMAIL = 'info@techoutthebox.com'
export const PACKAGE_PRICE = '$250'
const YEAR = new Date().getFullYear()

// Hide the header while scrolling down; bring it back once scrolling stops
function useHideOnScroll(idleMs = 200) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    let timer

    const onScroll = () => {
      const y = window.scrollY
      if (y > lastY && y > 80) setHidden(true)
      else if (y < lastY) setHidden(false)
      lastY = y

      clearTimeout(timer)
      timer = setTimeout(() => setHidden(false), idleMs)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [idleMs])

  return hidden
}

// The hero stays pinned (see .hero-band); drift its text up slowly and fade it
// while the rest of the page scrolls over it
function useHeroParallax(ref) {
  useEffect(() => {
    const el = ref.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const update = () => {
      frame = 0
      const y = Math.min(window.scrollY, window.innerHeight)
      el.style.transform = `translateY(${-y * 0.3}px)`
      el.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.9)))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [ref])
}

// True once the white page content has scrolled up under the header
function useHeaderOnWhite(headerRef, contentRef) {
  const [onWhite, setOnWhite] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const headerMid = headerRef.current.offsetHeight / 2
      setOnWhite(contentRef.current.getBoundingClientRect().top <= headerMid)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [headerRef, contentRef])

  return onWhite
}

// In-page links (#services, #contact) use scrollToSection, so the section's content ends up
// centred below the header instead of the browser's default top-edge alignment.
function useCenteredAnchors() {
  useEffect(() => {
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      const target = document.getElementById(link.getAttribute('href').slice(1))
      if (!target) return
      e.preventDefault()
      scrollToSection(target, link.dataset.scrollThrough ?? target.dataset.scrollThrough)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}

// Elements that fade/pop in the first time they scroll into view
const REVEAL = '.section-head, .card, .steps li, .cta, .package-summary, .footer'

function useReveal(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (calm || !('IntersectionObserver' in window)) return

    // .services, .peekers and .backdrop only carry the "in" flag that starts their animations
    const items = [...root.querySelectorAll(`${REVEAL}, .services, .peekers, .backdrop`)]
    items.forEach((el) => {
      if (el.matches(REVEAL)) el.classList.add('reveal')
      // position among siblings staggers the animation
      el.style.setProperty('--i', [...el.parentElement.children].indexOf(el))
    })

    // Every time an element scrolls into view its animation plays; once it has fully left
    // the screen it is reset, so it plays again on the way back.
    let firstBatch = true
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target
          if (entry.intersectionRatio >= 0.12) {
            if (el.classList.contains('in')) continue
            // what is already on screen at load waits for the hero to finish first
            el.style.setProperty('--base', firstBatch ? '0.35s' : '0s')
            el.classList.add('in')
          } else if (entry.intersectionRatio === 0) {
            el.classList.remove('in')
          }
        }
        firstBatch = false
      },
      { threshold: [0, 0.12] },
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [rootRef])
}

// The hero's entrance animation plays again when you scroll back up to it: it is switched
// off once the white content has fully covered the hero, and back on as the hero re-emerges.
function useHeroReplay(rootRef) {
  useEffect(() => {
    const root = rootRef.current
    const band = root.querySelector('.hero-band')
    let away = false
    let frame = 0

    const update = () => {
      frame = 0
      const covered = band.offsetHeight + 100
      const emerging = band.offsetHeight
      if (!away && window.scrollY > covered) {
        away = true
        root.classList.add('is-away')
      } else if (away && window.scrollY < emerging) {
        away = false
        root.classList.remove('is-away') // removing it restarts the animations
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [rootRef])
}

export function ContactCta() {
  return (
    <section id="contact" className="wrap">
      <div className="cta">
        <h2>Ready to get online?</h2>
        <p>Tell us about your business and we’ll take it from there.</p>
        <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-primary">
          Say hello
        </a>
      </div>
    </section>
  )
}

// Shared layout: header, pinned black hero, white content sliding over it, footer
function Page({ title, hero, heroClass = '', pageClass = '', back, contactTo, children }) {
  const headerHidden = useHideOnScroll()
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const heroRef = useRef(null)
  const pageRef = useRef(null)
  const headerDark = useHeaderOnWhite(headerRef, contentRef)
  useHeroParallax(heroRef)
  useHeroReplay(pageRef)
  useReveal(contentRef)
  useCenteredAnchors()

  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <div id="top" ref={pageRef} className={pageClass}>
      <header
        ref={headerRef}
        className={`site-header${headerHidden ? ' is-hidden' : ''}${headerDark ? ' is-dark' : ''}`}
      >
        <div className="wrap nav">
          <Link to="/" className="logo">
            <img className="logo-light" src={logoLight} alt="techoutthebox" />
            <img className="logo-dark" src={logoDark} alt="" />
          </Link>
          {/* on other pages (contactTo) this goes back to the home page and scrolls there */}
          {contactTo ? (
            <Link to={contactTo} className="btn btn-ghost">
              Get in touch <Arrow />
            </Link>
          ) : (
            <a href="#contact" className="btn btn-ghost">
              Get in touch <Arrow />
            </a>
          )}
        </div>
      </header>

      <div className="hero-band">
        <Constellation />
        {back && <div className="wrap hero-back-wrap">{back}</div>}
        <section className={`wrap hero ${heroClass}`} ref={heroRef}>
          {hero}
        </section>
      </div>

      <div className="content" ref={contentRef}>
        <main>{children}</main>

        <footer className="wrap footer">
          <span>© {YEAR} techoutthebox</span>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </footer>
      </div>
    </div>
  )
}

export default Page
