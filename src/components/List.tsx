import React from "react";
import { Stack, Typography } from "@mui/material";
import colors from "../themes/colors";
import { LABEL } from "../constants/constants";

type listItemType = {
	start: string;
	end: string;
};

interface IListProps {
	list: listItemType[];
	status: string;
}

const List: React.FC<IListProps> = ({ list, status }) => {
	const { SLOT_STATUS, START, END } = LABEL;

	if (list?.length === 0) {
		return <></>;
	}

	const getTextString = (label: string, dateStr: string) => {
		return (
			<Stack
				flexDirection={"row"}
				gap={1}>
				<Typography
					color={colors.deepSkyBlue}
					sx={{ textDecoration: "underline" }}>
					{label}
				</Typography>
				{getText(dateStr)}
			</Stack>
		);
	};

	const getText = (text: string) => {
		return <Typography color={colors.lightBlue}>{text}</Typography>;
	};

	return (
		<React.Fragment>
			<Stack alignSelf={"flex-start"}>
				{getTextString(`${SLOT_STATUS}:`, status)}
			</Stack>
			{list?.map((item) => {
				const startDateTime = new Date(item?.start)?.toLocaleString();
				const endDateTime = new Date(item?.end)?.toLocaleString();
				return (
					<Stack
						padding={1}
						border={`1px solid ${colors.deepSkyBlue}`}
						borderRadius={1}
						bgcolor={colors.inputWhite}
						width={"100%"}>
						{getTextString(`${START}:`, startDateTime)}
						{getTextString(`${END}:`, endDateTime)}
					</Stack>
				);
			})}
		</React.Fragment>
	);
};

export default List;
