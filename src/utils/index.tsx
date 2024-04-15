export const isSameDay = (startDate: Date, endDate: Date) => {
	const startDateYear = startDate.getFullYear();
	const startDateMonth = startDate.getMonth();
	const startDateDay = startDate.getDate();

	const endDateYear = endDate.getFullYear();
	const endDateMonth = endDate.getMonth();
	const endDateDay = endDate.getDate();

	return (
		startDateYear === endDateYear &&
		startDateMonth === endDateMonth &&
		startDateDay === endDateDay
	);
};

export const isWithin24Hours = (startDate: Date, endDate: Date) => {
	const diffInMs = Math.abs(startDate.getTime() - endDate.getTime());
	const diffInHours = diffInMs / (1000 * 60 * 60);
	return diffInHours <= 24;
};
