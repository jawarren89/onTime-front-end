// TimeToCivilian takes 12hr time and meridiem, as retrieved via an axios call,
// and converts it into a list of two-digit strings for hours, minutes, and
// meridiem (AM/PM). If time is null, it returns "--" values for display.

// TimeToMilitary takes inputted hours, minutes, and meridiem from the
// TimeSelector and converts the three values back into 24 hour integer
// time (without a meridiem string) for an axios call.

export const TimeToCivilian = (time) => {
  if (time) {
    if (time.hour === 0 && time.minute === 0) {
      return {
        hour: "--",
        minute: "--",
        meridiem: "--",
      };
    } else if (time.minute < 10) {
      return {
        hour: time.hour.toString(),
        minute: "0" + time.minute,
        meridiem: time.meridiem,
      };
    } else {
      return {
        hour: time.hour.toString(),
        minute: time.minute.toString(),
        meridiem: time.meridiem,
      };
    }
  } else {
    return { hour: "--", minute: "--", meridiem: "--" };
  }
};

export const TimeToMilitary = (state) => {
  if (state.hour === "--") {
    return { hour: 0, minute: 0 };
  } else if (state.meridiem === "PM") {
    return {
      hour: parseInt(state.hour) + 12,
      minute: parseInt(state.minute),
    };
  } else {
    return {
      hour: parseInt(state.hour),
      minute: parseInt(state.minute),
    };
  }
};
