import { FunctionComponent } from 'react'

import Home from '@/components/screens/home/Home'
import Tasks from '@/components/screens/tasks/Tasks'

interface IRoutes {
	path: string
	component: FunctionComponent
}

export const routes: IRoutes[] = [
	{
		path: '/Kanban-board',
		component: Home
	},
	{
		path: '/Kanban-board/tasks/:id',
		component: Tasks
	}
]
