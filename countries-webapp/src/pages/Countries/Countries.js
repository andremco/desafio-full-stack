import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getAllCountries } from "../../actions/countries";
import { Card, Button, Row, Col, Navbar, Form, FormControl, InputGroup } from 'react-bootstrap';
import MainPageLoading from '../../components/MainPageLoading';
import DetailsModalCountry from '../../components/DetailsModalCountry';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Countries = (props) => {

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [countrySelected, setCountrySelected] = useState();

  const handleCloseDetailsModal = () => setShowDetailsModal(false);

  useEffect(() => {
    props.actions.getAllCountries();
  }, []);

  return (<>
      <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
            Countries
          </Navbar.Brand>
          <Form inline style={{ marginLeft: 'auto', marginRight: '0', marginTop: '12px' }}>
            <InputGroup className="input-group input-group-sm mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl size="xs" id="inlineFormInputGroupUsername2" placeholder="Search" />
            </InputGroup>
          </Form>
      </Navbar>
      <div className="page-countries" style={{margin: "5px" }}>
          { props.loading ? <MainPageLoading></MainPageLoading> : <></> }
          <Row>
            <React.StrictMode>
              {
                props.countries.map(country => (
                  <Col key={country._id}>
                    <Card style={{ width: '18rem', height: "23rem", marginBottom: "2rem" }}>
                      <Card.Img variant="top" src={country.flag.svgFile} />
                        <Card.Body>
                          <Card.Title>{country.name}</Card.Title>
                          <Card.Text>{country.capital}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <Button variant="primary" onClick={() => 
                          { 
                            setShowDetailsModal(true); 
                            setCountrySelected(country); 
                          }}>Details</Button>
                        </Card.Footer>
                    </Card>
                  </Col>
                ))
              }
            </React.StrictMode>
          </Row>
          {
            showDetailsModal && countrySelected ? 
              <DetailsModalCountry show={showDetailsModal} handleClose={handleCloseDetailsModal} country={countrySelected}></DetailsModalCountry>    
            : 
              <></>
          }
      </div>
  </>);
};

export const mapStateToProps = state => {
  return state
} 

export const mapDispatchToProps = dispatch => {
  return {
      actions: bindActionCreators({
        getAllCountries  
      }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Countries);
