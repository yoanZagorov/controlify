export default function getCurrentDevice() {
  const windowSize = window.innerWidth;

  if (windowSize < 375) {
    return "ms";
  } else if (windowSize < 425) {
    return "mm";
  } else if (windowSize < 768) {
    return "ml";
  } else if (windowSize < 1024) {
    return "tab";
  } else if (windowSize < 1280) {
    return "ls";
  } else if (windowSize < 1440) {
    return "lm";
  } else if (windowSize < 1920) {
    return "ll";
  } else if (windowSize < 3840) {
    return "fhd";
  } else {
    return "4k";
  }
}