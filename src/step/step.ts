type Item = {
  name: string;
  daysRemaining: number;
  quality: number;
};

function defaultDropQuality(item: Item) {
  if (item.daysRemaining < 0) {
    item.quality -= 2;
  } else {
    item.quality -= 1;
  }
  return item;
}

function defaultQualityControl(item: Item) {
  if (item.quality < 0) {
    item.quality = 0;
  } else if (item.quality > 50) {
    item.quality = 50;
  }
  return item;
}

function defaultPassTime(item: Item) {
  item.daysRemaining -= 1;
  return item;
}

class ItemHandler {
  private item: Item;
  dropQuality: () => void = () => defaultDropQuality(this.item);
  qualityControl: () => void = () => defaultQualityControl(this.item);
  passTime: () => void = () => defaultPassTime(this.item);
  getItem: () => Item = () => this.item;

  constructor(item: Item) {
    this.item = item;
  }
}

// No overrides for the standard item
class StandardItem extends ItemHandler {}

export function tick(item: Item): Item {
  // Legacy:
  if (['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros'].includes(item.name)) {
    if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (item.quality > 0) {
        if (item.name != 'Sulfuras, Hand of Ragnaros') {
          item.quality = item.quality - 1;
        }
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
        if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.daysRemaining < 11) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
          if (item.daysRemaining < 6) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
        }
      }
    }

    if (item.name != 'Sulfuras, Hand of Ragnaros') {
      item.daysRemaining = item.daysRemaining - 1;
    }

    if (item.daysRemaining < 0) {
      if (item.name != 'Aged Brie') {
        if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.quality > 0) {
            if (item.name != 'Sulfuras, Hand of Ragnaros') {
              item.quality = item.quality - 1;
            }
          }
        } else {
          item.quality = item.quality - item.quality;
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
    }
    return item;
  } else {
    const handler = new StandardItem(item);
    handler.passTime();
    handler.dropQuality();
    handler.qualityControl();
    return handler.getItem();
  }
}
