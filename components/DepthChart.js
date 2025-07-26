import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function DepthChart({ bids, asks }) {
  const cumBids = [];
  let cum = 0;
  for (let [p, q] of [...bids].sort((a, b) => b[0] - a[0])) {
    cum += +q;
    cumBids.push({ price: +p, depth: cum });
  }
  const cumAsks = [];
  cum = 0;
  for (let [p, q] of [...asks].sort((a, b) => a[0] - b[0])) {
    cum += +q;
    cumAsks.push({ price: +p, depth: cum });
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" dataKey="price" domain={['dataMin', 'dataMax']} />
        <YAxis type="number" />
        <Tooltip />
        <Area type="monotone" dataKey="depth" data={cumBids} stroke="#22b422" fill="#daf9d5" name="Bid Depth" />
        <Area type="monotone" dataKey="depth" data={cumAsks} stroke="#e25241" fill="#f3d4d4" name="Ask Depth"/>
      </AreaChart>
    </ResponsiveContainer>
  );
}
