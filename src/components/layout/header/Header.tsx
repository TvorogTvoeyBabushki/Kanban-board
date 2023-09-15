import { FunctionComponent } from 'react'

import User from '@/components/ui/user/User'

import styles from './Header.module.scss'
import Logo from './logo/Logo'

const Header: FunctionComponent = () => {
	return (
		<header className={styles.header}>
			<div className='container'>
				<div>
					<Logo />
					<User />
				</div>
			</div>
		</header>
	)
}

export default Header
