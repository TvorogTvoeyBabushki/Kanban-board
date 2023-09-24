import React from 'react'
import ReactDOM from 'react-dom/client'

import TaskProvider from './providers/TaskProvider'
import Router from './router/Router'
import './assets/styles/global.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<TaskProvider>
			<Router />
		</TaskProvider>
	</React.StrictMode>
)
