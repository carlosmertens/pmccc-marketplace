export const calcRatingAvg = arr =>
  arr.reduce((acc, value) => acc + value.rating, 0) / arr.length;
