import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { badgeDot, badgeVariants, buttonBase, buttonSizes, buttonVariants, card, cardDescription, cardFooter, cardHeader, cardTitle } from './components.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof buttonVariants; size?: keyof typeof buttonSizes; leading?: ReactNode }
export function Button({ variant = 'primary', size = 'medium', leading, className, children, ...props }: ButtonProps) {
  return <button className={[buttonBase, buttonVariants[variant], buttonSizes[size], className].filter(Boolean).join(' ')} {...props}>{leading}{children}</button>
}

type CardProps = HTMLAttributes<HTMLElement> & { children: ReactNode }
export function Card({ className, children, ...props }: CardProps) { return <article className={[card, className].filter(Boolean).join(' ')} {...props}>{children}</article> }
export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={[cardHeader, className].filter(Boolean).join(' ')} {...props}>{children}</div> }
export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) { return <h2 className={[cardTitle, className].filter(Boolean).join(' ')} {...props}>{children}</h2> }
export function CardDescription({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) { return <p className={[cardDescription, className].filter(Boolean).join(' ')} {...props}>{children}</p> }
export function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={[cardFooter, className].filter(Boolean).join(' ')} {...props}>{children}</div> }

export function Badge({ variant = 'success', children }: { variant?: keyof typeof badgeVariants; children: ReactNode }) {
  return <span className={badgeVariants[variant]}><span className={badgeDot} aria-hidden="true" />{children}</span>
}
