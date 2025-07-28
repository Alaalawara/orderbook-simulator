Real-Time Orderbook Viewer & Order Simulation
A Next.js application for GoQuant technical assignment that displays real-time cryptocurrency orderbooks from OKX, Bybit, and Deribit, and allows users to simulate orders and visualize their market impact.

![image_alt](https://github.com/Alaalawara/orderbook-simulator/blob/302364e0a3ce528ae7d5e971b0f891a22025cbf1/public/image.png)

🚀 Table of Contents
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


Multi-Venue Orderbook:

Real-time streaming from OKX, Bybit, Deribit (WebSocket public APIs)

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

Prerequisites
Node.js v18 or newer

npm or yarn

Installation-------------
git clone https://github.com/Alaalawara/orderbook-simulator.git
cd orderbook-simulator
npm install


Running Locally---------
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
