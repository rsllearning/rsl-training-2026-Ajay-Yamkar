import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from './theme.css'

export const buttonBase = style({
  appearance: 'none', border: '1px solid transparent', borderRadius: vars.radius.md, cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: vars.space[2],
  fontFamily: 'inherit', fontWeight: 600, lineHeight: 1, whiteSpace: 'nowrap',
  transition: 'background-color 150ms ease, color 150ms ease, border-color 150ms ease, box-shadow 150ms ease, transform 150ms ease',
  selectors: {
    '&:focus-visible': { outline: '3px solid #b9d6c6', outlineOffset: 2 },
    '&:active:not(:disabled)': { transform: 'translateY(1px)' },
    '&:disabled': { cursor: 'not-allowed', opacity: 0.45 },
  },
})

export const buttonVariants = styleVariants({
  primary: { background: vars.color.primary, color: '#fff', selectors: { '&:hover:not(:disabled)': { background: vars.color.primaryHover } } },
  secondary: { background: vars.color.paper, borderColor: vars.color.line, color: vars.color.ink, selectors: { '&:hover:not(:disabled)': { background: vars.color.canvas, borderColor: '#cbd4ce' } } },
  danger: { background: vars.color.danger, color: '#fff', selectors: { '&:hover:not(:disabled)': { background: '#873832' } } },
})

export const buttonSizes = styleVariants({
  small: { minHeight: '2rem', padding: `0 ${vars.space[3]}`, fontSize: vars.type.label },
  medium: { minHeight: '2.5rem', padding: `0 ${vars.space[4]}`, fontSize: vars.type.small },
  large: { minHeight: '3rem', padding: `0 ${vars.space[5]}`, fontSize: vars.type.body },
})

export const card = style({ background: vars.color.paper, border: `1px solid ${vars.color.line}`, borderRadius: vars.radius.lg, boxShadow: vars.shadow.card, padding: vars.space[5], '@media': { '(min-width: 640px)': { padding: vars.space[6] } } })
export const cardHeader = style({ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: vars.space[4], marginBottom: vars.space[4] })
export const cardTitle = style({ margin: 0, color: vars.color.ink, fontSize: vars.type.body, fontWeight: 600, letterSpacing: '-0.02em' })
export const cardDescription = style({ margin: `${vars.space[1]} 0 0`, color: vars.color.muted, fontSize: vars.type.small, lineHeight: 1.55 })
export const cardFooter = style({ borderTop: `1px solid ${vars.color.line}`, marginTop: vars.space[5], paddingTop: vars.space[4], display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: vars.space[3] })

const badgeBase = style({ display: 'inline-flex', alignItems: 'center', gap: vars.space[2], borderRadius: vars.radius.pill, padding: `${vars.space[1]} ${vars.space[3]}`, fontSize: vars.type.label, fontWeight: 600, lineHeight: 1.3 })
export const badgeVariants = styleVariants({
  success: [badgeBase, { background: vars.color.successSoft, color: vars.color.success }],
  warning: [badgeBase, { background: vars.color.warningSoft, color: vars.color.warning }],
  error: [badgeBase, { background: vars.color.dangerSoft, color: vars.color.danger }],
})
export const badgeDot = style({ width: 6, height: 6, borderRadius: vars.radius.pill, background: 'currentColor' })
