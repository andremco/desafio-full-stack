import React from "react";
import { Row, Col, Spinner } from 'react-bootstrap';

const MainPageLoading = () => 
<Row className="justify-content-md-center">
    <Col xs="12" className="text-center">
        <Spinner animation="grow" size="sm" style={{ marginLeft: "3px" }}/>
        <Spinner animation="grow" size="sm" style={{ marginLeft: "3px" }}/>
        <Spinner animation="grow" size="sm" style={{ marginLeft: "3px" }}/> 
    </Col>
</Row>

export default MainPageLoading;
