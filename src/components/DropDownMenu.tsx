import React from "react";
import {
	MenuItem,
	Select,
	FormControl,
	InputLabel,
	SelectChangeEvent,
	Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import colors from "../themes/colors";
import { MESSAGE } from "../constants/constants";

export interface Option {
	value: string;
	label: string;
	id?: string;
}

interface DropdownProps {
	title?: string;
	options: Option[];
	value?: string;
	onChange?: (value: string) => void;
	width?: number | string;
	standard?: boolean;
	noBackground?: boolean;
	disabled?: boolean;
	readOnly?: boolean;
	onSelected?: (id: string) => void;
	isSelected?: boolean;
	selectedValue?: string;
	size?: "small" | "medium" | undefined;
	errorMessage?: string;
}

const DropDownMenu: React.FC<DropdownProps> = ({
	title,
	options,
	value,
	onChange,
	width,
	standard,
	noBackground,
	disabled,
	readOnly,
	isSelected,
	onSelected,
	selectedValue,
	size,
	errorMessage,
}) => {
	const { NO_OPTION_AVAILABLE } = MESSAGE;
	const handleChange = (event: SelectChangeEvent) => {
		if (onChange) {
			onChange(event.target.value as string);
			const selectedOption = options.find(
				(option) => option.value === event.target.value
			);
			if (selectedOption && selectedOption.id && onSelected) {
				onSelected(selectedOption.id);
			}
		}
	};

	return (
		<>
			<FormControl
				variant={standard ? "standard" : "outlined"}
				fullWidth
				size={size || "medium"}
				sx={{
					width: width || 280,
					height: "fit-content",
					backgroundColor: !noBackground ? colors.inputWhite : "", // Background color
					"& .MuiInputBase-root.MuiInput-root.MuiInput-underline::before": {
						borderBottomColor: disabled
							? colors.disabledWhite
							: colors.deepSkyBlue, // Change the border color of the ::before pseudo-element
					},
					"& .MuiSelect-icon": {
						color: disabled ? colors.disabledWhite : colors.deepSkyBlue, // Icon color
					},
					"& .MuiOutlinedInput-root": {
						"& fieldset": {
							borderWidth: 0.6,
							borderColor: colors.deepSkyBlue, // Border color
						},
						"&:hover fieldset": {
							borderWidth: 1,
							borderColor: disabled ? colors.disabledWhite : colors.deepSkyBlue, // Hover border color
						},
						"&.Mui-focused fieldset": {
							borderWidth: 1,
							borderColor: colors.deepSkyBlue, // Focused border color
						},
						"&.Mui-disabled fieldset": {
							borderColor: colors.disabledWhite,
						},
					},
				}}>
				<InputLabel
					id='dropdown-label'
					sx={{ color: disabled ? colors.disabledWhite : colors.deepSkyBlue }}>
					{title}
				</InputLabel>
				<Select
					labelId='dropdown-label'
					id='dropdown'
					value={value || (isSelected ? selectedValue : "")}
					label={title}
					onChange={handleChange}
					disabled={disabled}
					readOnly={readOnly}
					sx={{
						color: readOnly ? colors.lightGray : colors.whiteBlueDarker,
						"& svg": {
							fill: colors.deepSkyBlue,
							fontSize: 30,
						},
						"& .MuiSelect-icon": {
							color: colors.deepSkyBlue,
						},
						"&.Mui-disabled": {
							color: colors.disabledWhite,
							"& svg": {
								fill: colors.disabledWhite,
							},
							"& .MuiSelect-icon": {
								color: colors.deepSkyBlue,
							},
						},
					}}
					IconComponent={ArrowDropDownIcon}>
					{options?.length === 0 ? (
						<MenuItem>{NO_OPTION_AVAILABLE}</MenuItem>
					) : (
						options?.map((option) => (
							<MenuItem
								key={option.value}
								value={option.value}>
								{option.label}
							</MenuItem>
						))
					)}
				</Select>
			</FormControl>
			{errorMessage && (
				<Typography
					marginTop={-3}
					fontSize={12}
					color={colors.errorRed}>
					{errorMessage}
				</Typography>
			)}
		</>
	);
};

export default DropDownMenu;
