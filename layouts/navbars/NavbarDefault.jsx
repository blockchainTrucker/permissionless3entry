import { Fragment, useState } from 'react';
import Link from 'next/link';
import { Image, Navbar, Nav, Container } from 'react-bootstrap';
import NavDropdownMain from '../../sub-components/navbar/NavDropdownMain';
import NavbarDefaultRoutes from '../../data/navbars/navbarRoutes';
import { useMindContext } from '../../context/MindContext';

const NavbarDefault = () => {
    const { balance, network } = useMindContext();
    const [expandedMenu, setExpandedMenu] = useState(false);
    console.log(network);
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
                            {network === 'rootstock' ? (
                                <span
                                    style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '500',
                                        padding: '0',
                                    }}
                                    className="text-primary text-nowrap">
                                    rMIND Balance: {balance}
                                </span>
                            ) : (
                                <span
                                    style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '500',
                                        padding: '0',
                                    }}
                                    className="text-primary text-nowrap">
                                    xMIND Balance: {balance}
                                </span>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    );
};

export default NavbarDefault;
