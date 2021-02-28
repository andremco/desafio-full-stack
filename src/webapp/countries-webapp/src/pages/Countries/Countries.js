import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getAllGraphCountries, createCustomCountry } from "../../actions/country";
import { Card, Button, Row, Col, Navbar, Form, FormControl, InputGroup, Alert } from 'react-bootstrap';
import MainPageLoading from '../../components/MainPageLoading';
import DetailsModalCountry from '../../components/DetailsModalCountry';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faExclamation } from '@fortawesome/free-solid-svg-icons'

const Countries = (props) => {

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [countrySelected, setCountrySelected] = useState();
  const [literalSearch, setLiteralSearch] = useState();

  const handleCloseDetailsModal = () => setShowDetailsModal(false);

  const onChangeSearch = (e) => {
    setLiteralSearch(e.target.value)
  }

  useEffect(() => {
    props.actions.getAllGraphCountries();
  }, []);

  const cardCountry = (country) => {
    return(<Col key={country._id}>
      <Card style={{ width: '18rem', height: "23rem", marginBottom: "2rem" }}>
        <Card.Img variant="top" src={country.flag.svgFile} />
          <Card.Body>
            <Card.Title>{country.name}</Card.Title>
            <Card.Text>
              <span style={{ display: "block" }}>{country.capital}</span>
              {
                country.isModified ? 
                  <span style={{ fontSize: "12px", display: "block" }}>this country has been modified <FontAwesomeIcon icon={faExclamation} /></span>
                :
                  <></>
              }
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary" onClick={() => 
            { 
              setShowDetailsModal(true); 
              setCountrySelected(country); 
            }}>Details</Button>
          </Card.Footer>
      </Card>
    </Col>)
  }

  let i = 0;

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
              <FormControl size="xs" id="inlineFormInputGroupUsername2" placeholder="Search" onChange={onChangeSearch}/>
            </InputGroup>
          </Form>
      </Navbar>
      <div className="page-countries" style={{margin: "5px" }}>
          { props.loading ? <MainPageLoading></MainPageLoading> : <></> }
          <Row> 
              {
                props.countries.map(country => 
                {
                  if (!literalSearch) {
                    i++;
                    return cardCountry(country)
                  }
                  else if(country.name && country.name.toLowerCase().startsWith(literalSearch) || country.capital.toLowerCase().startsWith(literalSearch)){
                    i++;
                    return cardCountry(country)
                  }
                })
              }
              {
                i === 0 ? <Col xs={12}><Alert key="warning" variant="warning">Country not found!</Alert></Col> : <></>
              }
          </Row>
            {
              showDetailsModal && countrySelected ? 
                <DetailsModalCountry show={showDetailsModal} handleClose={handleCloseDetailsModal} 
                  country={countrySelected} createCustomCountry={props.actions.createCustomCountry} ></DetailsModalCountry>    
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
        getAllGraphCountries,
        createCustomCountry  
      }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Countries);
