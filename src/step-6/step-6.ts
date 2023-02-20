export interface Item {
  name: string;
  daysRemaining: number;
  quality: number;
}

function normalTick(item: Item): Item {
  const daysRemaining = item.daysRemaining - 1;
  let quality = item.quality - 1;

  if (daysRemaining < 0) {
    quality -= 1;
  }

  if (quality < 0) {
    quality = 0;
  }

  return {
    name: item.name,
    quality,
    daysRemaining
  };
}

function brieTick(item: Item): Item {
  const daysRemaining = item.daysRemaining - 1;
  let quality = item.quality + 1;

  if (daysRemaining < 0) {
    quality += 1;
  }

  if (quality > 50) {
    quality = 50;
  }

  return {
    name: item.name,
    quality,
    daysRemaining
  };
}

function sulfurasTick(item: Item): Item {
  return {
    ...item
  };
}

function backstageTick(item: Item): Item {
  const daysRemaining = item.daysRemaining - 1;

  let quality = item.quality + 1;

  if (daysRemaining < 10) {
    quality += 1;
  }

  if (daysRemaining < 5) {
    quality += 1;
  }

  if (daysRemaining < 0) {
    quality = 0;
  }

  if (quality > 50) {
    quality = 50;
  }

  return {
    name: item.name,
    quality,
    daysRemaining
  };
}

export function tick(item: Item): Item {
  switch (item.name) {
    case 'Aged Brie':
      return brieTick(item);
    case 'Sulfuras, Hand of Ragnaros':
      return sulfurasTick(item);
    case 'Backstage passes to a TAFKAL80ETC concert':
      return backstageTick(item);
    default:
      return normalTick(item);
  }
}
