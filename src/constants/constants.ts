export const MIDDLEWARE = process.env.BASE_API_URL;
export const ENVIRONMENT = process.env.ENVIRONMENT;

export const LABEL = {
	START_DATE_TIME: "Start Date and Time",
	END_DATE_TIME: "End Date and Time",
	EXPERT: "Expert",
	GET_SLOTS: "Get Slots",
	FREE_SLOT: "Free Slots",
	BUSY_SLOT: "Busy Slots",
	SLOT_STATUS: "Slot Status",
	START: "Start",
	END: "End",
};

export const ERROR_MESSAGE = {
	FILL_ALL_VALUES: "Please fill in all the fields.",
	START_DATE_TIME_NOT_BE_GREATER:
		"The start datetime should not be less than the current datetime.",
	END_DATE_TIME_NOT_BE_GREATER:
		"The end datetime should not be less than the start datetime.",
	SELECT_SAME_DAY_DATE:
		"Please ensure that the start datetime and end datetime are from the same day.",
};

export const MESSAGE = {
	NO_OPTION_AVAILABLE: "No options are currently available.",
	NO_EVENTS_FOUND: "No events found."
};

export const FREE = "free";
