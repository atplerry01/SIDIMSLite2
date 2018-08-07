import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import ReactToPrint from "react-to-print";

import "react-datepicker/dist/react-datepicker.css";

import SelectInput from "../../Components/common/SelectInput";
import { lookupDropDown } from "../../_selector/selectors";

import ExampleCustomInput from "../../Components/calender/ExampleCustomInput";

class Inventory extends Component {
  constructor(props, context) {
    super(props, context);

    this.onChange = this.onChange.bind(this);
    this.onSaveIssuance = this.onSaveIssuance.bind(this);
    this.onSaveReceipt = this.onSaveReceipt.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.onDateFilter = this.onDateFilter.bind(this);

    this.state = {
      productName: "",
      startDate: moment(),
      endDate: moment(),
      search: "",
      productId: "",
      clientId: "",
      remark: "",
      dateRange: "",
      description: "",
      issuanceQuantity: "",
      receiptQuantity: ""
    };
  }

  componentDidMount() {
    this.getClient();
  }

  getClient() {
    axios
      .get("https://localhost:5001/api/clients")
      .then(response => {
        this.setState({ clients: response.data });
      })
      .catch(function(error) {
        //console.log(error);
      });
  }

  onDateFilter() {
    const { startDate, endDate, stockReports } = this.state;
    let filteredStocks;

    var start = moment(startDate._d).format("L");
    var end = moment(endDate._d).format("L");

    if (stockReports) {
      filteredStocks = stockReports.filter(stock => {
        let rawDate = moment(stock.createdOn).format("L");
        return rawDate <= start;
      });
    }
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
      this.getProductStockList(value, "ThisMonth");
    }
  }

  getProductById(productId) {
    axios
      .get("https://localhost:5001/api/products/" + productId)
      .then(response => {
        this.setState({ productName: response.data });
      })
      .catch(function(error) {});
  }
  getProduct(clientId) {
    axios
      .get("https://localhost:5001/api/clients/" + clientId + "/products")
      .then(response => {
        this.setState({ products: response.data });
      })
      .catch(function(error) {});
  }

  getProductStockList(productId, rangeType, startDate, endDate) {
    axios
      .get(
        "https://localhost:5001/api/clients/products/" +
          productId +
          "/stocklists?rangeType=" +
          rangeType +
          "&startDate=" +
          startDate +
          "&endDate=" +
          endDate
      )
      .then(response => {
        this.setState({ stockReports: response.data });
      })
      .catch(function(error) {});
  }

  onSaveIssuance(e) {
    e.preventDefault();

    const { issuanceQuantity, productId, remark } = this.state;

    if (issuanceQuantity && productId) {
      var cardIssuance = {
        productId: productId,
        quantity: issuanceQuantity,
        remark: remark
      };

      axios
        .post(
          "https://localhost:5001/api/cardflows/issuance/create",
          cardIssuance
        )
        .then(response => {
          this.getProductStockList(productId, "ThisMonth");
        })
        .catch(function(error) {});

      //clear fields
      this.setState({
        remark: "",
        issuanceQuantity: ""
      });
    }
  }

  onSaveReceipt(e) {
    e.preventDefault();

    const { receiptQuantity, productId, description } = this.state;

    if (receiptQuantity && productId) {
      var cardReceipt = {
        productId: productId,
        quantity: receiptQuantity,
        description: description
      };

      axios
        .post(
          "https://localhost:5001/api/cardflows/cardreceipt/create",
          cardReceipt
        )
        .then(response => {
          this.getProductStockList(productId, "ThisMonth");
        })
        .catch(function(error) {});
      //clear fields
      this.setState({
        description: "",
        receiptQuantity: ""
      });
    }
  }

  render() {
    let filteredStocks;

    const clients = lookupDropDown(this.state.clients);
    const products = lookupDropDown(this.state.products);
    const {
      issuanceQuantity,
      receiptQuantity,
      clientId,
      productId,
      remark,
      description,
      stockReports,
      dateRange,
      search
    } = this.state;

    const dropClients = () => {
      if (clients) {
        return (
          <SelectInput
            name="clientId"
            label=" Clients"
            value={clientId}
            onChange={this.onChange}
            defaultOption="Select Client"
            options={clients}
          />
        );
      }
    };

    const dropProducts = () => {
      if (products) {
        return (
          <SelectInput
            name="productId"
            label=" Products"
            value={productId}
            onChange={this.onChange}
            defaultOption="Select Product"
            options={products}
          />
        );
      }
    };

    const stockReportTable = () => {
      if (stockReports) {
        return stockReports.map((stock, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{stock.fileName}</td>
              <td>{stock.totalQtyIssued}</td>
              <td>{stock.openingStock}</td>
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
                      <h4>All Product List</h4>

                      <div>
                        {dropClients()}
                        {dropProducts()}

                        <Tabs
                          defaultActiveKey={1}
                          animation={false}
                          id="noanim-tab-example"
                        >
                          <Tab eventKey={1} title="Card Issuance">
                            <div data-style="padding-top:10px">
                              <br />
                              <input
                                type="text"
                                name="remark"
                                value={remark}
                                onChange={this.onChange}
                                placeholder="Job Description"
                              />
                              <input
                                type="text"
                                name="issuanceQuantity"
                                value={issuanceQuantity}
                                onChange={this.onChange}
                                placeholder=" Issuance Quantity"
                              />
                              <input
                                type="submit"
                                value="Submit"
                                onClick={this.onSaveIssuance}
                              />
                            </div>
                          </Tab>
                          <Tab eventKey={2} title="Received Stock">
                            <div data-style="padding-top:10px">
                              <br />
                              <input
                                type="text"
                                name="description"
                                value={description}
                                onChange={this.onChange}
                                placeholder="Description"
                              />
                              <input
                                type="text"
                                name="receiptQuantity"
                                value={receiptQuantity}
                                onChange={this.onChange}
                                className="search-field"
                                placeholder=" Receive Quantity"
                              />

                              <input
                                type="submit"
                                value="Submit"
                                onClick={this.onSaveReceipt}
                              />
                            </div>
                          </Tab>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pull-right">
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
                  <h2>
                    <i className="fa fa-credit-card" aria-hidden="true" />{" "}
                    &nbsp; {this.state.productName.name}
                  </h2>
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
                    </div>

                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">File Desc</th>
                          <th scope="col">Total Issued</th>
                          <th scope="col">Opening Stock</th>
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
        </section>
      </div>
    );
  }
}

export default Inventory;
