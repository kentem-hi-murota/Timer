export const isMmssFormat = (input: string): boolean => {
  const regexMinutes = /\d+:{1}\d{0,2}$/;
  return regexMinutes.test(input);
};

export const isNumber = (input: string): boolean => {
  const regexSeconds = /^[\d]+$/;
  return regexSeconds.test(input);
};

export const bellPlay = async () => {
  // const audio = new Audio('sounds/爆発2.mp3');
  const audio = new Audio("sounds/鳩時計2.mp3");
  await audio.play();
};
/// https://soundeffect-lab.info

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
