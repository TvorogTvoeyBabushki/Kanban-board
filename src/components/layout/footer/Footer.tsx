import { FunctionComponent, useState, useContext, useMemo } from 'react'

import { IDataTasks } from '@/components/screens/home/Home'

import { ITaskContext, TaskContext } from '@/providers/TaskProvider'

import { user } from '@/data/user/user.data'

import styles from './Footer.module.scss'

const Footer: FunctionComponent = () => {
	const [amountActiveTasks, setAmountActiveTasks] = useState<number>(0)
	const [amountFinishedTasks, setAmountFinishedTasks] = useState<number>(0)
	const { isInteractionPostDataPost } = useContext(TaskContext) as ITaskContext

	useMemo(() => {
		const dataTasksLS = localStorage.getItem('tasks')
			? (JSON.parse(localStorage.getItem('tasks') as string) as IDataTasks[])
			: []
		const activeDataTasks = dataTasksLS.filter(data => data.block === 'backlog')
		const finishedDataTasks = dataTasksLS.filter(
			data => data.block === 'finished'
		)

		setAmountActiveTasks(activeDataTasks.length)
		setAmountFinishedTasks(finishedDataTasks.length)
	}, [isInteractionPostDataPost])

	return (
		<footer className={styles.footer}>
			<div className='container'>
				<div>
					<div>
						<div>Active tasks: {amountActiveTasks}</div>
						<div>Finished tasks: {amountFinishedTasks}</div>
					</div>

					<div>
						Kanban board by {user.name}, {new Date().getFullYear()}
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
