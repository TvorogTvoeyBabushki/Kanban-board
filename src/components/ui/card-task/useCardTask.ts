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

	const handleDeleteTask = (data: IDataTasks) => {
		const deleteDataTasks = dataTasks.filter(
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
		const id = dataTasks.length + 1

		if (dataTasks.filter(data => data.title === formData.get('title')).length) {
			setISDuplicateTask(true)

			return
		}

		if (variant === 'backlog') {
			setDataTasks(prev => [
				...prev,
				{
					block: variant,
					id,
					...(Object.fromEntries(formData) as { title: string }),
					description: 'This task has no description'
				}
			])
		} else {
			const newDataTasks = dataTasks.map(data => {
				if (
					data.title === formData.get('title') &&
					((data.block === 'backlog' && variant === 'ready') ||
						(data.block === 'ready' && variant === 'progress') ||
						(data.block === 'progress' && variant === 'finished'))
				) {
					data.block = variant
				}

				return data
			})
			setDataTasks(newDataTasks)
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
