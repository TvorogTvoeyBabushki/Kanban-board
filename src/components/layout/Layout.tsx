import { FunctionComponent, ReactNode } from 'react'

import styles from './Layout.module.scss'
import Header from './header/Header'
import Footer from './footer/Footer'

const Layout: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
	return (
		<section className={styles.layout}>
			<Header />
			{children}
			<Footer />
		</section>
	)
}

export default Layout
