import { FunctionComponent } from 'react'

import styles from './Header.module.scss'

const Header: FunctionComponent = () => {
	return (
		<header className={styles.header}>
			<div className='container'>Header</div>
		</header>
	)
}

export default Header
