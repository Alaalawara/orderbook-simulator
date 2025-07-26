export function connectDeribitOrderbook(symbol, callback) {
  // symbol eg 'BTC-PERPETUAL'
  const ws = new WebSocket("wss://www.deribit.com/ws/api/v2/");
  ws.onopen = () => {
    ws.send(JSON.stringify({
      jsonrpc: "2.0",
      method: "public/subscribe",
      params: {
        channels: [`book.${symbol}.none.20.1`]  // 20 levels - you can further slice to 15
      },
      id: 42
    }));
  };
  ws.onmessage = (evt) => {
    const data = JSON.parse(evt.data);
    if (data.method === "subscription" && data.params?.data) {
      const d = data.params.data;
      callback({
        bids: d.bids.slice(0, 15).map(lvl => [String(lvl[0]), String(lvl[1])]),
        asks: d.asks.slice(0, 15).map(lvl => [String(lvl[0]), String(lvl[1])]),
        ts: d.timestamp
      });
    }
  };
  ws.onerror = () => { };
  return () => ws.close();
}
