// For basic number formatting and calculations

export function formatNumber(num, digits = 2) {
  return Number(num).toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

// Merge new snapshot (asks/bids) to current orderbook
export function updateOrderbook(prev, updates, side = "bids") {
  const map = new Map(prev.map(lvl => [lvl[0], lvl[1]]));
  updates.forEach(([price, size]) => {
    if (size === "0" || size <= 0) {
      map.delete(price);
    } else {
      map.set(price, size);
    }
  });
  return Array.from(map.entries()).sort((a, b) =>
    side === "bids" ?
      parseFloat(b[0]) - parseFloat(a[0]) :
      parseFloat(a[0]) - parseFloat(b[0])
  );
}
