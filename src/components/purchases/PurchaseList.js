import React, { useState, useEffect } from "react";
import { useStateValue } from "../../StateProvider";
import axios from "axios";
import "../layouts/css/Table.css";
import PurchaseQty from "./PurchaseQty";
import PurchaseSupplier from "./PurchaseSupplier";
import PurchasePrice from "./PurchasePrice";
import { getPurchaseTotalLo, getPurchaseTotalOla } from "../../Reducer";
import CompletePurchase from "./CompletePurchase";
import Remove from "./Remove";
import ErrorAlerts from "../layouts/alerts/ErrorAlerts";
import SuccessAlerts from "../layouts/alerts/SuccessAlerts";
import { useHistory } from "react-router-dom";
import { URD } from "../layouts/Config";

const PurchaseList = ({
  selectedItems,
  purchaseDate,
  company,
  action,
  dis,
}) => {
  const [
    { purchaseLo, purchaseOla, disburseLo, disburseOla },
    dispatch,
  ] = useStateValue();

  //console.log(selectedItems);

  const [supplier, setSupplier] = useState([]);
  const [iserror, setIserror] = useState(null);
  const [units, setUnits] = useState([]);
  const [isCompleting, setIsCompleting] = useState(false);

  const [alertMessage, setAlertMessage] = useState([]);

  const history = useHistory();

  const onPurchase = () => {
    //  console.log(company);
    if (company === "Landover") {
      var purchaseData = {
        purchaseItems: JSON.stringify(purchaseLo),
        purchaseDate: purchaseDate,
      };
      //     console.log(purchaseData);
    } else {
      var purchaseData = {
        purchaseItems: JSON.stringify(purchaseOla),
        purchaseDate: purchaseDate,
      };
      //    console.log(purchaseData);
    }

    let errorList = [];
    if (
      purchaseData.purchaseDate === "" ||
      purchaseData.purchaseDate === undefined
    ) {
      errorList.push("Please enter date of purchase.   ");
      setIserror(true);
    }

    if (errorList.length < 1) {
      setIsCompleting(true);
      axios
        .post(`${URD}/procurement/store/${company}`, purchaseData)
        .then((response) => {
          if (response.data === 59) {
            setAlertMessage([
              `OOPs, a purchase has already been made on this day for ${company}. You may edit to this purchase`,
            ]);
            setIserror(true);
            setIsCompleting(false);
          } else {
            setIsCompleting(true);
            history.replace(`/procurement/${company}`);
            dispatch({
              type: "EMPTY_PURCHASE",
              item: {
                company: company,
              },
            });
          }
        })
        .catch((error) => {
          console.log(error);
          setAlertMessage(
            "Oops!!! something went wrong. Please ensure all fields are filled appropiately."
          );
          setIserror(true);
        });

      /*  if (!iserror) {
        
      } */
    } else {
      setAlertMessage(errorList);
      setIserror(true);
    }
  };

  //  console.log(disburseLo);
  const onDisburse = () => {
    let resultLo = disburseLo.reduce((r, { id, item_name, quantity }) => {
      var temp = r.find((o) => o.id === id);
      if (!temp) {
        r.push({ id, item_name, quantity });
      } else {
        temp.quantity += quantity;
      }
      return r;
    }, []);

    let resultOla = disburseOla.reduce((r, { id, item_name, quantity }) => {
      var temp = r.find((o) => o.id === id);
      if (!temp) {
        r.push({ id, item_name, quantity });
      } else {
        temp.quantity += quantity;
      }
      return r;
    }, []);

    if (company === "Landover") {
      var disburseData = {
        disburseItems: JSON.stringify(disburseLo),
        itemCheck: JSON.stringify(resultLo),
        disburseDate: purchaseDate,
      };
      //  console.log(disburseData);
    } else {
      //    console.log(disburseOla);
      var disburseData = {
        disburseItems: JSON.stringify(disburseOla),
        itemCheck: JSON.stringify(resultOla),
        disburseDate: purchaseDate,
      };
      //  console.log(disburseData);
    }

    let errorList = [];
    if (
      disburseData.disburseDate === "" ||
      disburseData.disburseDate === undefined
    ) {
      errorList.push("Please enter disbursement date.   ");
      setIserror(true);
    }

    if (errorList.length < 1) {
      setIsCompleting(true);
      axios
        .post(`${URD}/disburse/${company}`, disburseData)
        .then((response) => {
          //  console.log(response.data);
          if (response.data[0] === 10) {
            setAlertMessage([
              `The ${response.data[1]} quantity you want to disburse is ${response.data[2]} unit higher than what is in store `,
            ]);
            setIserror(true);
            setIsCompleting(false);
          } else if (response.data === 59) {
            setAlertMessage([
              `OOPs, disbursement has already been done on this day for ${company}`,
            ]);
            setIsCompleting(false);
            setIserror(true);
          } else {
            setIsCompleting(true);
            history.replace(`/disbursement/${company}`);
            dispatch({
              type: "EMPTY_DISBURSE",
              item: {
                company: company,
              },
            });
          }
        })
        .catch((error) => {
          console.log(error);
          setAlertMessage(
            "Oops!!! something went wrong. Please ensure all fields are filled appropiately."
          );
          setIserror(true);
        });
    } else {
      setAlertMessage(errorList);
      setIserror(true);
    }
  };

  return (
    <>
      {selectedItems?.length > 0 ? (
        <>
          {iserror ? <ErrorAlerts message={alertMessage} /> : null}
          {iserror === false ? <SuccessAlerts message={alertMessage} /> : null}
          <div className="card" style={{ backgroundColor: "#000" }}>
            <div className="card-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>
                      {action === "Procurement" ? "Supplier" : "Dept/Unit"}
                    </th>
                    <th>Quantity</th>
                    {action === "Procurement" ? <th>Unit Price</th> : ""}
                    {action === "Procurement" ? <th>Total</th> : ""}
                    <th style={{ width: "40px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.item_name}</td>

                      <td>
                        {" "}
                        <PurchaseSupplier
                          company={item.company}
                          dep={
                            action === "Disbursement"
                              ? { dept: item.dept, dept_name: item.dept_name }
                              : {
                                  supplier: item.supplier,
                                  supplier_name: item.supplier_name,
                                }
                          }
                          id={item.id}
                          action={action}
                          uid={action === "Disbursement" ? item.uid : null}
                        />
                      </td>
                      <td>
                        <PurchaseQty
                          qty={item.quantity}
                          company={item.company}
                          id={item.id}
                          action={action}
                          uid={action === "Disbursement" ? item.uid : null}
                        />
                      </td>
                      {action === "Procurement" ? (
                        <td>
                          <PurchasePrice
                            pri={item.price}
                            company={item.company}
                            id={item.id}
                          />
                        </td>
                      ) : null}
                      {action === "Procurement" ? (
                        <td>
                          &#8358;
                          {(Number(item.quantity) * Number(item.price)).toFixed(
                            2
                          )}
                        </td>
                      ) : null}

                      <td>
                        <Remove
                          id={item.id}
                          company={item.company}
                          action={action}
                          uid={action === "Disbursement" ? item.uid : null}
                          dept={action === "Disbursement" ? item.dept : null}
                        />
                      </td>
                    </tr>
                  ))}
                  {action === "Procurement" ? (
                    <tr>
                      <td colSpan="3"></td>
                      <td colSpan="3">
                        <h5>
                          Total:{"       "}&#8358;
                          {company === "Landover"
                            ? getPurchaseTotalLo(purchaseLo).toFixed(2)
                            : getPurchaseTotalOla(purchaseOla).toFixed(2)}
                        </h5>
                      </td>
                    </tr>
                  ) : null}

                  {action === "Procurement" ? (
                    <tr>
                      <td colSpan="3"></td>
                      <td colSpan="3">
                        <CompletePurchase
                          completed={onPurchase}
                          action={action}
                          isCompleting={isCompleting}
                        />
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="2"></td>
                      <td colSpan="2">
                        <CompletePurchase
                          completed={onDisburse}
                          action={action}
                          isCompleting={isCompleting}
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default PurchaseList;
