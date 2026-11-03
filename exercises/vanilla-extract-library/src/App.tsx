import { ArrowDownRight, ArrowUpRight, Check, ChevronRight, CircleHelp, Layers3, Leaf, PackageCheck, Sparkles, WandSparkles } from 'lucide-react'
import { Badge, Button, Card, CardDescription, CardFooter, CardHeader, CardTitle } from './components'
import { themeClass, vars } from './theme.css'
import { brand, brandMark, buttonRow, content, demoPanel, demoPanelLabel, eyebrow, footnote, heading, intro, page, showcase, subheading, swatch, tokenStrip, topActions, topbar } from './app.css'

function App() {
  return <div className={`${themeClass} ${page}`}>
    <header className={topbar}><a href="#top" className={brand} style={{ textDecoration: 'none', color: 'inherit' }}><span className={brandMark}><Leaf size={18} /></span>fieldnotes<span style={{ color: vars.color.primary }}>.</span></a><div className={topActions}><span style={{ color: vars.color.muted, fontSize: 13 }}>Component library</span><Button variant="secondary" size="small" aria-label="Help"><CircleHelp size={15} /></Button></div></header>
    <main id="top" className={content}>
      <div className={eyebrow}><span style={{ width: 19, height: 1, background: vars.color.primary }} />Vanilla Extract · React</div>
      <h1 className={heading}>Small pieces,<br />thoughtfully made.</h1>
      <p className={intro}>A tiny, type-safe component library for everyday interfaces. Styles are composed from shared tokens and compiled to static CSS during the build.</p>

      <div className={showcase}>
        <Card><CardHeader><div><CardTitle>Button</CardTitle><CardDescription>One component, a few clear choices.</CardDescription></div><span className={brandMark} style={{ color: vars.color.primary, background: vars.color.primarySoft }}><WandSparkles size={17} /></span></CardHeader>
          <p className={demoPanelLabel}>Variants</p><div className={buttonRow}><Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="danger">Danger</Button></div>
          <h3 className={subheading}>Sizes</h3><div className={buttonRow}><Button size="small">Small</Button><Button size="medium">Medium</Button><Button size="large">Large</Button></div>
          <h3 className={subheading}>States</h3><div className={buttonRow}><Button leading={<Check size={15} />}>Saved</Button><Button disabled>Disabled</Button></div>
          <CardFooter><span style={{ color: vars.color.muted, fontSize: 12 }}>Try tabbing to a button</span><ChevronRight size={15} color={vars.color.muted} /></CardFooter>
        </Card>

        <Card><CardHeader><div><CardTitle>Badge</CardTitle><CardDescription>Quiet status, easy to scan.</CardDescription></div><span className={brandMark} style={{ color: vars.color.primary, background: vars.color.primarySoft }}><PackageCheck size={17} /></span></CardHeader>
          <p className={demoPanelLabel}>Three semantic variants</p><div className={demoPanel}><div className={buttonRow}><Badge variant="success">On track</Badge><Badge variant="warning">Needs review</Badge><Badge variant="error">Action needed</Badge></div></div>
          <CardFooter><span style={{ color: vars.color.muted, fontSize: 12 }}>Success · Warning · Error</span><ChevronRight size={15} color={vars.color.muted} /></CardFooter>
        </Card>

        <Card><CardHeader><div><CardTitle>Card</CardTitle><CardDescription>A flexible surface with a steady rhythm.</CardDescription></div><span className={brandMark} style={{ color: vars.color.primary, background: vars.color.primarySoft }}><Layers3 size={17} /></span></CardHeader>
          <div className={demoPanel}><p className={demoPanelLabel}>This week <span style={{ float: 'right' }}>Apr 14 – 20</span></p><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><strong style={{ fontSize: 30, letterSpacing: '-.04em' }}>1,284</strong><Badge variant="success"><ArrowUpRight size={12} />12.8%</Badge></div><p style={{ margin: '5px 0 0', color: vars.color.muted, fontSize: 12 }}>Orders placed</p></div>
          <CardFooter><span style={{ color: vars.color.muted, fontSize: 12 }}>Compared to last week</span><ArrowDownRight size={15} color={vars.color.primary} /></CardFooter>
        </Card>
      </div>

      <Card className={tokenStrip}><div style={{ flex: 1, minWidth: 185 }}><p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>Shared design tokens</p><p style={{ margin: '4px 0 0', color: vars.color.muted, fontSize: 12 }}>One source for consistent choices.</p></div><div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', color: vars.color.muted, fontSize: 12 }}><span><i className={swatch} />Primary</span><span>Spacing · 4px – 32px</span><span>Radius · 8px – pill</span></div><Sparkles size={17} color={vars.color.primary} /></Card>
      <p className={footnote}>Vanilla Extract writes locally scoped CSS at build time. Component styles live in <code>*.css.ts</code> files; shared colors, spacing, typography, radius, and shadow come from the typed theme contract.</p>
    </main>
  </div>
}

export default App
