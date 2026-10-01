// ---------------------------------------------------------------------------
// Backdrop: a faded layer of circles, broken spirals, clouds and patterns that sits
// behind the package card AND the pieces peeking out from behind it.
// Drawn on a 1500 x 800 canvas; the card sits in the middle (x 480..1020, y 100..670).
// Everything is pale orange at low opacity, so it adds texture without competing.
// ---------------------------------------------------------------------------

const ORANGE = '#ff5a1f'

// an Archimedean spiral around (0, 0), as a polyline
function spiralPath(outerRadius, turns) {
  const spread = outerRadius / (turns * Math.PI * 2)
  let d = ''
  for (let a = 0.4; a <= turns * Math.PI * 2; a += 0.18) {
    const r = spread * a
    d += `${d ? 'L' : 'M'}${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`
  }
  return d
}

// a wavy horizontal line starting at (0, 0)
function wavePath(length, amplitude, wavelength) {
  let d = ''
  for (let x = 0; x <= length; x += 6) {
    d += `${d ? 'L' : 'M'}${x} ${(Math.sin((x / wavelength) * Math.PI * 2) * amplitude).toFixed(1)}`
  }
  return d
}

const SPIRALS = [
  // x, y, outer radius, turns, rotation, opacity, dash pattern, spin seconds
  { x: 250, y: 480, r: 118, turns: 3.2, rot: 20, o: 0.3, dash: '46 12 8 12 90 18 14 12', spin: 140 },
  { x: 1250, y: 215, r: 135, turns: 3.4, rot: 200, o: 0.28, dash: '60 14 10 14 34 18', spin: 170 },
  { x: 1390, y: 560, r: 70, turns: 2.6, rot: 90, o: 0.32, dash: '28 10 6 10 52 14', spin: 120 },
  { x: 130, y: 190, r: 62, turns: 2.4, rot: 300, o: 0.3, dash: '24 9 5 9 44 12', spin: 110 },
  { x: 760, y: 745, r: 52, turns: 2.2, rot: 150, o: 0.22, dash: '20 8 5 8 38 10', spin: 130 },
]

const SPIRAL_PATHS = SPIRALS.map((s) => spiralPath(s.r, s.turns))

const CIRCLES = [
  // x, y, radius, opacity   (filled)
  [170, 150, 92, 0.07],
  [1335, 105, 72, 0.08],
  [118, 585, 62, 0.06],
  [1385, 620, 112, 0.06],
  [330, 725, 42, 0.09],
  [1165, 735, 52, 0.08],
  [58, 340, 30, 0.1],
  [1450, 372, 24, 0.1],
  [610, 70, 36, 0.06],
  [905, 40, 26, 0.08],
]

const RINGS = [
  // x, y, radius, opacity, dashed?
  [250, 305, 122, 0.16, false],
  [250, 305, 158, 0.1, true],
  [1255, 350, 150, 0.13, false],
  [1300, 645, 84, 0.16, true],
  [175, 150, 128, 0.1, true],
  [1130, 90, 46, 0.18, false],
]

const CLOUDS = [
  // x, y, scale, opacity, outline?, drift distance, drift seconds
  [425, 112, 1.25, 0.14, false, 18, 16],
  [1105, 70, 0.9, 0.13, false, -14, 14],
  [205, 650, 1.1, 0.12, false, 16, 18],
  [1325, 470, 1.5, 0.1, false, -20, 20],
  [815, 770, 1, 0.1, false, 12, 15],
  [640, 40, 0.7, 0.12, true, -10, 13],
  [400, 440, 0.8, 0.22, true, 12, 17],
  [1050, 680, 0.9, 0.2, true, -14, 16],
  [90, 430, 0.7, 0.18, true, 10, 12],
]

const WAVES = [
  // x, y, length, amplitude, wavelength, opacity
  [70, 705, 330, 9, 70, 0.26],
  [70, 725, 330, 9, 70, 0.18],
  [70, 745, 330, 9, 70, 0.11],
  [1090, 55, 330, 8, 60, 0.24],
  [1090, 73, 330, 8, 60, 0.16],
  [1090, 91, 330, 8, 60, 0.1],
]

const cloudPath = 'M-34 14a14 14 0 0 1 4-27 18 18 0 0 1 34-6 13 13 0 0 1 16 14 12 12 0 0 1-4 19z'

function Backdrop() {
  return (
    <svg className="backdrop" viewBox="0 0 1500 800" aria-hidden="true">
      <defs>
        <pattern id="bd-dots" width="15" height="15" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.7" fill={ORANGE} />
        </pattern>
        <pattern id="bd-plus" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M12 6v12M6 12h12" stroke={ORANGE} strokeWidth="1.6" strokeLinecap="round" />
        </pattern>
        <pattern id="bd-hatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0v12" stroke={ORANGE} strokeWidth="1.4" />
        </pattern>
        {/* an invisible circle around the card: solid inside, fading out toward its rim */}
        <radialGradient id="bd-fade" gradientUnits="userSpaceOnUse" cx="750" cy="390" r="560">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.72" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id="bd-mask" maskUnits="userSpaceOnUse" x="0" y="-200" width="1500" height="1200">
          <rect x="0" y="-200" width="1500" height="1200" fill="url(#bd-fade)" />
        </mask>
      </defs>

      {/* everything lives inside that circle, centred on the card */}
      <g mask="url(#bd-mask)">
        <g transform="translate(750 400) scale(0.9) translate(-750 -400)">
      {/* patterns, clipped into soft shapes */}
      <circle cx="1155" cy="560" r="92" fill="url(#bd-dots)" opacity="0.3" />
      <rect x="260" y="238" width="170" height="112" rx="28" fill="url(#bd-dots)" opacity="0.26" />
      <rect x="1260" y="268" width="150" height="120" rx="60" fill="url(#bd-plus)" opacity="0.3" />
      <circle cx="120" cy="650" r="70" fill="url(#bd-hatch)" opacity="0.2" />
      <circle cx="1380" cy="745" r="48" fill="url(#bd-dots)" opacity="0.28" />

      {/* faded circles and rings */}
      {CIRCLES.map(([x, y, r, o], i) => (
        <circle key={`c${i}`} cx={x} cy={y} r={r} fill={ORANGE} opacity={o} />
      ))}
      {RINGS.map(([x, y, r, o, dashed], i) => (
        <circle
          key={`r${i}`}
          cx={x}
          cy={y}
          r={r}
          fill="none"
          stroke={ORANGE}
          strokeWidth="1.5"
          strokeDasharray={dashed ? '4 9' : undefined}
          opacity={o}
        />
      ))}

      {/* wavy lines */}
      {WAVES.map(([x, y, length, amplitude, wavelength, o], i) => (
        <path
          key={`w${i}`}
          transform={`translate(${x} ${y})`}
          d={wavePath(length, amplitude, wavelength)}
          fill="none"
          stroke={ORANGE}
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity={o}
        />
      ))}

      {/* broken spirals (dashed with uneven gaps), turning very slowly */}
      {SPIRALS.map((s, i) => (
        <g key={`s${i}`} transform={`translate(${s.x} ${s.y}) rotate(${s.rot})`}>
          <path
            className="bd-spin"
            style={{ '--spin': `${s.spin}s` }}
            d={SPIRAL_PATHS[i]}
            fill="none"
            stroke={ORANGE}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray={s.dash}
            opacity={s.o}
          />
        </g>
      ))}

      {/* clouds, drifting sideways */}
      {CLOUDS.map(([x, y, scale, o, outline, drift, dur], i) => (
        <g key={`k${i}`} transform={`translate(${x} ${y}) scale(${scale})`}>
          <path
            className="bd-drift"
            style={{ '--drift': `${drift}px`, '--dur': `${dur}s`, '--delay': `-${i * 2.1}s` }}
            d={cloudPath}
            fill={outline ? 'none' : ORANGE}
            stroke={outline ? ORANGE : 'none'}
            strokeWidth="2.2"
            strokeDasharray={outline ? '6 7' : undefined}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={o}
          />
        </g>
      ))}
        </g>
      </g>
    </svg>
  )
}

export default Backdrop
