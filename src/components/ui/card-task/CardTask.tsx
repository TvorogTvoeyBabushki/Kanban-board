import { Fragment, FunctionComponent } from 'react'
import { IoMdClose } from 'react-icons/io'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { IDataTasks } from '@/components/screens/home/Home'

import { animationCardTask } from './animationCardTask'
import CardTaskForm from './form/CardTaskForm'
import { useCardTask } from './useCardTask'
import styles from './CardTask.module.scss'
import Button from '../button/Button'

interface ICardTaskProps {
	dataTasks: IDataTasks[]
	setDataTasks: React.Dispatch<React.SetStateAction<IDataTasks[]>>
	title: string
	variant: string
}

const CardTask: FunctionComponent<ICardTaskProps> = ({
	dataTasks,
	setDataTasks,
	title,
	variant
}) => {
	const {
		fieldValue,
		isShowForm,
		handle: {
			handleCancelClick,
			handleChangeInput,
			handleClickShowFieldAndSelectTask,
			handleDeleteTask,
			handleSubmit
		},
		isDuplicateTask
	} = useCardTask(dataTasks, variant, setDataTasks)

	return (
		<div className={styles.card_task}>
			<h3>{title}</h3>

			{dataTasks.filter(data => data.block === variant).length ? (
				<motion.div
					variants={animationCardTask.container}
					initial='hidden'
					animate='visible'
				>
					{dataTasks.map(data => (
						<Fragment key={data.id}>
							{data.block === variant && (
								<Link to={`/tasks/${data.id}`}>
									<motion.div variants={animationCardTask.item}>
										{data.title}
										<button onClick={e => handleDeleteTask(e, data)}>
											<IoMdClose />
										</button>
									</motion.div>
								</Link>
							)}
						</Fragment>
					))}
				</motion.div>
			) : (
				''
			)}

			{isShowForm && (
				<CardTaskForm
					dataTasks={dataTasks}
					variant={variant}
					fieldValue={fieldValue}
					handleCancelClick={handleCancelClick}
					handleChangeInput={handleChangeInput}
					handleSubmit={handleSubmit}
					isDuplicateTask={isDuplicateTask}
				/>
			)}

			{!isShowForm && (
				<Button
					variant='add-card'
					children='Add card'
					disabled={
						variant === 'backlog' ||
						(variant === 'ready' &&
							dataTasks.filter(data => data.block === 'backlog').length) ||
						(variant === 'progress' &&
							dataTasks.filter(data => data.block === 'ready').length) ||
						(variant === 'finished' &&
							dataTasks.filter(data => data.block === 'progress').length)
							? false
							: true
					}
					onClick={handleClickShowFieldAndSelectTask}
				/>
			)}
		</div>
	)
}

export default CardTask
