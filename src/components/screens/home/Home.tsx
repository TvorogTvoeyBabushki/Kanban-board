import { FunctionComponent, useEffect, useState } from 'react'

import Layout from '@/components/layout/Layout'
import CardTask from '@/components/ui/card-task/CardTask'

import styles from './Home.module.scss'

export interface IDataTasks {
	block: string
	id: number
	title: string
	description: string
}

const Home: FunctionComponent = () => {
	const [dataTasks, setDataTasks] = useState<IDataTasks[]>([])

	useEffect(() => {
		if (localStorage.getItem('tasks')) {
			setDataTasks(JSON.parse(localStorage.getItem('tasks') as string))
		}
	}, [])

	return (
		<Layout>
			<main>
				<div className='container'>
					<section className={styles.kanban_board}>
						<CardTask
							dataTasks={dataTasks}
							setDataTasks={setDataTasks}
							title='Backlog'
							variant='backlog'
						/>
						<CardTask
							dataTasks={dataTasks}
							setDataTasks={setDataTasks}
							title='Ready'
							variant='ready'
						/>
						<CardTask
							dataTasks={dataTasks}
							setDataTasks={setDataTasks}
							title='In Progress'
							variant='progress'
						/>
						<CardTask
							dataTasks={dataTasks}
							setDataTasks={setDataTasks}
							title='Finished'
							variant='finished'
						/>
					</section>
				</div>
			</main>
		</Layout>
	)
}

export default Home
