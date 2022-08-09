// TimeToCivilian takes a 24hr time, as retrieved via an axios call, and
// converts it into a list of two-digit strings for hours, minutes, and
// meridiem (AM/PM).

export const TimeToCivilian = (time) => {
  const militaryParser = (time) => {
    if (time.hour > 12) {
      return [time.hour - 12, "PM"];
    } else {
      return [time.hour, "AM"];
    }
  };

  if (time) {
    const civilian = militaryParser(time);
    if (time.hour === 0 && time.minute === 0) {
      return {
        hour: "--",
        minute: "--",
        meridiem: "--",
      };
    }
    if (time.minute < 10) {
      return {
        hour: civilian[0].toString(),
        minute: "0" + time.minute,
        meridiem: civilian[1].toString(),
      };
    } else {
      return {
        hour: civilian[0].toString(),
        minute: time.minute.toString(),
        meridiem: civilian[1].toString(),
      };
    }
  } else {
    return { hour: "--", minute: "--", meridiem: "--" };
  }
};

export const TimeToMilitary = (targetId, targetValue, civCompleteTime) => {
  if (targetValue === "--") {
    return { id: targetId, value: 0 };
  } else if (targetId === "hour") {
    if (civCompleteTime.meridiem === "PM") {
      return { id: targetId, value: parseInt(targetValue) + 12 };
    }
    return { id: targetId, value: parseInt(targetValue) };
  } else if (targetId === "minute") {
    return { id: targetId, value: parseInt(targetValue) };
  } else if (targetId === "meridiem") {
    return { id: "hour", value: civCompleteTime.hour };
  }
};
