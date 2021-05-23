import { FC } from 'react'
import moment from "moment";
const Header: FC = () => {
  return (
    <div className="headerContainer">
      <h2>Currency Converter</h2>
      <div>{moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}</div>
    </div>
  );
};

export default Header;
