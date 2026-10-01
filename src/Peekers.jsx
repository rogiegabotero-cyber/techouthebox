// ---------------------------------------------------------------------------
// Peekers: the little elements from the card's artwork, scattered behind the
// package card so they look like they are being pulled out from behind it.
// Drawn on a 1100 x 700 canvas; the card covers the middle 280..820.
// Each piece slides out from behind the card (see .peek in App.css) and then bobs.
// ---------------------------------------------------------------------------

const ORANGE = '#ff5a1f'
const shadow = 'url(#peek-shadow)'

// pieces are drawn around their own centre, then placed, tilted and scaled here
function Piece({ x, y, rot = 0, s = 1, i, dur = 6, children }) {
  // the offset it starts from: halfway back toward the middle of the card
  const fx = Math.round((550 - x) * 0.5)
  const fy = Math.round((350 - y) * 0.5)
  return (
    <g className="peek" style={{ '--i': i, '--fx': `${fx}px`, '--fy': `${fy}px` }}>
      <g className="peek-bob" style={{ '--dur': `${dur}s`, '--delay': `-${(i * 0.9).toFixed(1)}s` }}>
        <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>{children}</g>
      </g>
    </g>
  )
}

function WindowPiece() {
  return (
    <g transform="translate(-120 -94)">
      <g filter={shadow}>
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
    </g>
  )
}

function GlobePiece() {
  return (
    <g transform="translate(-110 -62)" fill="none" stroke="#1a1a1a" strokeWidth="3.5">
      <circle cx="110" cy="62" r="40" fill="#fff" />
      <ellipse cx="110" cy="62" rx="18" ry="40" />
      <path d="M70 62h80M77 40h66M77 84h66" />
    </g>
  )
}

function ServerPiece() {
  return (
    <g transform="translate(-98 -118)">
      {[134, 104, 74].map((y) => (
        <g key={y}>
          <polygon points={`44,${y} 60,${y - 9} 152,${y - 9} 136,${y}`} fill="#f6f3f0" />
          <polygon points={`136,${y} 152,${y - 9} 152,${y + 19} 136,${y + 28}`} fill="#e3ddd8" />
          <rect x="44" y={y} width="92" height="28" rx="6" fill="url(#peek-w)" stroke="#ece7e3" />
          <rect x="54" y={y + 9} width="40" height="10" rx="5" fill="#222" />
          <circle cx="110" cy={y + 14} r="3" fill={ORANGE} />
          <circle cx="122" cy={y + 14} r="3" fill="#ff8b5e" />
        </g>
      ))}
    </g>
  )
}

function EnvelopePiece() {
  return (
    <g transform="translate(-114 -105)">
      <path d="M58 98l56-42 56 42z" fill="#ff8b5e" />
      <g filter={shadow}>
        <rect x="78" y="64" width="72" height="58" rx="6" fill="#fff" />
      </g>
      <rect x="90" y="78" width="46" height="5" rx="2.5" fill="#ff8b5e" />
      <rect x="90" y="90" width="32" height="5" rx="2.5" fill="#ffc9b0" />
      <g filter={shadow}>
        <rect x="58" y="96" width="112" height="60" rx="9" fill="url(#peek-w)" />
      </g>
      <path d="M60 100l54 36 54-36" fill="none" stroke="#efe6e0" strokeWidth="2" />
    </g>
  )
}

function PlanePiece() {
  return (
    <g transform="translate(-195 -52)">
      <path d="M176 52l38-20-14 40z" fill={ORANGE} />
      <path d="M176 52l22 8-4 12z" fill="#d9430f" />
    </g>
  )
}

function AtPiece() {
  return (
    <g transform="translate(-47 -135)">
      <g filter={shadow}>
        <rect x="26" y="114" width="42" height="42" rx="10" fill="#fff" />
      </g>
      <text x="47" y="144" textAnchor="middle" fontSize="26" fontWeight="700" fontFamily="Inter, sans-serif" fill={ORANGE}>
        @
      </text>
    </g>
  )
}

function CodePiece() {
  return (
    <g transform="translate(-49 -119)">
      <g filter={shadow}>
        <rect x="24" y="94" width="50" height="50" rx="12" fill="#fff" />
      </g>
      <text x="49" y="127" textAnchor="middle" fontSize="21" fontWeight="700" fontFamily="Inter, sans-serif" fill={ORANGE}>
        {'</>'}
      </text>
    </g>
  )
}

function ButtonPiece() {
  return (
    <g transform="translate(-172 -135)">
      <g filter={shadow}>
        <rect x="140" y="118" width="64" height="34" rx="9" fill={ORANGE} />
      </g>
      <rect x="150" y="128" width="32" height="4" rx="2" fill="#fff" />
      <rect x="150" y="138" width="22" height="4" rx="2" fill="#ffd0bd" />
    </g>
  )
}

function UrlPiece() {
  return (
    <g transform="translate(-118 -120)">
      <g filter={shadow}>
        <rect x="22" y="88" width="192" height="64" rx="14" fill="url(#peek-w)" />
      </g>
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
  )
}

function CloudPiece() {
  return (
    <g transform="translate(-202 -48)" fill={ORANGE}>
      <circle cx="184" cy="52" r="14" />
      <circle cx="202" cy="40" r="18" />
      <circle cx="220" cy="54" r="13" />
      <rect x="184" y="52" width="36" height="15" rx="7" />
    </g>
  )
}

const Orb = ({ r }) => <circle r={r} fill={ORANGE} />

const Dashed = ({ d }) => (
  <path d={d} fill="none" stroke={ORANGE} strokeWidth="1.8" strokeDasharray="3 4" strokeLinecap="round" />
)

// [component, props] in the order they slide out
const PIECES = [
  // left side
  [WindowPiece, { x: 252, y: 172, rot: -7, dur: 6.5 }],
  [GlobePiece, { x: 268, y: 346, rot: -3, s: 0.95, dur: 7.5 }],
  [ServerPiece, { x: 250, y: 520, rot: 5, s: 0.9, dur: 6 }],
  [AtPiece, { x: 150, y: 258, rot: -12, dur: 5.5 }],
  [Orb, { x: 118, y: 118, dur: 7, r: 22 }],
  [Orb, { x: 64, y: 332, dur: 5, r: 11 }],
  [Orb, { x: 176, y: 612, dur: 6.5, r: 15 }],
  [Dashed, { x: 96, y: 430, dur: 8, d: 'M0 0q-8 26 22 40' }],
  // right side
  [EnvelopePiece, { x: 842, y: 176, rot: 7, s: 1.05, dur: 7 }],
  [PlanePiece, { x: 990, y: 104, rot: 4, s: 1.1, dur: 6 }],
  [CodePiece, { x: 916, y: 326, rot: 9, dur: 5.5 }],
  [ButtonPiece, { x: 846, y: 456, rot: -6, dur: 6.5 }],
  [CloudPiece, { x: 958, y: 546, s: 1.1, dur: 7.5 }],
  [UrlPiece, { x: 882, y: 612, rot: 5, s: 0.85, dur: 6 }],
  [Orb, { x: 1030, y: 250, dur: 7, r: 26 }],
  [Orb, { x: 1056, y: 402, dur: 5, r: 11 }],
  [Orb, { x: 1004, y: 648, dur: 6.5, r: 13 }],
  [Dashed, { x: 900, y: 168, dur: 8, d: 'M0 0q34 -34 70 -20' }],
  [Dashed, { x: 968, y: 600, dur: 8.5, d: 'M0 0v34q0 10 -10 10h-32' }],
]

function Peekers() {
  return (
    <svg className="peekers" viewBox="0 0 1100 700" aria-hidden="true">
      <defs>
        <filter id="peek-shadow" x="-25%" y="-25%" width="150%" height="170%">
          <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor={ORANGE} floodOpacity="0.18" />
        </filter>
        <linearGradient id="peek-w" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f2efec" />
        </linearGradient>
      </defs>
      {PIECES.map(([Component, { x, y, rot, s, dur, ...props }], i) => (
        <Piece key={i} x={x} y={y} rot={rot} s={s} dur={dur} i={i}>
          <Component {...props} />
        </Piece>
      ))}
    </svg>
  )
}

export default Peekers
