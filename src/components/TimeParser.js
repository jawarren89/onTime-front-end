const TimeParser = (time) => {
  const militaryParser = (time) => {
    if (time.hour > 12) {
      return [time.hour - 12, "PM"];
    } else {
      return [time.hour, "AM"];
    }
  };

  const civilian = militaryParser(time);

  if (time.minute === 0) {
    return [civilian[0], "00", civilian[1]];
  } else {
    return [civilian[0], time.minute, civilian[1]];
  }
};

export default TimeParser;
