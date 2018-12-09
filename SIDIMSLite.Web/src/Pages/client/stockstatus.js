import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from "moment";
import ReactToExcel from "react-html-table-to-excel";
import ExampleCustomInput from "../../Components/calender/ExampleCustomInput";
import { myConfig } from "../../App/config";

class StockStatus extends Component {
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
      lastDate: "",
      endDate: moment()
    };
  }

  componentDidMount() {
    var end = moment(this.state.endDate._d).format("L");
    this.setState({ lastDate: end });
  }

  componentWillMount() {
    var ls = localStorage.getItem("wss.auth");
    var jwtToken = JSON.parse(ls);

    if (jwtToken && jwtToken.page === "Client") {
      this.setState({ page: jwtToken.page, clientId: jwtToken.sidClientId });

      this.getClients(jwtToken.sidClientId);
      this.getClientVaults(jwtToken.sidClientId, "ThisMonth");
    } else {
      localStorage.removeItem("wss.auth");
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
    let { clientVaults, search, startDate, endDate } = this.state;
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
              <td>{entity.product}</td>
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
                  <div className="pull-right" style={{ fontSize: 13 }}>
                    <a
                      style={{ display: "table-cell" }}
                      href="https://www.dropbox.com/s/5i6if2t4zbsgt46/FAQs.pdf?dl=0"
                      target="_blank"
                    >
                      FAQs
                      {" - "}
                    </a>

                    <a
                      style={{ display: "table-cell" }}
                      href="https://www.dropbox.com/s/5i6if2t4zbsgt46/FAQs.pdf?dl=0"
                      target="_blank"
                    >
                      {" - "}
                      User Manual
                    </a>
                  </div>
                  <div className="pull-right">
                    <h2 style={{ fontSize: 20 }}>
                      <NavLink to="/">View Stock Report</NavLink>
                    </h2>
                  </div>
                  <h2 style={{ color: "blue" }}>Stock Status</h2>
                </header>

                <div className="row">
                  <div className="col-md-12">
                    <div className="row" style={{ margin: "20px 0 20px" }}>
                      <div className="col-lg-4">
                        <input
                          style={{ width: 300 }}
                          type="text"
                          value={this.state.search}
                          onChange={this.updateSearch.bind(this)}
                          placeholder=" Search Product"
                        />
                      </div>
                      <ReactToExcel
                        className="btn btn-primary pull-right"
                        table="table-to-xls"
                        filename="sidims-stock-report"
                        sheet="Sheet 1"
                        buttonText="Export to Excel"
                      />
                    </div>

                    <table
                      className="table table-sm stock-table"
                      id="table-to-xls"
                    >
                      <thead>
                        <tr>
                          <th scope="col">SN</th>
                          <th scope="col">Products</th>
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
      .get(myConfig.apiUrl + "/api/clients/" + clientId)
      .then(response => {
        this.setState({ client: response.data });
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

export default StockStatus;
