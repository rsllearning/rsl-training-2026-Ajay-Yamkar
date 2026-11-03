import { createTheme, createThemeContract } from '@vanilla-extract/css'

export const vars = createThemeContract({
  color: { ink: '', muted: '', line: '', paper: '', canvas: '', primary: '', primaryHover: '', primarySoft: '', danger: '', dangerSoft: '', success: '', successSoft: '', warning: '', warningSoft: '' },
  space: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 8: '' },
  radius: { sm: '', md: '', lg: '', pill: '' },
  shadow: { card: '', raised: '' },
  type: { body: '', small: '', label: '', title: '' },
})

export const themeClass = createTheme(vars, {
  color: { ink: '#172321', muted: '#65746f', line: '#e8ebe7', paper: '#ffffff', canvas: '#f7f8f6', primary: '#477b62', primaryHover: '#35684f', primarySoft: '#eff6f2', danger: '#a9443d', dangerSoft: '#fff0ee', success: '#35684f', successSoft: '#eff6f2', warning: '#9c642d', warningSoft: '#fff4e9' },
  space: { 1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem', 5: '1.25rem', 6: '1.5rem', 8: '2rem' },
  radius: { sm: '0.5rem', md: '0.75rem', lg: '1.125rem', pill: '999px' },
  shadow: { card: '0 8px 28px -18px rgb(23 35 33 / 22%)', raised: '0 14px 32px -18px rgb(23 35 33 / 30%)' },
  type: { body: '1rem', small: '0.875rem', label: '0.75rem', title: '1.5rem' },
})
