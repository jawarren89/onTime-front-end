const TimeToCivilian = (time) => {
  const militaryParser = (time) => {
    if (time.hour > 12) {
      return [time.hour - 12, "PM"];
    } else {
      return [time.hour, "AM"];
    }
  };

  const civilian = militaryParser(time);

  if (time.minute === 0) {
    return [civilian[0].toString(), "00", civilian[1].toString()];
  } else {
    return [
      civilian[0].toString(),
      time.minute.toString(),
      civilian[1].toString(),
    ];
  }
};

export default TimeToCivilian;
