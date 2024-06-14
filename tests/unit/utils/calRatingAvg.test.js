import { calcRatingAvg } from '../../../utils/calcRatingAvg.js';

const arr = [{ rating: 1 }, { rating: 2 }, { rating: 3 }];

describe('callRatingAvg', () => {
  it('should return average of ratings contained in an array', () => {
    const result = calcRatingAvg(arr);
    expect(result).toBe(2);
  });
});
