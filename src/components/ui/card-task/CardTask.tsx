import { Fragment, FunctionComponent } from 'react'
import { IoMdClose } from 'react-icons/io'

import { IDataTasks } from '@/components/screens/home/Home'

import { useCardTask } from './useCardTask'
import styles from './CardTask.module.scss'
import Button from '../button/Button'
import Field from '../field/Field'

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
		handle: {
			handleCancelClick,
			handleChangeInput,
			handleClickShowFieldAndSelectTask,
			handleDeleteTask,
			handleSubmit
		},
		isNewTask
	} = useCardTask(dataTasks, setDataTasks, variant)

	// разбить еще это компонент и попробовать добавлять задачи в конец массива чтобы они шли последовательно так как мы их добавляем

	return (
		<div className={styles.card_task}>
			<h3>{title}</h3>

			{dataTasks.filter(data => data.block === variant).length ? (
				<div>
					{dataTasks.map(data => (
						<Fragment key={data.id}>
							{data.block === variant && (
								<div>
									{data.title}
									<button onClick={() => handleDeleteTask(data)}>
										<IoMdClose />
									</button>
								</div>
							)}
						</Fragment>
					))}
				</div>
			) : (
				''
			)}

			{isNewTask && (
				<form onSubmit={handleSubmit}>
					{variant === 'backlog' ? (
						<Field
							type='text'
							name='title'
							value={fieldValue}
							onInput={handleChangeInput}
						/>
					) : (
						<select name='title'>
							{dataTasks.map(data => (
								<Fragment key={data.id}>
									{(data.block === 'backlog' && variant === 'ready') ||
									(data.block === 'ready' && variant === 'progress') ||
									(data.block === 'progress' && variant === 'finished') ? (
										<option>{data.title}</option>
									) : (
										''
									)}
								</Fragment>
							))}
						</select>
					)}

					<div>
						<Button
							children={fieldValue.length ? 'Submit' : 'Add card'}
							disabled={
								fieldValue.length || variant !== 'backlog' ? false : true
							}
							variant='submit'
						/>
						<Button
							children='Cancel'
							variant='cancel'
							onClick={handleCancelClick}
						/>
					</div>
				</form>
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
