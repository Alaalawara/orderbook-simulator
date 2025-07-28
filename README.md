Real-Time Orderbook Viewer & Order Simulation
A Next.js application for GoQuant technical assignment that displays real-time cryptocurrency orderbooks from OKX, Bybit, and Deribit, and allows users to simulate orders and visualize their market impact.

Features:

Real-time, multi-venue orderbook with 15+ levels

Market/Limit order simulation (timing supported)

Fill, market impact, and slippage estimation

Visual order placement highlight

Depth chart & orderbook imbalance indicator

Responsive and mobile-ready

🌎 Live Demo (for GoQuant reviewers)
A recording link would go here if required (attach as per submission guide).

🚀 Table of Contents
Features

Tech Stack

Screenshots

Getting Started

Prerequisites

Installation

Running Locally

Configuration & Symbols

Usage

Order Simulation Documentation

Market Depth and Bonus Features

API Documentation & Rate Limits

Project Structure

Libraries Used

Assumptions & Notes

License

Features
Multi-Venue Orderbook:

Real-time streaming from OKX, Bybit, Deribit (WebSocket public APIs)

15 levels of best bids/asks per venue

Venue and symbol switching

Order Simulation:

Venue & symbol select, order type (market/limit), side, price, quantity

Timing simulation (immediate/5s/10s/30s delay)

Input validation

Order Placement Visualization:

Simulated order position highlighted in orderbook

Estimated fill (qty/%), market impact, slippage displayed

Depth chart for market visualization

Responsive Design:

Desktop and mobile experience

Stable, grid-based layout

Bonus:

Market depth chart

Orderbook imbalance indicator (optional)

Slippage warnings for large orders

Tech Stack
Next.js (v14+)

React

Ant Design (UI framework)

Recharts (depth/area charts)

WebSocket APIs (OKX, Bybit, Deribit)

Screenshots
<details> <summary> Click to expand example images (replace with actual screenshots in your submission) </summary>
Main App
![Main App UI - Venue select, Orderbook, Depth Chart, Order Simulation](https://i.imgur View

![Mobile Responsive View](https://i.imgur.com Getting Started

Prerequisites
Node.js v18 or newer

npm or yarn

Installation
bash
git clone https://github.com/YOUR_GITHUB_USERNAME/orderbook-simulator.git
cd orderbook-simulator
npm install
Running Locally
bash
npm run dev
# Or, if using yarn
# yarn dev
The app will be available at http://localhost:3000.

Configuration & Symbols
No API keys needed. Public orderbook data via WebSocket.

Supported symbols are preset for each venue (can be edited in components/OrderForm.js).

Usage
Select Venue/Symbol:
Use dropdowns to pick exchange and trading pair (e.g., BTC-USDT on OKX).

View Orderbook:

15 levels of bids/asks are displayed.

Depth chart below visualizes aggregated liquidity.

Simulate Order:

Choose order type (market/limit), side (buy/sell), price (if limit), and quantity.

Choose "timing/delay" for order (immediate or delayed).

Hit "Simulate":

Your order will be highlighted in the live orderbook table, with fill, impact, and slippage metrics.

Switch Venue or Symbol:

All views update in real-time.

Order Simulation Documentation
Fields
Field	Description
Venue	OKX, Bybit, Deribit
Symbol	Example: BTC-USDT, BTCUSDT, ETH-PERPETUAL
Order Type	Market: matches best price, Limit: specify price
Side	Buy/Sell
Price	Required for limit orders
Quantity	Order size in asset units
Delay	Simulate order after delay (0/5s/10s/30s)
Metrics Shown
Estimated Fill: Quantity and percentage likely filled based on current orderbook.

Market Impact: Estimated price movement (in %) if order sweeps orderbook levels (for market orders).

Slippage: Difference between expected price (limit/market) and actually filled weighted average price (WAP).

Order Position Highlight: Clearly marks where your order would be in the live orderbook.

Market Depth and Bonus Features
Market Depth Chart:
Shows cumulative bid/ask volumes across price levels.

Orderbook Imbalance (optional):
Indicates when one side (bid/ask) dominates liquidity.

Slippage Warnings:
If your simulated order size is much larger than available liquidity, you'll get a visual warning.

API Documentation & Rate Limits
APIs Used
OKX Spot, Futures Orderbook:

OKX API docs

wss://ws.okx.com:8443/ws/v5/public (no API key needed)

Rate limits: ~20 req/min, no aggressive reconnect

Bybit Spot Orderbook:

Bybit API docs

wss://stream.bybit.com/v5/public/spot

Rate limits: Documented in Bybit docs

Deribit Perpetual/Futures Orderbook:

Deribit API docs

wss://www.deribit.com/ws/api/v2/

Public orderbook channel; 20 levels used, client slices to 15.

Considerations
All services use public WebSocket endpoints—no authentication required.

Handles API throttling/failures:
If a WebSocket closes or errors, the app attempts to recover gracefully with minimal reconnect attempts.

For slower/failing connections, app displays stale data indicators.