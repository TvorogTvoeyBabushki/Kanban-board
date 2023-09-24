import { FormEvent, FunctionComponent } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'

import Field from '@/components/ui/field/Field'
import Button from '@/components/ui/button/Button'

import styles from './TasksInfoForm.module.scss'

interface ITasksInfoFormProps {
	variant: string
	isDuplicateTask?: boolean
	valueField?: string
	valueTextarea?: string
	handleSubmitForm: (e: FormEvent<HTMLFormElement>, variant: string) => void
	handleChangeField: (e: FormEvent<HTMLInputElement>) => void
	handleChangeTextArea: (e: FormEvent<HTMLTextAreaElement>) => void
	handleCancelClick: (variant: string) => void
}

const TasksInfoForm: FunctionComponent<ITasksInfoFormProps> = ({
	variant,
	isDuplicateTask,
	valueField,
	valueTextarea,
	handleSubmitForm,
	handleChangeField,
	handleChangeTextArea,
	handleCancelClick
}) => {
	return (
		<form
			onSubmit={e => {
				handleSubmitForm(e, variant)
			}}
			className={styles.tasks_info_form}
		>
			{variant === 'title' ? (
				<Field
					name='title'
					type='text'
					value={valueField}
					onInput={e => handleChangeField(e)}
				/>
			) : (
				<ReactTextareaAutosize
					name='description'
					value={valueTextarea}
					onInput={e => handleChangeTextArea(e)}
				/>
			)}
			{isDuplicateTask && (
				<div className='validation'>The task is already on the list</div>
			)}
			<div>
				<Button
					disabled={valueField?.length || valueTextarea?.length ? false : true}
					variant='task-info'
				>
					Change
				</Button>
				<Button variant='task-info' onClick={() => handleCancelClick(variant)}>
					Cancel
				</Button>
			</div>
		</form>
	)
}

export default TasksInfoForm
