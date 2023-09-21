import { Fragment, FunctionComponent } from 'react'
import { IoMdClose } from 'react-icons/io'
import { motion } from 'framer-motion'

import { IDataTasks } from '@/components/screens/home/Home'

import CardTaskForm from './form/CardTaskForm'
import { useCardTask } from './useCardTask'
import styles from './CardTask.module.scss'
import Button from '../button/Button'
import { animationCardTask } from './animationCardTask'

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
		isNewTask,
		handle: {
			handleCancelClick,
			handleChangeInput,
			handleClickShowFieldAndSelectTask,
			handleDeleteTask,
			handleSubmit
		},
		isDuplicateTask
	} = useCardTask(dataTasks, variant, setDataTasks)

	//попробовать добавлять задачи в конец массива чтобы они шли последовательно так как мы их добавляем и посмотреть фикс выпадающего списка

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
								<motion.div variants={animationCardTask.item}>
									{data.title}
									<button onClick={() => handleDeleteTask(data)}>
										<IoMdClose />
									</button>
								</motion.div>
							)}
						</Fragment>
					))}
				</motion.div>
			) : (
				''
			)}

			{isNewTask && (
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

			{!isNewTask && (
				<Button
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
