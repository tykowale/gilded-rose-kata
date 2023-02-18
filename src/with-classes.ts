interface Item {
  name: string;
  daysRemaining: number;
  quality: number;
  tick: () => void;
}

class BaseItem implements Item {
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

class NormalItem extends BaseItem {
  override tick(): void {
    this.daysRemaining -= 1;

    if (this.quality <= 0) {
      return;
    }

    this.quality -= 1;

    if (this.daysRemaining <= 0) {
      this.quality -= 1;
    }
  }
}

class BrieItem extends BaseItem {
  override tick(): void {
    this.daysRemaining -= 1;

    this.quality += 1;

    if (this.daysRemaining < 0) {
      this.quality += 1;
    }

    if (this.quality >= 50) {
      this.quality = 50;
    }
  }
}

class BackstageItem extends BaseItem {
  tick(): void {
    this.daysRemaining -= 1;

    this.quality += 1;

    if (this.daysRemaining <= 9) {
      this.quality += 1;
    }

    if (this.daysRemaining <= 4) {
      this.quality += 1;
    }

    if (this.quality > 50) {
      this.quality = 50;
    }

    if (this.daysRemaining < 0) {
      this.quality = 0;
    }
  }
}

export class ConjuredItem extends BaseItem {
  tick(): void {
    this.daysRemaining -= 1;

    if (this.quality <= 0) {
      return;
    }

    this.quality -= 2;

    if (this.daysRemaining <= 0) {
      this.quality -= 2;
    }
  }
}

const ITEM_MAPPING = {
  'Normal Item': NormalItem,
  'Aged Brie': BrieItem,
  'Backstage passes to a TAFKAL80ETC concert': BackstageItem,
  'Conjured Mana Cake': ConjuredItem
};

export class ItemFactory {
  static buildItem(name: string, daysRemaining: number, quality: number): Item {
    // @ts-expect-error shhh
    const ItemClass = ITEM_MAPPING[name] ?? BaseItem;

    return new ItemClass(name, daysRemaining, quality);
  }
}

export class GildedRose implements Item {
  private item: Item;

  constructor(name: string, daysRemaining: number, quality: number) {
    this.item = ItemFactory.buildItem(name, daysRemaining, quality);
  }

  get name(): string {
    return this.item.name;
  }

  get daysRemaining(): number {
    return this.item.daysRemaining;
  }

  get quality(): number {
    return this.item.quality;
  }

  tick(): void {
    this.item.tick();
  }
}
