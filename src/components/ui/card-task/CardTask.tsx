import { Fragment, FunctionComponent, useEffect, useState } from 'react'

import { IDataTasks } from '@/components/screens/home/Home'

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
	const [isBacklog, setIsBacklog] = useState<boolean>(false)
	const [fieldValue, setFieldValue] = useState<string>('')

	const handleClickShowFieldAndSelectTask = () => {
		setIsBacklog(true)
	}

	const handleCancelClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation()

		setIsBacklog(false)
		setFieldValue('')
	}

	const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
		setFieldValue((e.target as HTMLInputElement).value)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.target as HTMLFormElement)
		const id = dataTasks.length + 1

		setDataTasks(prev => [
			...prev,
			{
				block: variant,
				id,
				...(Object.fromEntries(formData) as { title: string }),
				description: 'This task has no description'
			}
		])

		setIsBacklog(false)
		setFieldValue('')
	}

	useEffect(() => {
		dataTasks.length && localStorage.setItem('tasks', JSON.stringify(dataTasks))
	}, [dataTasks])

	return (
		<div className={styles.card_task}>
			<h3>{title}</h3>

			{dataTasks.filter(data => data.block === variant).length ? (
				<div>
					{dataTasks.map(data => (
						<Fragment key={data.id}>
							{data.block === variant && <div>{data.title}</div>}
						</Fragment>
					))}
				</div>
			) : (
				''
			)}

			{isBacklog && (
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
								<option key={data.id}>
									{data.block === 'backlog' && variant === 'ready'
										? data.title
										: data.block === 'ready' && variant === 'progress'
										? data.title
										: data.block === 'progress' && variant === 'finished'
										? data.title
										: ''}
								</option>
							))}
						</select>
					)}

					<div>
						<Button
							children={fieldValue.length ? 'Submit' : 'Add card'}
							disabled={fieldValue.length ? false : true}
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

			{!isBacklog && (
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
