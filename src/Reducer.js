export const initialState = {
  purchaseLo: [],
  purchaseOla: [],
  disburseLo: [],
  disburseOla: [],
};

export const getPurchaseTotalLo = (purchaseLo) =>
  purchaseLo?.reduce(
    (amount, item) => parseInt(item.price) * parseInt(item.quantity) + amount,
    0
  );

export const getPurchaseTotalOla = (purchaseOla) =>
  purchaseOla?.reduce(
    (amount, item) => parseInt(item.price) * parseInt(item.quantity) + amount,
    0
  );

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_PURCHASE":
      if (action.item.company === "Landover") {
        return {
          ...state,
          purchaseLo: [...state.purchaseLo, action.item],
        };
      } else {
        return {
          ...state,
          purchaseOla: [...state.purchaseOla, action.item],
        };
      }
    case "ADD_TO_DISBURSE":
      if (action.item.company === "Landover") {
        return {
          ...state,
          disburseLo: [...state.disburseLo, action.item],
        };
      } else {
        return {
          ...state,
          disburseOla: [...state.disburseOla, action.item],
        };
      }

    case "UPDATE_PURCHASE_QUANTITY":
      if (action.item.company === "Landover") {
        console.log(action.item.id);
        var oldPurchaseLo = [...state.purchaseLo];
        const ind = state.purchaseLo.findIndex(
          (oldItem) =>
            oldItem.id === action.item.id &&
            oldItem.company === action.item.company
        );

        if (ind >= 0) {
          oldPurchaseLo[ind].quantity = action.item.quantity;
        } else {
          console.log("this item is missing");
        }

        return { ...state, purchaseLo: oldPurchaseLo };
      } else {
        var oldPurchaseOla = [...state.purchaseOla];
        const ind = state.purchaseOla.findIndex(
          (oldItem) =>
            oldItem.id === action.item.id &&
            oldItem.company === action.item.company
        );

        if (ind >= 0) {
          oldPurchaseOla[ind].quantity = action.item.quantity;
        } else {
          console.log("this item is missing");
        }

        return { ...state, purchaseOla: oldPurchaseOla };
      }

    case "UPDATE_DISBURSE_QUANTITY":
      if (action.item.company === "Landover") {
        //   console.log(action.item.uid);
        var oldDisburseLo = [...state.disburseLo];
        const ind = state.disburseLo.findIndex(
          (oldItem) =>
            oldItem.uid === action.item.uid && oldItem.id === action.item.id
        );

        if (ind >= 0) {
          oldDisburseLo[ind].quantity = Number(action.item.quantity);
        } else {
          console.log("this item is missing");
        }

        return { ...state, disburseLo: oldDisburseLo };
      } else {
        var oldDisburseOla = [...state.disburseOla];
        const ind = state.disburseOla.findIndex(
          (oldItem) =>
            oldItem.uid === action.item.uid && oldItem.id === action.item.id
        );

        if (ind >= 0) {
          oldDisburseOla[ind].quantity = Number(action.item.quantity);
        } else {
          console.log("this item is missing");
        }

        return { ...state, disburseOla: oldDisburseOla };
      }

    case "UPDATE_PURCHASE_PRICE":
      if (action.item.company === "Landover") {
        var oldPurchaseLo = [...state.purchaseLo];
        const ind = state.purchaseLo.findIndex(
          (oldItem) =>
            oldItem.id === action.item.id &&
            oldItem.company === action.item.company
        );

        if (ind >= 0) {
          oldPurchaseLo[ind].price = action.item.price;
        } else {
          console.log("this item is missing");
        }

        return { ...state, purchaseLo: oldPurchaseLo };
      } else {
        var oldPurchaseOla = [...state.purchaseOla];
        const ind = state.purchaseOla.findIndex(
          (oldItem) =>
            oldItem.id === action.item.id &&
            oldItem.company === action.item.company
        );

        if (ind >= 0) {
          oldPurchaseOla[ind].price = action.item.price;
        } else {
          console.log("this item is missing");
        }

        return { ...state, purchaseOla: oldPurchaseOla };
      }

    case "UPDATE_PURCHASE_SUPPLIER":
      if (action.item.company === "Landover") {
        var oldPurchaseLo = [...state.purchaseLo];
        const ind = state.purchaseLo.findIndex(
          (oldItem) =>
            oldItem.id === action.item.id &&
            oldItem.company === action.item.company
        );

        if (ind >= 0) {
          oldPurchaseLo[ind].supplier = action.item.supplier;
        } else {
          console.log("this item is missing");
        }

        return { ...state, purchaseLo: oldPurchaseLo };
      } else {
        var oldPurchaseOla = [...state.purchaseOla];
        const ind = state.purchaseOla.findIndex(
          (oldItem) =>
            oldItem.id === action.item.id &&
            oldItem.company === action.item.company
        );

        if (ind >= 0) {
          oldPurchaseOla[ind].supplier = action.item.supplier;
        } else {
          console.log("this item is missing");
        }

        return { ...state, purchaseOla: oldPurchaseOla };
      }

    case "UPDATE_DISBURSE_UNIT":
      if (action.item.company === "Landover") {
        var oldDisburseLo = [...state.disburseLo];
        const ind = state.disburseLo.findIndex(
          (oldItem) =>
            oldItem.uid === action.item.uid && oldItem.id === action.item.id
        );

        if (ind >= 0) {
          oldDisburseLo[ind].dept = action.item.dept;
        } else {
          console.log("this item is missing");
        }

        return { ...state, disburseLo: oldDisburseLo };
      } else {
        var oldDisburseOla = [...state.disburseOla];
        const ind = state.disburseOla.findIndex(
          (oldItem) =>
            oldItem.uid === action.item.uid && oldItem.id === action.item.id
        );

        if (ind >= 0) {
          oldDisburseOla[ind].dept = action.item.dept;
        } else {
          console.log("this item is missing");
        }

        return { ...state, disburseOla: oldDisburseOla };
      }

    case "REMOVE_FROM_PURCHASE":
      if (action.item.company === "Landover") {
        let newPurchaseLo = [...state.purchaseLo];
        // console.log(newBasket);
        const index = state.purchaseLo.findIndex(
          (purchaseItem) =>
            purchaseItem.id === action.item.id &&
            purchaseItem.company === action.item.company
        );
        if (index >= 0) {
          newPurchaseLo.splice(index, 1);
        } else {
          // console.log(newBasket);
          console.warn(`can't remove id = ${action.id} cos it does not exist`);
        }
        return { ...state, purchaseLo: newPurchaseLo };
      } else {
        let newPurchaseOla = [...state.purchaseOla];
        // console.log(newBasket);
        const index = state.purchaseOla.findIndex(
          (purchaseItem) =>
            purchaseItem.id === action.item.id &&
            purchaseItem.company === action.item.company
        );
        if (index >= 0) {
          newPurchaseOla.splice(index, 1);
        } else {
          // console.log(newBasket);
          console.warn(`can't remove id = ${action.id} cos it does not exist`);
        }
        return { ...state, purchaseOla: newPurchaseOla };
      }

    case "REMOVE_FROM_DISBURSE":
      if (action.item.company === "Landover") {
        let newDisburseLo = [...state.disburseLo];
        // console.log(newBasket);
        const index = state.disburseLo.findIndex(
          (disburseItem) =>
            disburseItem.uid === action.item.uid &&
            disburseItem.id === action.item.id
        );
        if (index >= 0) {
          newDisburseLo.splice(index, 1);
        } else {
          // console.log(newBasket);
          console.warn(`can't remove id = ${action.id} cos it does not exist`);
        }
        return { ...state, disburseLo: newDisburseLo };
      } else {
        let newDisburseOla = [...state.disburseOla];
        // console.log(newBasket);
        const index = state.disburseOla.findIndex(
          (disburseItem) =>
            disburseItem.uid === action.item.uid &&
            disburseItem.id === action.item.id
        );
        if (index >= 0) {
          newDisburseOla.splice(index, 1);
        } else {
          // console.log(newBasket);
          console.warn(`can't remove id = ${action.id} cos it does not exist`);
        }
        return { ...state, disburseOla: newDisburseOla };
      }

    case "EMPTY_PURCHASE":
      if (action.item.company === "Landover") {
        return {
          ...state,
          purchaseLo: [],
        };
      } else {
        return {
          ...state,
          purchaseOla: [],
        };
      }

    default:
      return state;
  }
};

export default reducer;
