import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from "moment";
import ReactToExcel from "react-html-table-to-excel";
import ExampleCustomInput from "../../Components/calender/ExampleCustomInput";

class ClientMIS extends Component {
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
      startDate: moment().startOf("month"),
      endDate: moment()
    };
  }

  componentWillMount() {
    var ls = localStorage.getItem("wss.auth");
    var jwtToken = JSON.parse(ls);

    if (jwtToken && jwtToken.page === "Client") {
      this.setState({ page: jwtToken.page, clientId: jwtToken.sidClientId });

      this.getClients(jwtToken.sidClientId);
      this.getClientVaults(jwtToken.sidClientId, "ThisMonth");
      //this.getClientProducts(jwtToken.sidClientId);
    } else {
      localStorage.removeItem("wss.auth");
      window.location.reload();
      this.props.history.push("/login");
    }
  }

  onChange(e) {
    const { name, value } = e.target;
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
    const { startDate, endDate, clientVaults } = this.state;

    var start = moment(startDate._d).format("L");
    var end = moment(endDate._d).format("L");

    this.getClientVaults(this.state.clientId, "DateRange", start, end);
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

  render() {
    const { clientVaults, search, startDate, endDate } = this.state;
    let filteredStocks;

    var start = moment(startDate._d).format("L");
    var end = moment(endDate._d).format("L");

    console.log(start);
    console.log(end);

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
                <NavLink to={"/mis/" + entity.id}>{entity.product}</NavLink>
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

                      <div className="col-lg-4 pull-left">
                        <h2 style={{ fontSize: 18 }}>
                          Report between {start} - {end}
                        </h2>
                      </div>
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
                          <th>Addition</th>
                          <th>Waste</th>
                          <th>Consumption</th>
                          <th scope="col">Current Stock</th>
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
      .get("https://localhost:5001/api/clients/" + clientId)
      .then(response => {
        this.setState({ client: response.data });
      })
      .catch(function(error) {});
  }

  getClientProducts(clientId) {
    axios
      .get("https://localhost:5001/api/clients/" + clientId + "/products")
      .then(response => {
        this.setState({ products: response.data });
      })
      .catch(function(error) {});
  }

  getClientVaults(clientId, rangeType, startDate, endDate) {
    axios
      .get(
        "https://localhost:5001/api/clients/" +
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
        "https://localhost:5001/api/clients/" +
          clientId +
          "/ProductStockSummary"
      )
      .then(response => {
        console.log(response.data);
        this.setState({ stockReports: response.data });
      })
      .catch(function(error) {});
  }

  // getProductStockList(clientId, productId) {
  //   axios
  //     .get("https://localhost:5001/api/clients/" + clientId + "/products/" + productId + "/stocklists")
  //     .then(response => {
  //       this.setState({ stockReports: response.data });
  //     })
  //     .catch(function(error) {});
  // }
}

export default ClientMIS;
