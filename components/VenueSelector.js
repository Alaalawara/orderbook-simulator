import { Select } from "antd";
import { VENUES } from "../utils/constants";

export default function VenueSelector({ venue, setVenue }) {
  return (
    <Select
      options={VENUES}
      value={venue}
      style={{ minWidth: 120 }}
      onChange={setVenue}
    />
  );
}
