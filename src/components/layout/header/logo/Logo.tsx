import { FunctionComponent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import styles from './Logo.module.scss'

const Logo: FunctionComponent = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()

	const handleLinkHomeClick = () => {
		if (pathname !== '/Kanban-board') {
			navigate('/Kanban-board')
		}
	}

	return (
		<h1 onClick={handleLinkHomeClick} className={styles.logo}>
			Awesome Kanban Board
		</h1>
	)
}

export default Logo
