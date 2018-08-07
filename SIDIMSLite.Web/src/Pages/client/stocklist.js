import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import ReactToPrint from "react-to-print";
import { NavLink } from "react-router-dom";
import { Button, Modal, OverlayTrigger } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import ReactToExcel from "react-html-table-to-excel";
import { lookupDropDown } from "../../_selector/selectors";
import ExampleCustomInput from "../../Components/calender/ExampleCustomInput";

class Inventory extends Component {
  constructor(props, context) {
    super(props, context);

    this.onChange = this.onChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.onDateFilter = this.onDateFilter.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onLastMonthFilter = this.onLastMonthFilter.bind(this);

    this.state = {
      filterChange: false,
      productName: "",
      startDate: moment().startOf("month"),
      endDate: moment().endOf("day"),
      search: "",
      productId: "",
      clientId: "",
      dateRange: "",
      stockLogModalShow: false,
      stockLogs: ""
    };
  }

  handleClose() {
    this.setState({ stockLogModalShow: false });
  }

  handleShow(data) {
    axios
      .get("https://localhost:5001/api/clients/stocklog/" + data.id)
      .then(response => {
        this.setState({ stockLogs: response.data });
      })
      .catch(function(error) {});

    this.setState({ stockLogModalShow: true });
  }

  componentWillMount() {
    const {
      match: { params }
    } = this.props;

    var ls = localStorage.getItem("wss.auth");
    var jwtToken = JSON.parse(ls);

    if (params && jwtToken.sidClientId) {
      this.getProductById(params.id);
      this.getClientProducts(jwtToken.sidClientId);
      this.getProductStockList(params.id, "ThisMonth");
      this.getProductStockSummary(params.id, "ThisMonth");
      this.setState({ selectedProductId: params.id });
    }
  }

  onLastMonthFilter() {
    const {
      match: { params }
    } = this.props;
    this.getProductStockList(params.id, "LastMonth");
    this.getProductStockSummary(params.id, "LastMonth");
  }

  onDateFilter() {
    const {
      match: { params }
    } = this.props;
    const { startDate, endDate, stockReports } = this.state;

    var start = moment(startDate._d).format("L");
    var end = moment(endDate._d).format("L");

    this.getProductStockList(params.id, "DateRange", start, end);
    this.getProductStockSummary(params.id, "DateRange", start, end);
  }

  handleStartDateChange(date) {
    // if (this.state.filterChange == true) {
    //   this.getProductStockList(this.state.selectedProductId);
    // }

    this.setState({
      startDate: date
    });
  }

  handleEndDateChange(date) {
    // if (this.state.filterChange == true) {
    //   this.getProductStockList(this.state.selectedProductId);
    // }

    this.setState({
      endDate: date
    });
  }

  handleEvent(event, picker) {
    event.preventDefault();
  }

  updateSearch(e) {
    this.setState({
      search: e.target.value.substr(0, 20)
    });
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });

    if (name === "clientId" && value !== null) {
      this.getProduct(value);
    }

    if (name === "productId") {
      this.getProductById(value);
      this.getProductStockList(value);
      //this.getProductStockSummary(params.id);
    }
  }

  render() {
    let filteredStocks;
    const { stockReports, stockLogs, search, stockSummary } = this.state;

    if (stockReports) {
      filteredStocks = stockReports.filter(stock => {
        return (
          stock.fileName.toLowerCase().indexOf(this.state.search) !== -1 ||
          stock.qtyIssued >= search
        );
      });
    }

    const stockSummaryDiv = () => {
      if (stockSummary) {
        return (
          <div>
            <h3>Summary</h3>
            <div>Current Stock: {stockSummary.currentStock}</div>
            <div>
              Total Consumption: {stockSummary.stockCount} ({
                stockSummary.filter
              })
            </div>
          </div>
        );
      }
    };

    const productTables = () => {
      if (this.state.products) {
        return this.state.products.map((prod, index) => {
          return (
            <li key={prod.id}>
              <NavLink to={"/mis/" + prod.id}>{prod.product}</NavLink>
            </li>
          );
        });
      }
    };

    const stockReportTable = () => {
      if (stockReports) {
        return filteredStocks.map((stock, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{stock.fileName}</td>
              <td>{stock.openingStock}</td>
              <td>{stock.operation.operation}</td>
              <td>{stock.cardQuantity}</td>
              <td>{stock.closingBalance}</td>
              <td>
                <span style={{ fontSize: "8" }}>
                  {moment(stock.date).format("D/M/YY, LT")}
                </span>
              </td>
            </tr>
          );
        });
      }
    };

    const stockLogTable = () => {
      if (stockLogs) {
        return stockLogs.map((stock, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{stock.remark}</td>
              <td>{stock.issuanceQty}</td>
              <td>{stock.currentStock}</td>
              <td>{moment(stock.modifiedOn).format("DD-MMM-YYYY")}</td>
            </tr>
          );
        });
      }
    };

    return (
      <div>
        <section className="topics">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="sidebar" data-style="padding-right:25px">
                  <div>
                    <div className="widget fix widget_categories2">
                      <div>
                        <div className="topics-list">
                          <h3>
                            <a href="#">
                              <span className="badge" />Product Lists
                            </a>
                          </h3>
                          <ul>
                            <li>
                              <NavLink to={"/mis"}>ALL STOCKS</NavLink>
                            </li>
                            {productTables()}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <ReactToExcel
                className="btn btn-primary pull-right"
                table="table-to-xls"
                filename="sidims-stock-report"
                sheet="Sheet 1"
                buttonText="Export to Excel"
              />

              <div className="">
                <ReactToPrint
                  trigger={() => (
                    <a href="#">
                      {" "}
                      <i
                        className="fa fa-print"
                        style={{ fontSize: "18px" }}
                        aria-hidden="true"
                      />{" "}
                      Print this out!
                    </a>
                  )}
                  content={() => this.componentRef}
                />
              </div>

              <div className="col-lg-8" ref={el => (this.componentRef = el)}>
                <header>
                  <h3>
                    <i className="fa fa-credit-card" aria-hidden="true" />{" "}
                    &nbsp; {this.state.productName.product}
                  </h3>

                  {stockSummaryDiv()}
                </header>

                <div className="row">
                  <div className="col-md-12">
                    <div className="row" style={{ margin: "20px 0 20px" }}>
                      <div className="col-lg-4">
                        <input
                          type="text"
                          value={this.state.search}
                          onChange={this.updateSearch.bind(this)}
                          placeholder=" Search Job Remark"
                        />
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

                      <div className="col-lg-4 pull-right">
                        <a onClick={this.onLastMonthFilter}>Last Month</a>
                      </div>
                    </div>

                    <table className="table table-sm" id="table-to-xls">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Description</th>
                          <th scope="col">Opening Stock</th>
                          <th scope="col">Operation</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Current Stock</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>{stockReportTable()}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Modal show={this.state.stockLogModalShow} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Stock Detail Logs</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Issuance Desc</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Current Stock</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>{stockLogTable()}</tbody>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </section>
      </div>
    );
  }

  getProductById(productId) {
    axios
      .get("https://localhost:5001/api/clients/products/" + productId)
      .then(response => {
        this.setState({ productName: response.data });
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

  getClientVaults(productId) {
    axios
      .get("https://localhost:5001/api/clients/" + productId + "/vaults")
      .then(response => {
        this.setState({ clientVaults: response.data });
      })
      .catch(function(error) {});
  }

  getProductStockList(productId, rangeType, startDate, endDate) {
    axios
      .get(
        "https://localhost:5001/api/clients/" +
          productId +
          "/stockreports?rangeType=" +
          rangeType +
          "&startDate=" +
          startDate +
          "&endDate=" +
          endDate
      )
      .then(response => {
        console.log(response.data);
        this.setState({ stockReports: response.data });
      })
      .catch(function(error) {});
  }

  getProductStockSummary(productId, rangeType, startDate, endDate) {
    axios
      .get(
        "https://localhost:5001/api/clients/" +
          productId +
          "/summary?rangeType=" +
          rangeType +
          "&startDate=" +
          startDate +
          "&endDate=" +
          endDate
      )
      .then(response => {
        this.setState({ stockSummary: response.data });
      })
      .catch(function(error) {});
  }
}

export default Inventory;
