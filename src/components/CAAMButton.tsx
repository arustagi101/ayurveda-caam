import * as React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type ButtonVariant = 'primary' | 'secondary' | 'outline'
type ButtonSize = 'sm' | 'md'

interface CAAMButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  showArrow?: boolean
  children: React.ReactNode
  href?: string
  external?: boolean
  className?: string
}

export function CAAMButton({
  variant = 'primary',
  size = 'sm',
  showArrow = false,
  children,
  href,
  external = false,
  className = '',
  ...props
}: CAAMButtonProps) {
  const baseStyles = 'btn'
  
  const variantStyles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
  }

  const sizeStyles = {
    sm: 'btn-sm',
    md: 'btn-md',
  }

  const arrowSize = {
    sm: 'w-3.5 h-3.5 ml-1.5',
    md: 'w-4 h-4 ml-2',
  }

  const buttonContent = (
    <>
      {children}
      {showArrow && (
        <ArrowRight 
          className={cn(arrowSize[size], 'transition-transform duration-200 group-hover:translate-x-1')} 
          aria-hidden="true"
        />
      )}
    </>
  )

  const buttonClass = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    'group',
    className
  )

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
        >
          {buttonContent}
        </a>
      )
    }
    return (
      <a href={href} className={buttonClass}>
        {buttonContent}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={buttonClass}
      {...props}
    >
      {buttonContent}
    </button>
  )
}

export default CAAMButton
