export const timeVarFormat = (timeVar) => {
	if (!timeVar) {
		timeVar = '0';
	}
	timeVar += '';

	while (timeVar.length < 2) {
		timeVar = '0' + timeVar;
	}

	return timeVar;
};

const formatTime = (time) => {
	let result = '';
	const hour = timeVarFormat(time.hour);
	const minute = timeVarFormat(time.munute);

	if (hour) {
		result += hour;
	}
	if (minute) {
		result += ':' + minute;
	}

	return result;
};

export default formatTime;
