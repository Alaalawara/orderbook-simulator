import { useState, useRef } from "react";
import Head from "next/head";
import "antd/dist/reset.css";
import "../app/globals.css";
import VenueSelector from "../components/VenueSelector";
import OrderForm from "../components/OrderForm";
import OrderbookTable from "../components/OrderbookTable";
import OrderImpactMetrics from "../components/OrderImpactMetrics";
import DepthChart from "../components/DepthChart";
import useWebSocketOrderbook from "../hooks/useWebSocketOrderbook";
import { useOrderSimulation } from "../hooks/useOrderSimulation";

export default function Home() {
  const [venue, setVenue] = useState("okx");
  const [symbol, setSymbol] = useState("BTC-USDT");
  const [order, setOrder] = useState(null);
  const [delayedOrder, setDelayedOrder] = useState(null);
  const timerRef = useRef();

  const orderbook = useWebSocketOrderbook(venue, symbol);

  function handleSimulate(sim) {
    setOrder(null); setDelayedOrder(null);
    if (parseInt(sim.delay) > 0) {
      timerRef.current = setTimeout(() => setDelayedOrder(sim), parseInt(sim.delay) * 1000);
    } else {
      setOrder(sim);
    }
  }

  function resetSim() {
    setOrder(null); setDelayedOrder(null);
    timerRef.current && clearTimeout(timerRef.current);
  }

  function handleVenueChange(v) {
    setVenue(v);
    setSymbol({
      okx: "BTC-USDT", bybit: "BTCUSDT", deribit: "BTC-PERPETUAL"
    }[v]);
    resetSim();
  }

  const simOrder = delayedOrder || order;
  const simMetrics = useOrderSimulation(orderbook, simOrder);

  let highlightPrice = simOrder ?
    simOrder.orderType === "limit" ? String(simOrder.price) : null
    : null;

  return (
    <div className="container">
      <Head>
        <title>Orderbook Simulator</title>
      </Head>
      <h2>Real-Time Orderbook Viewer &amp; Order Simulation </h2>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 330px", minWidth: 320, maxWidth: 400 }}>
          <OrderForm
            venue={venue}
            symbol={symbol}
            onVenueChange={handleVenueChange}
            onSimulate={handleSimulate}
          />
          {simOrder &&
            <OrderImpactMetrics metrics={simMetrics} />
          }
        </div>
        <div class='orderbookChartContainer'>
          <div class='orderbookTableBox'>
            <OrderbookTable
              bids={orderbook.bids || []}
              asks={orderbook.asks || []}
              highlightPrice={highlightPrice}
              side={simOrder ? simOrder.side : "buy"}
            />
          </div>
          <div class='chartBox'>
            <DepthChart bids={orderbook.bids || []} asks={orderbook.asks || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
