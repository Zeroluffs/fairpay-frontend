import { React } from "react";
import "../App.css";

export function ShowBill(props) {
  console.log(props);
  return (
    <div>
        <p>Tips have an added 10% per Colombian Law</p>
      {props.billData.map((element) => (
        <div  className="titles" key={element.name}>
          <p className="elementName">{element.name} </p>
          <p className="elementAmount">${element.totalAmountPerPerson}</p>
          <p  className="elementAmountTip">${element.totalAmountPerPersonTip}</p>
        </div>
      ))}
    </div>
  );
}
