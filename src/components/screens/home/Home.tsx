import { FunctionComponent } from 'react'

import Layout from '@/components/layout/Layout'
import CardTask from '@/components/ui/card-task/CardTask'

import styles from './Home.module.scss'

const Home: FunctionComponent = () => {
	return (
		<Layout>
			<main>
				<div className='container'>
					<section className={styles.kanban_board}>
						<CardTask title='Backlog' variant='backlog' />
						<CardTask title='Ready' variant='ready' />
						<CardTask title='In Progress' variant='progress' />
						<CardTask title='Finished' variant='finished' />
					</section>
				</div>
			</main>
		</Layout>
	)
}

export default Home
