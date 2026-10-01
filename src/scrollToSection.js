// Scrolls so a section's content sits centred in the space below the header, instead of
// the browser's default of aligning the section's top edge.
//
// A section can carry data-scroll-through="id": its stretch then runs down to the bottom
// of that element too, so both end up in view together (when the screen is tall enough).
export function scrollToSection(target, through = target.dataset.scrollThrough) {
  const header = document.querySelector('.site-header').offsetHeight
  const style = getComputedStyle(target)
  const padTop = parseFloat(style.paddingTop)
  const padBottom = parseFloat(style.paddingBottom)
  const box = target.getBoundingClientRect()
  const contentTop = box.top + window.scrollY + padTop
  let contentBottom = box.bottom + window.scrollY - padBottom

  const last = through && document.getElementById(through)
  if (last) contentBottom = last.getBoundingClientRect().bottom + window.scrollY
  const contentHeight = contentBottom - contentTop

  // split the leftover room evenly above and below; if the content is taller than
  // the screen, just start it a little under the header
  const spare = window.innerHeight - header - contentHeight
  const top = contentTop - header - Math.max(spare / 2, 16)
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: Math.max(top, 0), behavior: calm ? 'auto' : 'smooth' })
}
