type Item = {
  name: string;
  daysRemaining: number;
  quality: number;
};

class ItemHandler {
  protected item: Item;

  tick(): void {
    this.passTime();
    this.updateQuality();
  }

  updateQuality(): void {
    this.adjustQuality();
    this.qualityControl();
  }

  protected adjustQuality(): void {
    if (this.item.daysRemaining < 0) {
      this.item.quality -= 2;
    } else {
      this.item.quality -= 1;
    }
  }

  protected qualityControl(): void {
    if (this.item.quality < 0) {
      this.item.quality = 0;
    } else if (this.item.quality > 50) {
      this.item.quality = 50;
    }
  }

  protected passTime(): void {
    this.item.daysRemaining -= 1;
  }

  getItem(): Item {
    return this.item;
  }

  constructor(item: Item) {
    this.item = item;
  }
}

// No overrides for the standard item
class StandardItem extends ItemHandler {}

// Everything Sulfuras is a noop. It's legendary
class SulfurasItem extends ItemHandler {
  adjustQuality = () => null;
  qualityControl = () => null;
  passTime = () => null;
}

class AgedBrieItem extends ItemHandler {
  adjustQuality(): void {
    if (this.item.daysRemaining < 0) {
      this.item.quality += 2;
    } else {
      this.item.quality += 1;
    }
  }
}

class BackstagePassItem extends ItemHandler {
  adjustQuality(): void {
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

// It would be fun to do something fancier here with types, either by adding
// a name to the Item class for enforcement/ensuring we're not missing one
// or to autogenerate ths map. For now, this suffices.
const itemConstructor = new Map<string, typeof ItemHandler>([
  ['Aged Brie', AgedBrieItem],
  ['Backstage passes to a TAFKAL80ETC concert', BackstagePassItem],
  ['Sulfuras, Hand of Ragnaros', SulfurasItem]
]);

export function tick(item: Item): Item {
  const itemClass = itemConstructor.get(item.name) || StandardItem;
  const handler = new itemClass(item);

  handler.tick();
  return handler.getItem();
}
