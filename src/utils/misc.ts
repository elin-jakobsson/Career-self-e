export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const groupObjectArray = (
  arr: any[],
  key: string,
): { [key: string]: any }[][] =>
  Object.values(
    arr.reduce((acc, curr) => {
      acc[curr[key]] = acc[curr[key]] || [];
      acc[curr[key]].push(curr);
      return acc;
    }, {}),
  );
