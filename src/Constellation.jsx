import { useEffect, useRef } from 'react'

const LINK_DIST = 130 // max distance between two stars that get joined
const MOUSE_DIST = 170 // cursor reach
const DENSITY = 5500 // px² of hero area per star
const MAX_STARS = 180

// Floating white dots joined by lines, reacting to the cursor.
// Sized to its parent element, which must be position: relative.
function Constellation() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let stars = []
    let frame = 0
    const mouse = { x: -9999, y: -9999 }

    const makeStar = () => {
      const vx = (Math.random() - 0.5) * 0.35
      const vy = (Math.random() - 0.5) * 0.35
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx,
        vy,
        bx: vx, // drift velocity the star settles back to
        by: vy,
        r: 1 + Math.random() * 1.3,
      }
    }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const target = Math.min(MAX_STARS, Math.round((w * h) / DENSITY))
      while (stars.length < target) stars.push(makeStar())
      stars.length = Math.min(stars.length, target)
      for (const s of stars) {
        s.x = Math.min(s.x, w)
        s.y = Math.min(s.y, h)
      }
      draw()
    }

    const update = () => {
      for (const s of stars) {
        const dx = s.x - mouse.x
        const dy = s.y - mouse.y
        const d = Math.hypot(dx, dy)
        if (d < MOUSE_DIST && d > 0) {
          const push = (1 - d / MOUSE_DIST) * 0.12
          s.vx += (dx / d) * push
          s.vy += (dy / d) * push
        }
        // ease back to the star's own slow drift
        s.vx += (s.bx - s.vx) * 0.02
        s.vy += (s.by - s.vy) * 0.02

        s.x += s.vx
        s.y += s.vy
        if (s.x < 0 || s.x > w) {
          s.vx *= -1
          s.bx *= -1
          s.x = Math.min(Math.max(s.x, 0), w)
        }
        if (s.y < 0 || s.y > h) {
          s.vy *= -1
          s.by *= -1
          s.y = Math.min(Math.max(s.y, 0), h)
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 1

      for (let i = 0; i < stars.length; i++) {
        const a = stars[i]
        for (let j = i + 1; j < stars.length; j++) {
          const b = stars[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK_DIST) {
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d / LINK_DIST) * 0.15})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        // join stars near the cursor to the cursor itself
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (md < MOUSE_DIST) {
          ctx.strokeStyle = `rgba(255,255,255,${(1 - md / MOUSE_DIST) * 0.3})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }

      ctx.fillStyle = 'rgba(255,255,255,0.4)'
      for (const s of stars) {
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = () => {
      update()
      draw()
      frame = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      const rect = host.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      if (reduceMotion) draw()
    }
    const onLeave = () => {
      mouse.x = mouse.y = -9999
      if (reduceMotion) draw()
    }

    resize()
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)

    // only animate while the hero is on screen
    let visibleObserver
    if (!reduceMotion) {
      visibleObserver = new IntersectionObserver(([entry]) => {
        cancelAnimationFrame(frame)
        if (entry.isIntersecting) frame = requestAnimationFrame(loop)
      })
      visibleObserver.observe(host)
    }

    return () => {
      cancelAnimationFrame(frame)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
      resizeObserver.disconnect()
      visibleObserver?.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="constellation" aria-hidden="true" />
}

export default Constellation
