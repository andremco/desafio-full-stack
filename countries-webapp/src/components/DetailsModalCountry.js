import React from "react";
import { Modal, Button, Form,  } from 'react-bootstrap';

const DetailsModalCountry = (props) => {

return(
    <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
              <img src={props.country.flag.svgFile} width="35px" height="22px"/>
                &nbsp;&nbsp;
              <span style={{ fontSize: "20px"}}>{props.country.name}</span>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="form-control-name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Italy" maxLength={60} value={props.country.name}/>
                </Form.Group>
                <Form.Group controlId="form-control-capital">
                    <Form.Label>Capital</Form.Label>
                    <Form.Control type="text" placeholder="Rome" maxLength={80} value={props.country.capital}/>
                </Form.Group>
                <Form.Group controlId="form-control-area">
                    <Form.Label>Area</Form.Label>
                    <Form.Control type="text" placeholder="301336" maxLength={20} value={props.country.area}/>
                </Form.Group>
                <Form.Group controlId="form-control-population">
                    <Form.Label>Population</Form.Label>
                    <Form.Control type="text" placeholder="60665551" maxLength={20} value={props.country.population}/>
                </Form.Group>
                <Form.Group controlId="form-control-population-density">
                    <Form.Label>Population Density</Form.Label>
                    <Form.Control type="text" placeholder="201.32" maxLength={15} value={props.country.populationDensity}/>
                </Form.Group>
                <Form.Group controlId="form-control-population-density">
                    <Form.Label>Top Level Domains</Form.Label>
                    <ul>
                        {
                            props.country.topLevelDomains.map(({ name, countries }) => (
                                <>
                                    <li>{name}</li>
                                    <ul>
                                        {
                                            countries.map(c => (<li>{c.name} - {c.capital}</li>))
                                        }
                                    </ul>
                                </>
                            ))
                        }
                    </ul>
                </Form.Group>
            </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary">Edit Changes</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default DetailsModalCountry;

