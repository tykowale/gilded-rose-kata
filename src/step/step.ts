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
  protected item: Item;
  updateQuality: () => void = () => defaultDropQuality(this.item);
  qualityControl: () => void = () => defaultQualityControl(this.item);
  passTime: () => void = () => defaultPassTime(this.item);
  getItem: () => Item = () => this.item;

  constructor(item: Item) {
    this.item = item;
  }
}

// No overrides for the standard item
class StandardItem extends ItemHandler {}

// Everything Sulfuras is a noop. It's legendary
class SulfurasItem extends ItemHandler {
  updateQuality = () => null;
  qualityControl = () => null;
  passTime = () => null;
}

class AgedBrieItem extends ItemHandler {
  updateQuality = () => {
    if (this.item.daysRemaining < 0) {
      this.item.quality += 2;
    } else {
      this.item.quality += 1;
    }
  };
}

class BackstagePassItem extends ItemHandler {
  updateQuality = () => {
    if (this.item.daysRemaining < 0) {
      this.item.quality = 0;
    } else if (this.item.daysRemaining < 5) {
      this.item.quality += 3;
    } else if (this.item.daysRemaining < 10) {
      this.item.quality += 2;
    } else {
      this.item.quality += 1;
    }
  };
}

export function tick(item: Item): Item {
  // Legacy (placeholder just for typechecking)
  if (['placeholder'].includes(item.name)) {
    if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (item.quality > 0) {
        item.quality = item.quality - 1;
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

    item.daysRemaining = item.daysRemaining - 1;

    if (item.daysRemaining < 0) {
      if (item.name != 'Aged Brie') {
        if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.quality > 0) {
            item.quality = item.quality - 1;
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
    let handler: ItemHandler;
    if (item.name === 'Sulfuras, Hand of Ragnaros') {
      handler = new SulfurasItem(item);
    } else if (item.name === 'Aged Brie') {
      handler = new AgedBrieItem(item);
    } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
      handler = new BackstagePassItem(item);
    } else {
      handler = new StandardItem(item);
    }
    handler.passTime();
    handler.updateQuality();
    handler.qualityControl();
    return handler.getItem();
  }
}
