import "./style.css";
import { useEffect, useState } from "react";
import CardCar from "../../components/CardCar";
import Navbar from "../../components/Navbar";
import * as reqApi from "../../helpers/apis";
import * as formater from "../../helpers/formaters";
import ButtonSearch from "../../components/ButtonSearch";
import { useDispatch, useSelector } from "react-redux";
import { TYPES } from "../../redux/type";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../../components/DeleteDialog";

const CarsPage = () => {
  const { car_list, isLoading, name_car, isDelete } = useSelector(
    (state) => state.carsReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [allClicked, setAllClicked] = useState(true);
  const [smallClicked, setSmallClicked] = useState(false);
  const [mediumClicked, setMediumClicked] = useState(false);
  const [largeClicked, setLargeClicked] = useState(false);

  console.log(category);

  useEffect(() => {
    getListCars(name_car, category);
    dispatch({
      type: TYPES.CHOOSE_SIDEBAR,
      payload: {
        sidebar: false,
      },
    });
  }, [category]);

  const getListCars = async (name, category) => {
    try {
      const res = await reqApi.getCars(name, category);
      // console.log("API All Cars", res.data.cars);
      dispatch({
        type: TYPES.ALL_CARS,
        payload: {
          data: res.data.cars,
        },
      });
      dispatch({
        type: TYPES.IS_LOADING,
        payload: {
          loading: false,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const submitSearch = () => {
    getListCars(name_car, category);
    dispatch({
      type: TYPES.IS_SUBMIT,
      payload: {
        submit: true,
      },
    });
  };

  const resetSearch = () => {
    dispatch({
      type: TYPES.IS_SUBMIT,
      payload: {
        submit: false,
      },
    });
    dispatch({
      type: TYPES.NAME_CAR,
      payload: {
        name_car: "",
      },
    });
    getListCars("", "");
    setAllClicked(true);
    setSmallClicked(false);
    setMediumClicked(false);
    setLargeClicked(false);
  };

  const chooseCategory = (selected) => {
    setCategory(selected);
    setAllClicked(true);
    setSmallClicked(false);
    setMediumClicked(false);
    setLargeClicked(false);
  };

  const chooseCategorySmall = (selected) => {
    setCategory(selected);
    setAllClicked(false);
    setSmallClicked(true);
    setMediumClicked(false);
    setLargeClicked(false);
  };

  const chooseCategoryMedium = (selected) => {
    setCategory(selected);
    setAllClicked(false);
    setSmallClicked(false);
    setMediumClicked(true);
    setLargeClicked(false);
  };

  const chooseCategoryLarge = (selected) => {
    setCategory(selected);
    setAllClicked(false);
    setSmallClicked(false);
    setMediumClicked(false);
    setLargeClicked(true);
  };

  const handleDialogNo = () => {
    dispatch({
      type: TYPES.IS_DELETE,
      payload: {
        delete: false,
      },
    });
  };

  const handleDialogYes = () => {
    console.log("delete");
  };

  return (
    <>
      {isDelete && (
        <>
          <div className="overlay-bg"></div>
          <div className="wrapper-dialog-box">
            <DeleteDialog
              handleClickNo={handleDialogNo}
              handleClickYes={handleDialogYes}
            />
          </div>
        </>
      )}
      <Navbar
        resetSearch={resetSearch}
        submitSearch={submitSearch}
        main={
          isLoading ? (
            <div className="wrapper-spinner">
              <div className="spinner-border tex" role="status">
                <span className="visually-hidden"></span>
              </div>
            </div>
          ) : (
            <div id="cars-page">
              <div className="cars-row-1 d-flex gap-2">
                <p className="fw-bold">Car</p>
                <p className="fw-bold">&gt;</p>
                <p>List Car</p>
              </div>
              <div className="cars-row-2 d-flex justify-content-between align-items-center mb-3">
                <p>List Car</p>
                <button onClick={() => navigate("/add-car")}>
                  <i className="bi bi-plus"></i> Add New Car
                </button>
              </div>

              <div className="button-search mb-4">
                <ButtonSearch
                  name={""}
                  handleClick={() => chooseCategory("")}
                  text={"All"}
                  style={allClicked ? "clicked" : ""}
                />
                <ButtonSearch
                  name={"small"}
                  handleClick={() => chooseCategorySmall("small")}
                  text={"2 - 4 people"}
                  style={smallClicked ? "clicked" : ""}
                />
                <ButtonSearch
                  name={"medium"}
                  handleClick={() => chooseCategoryMedium("medium")}
                  text={"4 - 6 people"}
                  style={mediumClicked ? "clicked" : ""}
                />
                <ButtonSearch
                  name={"large"}
                  handleClick={() => chooseCategoryLarge("large")}
                  text={"6 - 8 people"}
                  style={largeClicked ? "clicked" : ""}
                />
              </div>
              <div className="list-all-card">
                {car_list.map((item, id) => {
                  let categoryText = "";
                  if (item.category === "small") {
                    categoryText = "2 - 4 people";
                  } else if (item.category === "people") {
                    categoryText = "4 - 6 people";
                  } else {
                    categoryText = "6 - 8 people";
                  }
                  return (
                    <CardCar
                      id={item.id}
                      key={id}
                      img={item.image}
                      price={formater.idrFormater(item.price)}
                      name={item.name}
                      capacity={categoryText}
                      time={`Updated at ${formater.dateFormater(
                        item.updatedAt
                      )}`}
                    />
                  );
                })}
              </div>
            </div>
          )
        }
      />
    </>
  );
};

export default CarsPage;
