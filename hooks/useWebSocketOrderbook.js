import { useEffect, useRef, useState } from "react";
import { connectOKXOrderbook } from "../services/okx";
import { connectBybitOrderbook } from "../services/bybit";
import { connectDeribitOrderbook } from "../services/deribit";

export default function useWebSocketOrderbook(venue, symbol) {
  const [orderbook, setOrderbook] = useState({ bids: [], asks: [], ts: Date.now() });
  const wsRef = useRef();

  useEffect(() => {
    let terminate = null;
    if (!venue || !symbol) return;
    if (wsRef.current) wsRef.current();

    switch (venue) {
      case "okx":
        terminate = connectOKXOrderbook(symbol, setOrderbook);
        break;
      case "bybit":
        terminate = connectBybitOrderbook(symbol, setOrderbook);
        break;
      case "deribit":
        terminate = connectDeribitOrderbook(symbol, setOrderbook);
        break;
      default:
        break;
    }
    wsRef.current = terminate;
    return () => terminate && terminate();
  }, [venue, symbol]);

  return orderbook;
}
