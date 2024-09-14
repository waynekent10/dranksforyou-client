/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import Image from 'next/image';
import logo from '../public/photos/logo.png';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Link href="/" passHref>
          <Navbar.Brand>
            <Image
              src={logo}
              className="logo-img"
              width={55}
              height={55}
              alt="Sole Sync logo"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION */}
            <Link href="/" passHref>
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href="/liquors" passHref>
              <Nav.Link>Liquor</Nav.Link>
            </Link>
            <Link href="/beverages" passHref>
              <Nav.Link>Beverages</Nav.Link>
            </Link>
            <Link href="/ingredients" passHref>
              <Nav.Link>Ingredients </Nav.Link>
            </Link>
            <Link href="/orders" passHref>
              <Nav.Link>Orders </Nav.Link>
            </Link>
            <Link href="/orderbeverages" passHref>
              <Nav.Link>OBs </Nav.Link>
            </Link>
            <Link href="/about" passHref>
              <Nav.Link>About us</Nav.Link>
            </Link>
          </Nav>
          <Button variant="danger" onClick={signOut}>
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
