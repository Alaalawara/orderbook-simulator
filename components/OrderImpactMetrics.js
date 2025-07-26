import { Card } from "antd";
import { formatNumber } from "../utils/helpers";

export default function OrderImpactMetrics({ metrics }) {
  return (
    <Card size="small" title="Order Impact Estimate" style={{ marginTop: 16 }}>
      <ul style={{margin: 0, padding: 0}}>
        <li><b>Estimated Fill:</b> {formatNumber(metrics?.fill)} ({formatNumber(metrics?.fillPercent)}%)</li>
        <li><b>Market Impact:</b> {formatNumber(metrics?.impact)}%</li>
        <li><b>Slippage Estimate:</b> {formatNumber(metrics?.slippage)}%</li>
      </ul>
    </Card>
  );
}
