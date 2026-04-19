const cartReducer = (state = [], action) => {
  console.log(state, action)
  switch (action.type) {
    case "ADD_TO_CART":
      return [
        ...state,
        {
          id: action.id,
          info: action.info,
          quantity: 1
        }
      ];
    
      case "UPDATE_QUANTITY":
      return state.map(item => 
        item.id === action.id 
          ? { ...item, quantity: item.quantity + action.quantity } // Tạo object mới hoàn toàn
          : item // Giữ nguyên các item khác
      );

    case "DELETE_ITEM":
      return state.filter(item => item.id !== action.id);

    case "DELETE_All":
      return [];

    default:
      return state;
  }
}

export default cartReducer;