// TimeToCivilian takes a 24hr time, as retrieved via an axios call, and
// converts it into a list of two-digit strings for hours, minutes, and
// meridiem (AM/PM).

const TimeToCivilian = (time) => {
  const militaryParser = (time) => {
    if (time.hour > 12) {
      return [time.hour - 12, "PM"];
    } else {
      return [time.hour, "AM"];
    }
  };

  if (time) {
    const civilian = militaryParser(time);
    if (time.minute < 10) {
      return [
        civilian[0].toString(),
        "0" + time.minute,
        civilian[1].toString(),
      ];
    } else {
      return [
        civilian[0].toString(),
        time.minute.toString(),
        civilian[1].toString(),
      ];
    }
  } else {
    return ["--", "--", "--"];
  }
};

export default TimeToCivilian;
