// OKX Orderbook connector (spot, 15+ levels)

export function connectOKXOrderbook(symbol, callback) {
  // symbol: eg "BTC-USDT"
  const ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public");
  const msg = {
    op: "subscribe",
    args: [{ channel: "books", instId: symbol }]
  };
  ws.onopen = () => ws.send(JSON.stringify(msg));
  ws.onmessage = (evt) => {
    const data = JSON.parse(evt.data);
    if (data.arg?.channel === "books" && (data.data || data.action === "snapshot")) {
      const book = data.data[0];
      callback({
        bids: book.bids.slice(0, 15),
        asks: book.asks.slice(0, 15),
        ts: book.ts
      });
    }
  };
  ws.onerror = () => { };
  return () => ws.close();
}
