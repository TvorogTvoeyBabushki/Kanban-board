import { FunctionComponent } from 'react'

import styles from './Footer.module.scss'

const Footer: FunctionComponent = () => {
	return (
		<footer className={styles.footer}>
			<div className='container'>Footer</div>
		</footer>
	)
}

export default Footer
