import { useState } from "react";
import { Select, Input, Radio, Button, Form, InputNumber } from "antd";
import { VENUES } from "../utils/constants";

export default function OrderForm({ venue, symbol, onVenueChange, onSimulate }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // example symbol presets per venue
  const SYMBOL_PRESETS = {
    okx: ["BTC-USDT", "ETH-USDT"],
    bybit: ["BTCUSDT", "ETHUSDT"],
    deribit: ["BTC-PERPETUAL", "ETH-PERPETUAL"],
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ venue, symbol: SYMBOL_PRESETS[venue][0], orderType: "market", side: "buy", delay: 0 }}
      onFinish={values => {
        setLoading(true);
        onSimulate(values);
        setLoading(false);
      }}
    >
      <Form.Item label="Venue" name="venue" rules={[{ required: true }]} >
        <Select
          options={VENUES}
          onChange={onVenueChange}
        />
      </Form.Item>
      <Form.Item label="Symbol" name="symbol" rules={[{ required: true }]}>
        <Select options={SYMBOL_PRESETS[venue].map(sym => ({value: sym, label: sym}))}/>
      </Form.Item>
      <Form.Item label="Order Type" name="orderType" rules={[{ required: true }]}>
        <Radio.Group>
          <Radio value="market">Market</Radio>
          <Radio value="limit">Limit</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Side" name="side" rules={[{ required: true }]}>
        <Radio.Group>
          <Radio value="buy">Buy</Radio>
          <Radio value="sell">Sell</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Price" name="price" dependencies={['orderType']} rules={[
        ({ getFieldValue }) => ({
          required: getFieldValue("orderType") === "limit",
          message: "Required for limit orders",
        }),
      ]}>
        <InputNumber min={0} style={{ width: "100%" }} step={0.1}/>
      </Form.Item>
      <Form.Item label="Quantity" name="quantity" rules={[{ required: true, min: 0.0001, type: "number", message: "Min 0.0001" }]}>
        <InputNumber min={0.0001} style={{ width: "100%" }} step={0.0001}/>
      </Form.Item>
      <Form.Item label="Timing / Delay" name="delay">
        <Select options={[
          {label: "Immediate", value: 0},
          {label: "5s Delay", value: 5},
          {label: "10s Delay", value: 10},
          {label: "30s Delay", value: 30}
        ]}/>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary" loading={loading}>Simulate</Button>
      </Form.Item>
    </Form>
  );
}
