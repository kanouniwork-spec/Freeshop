import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

type Variant = 'gold' | 'outline' | 'ghost' | 'danger'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  Variant
  size?:     Size
  loading?:  boolean
  fullWidth?: boolean
}

const variantClasses: Record<Variant, string> = {
  gold:    'bg-gold-500 text-obsidian-900 border border-gold-500 hover:bg-transparent hover:text-gold-400',
  outline: 'bg-transparent text-gold-500 border border-gold-500 hover:bg-gold-500 hover:text-obsidian-900',
  ghost:   'bg-transparent text-obsidian-300 border border-obsidian-700 hover:border-gold-500 hover:text-gold-400',
  danger:  'bg-red-900/30 text-red-400 border border-red-800 hover:bg-red-900/50',
}

const sizeClasses: Record<Size, string> = {
  sm:  'px-4 py-2 text-xs',
  md:  'px-6 py-3 text-xs',
  lg:  'px-8 py-4 text-sm',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant   = 'gold',
      size      = 'md',
      loading   = false,
      fullWidth = false,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'font-sans font-semibold tracking-widest uppercase',
          'transition-all duration-300',
          'focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-obsidian-900',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {loading && <Loader2 size={14} className="animate-spin" />}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
export default Button
