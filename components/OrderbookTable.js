import { Table } from "antd";
import { formatNumber } from "../utils/helpers";

export default function OrderbookTable({ bids, asks, highlightPrice, side }) {
  const columns = [
    {
      title: "Price",
      dataIndex: "price",
      render: txt => <span style={{ color: side === "buy" ? "#22b422" : "#e25241" }}>{txt}</span>,
    },
    { title: "Size", dataIndex: "quantity" },
    { title: "Cumulative", dataIndex: "cumulative" }
  ];

  // Combine rows with highlight (order position)
  const data = (side === "buy" ? asks : bids).map((item, idx) => {
    const price = formatNumber(item[0]);
    const quantity = formatNumber(item[1]);
    const cumulative = formatNumber((side === "buy" ? asks : bids).slice(0, idx + 1).reduce((a, b) => a + +b[1], 0));
    return {
      key: idx,
      price,
      quantity,
      cumulative,
      highlight: highlightPrice && price == highlightPrice
    };
  });

  return (
    <Table
      size="small"
      pagination={false}
      columns={columns}
      dataSource={data}
      rowClassName={row => row.highlight ? "highlight-row" : ""}
      scroll={{ y: 300 }}
    />
  );
}
