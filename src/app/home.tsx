"use client";

import React, { useEffect, useState } from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import BasicDateTimePicker from "../components/BasicDateTimePicker";
import { ERROR_MESSAGE, LABEL, FREE, MESSAGE } from "../constants/constants";
import DropDownMenu, { Option } from "../components/DropDownMenu";
import CommonButton from "../components/CommonButton";
import dayjs from "dayjs";
import { isSameDay } from "../utils";
import ApiCalls from "../network/apiCalls";
import ApiUrls from "../network/apiUrls";
import List from "../components/List";
import colors from "../themes/colors";

interface IHomePageProps {
	expertListData: string[];
}

const HomePage: React.FC<IHomePageProps> = ({ expertListData }) => {
	const {
		START_DATE_TIME,
		END_DATE_TIME,
		EXPERT,
		GET_SLOTS,
		FREE_SLOT,
		BUSY_SLOT,
	} = LABEL;
	const {
		FILL_ALL_VALUES,
		START_DATE_TIME_NOT_BE_GREATER,
		END_DATE_TIME_NOT_BE_GREATER,
		SELECT_SAME_DAY_DATE,
	} = ERROR_MESSAGE;
	const { NO_EVENTS_FOUND } = MESSAGE;
	const currentDate = new Date();

	const [startDateTime, setStartDateTime] = useState<Date | null>(null);
	const [endDateTime, setEndDateTime] = useState<Date | null>(null);
	const [expertList, setExpertList] = useState<Option[] | []>();
	const [currentExpert, setCurrentExpert] = useState<string>();
	const [busySlots, setBusySlots] = useState([]);
	const [freeSlots, setFreeSlots] = useState([]);
	const [slotStatus, setSlotStatus] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (expertListData?.length !== 0) {
			const updatedList = expertListData?.map((item: string) => {
				return { value: item, label: item };
			});
			setExpertList(updatedList);
		}
	}, [expertListData]);

	useEffect(() => {
		setFreeSlots([]);
		setBusySlots([]);
		setSlotStatus("");
	}, [startDateTime, endDateTime, currentExpert]);

	const handleStartDateTime = (value: Date | null) => {
		if (!value) return;
		setStartDateTime(value);
	};

	const handleEndDateTime = (value: Date | null) => {
		if (!value) return;
		setEndDateTime(value);
	};

	const handleExperListOnChange = (value: string) => {
		setCurrentExpert(value);
	};

	const getErrorMessage = () => {
		const updateStartDateTime = new Date(startDateTime || "");
		const updateEndDateTime = new Date(endDateTime || "");
		const startTime = updateStartDateTime?.getTime();
		const endTime = updateEndDateTime?.getTime();
		const updatedCurrentDate = new Date().getTime();
		const isSameDayValue = isSameDay(updateStartDateTime, updateEndDateTime);
		if (!(startDateTime && endDateTime && currentExpert)) {
			return FILL_ALL_VALUES;
		}
		if (startTime < updatedCurrentDate) return START_DATE_TIME_NOT_BE_GREATER;
		if (endTime < startTime) return END_DATE_TIME_NOT_BE_GREATER;
		if (!isSameDayValue) return SELECT_SAME_DAY_DATE;
		return "";
	};

	const handleSubmit = () => {
		const errorMessage = getErrorMessage();
		if (errorMessage) {
			alert(errorMessage);
			return;
		}
		try {
			setLoading(true);
			const updateStartDateTime = new Date(startDateTime || "")?.toISOString();
			const updateEndDateTime = new Date(endDateTime || "")?.toISOString();
			ApiCalls.get(
				ApiUrls.GET_SLOTS,
				{
					params: {
						startDateTime: updateStartDateTime,
						endDateTime: updateEndDateTime,
						expertName: currentExpert,
					},
				},
				(data: any) => {
					const {
						success,
						data: { detail, status, busy_slots, free_slots },
					} = data || {};
					if (!success) {
						alert(detail);
						return;
					}
					setSlotStatus(status || "");
					setBusySlots(busy_slots || []);
					setFreeSlots(free_slots || []);
				}
			);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Stack
			alignItems={"center"}
			gap={5}
			bgcolor={"black"}
			width={"100%"}>
			<Stack
				flexDirection={{ xs: "column", md: "row" }}
				alignItems={"center"}
				gap={1}>
				<BasicDateTimePicker
					label={START_DATE_TIME}
					minDate={dayjs(currentDate)}
					value={startDateTime}
					onChange={handleStartDateTime}
				/>
				<BasicDateTimePicker
					label={END_DATE_TIME}
					minDate={startDateTime || undefined}
					value={endDateTime}
					disabled={!startDateTime}
					onChange={handleEndDateTime}
				/>
				<DropDownMenu
					options={expertList || []}
					title={EXPERT}
					value={currentExpert}
					onChange={handleExperListOnChange}
				/>
			</Stack>
			<CommonButton
				text={GET_SLOTS}
				onClick={handleSubmit}
			/>
			{loading && <CircularProgress sx={{ marginTop: 10 }} />}
			{slotStatus?.toLowerCase() === FREE && (
				<Typography
					variant='h6'
					color={colors.lightBlue}>
					{NO_EVENTS_FOUND}
				</Typography>
			)}
			{freeSlots?.length !== 0 && freeSlots?.length !== 0 && (
				<Stack
					padding={2}
					alignItems={"center"}
					gap={2}
					border={`1px solid ${colors.deepSkyBlue}`}
					width={{ xs: "100%", md: "80%" }}>
					<List
						list={freeSlots}
						status={FREE_SLOT}
					/>
					<List
						list={busySlots}
						status={BUSY_SLOT}
					/>
				</Stack>
			)}
		</Stack>
	);
};

export default HomePage;
