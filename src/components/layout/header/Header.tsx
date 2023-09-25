import { FunctionComponent, useEffect, useState } from 'react'

import User from '@/components/ui/user/User'

import styles from './Header.module.scss'
import Logo from './logo/Logo'

const Header: FunctionComponent = () => {
	const [widthWindow, setWidthWindow] = useState(
		document.documentElement.clientWidth
	)

	useEffect(() => {
		window.addEventListener('resize', () =>
			setWidthWindow(document.documentElement.clientWidth)
		)

		return () =>
			window.removeEventListener('resize', () =>
				setWidthWindow(document.documentElement.clientWidth)
			)
	}, [])

	return (
		<header className={styles.header}>
			<div className='container'>
				<div>
					{widthWindow > 600 && <Logo />}
					<User />
				</div>
			</div>
		</header>
	)
}

export default Header
