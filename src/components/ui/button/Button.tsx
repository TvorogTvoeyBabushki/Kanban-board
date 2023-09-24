import { ButtonHTMLAttributes, FunctionComponent } from 'react'
import clsx from 'clsx'

import styles from './Button.module.scss'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: string
}

const Button: FunctionComponent<IButton> = ({
	children,
	onClick,
	disabled,
	variant
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={clsx(styles.btn, {
				[styles.submit]: variant !== 'add-card'
			})}
		>
			{variant === 'add-card' && <span>+</span>}
			{children}
		</button>
	)
}

export default Button
