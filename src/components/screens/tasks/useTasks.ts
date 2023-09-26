import { FormEvent, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { IDataTasks } from '../home/Home'

export const useTasks = () => {
	const [dataTask, setDataTask] = useState<IDataTasks | null>(null)

	const [isNotFoundTaskId, setIsNotFoundTaskId] = useState<boolean>(true)
	const [isDuplicateTask, setISDuplicateTask] = useState<boolean>(false)
	const [isChangeTitle, setIsChangeTitle] = useState<boolean>(false)
	const [isChangeDescription, setIsChangeDescription] = useState<boolean>(false)

	const [valueField, setValueField] = useState<string>('')
	const [valueTextarea, setValueTextarea] = useState<string>('')

	const { id } = useParams()
	const navigate = useNavigate()

	const parseDataTasksLS = () => {
		const dataTasksLS = JSON.parse(
			localStorage.getItem('tasks') as string
		) as IDataTasks[]

		return dataTasksLS
	}

	const handleCancelClick = (variant: string) => {
		variant === 'title'
			? setIsChangeTitle(false)
			: setIsChangeDescription(false)

		setValueField(dataTask!.title)
		setValueTextarea(dataTask!.description)
		setISDuplicateTask(false)
	}

	const handleShowFormChangeTitle = () => setIsChangeTitle(true)
	const handleShowFormChangeDescription = () => setIsChangeDescription(true)
	const handleHomePageReturnClick = () => navigate('/Kanban-board')

	const handleChangeField = (e: FormEvent<HTMLInputElement>) => {
		setValueField((e.target as HTMLInputElement).value)
		setISDuplicateTask(false)
	}

	const handleChangeTextArea = (e: FormEvent<HTMLTextAreaElement>) => {
		setValueTextarea((e.target as HTMLTextAreaElement).value)
	}

	const handleSubmitForm = (e: FormEvent<HTMLFormElement>, variant: string) => {
		e.preventDefault()

		const formData = new FormData(e.target as HTMLFormElement)

		if (
			variant === 'title' &&
			parseDataTasksLS().filter(
				data => data.title === (formData.get('title') as string).trim()
			).length
		) {
			setISDuplicateTask(true)

			return
		}

		if (variant === 'title') {
			setDataTask(prev => ({
				...prev!,
				title: (formData.get('title') as string).trim()
			}))
			setIsChangeTitle(false)
		} else {
			setDataTask(prev => ({
				...prev!,
				description: (formData.get('description') as string).trim()
			}))
			setIsChangeDescription(false)
		}
	}

	useEffect(() => {
		parseDataTasksLS().forEach(data => {
			if (data.id === +id!) {
				setIsNotFoundTaskId(false)
				setDataTask(data)
				setValueField(data.title)
				setValueTextarea(data.description)
			}
		})
	}, [])

	useEffect(() => {
		if (dataTask) {
			const updateDataTasksLS = parseDataTasksLS().map(data => {
				if (data.id === dataTask?.id) {
					data = dataTask
				}

				return data
			})

			localStorage.setItem('tasks', JSON.stringify(updateDataTasksLS))
		}
	}, [dataTask])

	return useMemo(
		() => ({
			dataTask,
			isNotFoundTaskId,
			isChangeTitle,
			valueField,
			isDuplicateTask,
			isChangeDescription,
			valueTextarea,
			handle: {
				handleCancelClick,
				handleShowFormChangeTitle,
				handleHomePageReturnClick,
				handleChangeField,
				handleSubmitForm,
				handleShowFormChangeDescription,
				handleChangeTextArea
			}
		}),
		[
			dataTask,
			isNotFoundTaskId,
			isChangeTitle,
			valueField,
			isDuplicateTask,
			isChangeDescription,
			valueTextarea
		]
	)
}
