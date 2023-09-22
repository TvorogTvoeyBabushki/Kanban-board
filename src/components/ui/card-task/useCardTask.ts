import { useMemo, useState, useEffect } from 'react'

import { IDataTasks } from '@/components/screens/home/Home'

export const useCardTask = (
	dataTasks: IDataTasks[],
	variant: string,
	setDataTasks: React.Dispatch<React.SetStateAction<IDataTasks[]>>
) => {
	const [fieldValue, setFieldValue] = useState<string>('')
	const [isNewTask, setIsNewTask] = useState<boolean>(false)
	const [isSubmitForm, setIsSubmitForm] = useState<boolean>(false)
	const [isDuplicateTask, setISDuplicateTask] = useState<boolean>(false)

	const parseDataTaskLS = () => {
		const dataTaskLS = localStorage.getItem('tasks')
			? (JSON.parse(localStorage.getItem('tasks') as string) as IDataTasks[])
			: []

		return dataTaskLS
	}

	const handleClickShowFieldAndSelectTask = () => {
		setIsNewTask(true)
	}

	const handleCancelClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation()

		setIsNewTask(false)
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
		setIsSubmitForm(true)
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
			const selectedTask = dataTasks.filter(
				data =>
					data.title === (formData.get('title') as string).trim() &&
					((data.block === 'backlog' && variant === 'ready') ||
						(data.block === 'ready' && variant === 'progress') ||
						(data.block === 'progress' && variant === 'finished'))
			)

			selectedTask.forEach(data => (data.block = variant))
			setDataTasks(prev => [
				...prev.filter(data => data.id !== selectedTask[0].id),
				selectedTask[0]
			])
		}

		setIsNewTask(false)
		setFieldValue('')
		setIsSubmitForm(true)
	}

	useEffect(() => {
		isSubmitForm && localStorage.setItem('tasks', JSON.stringify(dataTasks))

		return () => setIsSubmitForm(false)
	}, [isSubmitForm])

	useEffect(() => {
		setISDuplicateTask(false)
	}, [fieldValue])

	return useMemo(
		() => ({
			fieldValue,
			isNewTask,
			handle: {
				handleClickShowFieldAndSelectTask,
				handleCancelClick,
				handleDeleteTask,
				handleChangeInput,
				handleSubmit
			},
			isDuplicateTask
		}),
		[fieldValue, isNewTask, isDuplicateTask]
	)
}
