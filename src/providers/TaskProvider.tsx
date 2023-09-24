import {
	Dispatch,
	FunctionComponent,
	ReactNode,
	SetStateAction,
	createContext,
	useState
} from 'react'

export interface ITaskContext {
	isInteractionPostDataPost: boolean
	setIsInteractionPostDataPost: Dispatch<SetStateAction<boolean>>
}

export const TaskContext = createContext<ITaskContext | null>(null)

const TaskProvider: FunctionComponent<{ children: ReactNode }> = ({
	children
}) => {
	const [isInteractionPostDataPost, setIsInteractionPostDataPost] =
		useState<boolean>(false)

	return (
		<TaskContext.Provider
			value={{ isInteractionPostDataPost, setIsInteractionPostDataPost }}
		>
			{children}
		</TaskContext.Provider>
	)
}

export default TaskProvider
