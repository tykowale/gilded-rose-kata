export interface GildedRose {
  name: string;
  daysRemaining: number;
  quality: number;
}

export function tick(rose: GildedRose): GildedRose {
  if (rose.name != 'Aged Brie' && rose.name != 'Backstage passes to a TAFKAL80ETC concert') {
    if (rose.quality > 0) {
      if (rose.name != 'Sulfuras, Hand of Ragnaros') {
        rose.quality = rose.quality - 1;
      }
    }
  } else {
    if (rose.quality < 50) {
      rose.quality = rose.quality + 1;
      if (rose.name == 'Backstage passes to a TAFKAL80ETC concert') {
        if (rose.daysRemaining < 11) {
          if (rose.quality < 50) {
            rose.quality = rose.quality + 1;
          }
        }
        if (rose.daysRemaining < 6) {
          if (rose.quality < 50) {
            rose.quality = rose.quality + 1;
          }
        }
      }
    }
  }

  if (rose.name != 'Sulfuras, Hand of Ragnaros') {
    rose.daysRemaining = rose.daysRemaining - 1;
  }

  if (rose.daysRemaining < 0) {
    if (rose.name != 'Aged Brie') {
      if (rose.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (rose.quality > 0) {
          if (rose.name != 'Sulfuras, Hand of Ragnaros') {
            rose.quality = rose.quality - 1;
          }
        }
      } else {
        rose.quality = rose.quality - rose.quality;
      }
    } else {
      if (rose.quality < 50) {
        rose.quality = rose.quality + 1;
      }
    }
  }

  return rose;
}
