import React, { useState } from "react";
import { Button, Stack, Box, IconButton } from "@mui/material";
import colors from "../themes/colors";

interface CommonButtonProps {
	text?: string;
	icon?: any;
	input?: boolean;
	onFileSelected?: (file: File | null) => void;
	onClick?: (showComponent?: boolean) => void;
	handleButtonClick?: (event?: any) => void;
	startIcon?: boolean;
	endIcon?: boolean;
	iconButton?: boolean;
	color?: "default" | "inherit" | "primary" | "secondary" | "success" | "error";
	size?: "small" | "medium" | "large";
	iconSize?: "small" | "medium" | "large";
	width?: number;
	disabled?: boolean;
	customSx?: React.CSSProperties;
}

const styles = {
	buttonContainer: {
		display: "flex",
		alignItems: "center", // Center items vertically
		justifyContent: "center", // Center items horizontally
	},
	icon: {
		marginRight: "8px", // Add some spacing between the icon and the label
	},
};

const CommonButton: React.FC<CommonButtonProps> = ({
	text,
	icon,
	input,
	onFileSelected,
	onClick,
	handleButtonClick,
	startIcon,
	endIcon,
	size,
	iconButton,
	color,
	iconSize,
	width,
	disabled,
	customSx,
}) => {
	const bgColor = color === "error" ? colors.mainRed : colors.deepSkyBlue;
	const bgColorHover = color === "error" ? colors.lightRed : colors.lightBlue;
	const [showComponent, setShowComponent] = useState<boolean>(false);

	const handleClick = () => {
		setShowComponent(!showComponent);
		if (onClick) {
			onClick(!showComponent);
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] ?? null;
		if (onFileSelected) {
			onFileSelected(file);
		}
	};

	const getStyle = (value: string) => {
		if (input) {
			if (value === "padding") {
				return 0.5;
			}
			if (value === "paddingRight") {
				return 1;
			}
			if (value === "border") {
				return `0.5px solid ${colors.deepSkyBlue}`;
			}
			if (value === "borderRadius") {
				return 1;
			}
		}
	};

	return (
		<Stack
			direction='row'
			alignItems={"center"}
			padding={getStyle("padding")}
			paddingRight={getStyle("paddingRight")}
			border={getStyle("border")}
			borderRadius={getStyle("borderRadius")}
			spacing={1}>
			{input && (
				<Box
					padding={0.5}
					width={"260px"}
					color={colors.white}
					overflow={"hidden"}
					borderRadius={1}>
					<input
						type='file'
						accept='.csv'
						onChange={handleFileChange}
						disabled={disabled}
					/>
				</Box>
			)}
			{iconButton ? (
				<IconButton
					onClick={handleButtonClick || handleClick}
					disabled={disabled}
					size={iconSize}
					sx={{
						color: colors.white,
						backgroundColor: colors.deepSkyBlue,
						"&.Mui-disabled": {
							backgroundColor: colors.gray,
							color: colors.lightGray,
						},
						"&:hover": {
							color: color,
							backgroundColor: colors.lightBlue,
						},
					}}>
					{icon}
				</IconButton>
			) : (
				<Button
					variant='contained'
					href=''
					color={color === "default" ? "primary" : color}
					size={size || "medium"}
					disabled={disabled}
					style={styles.buttonContainer}
					startIcon={startIcon && icon}
					endIcon={endIcon && icon}
					onClick={handleButtonClick ? handleButtonClick : handleClick}
					sx={{
						display: "inline-block",
						textTransform: "capitalize",
						width: width || 120,
						whiteSpace: "nowrap",
						"&.Mui-disabled": {
							backgroundColor: colors.gray,
							color: colors.lightGray,
						},
						"&:hover": {
							color: color,
							backgroundColor:
								color === "error" ? colors.lightRed : colors.lightBlue,
						},
						...customSx,
					}}>
					{text}
				</Button>
			)}
		</Stack>
	);
};

export default CommonButton;
