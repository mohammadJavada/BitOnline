// function toFarsiNumber(n) {
//   const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

//   return n
//     .toString()
//     .split("")
//     .map((x) => farsiDigits[x])
//     .join("");
// }

// export default toFarsiNumber;

export const toFarsiNumber = (n) => {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return n.toString().replace(/\d/g, (x) => farsiDigits[x]);
};

export const p2e = (s) =>
  String(s).replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
