export function connectBybitOrderbook(symbol, callback) {
  // symbol: eg "BTCUSDT"
  const ws = new WebSocket("wss://stream.bybit.com/v5/public/spot");
  ws.onopen = () => {
    ws.send(JSON.stringify({
      op: "subscribe",
      args: [`orderbook.50.${symbol}`] // 50 levels, slice on client for 15
    }));
  };
  ws.onmessage = (evt) => {
    const data = JSON.parse(evt.data);
    if (data.topic?.startsWith("orderbook") && data.data) {
      callback({
        bids: data.data.b.map(([p, q]) => [p, q]).slice(0, 15),
        asks: data.data.a.map(([p, q]) => [p, q]).slice(0, 15),
        ts: data.data.t
      });
    }
  };
  ws.onerror = () => { };
  return () => ws.close();
}
