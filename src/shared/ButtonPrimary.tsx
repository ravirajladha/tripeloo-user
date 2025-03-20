import Button, { ButtonProps } from './Button'
import React from 'react'

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
	className = '',
	onClick,
	...args
}) => {
	return (
		<Button
			className={`ttnc-ButtonPrimary bg-[#D91C49]   text-neutral-50 hover:bg-[#D91C49] disabled:bg-opacity-70 ${className}`}
			 // Apply the custom color
			{...args}
			onClick={onClick}
		/>
	)
}

export default ButtonPrimary
