export const initialState = {
  purchase: [],
};

export const getPurchaseTotal = (purchase) =>
  purchase?.reduce(
    (amount, item) => parseInt(item.price) * parseInt(item.quantity) + amount,
    0
  );

const reducer = (state, action) => {
  // console.log(action.item);
  switch (action.type) {
    case "ADD_TO_PURCHASE":
      return {
        ...state,
        purchase: [...state.purchase, action.item],
      };

    case "UPDATE_PURCHASE_QUANTITY":
      var oldPurchase = [...state.purchase];
      const ind = state.purchase.findIndex(
        (oldItem) =>
          oldItem.id === action.item.id &&
          oldItem.company === action.item.company
      );

      if (ind >= 0) {
        oldPurchase[ind].quantity = action.item.quantity;
      } else {
        console.log("this item is missing");
      }

      return { ...state, purchase: oldPurchase };

    case "UPDATE_PURCHASE_PRICE":
      var oldPurchase = [...state.purchase];
      const indPrice = state.purchase.findIndex(
        (oldItem) =>
          oldItem.id === action.item.id &&
          oldItem.company === action.item.company
      );

      if (indPrice >= 0) {
        oldPurchase[indPrice].price = action.item.price;
      } else {
        console.log("this item is missing");
      }

      return { ...state, purchase: oldPurchase };

    case "UPDATE_PURCHASE_SUPPLIER":
      var oldPurchase = [...state.purchase];
      const indSupplier = state.purchase.findIndex(
        (oldItem) =>
          oldItem.id === action.item.id &&
          oldItem.company === action.item.company
      );

      if (indSupplier >= 0) {
        oldPurchase[indSupplier].supplier = action.item.supplier;
      } else {
        console.log("this item is missing");
      }

      return { ...state, purchase: oldPurchase };

    case "EMPTY_PURCHASE":
      return {
        ...state,
        purchase: [],
      };
    default:
      return state;
  }
};

export default reducer;
