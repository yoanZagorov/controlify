// Make more precise calculations by avoiding decimals

export default function performDecimalCalculation(firstNum, secondNum, operator, decimals = 2) {
  const multiplier = 10 ** decimals;

  const workingFirstNum = firstNum * (multiplier);
  const workingSecondNum = secondNum * (multiplier);

  let result;

  if (operator === "+") {
    result = workingFirstNum + workingSecondNum;
  } else if (operator === "-") {
    result = workingFirstNum - workingSecondNum;
  } else if (operator === "*") {
    result = workingFirstNum * workingSecondNum;
  } else if (operator === "/") {
    result = workingFirstNum / workingSecondNum;
  }

  const normalizedResult =
    operator === "*" ? result / (multiplier * multiplier)
      : operator === "/" ? result
        : result / multiplier

  return parseFloat(normalizedResult.toFixed(2));
}