/* eslint-env browser */
import React, { Component } from 'react';
import { render } from 'react-dom'; // eslint-disable-line import/no-extraneous-dependencies
import {
  Container, Row, Col, Button,
} from 'reactstrap'; // eslint-disable-line import/no-extraneous-dependencies

import Filter from '../../src';
import 'bootstrap/dist/css/bootstrap.css'; // eslint-disable-line import/no-extraneous-dependencies

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiltersStatic: [], selectedFiltersLoaded: [], availableFiltersLoaded: [],
    };

    this.onChangeStatic = this.onChangeStatic.bind(this);
    this.onChangeLoaded = this.onChangeLoaded.bind(this);
  }

  onChangeStatic(newSelectedFilters) {
    this.setState({ selectedFiltersStatic: newSelectedFilters });
  }

  onChangeLoaded(newSelectedFilters) {
    this.setState({ selectedFiltersLoaded: newSelectedFilters });
  }

  render() {
    const availableFilters = [
      {
        name: 'name', type: 'select', selectIsMulti: true, required: true, options: [{ value: 'Emmett', label: 'Emmett' }, { value: 'Jacob', label: 'Jacob' }],
      },
      {
        name: 'gender', type: 'select', options: [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }],
      },
    ];
    const { selectedFiltersStatic, selectedFiltersLoaded, availableFiltersLoaded } = this.state;

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
            Static filter
            <Filter
              availableFilters={availableFilters}
              selectedFilters={selectedFiltersStatic}
              onChange={this.onChangeStatic}
              className="rootClassName"
              classNamePrefix="inner"
              isRtl
            />
            <br />
            Loaded filter
            <Filter
              availableFilters={availableFiltersLoaded}
              selectedFilters={selectedFiltersLoaded}
              onChange={this.onChangeLoaded}
              className="rootClassName"
              classNamePrefix="inner"
              isRtl
            />
            <br />
            <Button onClick={() => this.setState({ availableFiltersLoaded: availableFilters })}>
              Load filters
            </Button>
          </Col>
          <Col md={9} />
        </Row>
      </Container>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
