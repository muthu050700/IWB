import React from "react";

import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { v4 } from "uuid";
import { createNewData } from "../APIs/api";

const CreateForm = ({
  createFormDetails,
  setCreateFormDetails,
  setCreateFormData,
  createFormData,
  editFormDetails,
  formEditPlayer,
}) => {
  const handleFormChange = (e) => {
    setCreateFormDetails({
      ...createFormDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editFormDetails !== null) {
      formEditPlayer(createFormDetails, editFormDetails.id);
    } else {
      createNewData({
        id: v4(),
        ...createFormDetails,
      });
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
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Label for="applicationName" sm={4}>
            Application Name
          </Label>
          <Col sm={8}>
            <Input
              id="applicationName"
              name="ApplicationName"
              value={createFormDetails.ApplicationName}
              onChange={handleFormChange}
              placeholder="Application Name"
              type="text"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="os" sm={4}>
            OS
          </Label>
          <Col sm={8}>
            <Input
              id="os"
              name="OS"
              value={createFormDetails.OS}
              onChange={handleFormChange}
              placeholder="OS"
              type="text"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="swaggerURL" sm={4}>
            Swagger URL
          </Label>
          <Col sm={8}>
            <Input
              id="swaggerURL"
              name="SwaggerURL"
              value={createFormDetails.SwaggerURL}
              onChange={handleFormChange}
              placeholder="Swagger URL"
              type="text"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="FTP_Path" sm={4}>
            FTP Path
          </Label>
          <Col sm={8}>
            <Input
              id="FTP_Path"
              name="FTPPath"
              value={createFormDetails.FTPPath}
              onChange={handleFormChange}
              placeholder="FTP Path"
              type="text"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="FTP_Log_Path" sm={4}>
            FTP Log Path
          </Label>
          <Col sm={8}>
            <Input
              id="FTP_Log_Path"
              name="FTPLogPath"
              value={createFormDetails.FTPLogPath}
              onChange={handleFormChange}
              placeholder="FTP Log Path"
              type="text"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="FTP-Path" sm={4}>
            FTP Monitor Path
          </Label>
          <Col sm={8}>
            <Input
              id="FTP-Monitor-Path"
              name="FTPMonitorPath"
              value={createFormDetails.FTPMonitorPath}
              onChange={handleFormChange}
              placeholder="FTP Monitor Path"
              type="text"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleSelect" sm={4}>
            Environment
          </Label>
          <Col sm={8}>
            <Input
              id="exampleSelect"
              name="Environment"
              type="select"
              value={createFormDetails.Environment}
              onChange={handleFormChange}
            >
              <option>DEV</option>
              <option>QA</option>
              <option>UAT</option>
              <option>IO</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="DB_Name" sm={4}>
            DB Name
          </Label>
          <Col sm={8}>
            <Input
              id=" DB_Name"
              name="DBName"
              value={createFormDetails.DBName}
              onChange={handleFormChange}
              placeholder="DB Name"
              type="text"
            />
          </Col>
        </FormGroup>
        <div className=" flex justify-center ">
          <Button className=" bg-[#F06434] border-none font-medium">
            Submit
          </Button>{" "}
        </div>
      </Form>
    </>
  );
};

export default CreateForm;
