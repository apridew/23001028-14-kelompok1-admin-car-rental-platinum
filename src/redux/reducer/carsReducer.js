import { TYPES } from "../type";

const carsState = {
  car_list: [],
  idCar: null,
  isLoading: true,
  name_car: "",
  isSubmit: false,
  isDelete: false,
  successDelete: false,
};

export const carsReducer = (state = carsState, action) => {
  switch (action.type) {
    case TYPES.ALL_CARS:
      return {
        ...state,
        car_list: action.payload.data,
      };
    case TYPES.NAME_CAR:
      return {
        ...state,
        name_car: action.payload.name_car,
      };
    case TYPES.IS_SUBMIT:
      return {
        ...state,
        isSubmit: action.payload.submit,
      };
    case TYPES.IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.loading,
      };
    case TYPES.IS_DELETE:
      return {
        ...state,
        idCar: action.payload.idCar,
        isDelete: action.payload.delete,
      };
    case TYPES.SUCCESS_DELETE:
      return {
        ...state,
        successDelete: action.payload.deleteStatus,
      };

    default:
      return state;
  }
};
