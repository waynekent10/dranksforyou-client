import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function About() {
  return (
    <Container className="text-center my-4">
      <Row className="mb-4">
        <Col>
          <h1 id="about-header">ABOUT US</h1>
          <h5 id="about-text">Our craft is your Drank in your hand!</h5>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col md={8}>
          <h5 id="about">
            Welcome to Dranks for you. Your number one source for hand-crafted drinks!
            <br />
            <br />
            Our journey began with a simple idea: Get you Lit!
            <br />
            <br />
            Dranks for you originated in Dayton, OH. Refined in Nashville, TN.
            <br />
            <br />
            We hope that you enjoy our products and come back very soon.
            <br />
            <br />
            We appreciate your business!
          </h5>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
