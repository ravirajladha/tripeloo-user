import Button, { ButtonProps } from './Button'
import React from 'react'

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonMain: React.FC<ButtonPrimaryProps> = ({
	className = '',
	onClick,
	...args
}) => {
	return (
		<Button
			className={`ttnc-ButtonPrimary bg-[#D91C49] text-neutral-50 hover:bg-primary-700 disabled:bg-opacity-70 ${className}`}
			{...args}
			onClick={onClick}
		/>
	)
}

export default ButtonMain


// hover:bg-[#D91C49]