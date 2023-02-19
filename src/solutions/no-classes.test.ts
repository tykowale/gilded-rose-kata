import { tick } from '../no-classes';

describe.skip('Gilded Rose', () => {
  let name = '';

  describe('Normal', () => {
    beforeEach(() => {
      name = 'Normal Item';
    });

    it('before sell date', () => {
      const gildedRose = { name, daysRemaining: 5, quality: 10 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(4);
      expect(response.quality).toEqual(9);
    });

    it('on sell date', () => {
      const gildedRose = { name, daysRemaining: 0, quality: 10 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(-1);
      expect(response.quality).toEqual(8);
    });

    it('after sell date', () => {
      const gildedRose = { name, daysRemaining: -10, quality: 10 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(-11);
      expect(response.quality).toEqual(8);
    });

    it('with no quality', () => {
      const gildedRose = { name, daysRemaining: 5, quality: 0 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(4);
      expect(response.quality).toEqual(0);
    });
  });

  describe('Aged Brie', () => {
    beforeEach(() => {
      name = 'Aged Brie';
    });

    it('before sell date', () => {
      const gildedRose = { name, daysRemaining: 5, quality: 10 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(4);
      expect(response.quality).toEqual(11);
    });

    it('at max quality', () => {
      const gildedRose = { name, daysRemaining: 5, quality: 50 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(4);
      expect(response.quality).toEqual(50);
    });

    it('on sell date', () => {
      const gildedRose = { name, daysRemaining: 0, quality: 10 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(-1);
      expect(response.quality).toEqual(12);
    });

    it('on sell date near max quality', () => {
      const gildedRose = { name, daysRemaining: 0, quality: 49 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(-1);
      expect(response.quality).toEqual(50);
    });
    it('on sell date with max quality', () => {
      const gildedRose = { name, daysRemaining: 0, quality: 50 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(-1);
      expect(response.quality).toEqual(50);
    });
    it('after sell date', () => {
      const gildedRose = { name, daysRemaining: -10, quality: 10 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(-11);
      expect(response.quality).toEqual(12);
    });
    it('after sell date with max quality', () => {
      const gildedRose = { name, daysRemaining: -10, quality: 50 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(-11);
      expect(response.quality).toEqual(50);
    });
  });

  describe('Sulfuras, Hand of Ragnaros', () => {
    beforeEach(() => {
      name = 'Sulfuras, Hand of Ragnaros';
    });

    it('before sell date', () => {
      const gildedRose = { name, daysRemaining: 5, quality: 80 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(5);
      expect(response.quality).toEqual(80);
    });
    it('on sell date', () => {
      const gildedRose = { name, daysRemaining: 0, quality: 80 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(0);
      expect(response.quality).toEqual(80);
    });

    it('after sell date', () => {
      const gildedRose = { name, daysRemaining: -10, quality: 80 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(-10);
      expect(response.quality).toEqual(80);
    });
  });

  describe('Backstage passes to a TAFKAL80ETC concert', () => {
    beforeEach(() => {
      name = 'Backstage passes to a TAFKAL80ETC concert';
    });

    it('long before sell date', () => {
      const gildedRose = { name, daysRemaining: 11, quality: 10 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(10);
      expect(response.quality).toEqual(11);
    });

    it('long before sell date with max quality', () => {
      const gildedRose = { name, daysRemaining: 11, quality: 50 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(10);
      expect(response.quality).toEqual(50);
    });

    it('medium close to sell date upper bound', () => {
      const gildedRose = { name, daysRemaining: 10, quality: 10 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(9);
      expect(response.quality).toEqual(12);
    });

    it('medium close to sell date upper bound at max quality', () => {
      const gildedRose = { name, daysRemaining: 10, quality: 50 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(9);
      expect(response.quality).toEqual(50);
    });

    it('medium close to sell date lower bound', () => {
      const gildedRose = { name, daysRemaining: 6, quality: 10 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(5);
      expect(response.quality).toEqual(12);
    });

    it('medium close to sell date lower bound at max quality', () => {
      const gildedRose = { name, daysRemaining: 6, quality: 50 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(5);
      expect(response.quality).toEqual(50);
    });

    it('very close to sell date upper bound', () => {
      const gildedRose = { name, daysRemaining: 5, quality: 10 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(4);
      expect(response.quality).toEqual(13);
    });

    it('very close to sell date upper bound at max quality', () => {
      const gildedRose = { name, daysRemaining: 5, quality: 50 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(4);
      expect(response.quality).toEqual(50);
    });

    it('very close to sell date lower bound', () => {
      const gildedRose = { name, daysRemaining: 1, quality: 10 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(0);
      expect(response.quality).toEqual(13);
    });

    it('very close to sell date lower bound at max quality', () => {
      const gildedRose = { name, daysRemaining: 1, quality: 50 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(0);
      expect(response.quality).toEqual(50);
    });

    it('on sell date', () => {
      const gildedRose = { name, daysRemaining: 0, quality: 10 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(-1);
      expect(response.quality).toEqual(0);
    });

    it('after sell date', () => {
      const gildedRose = { name, daysRemaining: -10, quality: 10 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(-11);
      expect(response.quality).toEqual(0);
    });
  });

  describe('Backstage passes to a TAFKAL80ETC concert', () => {
    beforeEach(() => {
      name = 'Conjured Mana Cake';
    });

    it('before sell date', () => {
      const gildedRose = { name, daysRemaining: 5, quality: 10 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(4);
      expect(response.quality).toEqual(8);
    });

    it('before sell date at zero quality', () => {
      const gildedRose = { name, daysRemaining: 5, quality: 0 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(4);
      expect(response.quality).toEqual(0);
    });

    it('on sell date', () => {
      const gildedRose = { name, daysRemaining: 0, quality: 10 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(-1);
      expect(response.quality).toEqual(6);
    });

    it('on sell date at zero quality', () => {
      const gildedRose = { name, daysRemaining: 0, quality: 0 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(-1);
      expect(response.quality).toEqual(0);
    });

    it('after sell date', () => {
      const gildedRose = { name, daysRemaining: -10, quality: 10 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(-11);
      expect(response.quality).toEqual(6);
    });

    it('after sell date at zero quality', () => {
      const gildedRose = { name, daysRemaining: -10, quality: 0 };
      const response = tick(gildedRose);

      expect(response.daysRemaining).toEqual(-11);
      expect(response.quality).toEqual(0);
    });
  });
});
