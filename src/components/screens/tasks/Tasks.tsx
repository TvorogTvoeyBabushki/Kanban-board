import { FunctionComponent } from 'react'

import Layout from '@/components/layout/Layout'

import TasksInfo from './info/TasksInfo'
import styles from './Tasks.module.scss'
import { useTasks } from './useTasks'
import NotFound from '../not-found/NotFound'

const Tasks: FunctionComponent = () => {
	const { isNotFoundTaskId, ...rest } = useTasks()

	return (
		<>
			{isNotFoundTaskId ? (
				<NotFound />
			) : (
				<Layout>
					<main>
						<div className='container'>
							<section className={styles.task_wrapper}>
								<TasksInfo {...rest} />
							</section>
						</div>
					</main>
				</Layout>
			)}
		</>
	)
}

export default Tasks
