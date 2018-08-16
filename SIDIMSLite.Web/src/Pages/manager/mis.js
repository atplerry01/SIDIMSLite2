import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from "moment";
import ReactToExcel from "react-html-table-to-excel";
import ExampleCustomInput from "../../Components/calender/ExampleCustomInput";
import { lookupDropDown } from "../../_selector/selectors";
import SelectInput from "../../Components/common/SelectInput";
import { myConfig } from "../../App/config";

class ManagerMIS extends Component {
  constructor(props, context) {
    super(props, context);

    this.onChange = this.onChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.onDateFilter = this.onDateFilter.bind(this);
    this.onLastMonthFilter = this.onLastMonthFilter.bind(this);

    this.state = {
      filterChange: false,
      selectedProduct: "",
      productId: "",
      search: "",
      clientId: "",
      clients: "",
      selectedClient: 5,
      startDate: moment().startOf("month"),
      endDate: moment()
    };
  }

  componentWillMount() {
    var ls = localStorage.getItem("wss.auth");
    var jwtToken = JSON.parse(ls);

    //this.setState({ page: jwtToken.page, clientId: jwtToken.sidClientId });

    this.getClients(5);
    this.getAllClients();
    this.getClientVaults(5, "ThisMonth");

    // if (jwtToken && jwtToken.page === "Client") {
    //   this.setState({ page: jwtToken.page, clientId: jwtToken.sidClientId });

    //   this.getClients(jwtToken.sidClientId);
    //   this.getAllClients();
    //   this.getClientVaults(jwtToken.sidClientId, "ThisMonth");
    // } else {
    //   localStorage.removeItem("wss.auth");
    //   //   //window.location.reload();
    //   //   //this.props.history.push("/login");
    // }
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });

    if (name === "selectedClient" && value !== null) {
      this.setState({ selectedClient: value });
      this.getClientVaults(value);
    }

    if (name === "productId") {
      this.getProductStockList(value);
    }
  }

  updateSearch(e) {
    this.setState({
      search: e.target.value.substr(0, 20)
    });
  }

  onLastMonthFilter() {
    this.getClientVaults(this.state.clientId, "LastMonth");
  }

  onDateFilter() {
    const { startDate, endDate, selectedClient } = this.state;
    var start = moment(startDate._d).format("L");
    var end = moment(endDate._d).format("L");
    console.log(selectedClient);
    this.getClientVaults(selectedClient, "DateRange", start, end);
  }

  handleStartDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleEndDateChange(date) {
    this.setState({
      endDate: date
    });
  }

  handleNavigation = entity => {
    console.log(entity);
    console.log(this.state.selectedClient);
  };

  render() {
    const {
      clientVaults,
      startDate,
      endDate,
      clients,
      selectedClient
    } = this.state;

    let currentSelectedClient;

    if (selectedClient === null || selectedClient === "") {
      currentSelectedClient = 5;
    }

    const allClients = lookupDropDown(clients);

    const dropClients = () => {
      if (clients) {
        return (
          <SelectInput
            name="selectedClient"
            label=" Clients"
            value={selectedClient}
            onChange={this.onChange}
            defaultOption="Select Client"
            options={allClients}
          />
        );
      }
    };

    let filteredStocks;

    var start = moment(startDate._d).format("L");
    var end = moment(endDate._d).format("L");

    if (clientVaults) {
      filteredStocks = clientVaults.filter(entity => {
        return entity.product.toLowerCase().indexOf(this.state.search) !== -1;
      });
    }

    const stockReportTable = () => {
      if (clientVaults) {
        return filteredStocks.map((entity, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>
                <NavLink
                  onClick={() => this.handleNavigation(entity)}
                  to={"/manager/" + this.state.selectedClient + "/" + entity.id}
                >
                  {entity.product}
                </NavLink>
              </td>
              <td>{entity.openingStock}</td>
              <td>{entity.totalAddition}</td>
              <td>{entity.totalWaste}</td>
              <td>{entity.totalIssuance}</td>
              <td>{entity.closingBalance}</td>
              <td>{moment(entity.date).format("DD-MMM-YYYY")}</td>
            </tr>
          );
        });
      }
    };

    return (
      <div>
        <section className="topics2">
          <div className="container">
            <div className="row">
              <div className="col-lg-12" ref={el => (this.componentRef = el)}>
                <header>
                  <h2>Stock Status</h2>
                </header>

                <div className="row">
                  <div className="col-md-12">
                    <div className="row" style={{ margin: "20px 0 20px" }}>
                      <ReactToExcel
                        className="btn btn-primary pull-right"
                        table="table-to-xls"
                        filename="sidims-stock-report"
                        sheet="Sheet 1"
                        buttonText="Export to Excel"
                      />

                      <div className="col-lg-4 pull-left">{dropClients()}</div>

                      <div className="col-lg-4 pull-right">
                        <div className="row">
                          <div className="col-lg-4">
                            <DatePicker
                              customInput={<ExampleCustomInput />}
                              selected={this.state.startDate}
                              onChange={this.handleStartDateChange}
                              showYearDropdown
                              dateFormatCalendar="MMMM"
                              scrollableYearDropdown
                              yearDropdownItemNumber={3}
                            />
                          </div>

                          <div className="col-lg-4">
                            <DatePicker
                              customInput={<ExampleCustomInput />}
                              selected={this.state.endDate}
                              onChange={this.handleEndDateChange}
                              showYearDropdown
                              dateFormatCalendar="MMMM"
                              scrollableYearDropdown
                              yearDropdownItemNumber={3}
                            />
                          </div>
                          <div className="col-lg-4">
                            <input
                              type="submit"
                              value="Filter"
                              className="btn btn-primary"
                              onClick={this.onDateFilter}
                            />
                          </div>
                        </div>
                      </div>

                      {/*
                      <div className="col-lg-4 pull-left">
                        <a onClick={this.onLastMonthFilter}>Last Month</a>
                      </div>*/}
                    </div>

                    <table
                      className="table table-sm stock-table"
                      id="table-to-xls"
                    >
                      <thead>
                        <tr>
                          <th scope="col">SN</th>
                          <th scope="col">Description</th>
                          <th scope="col">Opening Stock</th>
                          <th>New Stock</th>
                          <th>Waste</th>
                          <th>Personalization</th>
                          <th scope="col">Closing Stock</th>
                          <th>Last Updated</th>
                        </tr>
                      </thead>
                      <tbody>{stockReportTable()}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  getClients(clientId) {
    axios
      .get(myConfig.apiUrl + "/api/clients/" + clientId)
      .then(response => {
        this.setState({ client: response.data });
      })
      .catch(function(error) {});
  }

  getAllClients(clientId) {
    axios
      .get(myConfig.apiUrl + "/api/clients")
      .then(response => {
        console.log(response.data);
        this.setState({ clients: response.data });
      })
      .catch(function(error) {});
  }

  getClientProducts(clientId) {
    axios
      .get(myConfig.apiUrl + "/api/clients/" + clientId + "/products")
      .then(response => {
        this.setState({ products: response.data });
      })
      .catch(function(error) {});
  }

  getClientVaults(clientId, rangeType, startDate, endDate) {
    axios
      .get(
        myConfig.apiUrl +
          "/api/clients/" +
          clientId +
          "/ProductStockSummary?rangeType=" +
          rangeType +
          "&startDate=" +
          startDate +
          "&endDate=" +
          endDate
      )
      .then(response => {
        this.setState({ clientVaults: response.data });
      })
      .catch(function(error) {});
  }

  getProductStockList(clientId, productId) {
    axios
      .get(
        myConfig.apiUrl + "/api/clients/" + clientId + "/ProductStockSummary"
      )
      .then(response => {
        console.log(response.data);
        this.setState({ stockReports: response.data });
      })
      .catch(function(error) {});
  }
}

export default ManagerMIS;
