// Feed the cursor position (-1..1) to a card so its artwork layers can shift with it
export const cardPointer = {
  onPointerMove(e) {
    const card = e.currentTarget
    const r = card.getBoundingClientRect()
    card.style.setProperty('--mx', (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3))
    card.style.setProperty('--my', (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3))
  },
  onPointerLeave(e) {
    e.currentTarget.style.setProperty('--mx', 0)
    e.currentTarget.style.setProperty('--my', 0)
  },
}
