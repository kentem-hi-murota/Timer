export const isMmssFormat = (input: string): boolean => {
  const regexMinutes = /\d+:{1}\d{0,2}$/;
  return regexMinutes.test(input);
};

export const isNumber = (input: string): boolean => {
  const regexSeconds = /^[\d]+$/;
  return regexSeconds.test(input);
};

/// https://soundeffect-lab.info
export const bellTypes = [
  "鳩時計2",
  "ドラム缶が倒れる",
  "電子レンジでチン",
  "猫の鳴き声1",
  "爆発1",
  "爆発2",
  "オオカミの遠吠え",
  "決定ボタンを押す29",
];

export const bellPlay = async (bellType: string) => {
  const audio = new Audio(`sounds/${bellType}.mp3`);
  await audio.play();
};

export const timeStringToNumber = (inputTime: string): number => {
  const maxSeconds = 5999;
  if (isMmssFormat(inputTime)) {
    const [minutes, seconds] = inputTime.split(":");
    return Math.max(
      Math.min(Number(minutes) * 60 + Number(seconds), maxSeconds),
      0
    );
  } else if (isNumber(inputTime)) {
    return Math.max(Math.min(Number(inputTime), maxSeconds), 0);
  }
  return -1;
};

export const timeNumberToString = (inputSeconds: number): string => {
  const minutes: string = Math.floor(inputSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds: string = (inputSeconds % 60).toString().padStart(2, "0");
  return minutes + ":" + seconds;
};
