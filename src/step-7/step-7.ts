export interface DataItem {
  name: string;
  daysRemaining: number;
  quality: number;
}

export interface Item extends DataItem {
  tick(): void;
}

export class BaseItem implements Item {
  name: string;
  daysRemaining: number;
  quality: number;

  constructor(name: string, daysRemaining: number, quality: number) {
    this.name = name;
    this.daysRemaining = daysRemaining;
    this.quality = quality;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  tick(): void {}
}

export class NormalItem extends BaseItem {
  tick() {
    this.daysRemaining -= 1;
    this.quality -= 1;

    if (this.daysRemaining < 0) {
      this.quality -= 1;
    }

    if (this.quality < 0) {
      this.quality = 0;
    }
  }
}

export class BrieItem extends BaseItem {
  tick() {
    this.daysRemaining -= 1;
    this.quality += 1;

    if (this.daysRemaining < 0) {
      this.quality += 1;
    }

    if (this.quality > 50) {
      this.quality = 50;
    }
  }
}

export class LegendaryItem extends BaseItem {}

export class BackstageItem extends BaseItem {
  tick() {
    this.daysRemaining -= 1;
    this.quality += 1;

    if (this.daysRemaining < 10) {
      this.quality += 1;
    }

    if (this.daysRemaining < 5) {
      this.quality += 1;
    }

    if (this.daysRemaining < 0) {
      this.quality = 0;
    }

    if (this.quality > 50) {
      this.quality = 50;
    }
  }
}

const ITEM_MAP: Record<string, typeof BaseItem> = {
  'Aged Brie': BrieItem,
  'Sulfuras, Hand of Ragnaros': LegendaryItem,
  'Backstage passes to a TAFKAL80ETC concert': BackstageItem
};

class ItemFactory {
  static for(item: DataItem): Item {
    const ItemClass = ITEM_MAP[item.name] ?? NormalItem;

    return new ItemClass(item.name, item.daysRemaining, item.quality);
  }
}

export function tick(dataItem: DataItem): Item {
  const item = ItemFactory.for(dataItem);
  item.tick();

  return item;
}
