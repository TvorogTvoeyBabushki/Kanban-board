import { FunctionComponent, Fragment } from 'react'

import { IDataTasks } from '@/components/screens/home/Home'

import styles from './CardTaskForm.module.scss'
import Button from '../../button/Button'
import Field from '../../field/Field'

interface ICardTaskFormProps {
	dataTasks: IDataTasks[]
	variant: string
	fieldValue: string
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	handleChangeInput: (e: React.FormEvent<HTMLInputElement>) => void
	handleCancelClick: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => void
	isDuplicateTask: boolean
}

const CardTaskForm: FunctionComponent<ICardTaskFormProps> = ({
	dataTasks,
	variant,
	fieldValue,
	handleSubmit,
	handleChangeInput,
	handleCancelClick,
	isDuplicateTask
}) => {
	// const [isDuplicateTask, setIsDuplicateTask] = useState<boolean>(false)

	return (
		<form className={styles.card_task_from} onSubmit={handleSubmit}>
			{variant === 'backlog' ? (
				<Field
					type='text'
					name='title'
					// value={fieldValue}
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
				{isDuplicateTask && <div>The task is already on the list</div>}
				<Button
					children={fieldValue.length ? 'Submit' : 'Add card'}
					disabled={fieldValue.length || variant !== 'backlog' ? false : true}
					variant='submit'
				/>
				<Button
					children='Cancel'
					variant='cancel'
					onClick={handleCancelClick}
				/>
			</div>
		</form>
	)
}

export default CardTaskForm
