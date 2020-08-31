import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import seachIcon from './../icons/search.svg';
import './Dropdown.css';


class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',
        countries: [],
        starting: 0,
    };
  }

  componentWillMount() {
    this.getCountryList();
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { refresh } = this.props;
    if (refresh !== nextProps.refresh) {
        this.getCountryList();
    }
  }

  getCountryList() {
        axios.get("http://13.57.235.126:5000/countries").then(response => {
            this.setState({ countries: response.data.countries });
        })
  }

  onChangeHandler(event) {
    this.setState({ value: event.target.value });
  }

  changeStarting() {
    const { starting } = this.state;
    const { noOfItems } = this.props;
    const finalValue = starting + noOfItems;
    this.setState({ starting: finalValue });
  }

  addNewCountry() {
    const { value } = this.state;
    const { addAndSelectHandler } = this.props;
    addAndSelectHandler(value);
  }


  renderOption() {
    const { countries, value, starting } = this.state;
    const { noOfItems, privilege } = this.props;
    const list = countries.filter(item => item.toLowerCase().includes(value.toLowerCase()));
    const finalList = value.length ? list: countries.filter((item, index ) => index>= starting && index < starting + noOfItems);

    return (
    <div>

      {finalList.length ? finalList.map((item, index) => (
        <div className="dd-option">
          <div
            onKeyDown={() => {}}
            role="button"
            tabIndex="0"
          >
            {item}
          </div>
        </div>
      )): (
        <div>
            "{value}" not found
            { privilege ? <button onClick={() => this.addNewCountry()}> Add & Select </button>: null}
        </div>
      )}
      {
        !value.length && finalList.length  ?
        (
        <div className="more-options" onClick={()=> this.changeStarting()}>
                { noOfItems } more...
              </div>
        ): null
      }
      </div>
    );
  }

  renderNoOption() {
    return (
      <div
        className="dd-no-option"
        ref={this.option}
      >
        <img alt="search" className="icon-no-option icon-no-option-normal" src="./src/assets/icons/not-found-icon.svg" />
      </div>
    );
  }

  render() {
    const { value } = this.state;
    const { title } = this.props;

    return (
      <div className="dropdown-container">
          <div className="dropdown-label">
            <div>
            {title}
            </div>
          </div>
        <div
          onKeyDown={() => {}}
          role="button"
          id="dropdown"
        >
          <div className="dd-outer-div">
            <div className="dd-wrapper-width">
              <img alt="search" className="dd-search" src={seachIcon} />
              <input
                className="dd-input-field"
                placeholder="Search"
                onChange={(e) => this.onChangeHandler(e)}
                value={value}
              />
            </div>
          </div>
          {this.renderOption()}
        </div>
      </div>
    );
  }
}

Dropdown.defaultProps = {
    noOfItems: 5,
    privilege: false,
    refresh: false,
    addAndSelectHandler: () => {},
    title: "Standard Dropdown",
};

Dropdown.propTypes = {
    noOfItems: PropTypes.number,
    privilege: PropTypes.bool,
    refresh: PropTypes.bool,
    addAndSelectHandler: PropTypes.func,
    title: PropTypes.string,
};

export default Dropdown;
