import * as React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import colors from "../themes/colors";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

interface BasicDateTimePickerProps {
	label?: string;
	minDate?: dayjs.Dayjs | Date | undefined;
	value?: Date | null;
	onChange?: (date: Date | null) => void;
	minutesStep?: 1 | 2 | 3;
	disabled?: boolean;
	readOnly?: boolean;
	width?: number | string;
}

const BasicDateTimePicker: React.FC<BasicDateTimePickerProps> = ({
	label,
	minDate,
	value,
	onChange,
	minutesStep,
	disabled,
	readOnly,
	width,
}) => {
	const currentDate = new Date();
	const formattedCurrentDate = currentDate
		.toISOString()
		.split(".")[0]
		.replace("T", " ");
	const getValue = (val: any) => {
		if (typeof val === "string") {
			const updateValue = dayjs(val);
			return updateValue;
		}
		return val;
	};
	const DateTimePickerStyle = {
		width: width || 280,
		"& .MuiSvgIcon-root": {
			color: disabled ? colors.gray : colors.deepSkyBlue,
		},
		"& .MuiInputLabel-root": {
			color: disabled ? colors.gray : colors.deepSkyBlue, // Label color
			"&.Mui-disabled": {
				color: colors.gray, // Label color when disabled
			},
		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderWidth: 1,
				borderColor: colors.deepSkyBlue, // Border color
			},
			"&:hover fieldset": {
				borderWidth: 1,
				borderColor: colors.deepSkyBlue, // Hover border color
			},
			"&.Mui-focused fieldset": {
				borderWidth: 1,
				borderColor: colors.deepSkyBlue, // Focused border color
			},
			"&.Mui-disabled fieldset": {
				borderColor: colors.disabledWhite,
			},
		},
		"& input": {
			color: readOnly ? colors.lightGray : colors.whiteBlueDarker, // Input text color
		},
		"& .MuiTypography-root.MuiTypography-body1": {
			color: disabled ? colors.disabledWhite : colors.whiteBlue, // Change the color of MuiTypography-body1
		},
		"& .MuiMultiInputDateRangeField-separator": {
			"& .MuiTypography-root.MuiTypography-body1": {
				color: disabled ? colors.disabledWhite : colors.whiteBlue, // Change the color of MuiTypography-body1 inside MuiMultiInputDateRangeField-separator
			},
		},
		"& .MuiFormControl-root.MuiFormControl-fullWidth.MuiTextField-root": {
			backgroundColor: disabled ? colors.disabledWhite : colors.inputWhite, // Change the color of MuiTextField-root when disabled
		},
	};
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DemoContainer
				components={["DatePicker"]}
				sx={{ padding: 1 }}>
				<DateTimePicker
					label={label}
					minDateTime={getValue(minDate) || dayjs(formattedCurrentDate)}
					value={getValue(value)}
					onChange={onChange}
					minutesStep={minutesStep || 1}
					disabled={disabled}
					readOnly={readOnly}
					closeOnSelect={false}
					sx={DateTimePickerStyle}
				/>
			</DemoContainer>
		</LocalizationProvider>
	);
};

export default BasicDateTimePicker;
