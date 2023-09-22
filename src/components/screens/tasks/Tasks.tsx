import { FunctionComponent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoMdClose } from 'react-icons/io'

import Layout from '@/components/layout/Layout'

import styles from './Tasks.module.scss'
import { IDataTasks } from '../home/Home'
import NotFound from '../not-found/NotFound'

const Tasks: FunctionComponent = () => {
	const [dataTask, setDataTask] = useState<IDataTasks | null>(null)
	const [isNotFoundTaskId, setIsNotFoundTaskId] = useState<boolean>(true)
	const { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		const dataTasksLS = JSON.parse(
			localStorage.getItem('tasks') as string
		) as IDataTasks[]

		dataTasksLS.forEach(data => {
			if (data.id === +id!) {
				setIsNotFoundTaskId(false)
				setDataTask(data)
			}
		})
	}, [])

	// поменять селект на реакт-селект
	// сделать возможность изменения title и description
	// добавить footer
	// адаптив
	// тесты

	return (
		<>
			{isNotFoundTaskId ? (
				<NotFound />
			) : (
				<Layout>
					<main>
						<div className='container'>
							<section className={styles.task_wrapper}>
								<div>
									<div>
										<h2>{dataTask?.title}</h2>

										<button onClick={() => navigate('/')}>
											<IoMdClose />
										</button>
									</div>

									<p>{dataTask?.description}</p>
								</div>
							</section>
						</div>
					</main>
				</Layout>
			)}
		</>
	)
}

export default Tasks
