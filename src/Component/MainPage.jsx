import React, { useEffect, useState } from "react";
import CartPage from "./CartPage";
import CreateForm from "./CreateForm";
import { deleteData, fetchData, updateData } from "../APIs/api";
import { Button, ButtonGroup, Col, FormGroup, Input, Label } from "reactstrap";

const MainPage = () => {
  const [path, setPath] = useState("DEV");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [showFilteredData, setshowFilteredData] = useState("");
  const [createFormDetails, setCreateFormDetails] = useState({
    ApplicationName: "",
    OS: "",
    SwaggerURL: "",
    FTPPath: "",
    FTPLogPath: "",
    DBName: "",
    FTPMonitorPath: "",
    Environment: "DEV",
  });
  const [editFormDetails, setEditFormDetails] = useState(null);
  const [createFormData, setCreateFormData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    const favoritesArray = JSON.parse(storedFavorites);

    const isFavoriteExits = favoritesArray.findIndex(
      (val) => val.Environment === path
    );

    if (isFavoriteExits !== -1) {
      setshowFilteredData("Favorite");
    } else {
      setshowFilteredData("All");
    }
  }, [path]);
  const getData = async () => {
    try {
      const data = await fetchData();
      setCreateFormData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (editFormDetails !== null) {
      setCreateFormDetails(editFormDetails);
    }
  }, [editFormDetails]);

  const handleDelete = async (id) => {
    try {
      const data = await deleteData(id);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (id) => {
    const data = createFormData.filter((val) => val.id === id);
    setIsModalOpen(true);
    setEditFormDetails({ ...data[0] });
  };

  const formEditPlayer = (formState, id) => {
    updateData(id, formState);

    setEditFormDetails(null);
    setCreateFormDetails({
      ApplicationName: "",
      OS: "",
      SwaggerURL: "",
      FTPPath: "",
      FTPLogPath: "",
      DBName: "",
      FTPMonitorPath: "",
      Environment: "DEV",
    });
  };

  return (
    <>
      <div className=" w-[full] h-[40px] bg-[rgb(0,0,255)] ">
        <div className="flex h-[40px] items-center px-2 gap-3">
          <img
            src="http://wms.ithred.net/static/media/header-logo.f7a3395fc4f7e9f7aebb.png"
            alt="logo"
            className=" w-[20px]"
          />
          <h2 className=" font-bold text-white text-[14px]">
            iTHREAD Swagger Book
          </h2>
        </div>
      </div>
      <div>
        <h2 className=" font-bold text-[27px] py-3 px-3">Environment</h2>
        <div className=" flex justify-between">
          <div className="flex w-fit rounded-2xl px-2">
            <div className="bg-[#227DD7] rounded-s-3xl rounded-r-3xl flex gap-10 items-center h-[35px]">
              <button
                onClick={() => setPath("DEV")}
                className={`${
                  path === "DEV" && "bg-[#F06434] rounded-3xl h-[35px] "
                } cursor-pointer px-6 text-[#FFFAEC]`}
              >
                DEV
              </button>
              <button
                onClick={() => setPath("QA")}
                className={`${
                  path === "QA" && "bg-[#F06434]  rounded-3xl h-[35px]"
                } cursor-pointer px-6 text-[#FFFAEC]`}
              >
                QA
              </button>
              <button
                onClick={() => setPath("UAT")}
                className={`${
                  path === "UAT" && "bg-[#F06434]  rounded-3xl h-[35px]"
                } cursor-pointer px-6 text-[#FFFAEC]`}
              >
                UAT
              </button>
              <button
                onClick={() => setPath("IO")}
                className={`${
                  path === "IO" && "bg-[#F06434]  rounded-3xl h-[35px]"
                } cursor-pointer px-6 text-[#FFFAEC]`}
              >
                IO
              </button>
            </div>
          </div>
          <div>
            {path !== "" && (
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setCreateFormDetails({
                    ApplicationName: "",
                    OS: "",
                    SwaggerURL: "",
                    FTPPath: "",
                    FTPLogPath: "",
                    DBName: "",
                    FTPMonitorPath: "",
                    Environment: "DEV",
                  });
                }}
                className="bg-[#F06434] rounded-3xl px-[12px] py-[px] text-white text-[13px] font-semibold mx-3 h-[35px]"
              >
                +Add New
              </button>
            )}
          </div>
        </div>
        <div></div>
        {path !== "" && (
          <div className=" flex">
            <div className=" px-3 pt-4">
              <FormGroup>
                <Col className=" w-fit">
                  <Input
                    id="exampleSelect"
                    name="select"
                    type="select"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="product development">
                      Product Development
                    </option>
                    <option value="quality app">Quality App</option>
                    <option value="preproduction"> PreProduction</option>
                    <option value="eam">EAM</option>
                    <option value="sourcing">Sourcing</option>
                  </Input>
                </Col>
              </FormGroup>
            </div>
            <div className=" px-3 pt-4">
              <ButtonGroup>
                <Button
                  color="primary"
                  outline
                  onClick={() => setshowFilteredData("Favorite")}
                  active={showFilteredData === "Favorite"}
                >
                  Favorite
                </Button>
                <Button
                  color="primary"
                  outline
                  onClick={() => setshowFilteredData("All")}
                  active={showFilteredData === "All"}
                >
                  All
                </Button>
              </ButtonGroup>
            </div>
          </div>
        )}

        <div>
          <CartPage
            path={path}
            createFormData={createFormData}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            filter={filter}
            favorites={favorites}
            setFavorites={setFavorites}
            showFilteredData={showFilteredData}
            setshowFilteredData={setshowFilteredData}
          />
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-[500px] h-[500px]  rounded-lg shadow-lg p-6 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-[1px] right-1 text-[rgb(0,0,255)] font-bold text-[20px] hover:text-gray-900"
              >
                ✕
              </button>
              <CreateForm
                createFormDetails={createFormDetails}
                setCreateFormDetails={setCreateFormDetails}
                setCreateFormData={setCreateFormData}
                createFormData={createFormData}
                editFormDetails={editFormDetails}
                formEditPlayer={formEditPlayer}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MainPage;
