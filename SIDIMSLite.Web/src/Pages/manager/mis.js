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
      lastDate: "",
      firstDate: "",
      endDate: moment()
    };
  }

  componentDidMount() {
    var start = moment(this.state.startDate._d).format("DD-MMM-YYYY");
    var end = moment(this.state.endDate._d).format("DD-MMM-YYYY");

    this.setState({ lastDate: end, firstDate: start });
  }

  componentWillMount() {
    this.getClients(5);
    this.getAllClients();
    this.getClientVaults(5, "ThisMonth");
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
    var start = moment(startDate._d).format("DD/MM/YYYY");
    var end = moment(endDate._d).format("DD/MM/YYYY");
    this.getClientVaults(selectedClient, "DateRange", start, end);
    this.setState({ lastDate: end, firstDate: start });
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

  renderPersoStock(entity, clientId, productId) {
    const { startDate, endDate } = this.state;

    var start = moment(startDate._d).format("DD-MMMM-YYYY");
    var end = moment(endDate._d).format("DD-MMMM-YYYY");

    if (entity === 0) return 0;
    return (
      <NavLink
        to={
          "/manager/" +
          clientId +
          "/" +
          productId +
          "/perso/" +
          start +
          "/" +
          end
        }
      >
        {entity}
      </NavLink>
    );
  }

  renderNewStock(entity, clientId, productId) {
    const { startDate, endDate } = this.state;

    var start = moment(startDate._d).format("DD-MMMM-YYYY");
    var end = moment(endDate._d).format("DD-MMMM-YYYY");

    if (entity === 0) return 0;
    return (
      <NavLink
        to={
          "/manager/" +
          clientId +
          "/" +
          productId +
          "/new-stock/" +
          start +
          "/" +
          end
        }
      >
        {entity}
      </NavLink>
    );
  }

  renderWasteStock(entity, clientId, productId) {
    const { startDate, endDate } = this.state;

    var start = moment(startDate._d).format("DD-MMMM-YYYY");
    var end = moment(endDate._d).format("DD-MMMM-YYYY");

    if (entity === 0) return 0;
    return (
      <NavLink
        to={
          "/manager/issuance/" +
          clientId +
          "/" +
          productId +
          "/" +
          start +
          "/" +
          end
        }
      >
        {entity}
      </NavLink>
    );
  }

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
      if (allClients) {
        return (
          <SelectInput
            name="selectedClient"
            label=" Clients"
            value={currentSelectedClient}
            onChange={this.onChange}
            defaultOption="Select Client"
            options={allClients}
          />
        );
      }
    };

    let filteredStocks;

    var start = moment(startDate._d).format("DD/MM/YYYY");
    var end = moment(endDate._d).format("DD/MM/YYYY");

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
                {this.renderWasteStock(
                  entity.product,
                  this.state.selectedClient,
                  entity.id
                )}
              </td>
              <td>{entity.openingStock}</td>
              <td>
                {this.renderNewStock(
                  entity.totalAddition,
                  this.state.selectedClient,
                  entity.id
                )}
              </td>
              <td>
                {this.renderWasteStock(
                  entity.totalIssuance,
                  this.state.selectedClient,
                  entity.id
                )}
              </td>
              <td>
                {this.renderWasteStock(
                  entity.totalWaste,
                  this.state.selectedClient,
                  entity.id
                )}
              </td>
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
                  <h2 style={{ color: "blue" }}>
                    Stock Report as at {this.state.lastDate}
                  </h2>
                  <h2 style={{ fontSize: 20 }}>
                    from {this.state.firstDate} to {this.state.lastDate}
                  </h2>
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
                              dateFormat="DD-MMM-YYYY"
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
                              dateFormat="DD-MMM-YYYY"
                              scrollableYearDropdown
                              yearDropdownItemNumber={3}
                            />
                          </div>
                          <div className="col-lg-4">
                            <input
                              type="submit"
                              value="Query"
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
                          <th>Personalization</th>
                          <th>Waste</th>
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
        this.setState({ stockReports: response.data });
      })
      .catch(function(error) {});
  }
}

export default ManagerMIS;
