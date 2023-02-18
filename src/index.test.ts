import { GildedRose } from './index';

describe('Gilded Rose', () => {
  let name = '';

  describe('Normal', () => {
    beforeEach(() => {
      name = 'Normal Item';
    });

    it('before sell date', () => {
      const gildedRose = new GildedRose(name, 5, 10);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(4);
      expect(gildedRose.quality).toEqual(9);
    });

    it('on sell date', () => {
      const gildedRose = new GildedRose(name, 0, 10);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(-1);
      expect(gildedRose.quality).toEqual(8);
    });

    it('after sell date', () => {
      const gildedRose = new GildedRose(name, -10, 10);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(-11);
      expect(gildedRose.quality).toEqual(8);
    });

    it('with no quality', () => {
      const gildedRose = new GildedRose(name, 5, 0);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(4);
      expect(gildedRose.quality).toEqual(0);
    });
  });

  describe('Aged Brie', () => {
    beforeEach(() => {
      name = 'Aged Brie';
    });

    it('before sell date', () => {
      const gildedRose = new GildedRose(name, 5, 10);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(4);
      expect(gildedRose.quality).toEqual(11);
    });

    it('at max quality', () => {
      const gildedRose = new GildedRose(name, 5, 50);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(4);
      expect(gildedRose.quality).toEqual(50);
    });

    it('on sell date', () => {
      const gildedRose = new GildedRose(name, 0, 10);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(-1);
      expect(gildedRose.quality).toEqual(12);
    });

    it('on sell date near max quality', () => {
      const gildedRose = new GildedRose(name, 0, 49);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(-1);
      expect(gildedRose.quality).toEqual(50);
    });
    it('on sell date with max quality', () => {
      const gildedRose = new GildedRose(name, 0, 50);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(-1);
      expect(gildedRose.quality).toEqual(50);
    });
    it('after sell date', () => {
      const gildedRose = new GildedRose(name, -10, 10);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(-11);
      expect(gildedRose.quality).toEqual(12);
    });
    it('after sell date with max quality', () => {
      const gildedRose = new GildedRose(name, -10, 50);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(-11);
      expect(gildedRose.quality).toEqual(50);
    });
  });

  describe('Sulfuras, Hand of Ragnaros', () => {
    beforeEach(() => {
      name = 'Sulfuras, Hand of Ragnaros';
    });

    it('before sell date', () => {
      const gildedRose = new GildedRose(name, 5, 80);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(5);
      expect(gildedRose.quality).toEqual(80);
    });
    it('on sell date', () => {
      const gildedRose = new GildedRose(name, 0, 80);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(0);
      expect(gildedRose.quality).toEqual(80);
    });

    it('after sell date', () => {
      const gildedRose = new GildedRose(name, -10, 80);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(-10);
      expect(gildedRose.quality).toEqual(80);
    });
  });

  describe('Backstage passes to a TAFKAL80ETC concert', () => {
    beforeEach(() => {
      name = 'Backstage passes to a TAFKAL80ETC concert';
    });

    it('long before sell date', () => {
      const gildedRose = new GildedRose(name, 11, 10);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(10);
      expect(gildedRose.quality).toEqual(11);
    });

    it('long before sell date with max quality', () => {
      const gildedRose = new GildedRose(name, 11, 50);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(10);
      expect(gildedRose.quality).toEqual(50);
    });

    it('medium close to sell date upper bound', () => {
      const gildedRose = new GildedRose(name, 10, 10);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(9);
      expect(gildedRose.quality).toEqual(12);
    });

    it('medium close to sell date upper bound at max quality', () => {
      const gildedRose = new GildedRose(name, 10, 50);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(9);
      expect(gildedRose.quality).toEqual(50);
    });

    it('medium close to sell date lower bound', () => {
      const gildedRose = new GildedRose(name, 6, 10);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(5);
      expect(gildedRose.quality).toEqual(12);
    });

    it('medium close to sell date lower bound at max quality', () => {
      const gildedRose = new GildedRose(name, 6, 50);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(5);
      expect(gildedRose.quality).toEqual(50);
    });

    it('very close to sell date upper bound', () => {
      const gildedRose = new GildedRose(name, 5, 10);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(4);
      expect(gildedRose.quality).toEqual(13);
    });

    it('very close to sell date upper bound at max quality', () => {
      const gildedRose = new GildedRose(name, 5, 50);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(4);
      expect(gildedRose.quality).toEqual(50);
    });

    it('very close to sell date lower bound', () => {
      const gildedRose = new GildedRose(name, 1, 10);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(0);
      expect(gildedRose.quality).toEqual(13);
    });

    it('very close to sell date lower bound at max quality', () => {
      const gildedRose = new GildedRose(name, 1, 50);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(0);
      expect(gildedRose.quality).toEqual(50);
    });

    it('on sell date', () => {
      const gildedRose = new GildedRose(name, 0, 10);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(-1);
      expect(gildedRose.quality).toEqual(0);
    });

    it('after sell date', () => {
      const gildedRose = new GildedRose(name, -10, 10);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(-11);
      expect(gildedRose.quality).toEqual(0);
    });
  });

  describe.skip('Backstage passes to a TAFKAL80ETC concert', () => {
    beforeEach(() => {
      name = 'Conjured Mana Cake';
    });

    it('before sell date', () => {
      const gildedRose = new GildedRose(name, 5, 10);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(4);
      expect(gildedRose.quality).toEqual(8);
    });

    it('before sell date at zero quality', () => {
      const gildedRose = new GildedRose(name, 5, 0);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(4);
      expect(gildedRose.quality).toEqual(0);
    });

    it('on sell date', () => {
      const gildedRose = new GildedRose(name, 0, 10);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(-1);
      expect(gildedRose.quality).toEqual(6);
    });

    it('on sell date at zero quality', () => {
      const gildedRose = new GildedRose(name, 0, 0);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(-1);
      expect(gildedRose.quality).toEqual(0);
    });

    it('after sell date', () => {
      const gildedRose = new GildedRose(name, -10, 10);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(-11);
      expect(gildedRose.quality).toEqual(6);
    });

    it('after sell date at zero quality', () => {
      const gildedRose = new GildedRose(name, -10, 0);
      gildedRose.tick();
      expect(gildedRose.daysRemaining).toEqual(-11);
      expect(gildedRose.quality).toEqual(0);
    });
  });
});
