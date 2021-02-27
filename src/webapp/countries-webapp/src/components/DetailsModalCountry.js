import React, { useState } from "react";
import { Modal, Button, Form,  } from 'react-bootstrap';
import { Formik } from 'formik';

const DetailsModalCountry = (props) => {

var initialValues = { 
    name: props.country.name, 
    capital: props.country.capital,
    area: props.country.area,
    population: props.country.population,
    populationDensity: props.country.populationDensity,
    topLevelDomains: props.country.topLevelDomains
}

const [disabledButtonEdit, setDisabledButtonEdit] = useState(false);
const [valuesForm, setValuesForm] = useState(initialValues);

const validate = (values) => {
    
    setValuesForm(values);
    let errors = {};
    
    if(!values.name) {
        errors.name = true;
    }
    if(!values.capital) {
        errors.capital = true;
    }
    if(!parseInt(values.area)) {
        errors.area = true;
    }
    if(!parseInt(values.population)) {
        errors.population = true;
    }
    if(!parseFloat(values.populationDensity)) {
        errors.populationDensity = true;
    }

    if (Object.keys(errors).length > 0 ) {
        setDisabledButtonEdit(true)
        return errors;
    }

    setDisabledButtonEdit(false)
    return errors;
}

const editChanges = (values, createCustomCountry, closeModal) => {
    setDisabledButtonEdit(true);

    const callback = () => {
        setDisabledButtonEdit(false);
        closeModal(true);
    }

    values.id = parseInt(props.country._id);
    values.area = parseInt(values.area);
    values.population = parseInt(values.population);
    values.populationDensity = parseFloat(values.populationDensity);

    createCustomCountry(values, callback);
}

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
            <Formik initialValues={initialValues} validate={validate}>
                 {FormsCountry} 
            </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" disabled={disabledButtonEdit} onClick={ () => editChanges(valuesForm, props.createCustomCountry, props.handleClose) }>Edit Changes</Button>
        </Modal.Footer>
      </Modal>
    )
}

const FormsCountry = (props) => {
    
    return(
        <Form>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Italy" id="name" name="name" maxLength={60} 
                value={props.values.name} onChange={props.handleChange} isInvalid={(props.errors.name) ? true : false} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Capital</Form.Label>
                <Form.Control type="text" placeholder="Rome" id="capital" name="capital" maxLength={80} 
                value={props.values.capital} onChange={props.handleChange} isInvalid={(props.errors.capital) ? true : false} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Area</Form.Label>
                <Form.Control type="text" placeholder="301336" id="area" name="area" maxLength={20} 
                value={props.values.area} onChange={props.handleChange} isInvalid={(props.errors.area) ? true : false} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Population</Form.Label>
                <Form.Control type="text" placeholder="60665551" id="population" name="population" maxLength={20} value={props.values.population}
                onChange={props.handleChange} isInvalid={(props.errors.population) ? true : false} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Population Density</Form.Label>
                <Form.Control type="text" placeholder="201.32" maxLength={15} id="populationDensity" name="populationDensity" value={props.values.populationDensity}
                onChange={props.handleChange} isInvalid={(props.errors.populationDensity) ? true : false} />
            </Form.Group>
            <Form.Group controlId="form-control-top-level-domains">
                <Form.Label>Top Level Domains</Form.Label>
                <ul>
                    {
                        props.initialValues.topLevelDomains.map(({ name, countries }) => (
                            <>
                                <li key={name}>{name}</li>
                                <ul>
                                    {
                                        countries.map(c => (<li key={c.name +"-"+ c.capital}>{c.name} - {c.capital}</li>))
                                    }
                                </ul>
                            </>
                        ))
                    }
                </ul>
            </Form.Group>
        </Form>)
}

export default DetailsModalCountry;

