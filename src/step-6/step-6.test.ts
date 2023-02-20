import { tick } from './step-6';

describe('Gilded Rose', () => {
  describe('Normal Item on day change', () => {
    const name = 'Normal Item';

    it.each`
      desc                                       | daysRemaining | quality | expectedQuality
      ${'reduces quality by 1 before sell date'} | ${5}          | ${10}   | ${9}
      ${'reduces quality by 2 on sell date'}     | ${0}          | ${10}   | ${8}
      ${'reduces quality by 2 after sell date'}  | ${-10}        | ${10}   | ${8}
      ${'does not reduce quality below 0'}       | ${5}          | ${0}    | ${0}
    `('$desc', ({ daysRemaining, quality, expectedQuality }) => {
      const item = { name, daysRemaining, quality };
      const response = tick(item);

      expect(response.daysRemaining).toEqual(daysRemaining - 1);
      expect(response.quality).toEqual(expectedQuality);
    });

    it('is the default item type', () => {
      const item = { name: 'foo bar', daysRemaining: 10, quality: 10 };
      const response = tick(item);

      expect(response.daysRemaining).toEqual(9);
      expect(response.quality).toEqual(9);
    });
  });

  describe('Aged Brie on day change', () => {
    const name = 'Aged Brie';
    it.each`
      desc                                                                     | daysRemaining | quality | expectedQuality
      ${'increases quality by 1 before sell date'}                             | ${5}          | ${10}   | ${11}
      ${'does not increase quality beyond max quality'}                        | ${5}          | ${50}   | ${50}
      ${'increases quality by 2 on sell date'}                                 | ${0}          | ${10}   | ${12}
      ${'does not increase over max quality on sell date near max quality'}    | ${0}          | ${49}   | ${50}
      ${'does not increase over max quality on sell date with max quality'}    | ${0}          | ${50}   | ${50}
      ${'increases quality by 2 after sell date'}                              | ${-10}        | ${10}   | ${12}
      ${'does not increase over max quality after sell date with max quality'} | ${-10}        | ${50}   | ${50}
    `('$desc', ({ daysRemaining, quality, expectedQuality }) => {
      const item = { name, daysRemaining, quality };
      const response = tick(item);

      expect(response.daysRemaining).toEqual(daysRemaining - 1);
      expect(response.quality).toEqual(expectedQuality);
    });
  });

  describe('Sulfuras, Hand of Ragnaros on day change', () => {
    const name = 'Sulfuras, Hand of Ragnaros';
    it.each`
      desc                                                  | daysRemaining | quality
      ${'does not change quality or days before sell date'} | ${5}          | ${80}
      ${'does not change quality or days on sell date'}     | ${0}          | ${80}
      ${'does not change quality or days after sell date'}  | ${-10}        | ${80}
    `('$desc', ({ daysRemaining, quality }) => {
      const item = { name, daysRemaining, quality };
      const response = tick(item);

      expect(response.daysRemaining).toEqual(daysRemaining);
      expect(response.quality).toEqual(quality);
    });
  });

  describe('Backstage passes to a TAFKAL80ETC concert on day change', () => {
    const name = 'Backstage passes to a TAFKAL80ETC concert';
    it.each`
      desc                                                                                       | daysRemaining | quality | expectedQuality
      ${'increases quality by 1 more than 10 days before sell date'}                             | ${11}         | ${10}   | ${11}
      ${'does not exceed max quality more than 10 days before sell date'}                        | ${11}         | ${50}   | ${50}
      ${'increases quality by 2 between 10 and 5 days before sell date (upper bound)'}           | ${10}         | ${10}   | ${12}
      ${'does not exceed max quality more between 10 and 5 days before sell date (upper bound)'} | ${10}         | ${50}   | ${50}
      ${'increases quality by 2 between 10 and 5 days before sell date (lower bound)'}           | ${6}          | ${10}   | ${12}
      ${'does not exceed max quality between 10 and 5 days before sell date (lower bound)'}      | ${6}          | ${50}   | ${50}
      ${'increases quality by 3 between 5 and 0 days days before sell date (upper bound)'}       | ${5}          | ${10}   | ${13}
      ${'does not exceed max quality between 5 and 0 days before sell date (upper bound)'}       | ${5}          | ${50}   | ${50}
      ${'increases quality by 3 between 5 and 0 days days before sell date (lower bound)'}       | ${1}          | ${10}   | ${13}
      ${'does not exceed max quality between 5 and 0 days before sell date (lower bound)'}       | ${1}          | ${50}   | ${50}
      ${'drops to 0 quality on sell date'}                                                       | ${0}          | ${10}   | ${0}
      ${'drops to 0 quality after sell date'}                                                    | ${-10}        | ${10}   | ${0}
    `('$desc', ({ daysRemaining, quality, expectedQuality }) => {
      const item = { name, daysRemaining, quality };
      const response = tick(item);

      expect(response.daysRemaining).toEqual(daysRemaining - 1);
      expect(response.quality).toEqual(expectedQuality);
    });
  });
});
