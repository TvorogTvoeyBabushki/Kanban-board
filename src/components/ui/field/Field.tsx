import { FunctionComponent, InputHTMLAttributes } from 'react'

interface IField extends InputHTMLAttributes<HTMLInputElement> {}

const Field: FunctionComponent<IField> = ({ ...rest }) => {
	return <input {...rest} />
}

export default Field
