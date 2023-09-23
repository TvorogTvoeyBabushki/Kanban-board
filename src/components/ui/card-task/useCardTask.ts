import { useMemo, useState, useEffect } from 'react'

import { IDataTasks } from '@/components/screens/home/Home'

export const useCardTask = (
	dataTasks: IDataTasks[],
	variant: string,
	setDataTasks: React.Dispatch<React.SetStateAction<IDataTasks[]>>
) => {
	const [fieldValue, setFieldValue] = useState<string>('')
	const [isShowForm, setIsShowForm] = useState<boolean>(false)
	const [isInteractionTask, setIsInteractionTask] = useState<boolean>(false)
	const [isDuplicateTask, setISDuplicateTask] = useState<boolean>(false)

	const parseDataTaskLS = () => {
		const dataTaskLS = localStorage.getItem('tasks')
			? (JSON.parse(localStorage.getItem('tasks') as string) as IDataTasks[])
			: []

		return dataTaskLS
	}

	const handleClickShowFieldAndSelectTask = () => {
		setIsShowForm(true)
	}

	const handleCancelClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation()

		setIsShowForm(false)
		setFieldValue('')
	}

	const handleDeleteTask = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		data: IDataTasks
	) => {
		e.preventDefault()

		const deleteDataTasks = parseDataTaskLS().filter(
			deleteData => deleteData.id !== data.id && deleteData.title !== data.title
		)

		setDataTasks(deleteDataTasks)
		setIsInteractionTask(true)
	}

	const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
		setFieldValue((e.target as HTMLInputElement).value)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.target as HTMLFormElement)
		const id = !dataTasks.length
			? 0
			: dataTasks[dataTasks.sort((a, b) => a.id - b.id).length - 1].id + 1

		if (
			dataTasks.filter(
				data => data.title === (formData.get('title') as string).trim()
			).length &&
			variant === 'backlog'
		) {
			setISDuplicateTask(true)

			return
		}

		if (variant === 'backlog') {
			setDataTasks([
				...parseDataTaskLS(),
				{
					block: variant,
					id,
					title: (formData.get('title') as string).trim(),
					description: 'This task has no description'
				}
			])
		} else {
			const selectedTask = parseDataTaskLS().filter(
				data =>
					data.title === (formData.get('title') as string).trim() &&
					((data.block === 'backlog' && variant === 'ready') ||
						(data.block === 'ready' && variant === 'progress') ||
						(data.block === 'progress' && variant === 'finished'))
			)

			selectedTask.forEach(data => (data.block = variant))
			setDataTasks([
				...parseDataTaskLS().filter(data => data.id !== selectedTask[0].id),
				selectedTask[0]
			])
		}

		setIsShowForm(false)
		setFieldValue('')
		setIsInteractionTask(true)
	}

	useEffect(() => {
		isInteractionTask &&
			localStorage.setItem('tasks', JSON.stringify(dataTasks))

		return () => setIsInteractionTask(false)
	}, [isInteractionTask])

	useEffect(() => {
		setISDuplicateTask(false)
	}, [fieldValue])

	return useMemo(
		() => ({
			fieldValue,
			isShowForm,
			handle: {
				handleClickShowFieldAndSelectTask,
				handleCancelClick,
				handleDeleteTask,
				handleChangeInput,
				handleSubmit
			},
			isDuplicateTask
		}),
		[fieldValue, isShowForm, isDuplicateTask]
	)
}
