import { FunctionComponent } from 'react'
import clsx from 'clsx'

import styles from './User.module.scss'
import { useUser } from './useUser'

const User: FunctionComponent = () => {
	const { handleArrowClick, imgRef, isDisabledAnimation, isShowList, listEls } =
		useUser()

	return (
		<div className={styles.user}>
			<img src='/Kanban-board/user-avatar.svg' alt='user-img' />

			<button
				className={clsx('', {
					[styles.rotate]: isShowList,
					[styles.disabled_animation]: isDisabledAnimation
				})}
				onClick={handleArrowClick}
			>
				<img ref={imgRef} src='/Kanban-board/arrow.svg' alt='arrow' />
			</button>

			{isShowList && (
				<ul>
					{listEls.map((listEl, index) => (
						<li key={index}>
							<a onClick={e => e.preventDefault()} href='#'>
								{listEl}
							</a>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default User
