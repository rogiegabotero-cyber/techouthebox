// Illustrations and small icons for the services section.
// Each illustration is drawn on a 240 x 190 canvas.

const ORANGE = '#ff5a1f'
const SOFT = '#fff0e8'

import { useEffect, useRef, useState } from 'react'

// A group that shifts with the cursor (see .layer in App.css).
// Bigger d = closer to the viewer, so it moves further.
function Layer({ d, children }) {
  return (
    <g className="layer" style={{ '--d': d }}>
      {children}
    </g>
  )
}

function Shadows({ id }) {
  return (
    <defs>
      <filter id={id} x="-25%" y="-25%" width="150%" height="170%">
        <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor={ORANGE} floodOpacity="0.16" />
      </filter>
      <linearGradient id={`${id}-w`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#f2efec" />
      </linearGradient>
    </defs>
  )
}

export function DomainArt(props) {
  return (
    <svg viewBox="0 0 240 190" aria-hidden="true" {...props}>
      <Shadows id="dom" />
      <Layer d={-3}>
        <ellipse cx="120" cy="152" rx="106" ry="22" fill="#ffe9de" />
      </Layer>
      <Layer d={9}>
        <circle cx="188" cy="60" r="27" fill={ORANGE} />
      </Layer>
      <Layer d={-6}>
        <circle cx="76" cy="152" r="22" fill={ORANGE} />
      </Layer>
      {/* globe */}
      <Layer d={4}>
        <g fill="none" stroke="#1a1a1a" strokeWidth="3.5">
          <circle cx="110" cy="62" r="40" fill="#fff" />
          <ellipse cx="110" cy="62" rx="18" ry="40" />
          <path d="M70 62h80M77 40h66M77 84h66" />
        </g>
      </Layer>
      <Layer d={16}>
        <path d="M44 38l8 6M38 50l9 2" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" />
      </Layer>
      {/* browser bar */}
      <Layer d={14}>
        <g transform="rotate(-6 112 118)" filter="url(#dom)">
          <rect x="22" y="88" width="192" height="64" rx="14" fill="url(#dom-w)" />
          <circle cx="40" cy="102" r="4" fill={ORANGE} />
          <circle cx="53" cy="102" r="4" fill="#ff8b5e" />
          <circle cx="66" cy="102" r="4" fill="#ffc2a8" />
          <rect x="36" y="112" width="164" height="30" rx="15" fill="#fff" stroke="#eeeae6" />
          <rect x="50" y="123" width="9" height="8" rx="1.5" fill="#333" />
          <path d="M52 123v-2.5a2.5 2.5 0 0 1 5 0V123" fill="none" stroke="#333" strokeWidth="1.6" />
          <text x="66" y="132" fontSize="11" fontFamily="Inter, sans-serif" fill="#2b2b2b" textLength="118">
            www.yourbusiness.com
          </text>
        </g>
      </Layer>
      <Layer d={20}>
        <path d="M30 150q-6 14 14 18" fill="none" stroke={ORANGE} strokeWidth="1.8" strokeDasharray="3 4" strokeLinecap="round" />
      </Layer>
    </svg>
  )
}

export function EmailArt(props) {
  return (
    <svg viewBox="0 0 240 190" aria-hidden="true" {...props}>
      <Shadows id="eml" />
      <Layer d={-3}>
        <circle cx="128" cy="94" r="66" fill={SOFT} />
      </Layer>
      {/* paper plane */}
      <Layer d={22}>
        <path d="M176 52l38-20-14 40z" fill={ORANGE} />
        <path d="M176 52l22 8-4 12z" fill="#d9430f" />
      </Layer>
      <Layer d={14}>
        <path d="M150 70q8-18 24-18" fill="none" stroke={ORANGE} strokeWidth="1.8" strokeDasharray="3 4" strokeLinecap="round" />
      </Layer>
      {/* open flap */}
      <Layer d={3}>
        <path d="M58 98l56-42 56 42z" fill="#ff8b5e" />
      </Layer>
      {/* letter */}
      <Layer d={9}>
        <g filter="url(#eml)">
          <rect x="78" y="64" width="72" height="58" rx="6" fill="#fff" />
        </g>
        <rect x="90" y="78" width="46" height="5" rx="2.5" fill="#ff8b5e" />
        <rect x="90" y="90" width="32" height="5" rx="2.5" fill="#ffc9b0" />
      </Layer>
      {/* envelope front */}
      <Layer d={6}>
        <g filter="url(#eml)">
          <rect x="58" y="96" width="112" height="60" rx="9" fill="url(#eml-w)" />
        </g>
        <path d="M60 100l54 36 54-36" fill="none" stroke="#efe6e0" strokeWidth="2" />
      </Layer>
      {/* @ tile */}
      <Layer d={18}>
        <g filter="url(#eml)">
          <rect x="26" y="114" width="42" height="42" rx="10" fill="#fff" />
        </g>
        <text x="47" y="144" textAnchor="middle" fontSize="26" fontWeight="700" fontFamily="Inter, sans-serif" fill={ORANGE}>
          @
        </text>
      </Layer>
      <Layer d={20}>
        <path d="M178 140q18-2 12 20" fill="none" stroke={ORANGE} strokeWidth="1.8" strokeDasharray="3 4" strokeLinecap="round" />
      </Layer>
    </svg>
  )
}

export function WebsiteArt(props) {
  return (
    <svg viewBox="0 0 240 190" aria-hidden="true" {...props}>
      <Shadows id="web" />
      <Layer d={-4}>
        <rect x="146" y="46" width="64" height="76" rx="12" fill="#ffdccb" opacity="0.75" />
      </Layer>
      {/* window */}
      <Layer d={5}>
        <g filter="url(#web)">
          <rect x="44" y="38" width="152" height="112" rx="12" fill="#fff" />
        </g>
        <path d="M44 50a12 12 0 0 1 12-12h128a12 12 0 0 1 12 12v10H44z" fill="#1d1d1f" />
        <circle cx="58" cy="49" r="3.5" fill={ORANGE} />
        <circle cx="69" cy="49" r="3.5" fill={ORANGE} />
        <circle cx="80" cy="49" r="3.5" fill="#fff" />
        <rect x="166" y="46" width="20" height="6" rx="3" fill="#555" />
        <rect x="58" y="72" width="44" height="6" rx="3" fill="#e8e6e4" />
        <rect x="58" y="84" width="30" height="6" rx="3" fill="#e8e6e4" />
        <rect x="120" y="68" width="58" height="42" rx="6" fill="#f1efed" />
        <path d="M128 102l14-18 10 12 8-8 16 14z" fill="#b9b6b3" />
        <circle cx="162" cy="78" r="5" fill={ORANGE} />
      </Layer>
      {/* code tile */}
      <Layer d={18}>
        <g filter="url(#web)">
          <rect x="24" y="94" width="50" height="50" rx="12" fill="#fff" />
        </g>
        <text x="49" y="127" textAnchor="middle" fontSize="21" fontWeight="700" fontFamily="Inter, sans-serif" fill={ORANGE}>
          {'</>'}
        </text>
      </Layer>
      {/* button */}
      <Layer d={14}>
        <g filter="url(#web)">
          <rect x="140" y="118" width="64" height="34" rx="9" fill={ORANGE} />
        </g>
        <rect x="150" y="128" width="32" height="4" rx="2" fill="#fff" />
        <rect x="150" y="138" width="22" height="4" rx="2" fill="#ffd0bd" />
      </Layer>
      <Layer d={20}>
        <path d="M208 76q12 14 4 32" fill="none" stroke={ORANGE} strokeWidth="1.8" strokeDasharray="3 4" strokeLinecap="round" />
      </Layer>
    </svg>
  )
}

function Server({ y, d }) {
  return (
    <Layer d={d}>
      <polygon points={`44,${y} 60,${y - 9} 152,${y - 9} 136,${y}`} fill="#f6f3f0" />
      <polygon points={`136,${y} 152,${y - 9} 152,${y + 19} 136,${y + 28}`} fill="#e3ddd8" />
      <rect x="44" y={y} width="92" height="28" rx="6" fill="url(#hos-w)" stroke="#ece7e3" />
      <rect x="54" y={y + 9} width="40" height="10" rx="5" fill="#222" />
      <circle cx="110" cy={y + 14} r="3" fill={ORANGE} />
      <circle cx="122" cy={y + 14} r="3" fill="#ff8b5e" />
    </Layer>
  )
}

export function HostingArt(props) {
  return (
    <svg viewBox="0 0 240 190" aria-hidden="true" {...props}>
      <Shadows id="hos" />
      <Layer d={-3}>
        <circle cx="112" cy="102" r="64" fill={SOFT} />
      </Layer>
      <Layer d={-5}>
        <ellipse cx="96" cy="170" rx="66" ry="8" fill="#ffd9c7" opacity="0.7" />
      </Layer>
      <Layer d={16}>
        <circle cx="30" cy="112" r="7" fill={ORANGE} />
      </Layer>
      <Server y={134} d={4} />
      <Server y={104} d={8} />
      <Server y={74} d={12} />
      {/* cloud */}
      <Layer d={20}>
        <g fill={ORANGE}>
          <circle cx="184" cy="52" r="14" />
          <circle cx="202" cy="40" r="18" />
          <circle cx="220" cy="54" r="13" />
          <rect x="184" y="52" width="36" height="15" rx="7" />
        </g>
      </Layer>
      <Layer d={14}>
        <path d="M204 74v26q0 10-10 10h-24" fill="none" stroke={ORANGE} strokeWidth="1.8" strokeDasharray="3 4" strokeLinecap="round" />
      </Layer>
    </svg>
  )
}

// All four services in one picture, for the package card
export function PackageArt() {
  return (
    <svg viewBox="0 0 460 360" aria-hidden="true">
      <Layer d={-4}>
        <circle cx="230" cy="180" r="172" fill="#fff6f1" />
      </Layer>
      <Layer d={-2}>
        <circle cx="230" cy="180" r="118" fill={SOFT} />
      </Layer>
      <Layer d={5}>
        <DomainArt x="0" y="2" width="230" height="182" />
      </Layer>
      <Layer d={9}>
        <EmailArt x="230" y="2" width="230" height="182" />
      </Layer>
      <Layer d={9}>
        <WebsiteArt x="0" y="176" width="230" height="182" />
      </Layer>
      <Layer d={5}>
        <HostingArt x="230" y="176" width="230" height="182" />
      </Layer>
    </svg>
  )
}

export function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function Spark() {
  return (
    <svg className="spark" viewBox="0 0 40 40" aria-hidden="true">
      <path d="M8 6l4 12M20 2l-2 12M34 12l-12 8" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Ribbon: a bundle of fine orange lines that sweeps across the service cards,
// fanning wide at both ends and pinching near the middle. Built once at load.
// u = 0..1 across the grid, y = 0..1 down it.
// ---------------------------------------------------------------------------
const RIBBON_CENTER = [
  [0, 0.31], [0.14, 0.31], [0.25, 0.285], [0.34, 0.37], [0.47, 0.4],
  [0.55, 0.365], [0.66, 0.25], [0.74, 0.21], [0.82, 0.26], [0.94, 0.35], [1, 0.365],
]
const RIBBON_WIDTH = [
  [0, 0.28], [0.135, 0.19], [0.25, 0.085], [0.34, 0.04], [0.475, 0.012],
  [0.55, 0.06], [0.66, 0.1], [0.74, 0.115], [0.87, 0.22], [1, 0.33],
]

// smooth curve through the points (cubic Hermite, Catmull-Rom tangents)
function curveAt(pts, u) {
  let i = 0
  while (i < pts.length - 2 && u > pts[i + 1][0]) i++
  const [x0, y0] = pts[i]
  const [x1, y1] = pts[i + 1]
  const slope = (k) => {
    const a = pts[Math.max(k - 1, 0)]
    const b = pts[Math.min(k + 1, pts.length - 1)]
    return (b[1] - a[1]) / (b[0] - a[0])
  }
  const dx = x1 - x0
  const t = (u - x0) / dx
  const t2 = t * t
  const t3 = t2 * t
  return (
    (2 * t3 - 3 * t2 + 1) * y0 +
    (t3 - 2 * t2 + t) * dx * slope(i) +
    (-2 * t3 + 3 * t2) * y1 +
    (t3 - t2) * dx * slope(i + 1)
  )
}

// the cards are wider than tall, so stretch the sweep vertically to keep its proportions
const RIBBON_SCALE = 1.4

// Build the lines in real pixels (w x h) so strokes stay 1px and the draw-on
// animation (stroke-dashoffset) behaves the same in every browser.
function ribbonLines(w, h) {
  if (!w || !h) return []
  const count = 34
  const steps = 110
  return Array.from({ length: count }, (_, i) => {
    const t = (i / (count - 1)) * 2 - 1 // -1 .. 1 across the ribbon
    let d = ''
    for (let s = 0; s <= steps; s++) {
      const u = s / steps
      const half = (Math.max(curveAt(RIBBON_WIDTH, u), 0.004) * RIBBON_SCALE) / 2
      const mid = 0.3 + (curveAt(RIBBON_CENTER, u) - 0.3) * RIBBON_SCALE
      const y = mid + t * half + 0.004 * Math.sin(u * 20 + t * 3)
      d += `${s ? 'L' : 'M'}${(u * w).toFixed(1)} ${(y * h).toFixed(1)}`
    }
    return { d, opacity: 0.2 + 0.5 * (1 - Math.abs(t)) }
  })
}

export function Ribbon() {
  const ref = useRef(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const el = ref.current
    const update = () => {
      const r = el.getBoundingClientRect()
      setSize({ w: Math.round(r.width), h: Math.round(r.height) })
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <svg ref={ref} className="ribbon" viewBox={`0 0 ${size.w || 1} ${size.h || 1}`} aria-hidden="true">
      <g fill="none" stroke={ORANGE} strokeWidth="1">
        {ribbonLines(size.w, size.h).map(({ d, opacity }, i) => (
          <path key={i} d={d} pathLength="1" strokeOpacity={opacity} style={{ '--i': i }} />
        ))}
      </g>
    </svg>
  )
}
