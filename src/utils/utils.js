export default function isStringContainSpaces(value) {
  let val = value;
  val = val ? val.toString() : val;
  return val.match(/\S+/) === null;
}
