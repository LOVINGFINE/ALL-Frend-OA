import { Colunm } from "../utils/format";

export interface StateProps {
  [key: string]: any;
  rows: { [key: string]: string | number }[];
  colunms: Colunm[];
  loading: boolean;
}

const contextState: StateProps = {
  rows: [],
  colunms: [],
  loading: false,
};

export default contextState;
