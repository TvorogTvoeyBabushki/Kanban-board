import { useEffect, useMemo, useRef, useState } from 'react'

export const useUser = () => {
	const [isShowList, setIsShowList] = useState<boolean>(false)
	const [isDisabledAnimation, setIsDisabledAnimation] = useState<boolean>(true)
	const imgRef = useRef<HTMLImageElement | null>(null)
	const listEls = ['profile', 'log out']

	const handleArrowClick = () => {
		setIsDisabledAnimation(false)
		isShowList ? setIsShowList(false) : setIsShowList(true)
	}

	useEffect(() => {
		document.addEventListener('click', e => {
			const targetEl = e.target as HTMLElement

			if (!(targetEl === imgRef!.current)) setIsShowList(false)
		})

		return () =>
			document.removeEventListener('click', e => {
				const targetEl = e.target as HTMLElement

				if (!(targetEl === imgRef!.current)) setIsShowList(false)
			})
	}, [])

	return useMemo(
		() => ({
			isShowList,
			isDisabledAnimation,
			handleArrowClick,
			imgRef,
			listEls
		}),
		[isShowList, isDisabledAnimation, imgRef, listEls]
	)
}
