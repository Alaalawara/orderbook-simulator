export function useOrderSimulation(orderbook, order) {
  if (!orderbook?.bids?.length || !orderbook?.asks?.length || !order?.quantity) {
    return { fill: 0, fillPercent: 0, slippage: 0, impact: 0, depthRows: [] };
  }

  const { orderType, side, price, quantity } = order;
  let fill = 0, cost = 0, cumQty = 0;
  let rows = [];
  let book = side === "buy" ? orderbook.asks : orderbook.bids;
  let target = orderType === "market" ? quantity : 0;
  let impact = 0;
  let avgFillPrice = 0;

  for (let level of book) {
    let [lvlPrice, lvlQty] = [parseFloat(level[0]), parseFloat(level[1])];
    if (orderType === "limit" &&
      ((side === "buy" && lvlPrice > price) || (side === "sell" && lvlPrice < price))
    ) {
      break;
    }
    let takeQty = orderType === "market" ? Math.min(quantity - fill, lvlQty) : Math.min(lvlQty, quantity);
    fill += takeQty;
    cost += lvlPrice * takeQty;
    rows.push({ price: lvlPrice, qty: lvlQty, takeQty });
    if (fill >= quantity) break;
  }
  if (fill) avgFillPrice = cost / fill;
  if (orderType === "market") {
    impact = (Math.abs(
      (avgFillPrice - (side === "buy" ? parseFloat(orderbook.asks[0][0]) : parseFloat(orderbook.bids[0][0])))
    ) / avgFillPrice) * 100;
  } else if (orderType === "limit" && fill > 0) {
    impact = (Math.abs(price - avgFillPrice) / price) * 100;
  }
  const fillPercent = (fill / quantity) * 100;
  const slippage = avgFillPrice ? Math.abs(((avgFillPrice - price) / price) * 100) : 0;

  return {
    fill,
    fillPercent,
    impact,
    slippage,
    depthRows: rows,
  };
}
