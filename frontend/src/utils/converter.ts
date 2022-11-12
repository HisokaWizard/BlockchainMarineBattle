/**
 * Converter's object must have flat structure, and backend objects too - easiest way to create automatic service
 */
export const converterToBackend = <
  FormData extends object,
  ServerDto extends object
>(
  form: FormData
) => {
  let newServerDto = {};
  const keys = Object.keys(form);
  keys.forEach((key) => {
    const isString = typeof form[key] === "string";
    const isNumber = typeof form[key] === "number";
    const isBoolean = typeof form[key] === "boolean";
    const isObj = typeof form[key] === "object";
    const isDictionary =
      isObj && form[key] !== null && "code" in form[key] && "name" in form[key];
    const isArray = Array.isArray(form[key]) && "code";
    if (isString || isNumber || isBoolean) {
      newServerDto[key] = form[key];
    }
    if (isDictionary) {
      newServerDto[key + "Code"] = form[key].code;
    }
    if (isArray) {
      if (
        form[key].length !== 0 &&
        typeof form[key]?.[0] === "object" &&
        form[key]?.[0] !== null &&
        "code" in form[key]?.[0] &&
        "name" in form[key]?.[0]
      ) {
        newServerDto[key + "Codes"] = form[key].map((it) => it.code);
      }
    }
  });
  return newServerDto as ServerDto;
};
