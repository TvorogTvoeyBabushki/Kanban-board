import { FunctionComponent, useEffect, useState } from 'react'

import styles from './CardTask.module.scss'

interface ICardTaskProps {
	title: string
	variant: string
}

interface IDataTasks {
	id?: number
	title: string
	description?: string
}

const CardTask: FunctionComponent<ICardTaskProps> = ({ title, variant }) => {
	const [dataBacklogTasks, setDataBacklogTasks] = useState<IDataTasks[]>([])
	const [isBacklog, setIsBacklog] = useState<boolean>(false)
	const [fieldValue, setFieldValue] = useState<string>('')

	useEffect(() => {
		if (localStorage.getItem(variant)) {
			setDataBacklogTasks(JSON.parse(localStorage.getItem(variant) as string))
		}
	}, [])

	const handleClickShowFieldTask = () => {
		if (variant === 'backlog') {
			setIsBacklog(true)
		}
	}

	const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
		const targetEl = e.target as HTMLInputElement

		setFieldValue(targetEl.value)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const targetEl = e.target as HTMLFormElement
		const formData = new FormData(targetEl)

		// variant === 'backlog' &&
		setDataBacklogTasks(prev => [
			...prev,
			Object.fromEntries(formData) as { title: string }
		])

		setIsBacklog(false)
		setFieldValue('')
	}

	useEffect(() => {
		dataBacklogTasks.length &&
			localStorage.setItem(variant, JSON.stringify(dataBacklogTasks))
	}, [dataBacklogTasks])

	return (
		<div className={styles.card_task}>
			<h3>{title}</h3>

			{dataBacklogTasks.length ? (
				<div>
					{dataBacklogTasks.map((task, index) => (
						<div key={index}>{task.title}</div>
					))}
				</div>
			) : (
				''
			)}

			{isBacklog && (
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						name='title'
						value={fieldValue}
						onInput={handleChangeInput}
					/>

					<button disabled={fieldValue.length ? false : true}>
						<span>+</span>
						{fieldValue.length ? 'Submit' : 'Add card'}
					</button>
				</form>
			)}

			{!isBacklog && (
				<button onClick={handleClickShowFieldTask}>
					<span>+</span>Add card
				</button>
			)}
		</div>
	)
}

export default CardTask
