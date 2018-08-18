/* eslint-env browser */
import React, { Component } from 'react';
import { render } from 'react-dom'; // eslint-disable-line import/no-extraneous-dependencies
import { Container, Row, Col } from 'reactstrap'; // eslint-disable-line import/no-extraneous-dependencies

import Filter from '../../src';
import 'bootstrap/dist/css/bootstrap.css'; // eslint-disable-line import/no-extraneous-dependencies

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedFilters: [] };

    this.onChange = this.onChange.bind(this);
  }

  onChange(newSelectedFilters) {
    this.setState({ selectedFilters: newSelectedFilters });
  }

  render() {
    const availableFilters = [
      {
        name: 'name', type: 'select', selectIsMulti: true, options: [{ value: 'Emmett', label: 'Emmett' }, { value: 'Jacob', label: 'Jacob' }],
      },
      {
        name: 'gender', type: 'select', options: [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }],
      },
    ];
    const { selectedFilters } = this.state;

    return (
      <Container fluid>
        <Row>
          <Col sm="12">
            <h1 style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              react-filter
            </h1>
          </Col>
        </Row>
        <Row noGutters>
          <Col md={2}>
            <Filter
              availableFilters={availableFilters}
              selectedFilters={selectedFilters}
              onChange={this.onChange}
              className="rootClassName"
              classNamePrefix="inner"
              isRtl
            />
          </Col>
          <Col md={9} />
        </Row>
      </Container>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
