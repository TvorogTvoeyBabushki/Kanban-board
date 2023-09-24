import { FormEvent, FunctionComponent } from 'react'
import { IoMdClose } from 'react-icons/io'

import Button from '@/components/ui/button/Button'

import { IDataTasks } from '../../home/Home'
import TasksInfoForm from './TasksInfoForm'

interface ITasksInfoProps {
	dataTask: IDataTasks | null
	valueField: string
	valueTextarea: string
	isChangeTitle: boolean
	isChangeDescription: boolean
	isDuplicateTask: boolean
	handle: {
		handleCancelClick: (variant: string) => void
		handleShowFormChangeTitle: () => void
		handleShowFormChangeDescription: () => void
		handleHomePageReturnClick: () => void
		handleChangeField: (e: FormEvent<HTMLInputElement>) => void
		handleChangeTextArea: (e: FormEvent<HTMLTextAreaElement>) => void
		handleSubmitForm: (e: FormEvent<HTMLFormElement>, variant: string) => void
	}
}

const TasksInfo: FunctionComponent<ITasksInfoProps> = ({
	dataTask,
	isChangeTitle,
	isChangeDescription,
	valueField,
	valueTextarea,
	isDuplicateTask,
	handle
}) => {
	return (
		<div>
			<div>
				{isChangeTitle ? (
					<TasksInfoForm
						variant='title'
						isDuplicateTask={isDuplicateTask}
						valueField={valueField}
						{...handle}
					/>
				) : (
					<h2 onClick={handle.handleShowFormChangeTitle}>{dataTask?.title}</h2>
				)}
				<Button variant='task-info' onClick={handle.handleHomePageReturnClick}>
					<IoMdClose />
				</Button>
			</div>

			{isChangeDescription ? (
				<TasksInfoForm
					variant='description'
					valueTextarea={valueTextarea}
					{...handle}
				/>
			) : (
				<p onClick={handle.handleShowFormChangeDescription}>
					{dataTask?.description}
				</p>
			)}
		</div>
	)
}

export default TasksInfo
