import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    Image,
    Navbar,
    Nav,
    Container,
    Dropdown,
    Col,
    Modal,
    Button,
} from 'react-bootstrap';
import NavDropdownMain from '../../sub-components/navbar/NavDropdownMain';
import NavbarDefaultRoutes from '../../data/navbars/navbarRoutes.jsx';

const NavbarDefault = () => {
    const router = useRouter();
    const [expandedMenu, setExpandedMenu] = useState(false);
    const [walletBalance, setWalletBalance] = useState(0);

    return (
        <Fragment>
            <Navbar
                onToggle={(collapsed) => setExpandedMenu(collapsed)}
                expanded={expandedMenu}
                expand="md"
                className={`navbar p-2 px-7`}>
                <Container fluid className="px-0">
                    <Navbar.Brand className="pb-0 ps-3" as={Link} href="/">
                        <Image
                            alt="Rewarding Midset Logo"
                            width="250"
                            src="/images/logos/rmLogo.png"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        className="me-2">
                        <span className="icon-bar top-bar mt-0"></span>
                        <span className="icon-bar middle-bar"></span>
                        <span className="icon-bar bottom-bar"></span>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav" className="">
                        <Nav className="ms-3 w-100 d-flex justify-content-center gap-2">
                            {NavbarDefaultRoutes.map((item, index) => {
                                if (item.children === undefined) {
                                    console.log('should be good');
                                    return (
                                        <Nav.Link
                                            key={index}
                                            as={Link}
                                            href={item.link}>
                                            {item.menuitem}
                                        </Nav.Link>
                                    );
                                } else {
                                    return (
                                        <NavDropdownMain
                                            item={item}
                                            key={index}
                                            onClick={(value) =>
                                                setExpandedMenu(value)
                                            }
                                        />
                                    );
                                }
                            })}
                        </Nav>
                        <Nav className="navbar-nav ms-auto me-3">
                            <span
                                style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '500',
                                    padding: '0',
                                }}
                                className="text-primary text-nowrap">
                                Reward Balance: {walletBalance}
                            </span>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    );
};

export default NavbarDefault;
