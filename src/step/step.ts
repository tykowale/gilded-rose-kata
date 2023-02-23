type Item = {
  name: string;
  daysRemaining: number;
  quality: number;
};

class ItemHandler {
  protected item: Item;

  updateQuality: () => void = () => {
    if (this.item.daysRemaining < 0) {
      this.item.quality -= 2;
    } else {
      this.item.quality -= 1;
    }
  };

  qualityControl: () => void = () => {
    if (this.item.quality < 0) {
      this.item.quality = 0;
    } else if (this.item.quality > 50) {
      this.item.quality = 50;
    }
  };

  passTime: () => void = () => {
    this.item.daysRemaining -= 1;
  };

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
