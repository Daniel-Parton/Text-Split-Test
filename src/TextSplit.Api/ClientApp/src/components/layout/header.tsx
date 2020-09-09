import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import { Link } from "react-router-dom";

interface NavBarProps {
  brandText: string
}

const Header: React.FC<NavBarProps> = ({ brandText }) => {

  return (
    <Navbar color="light" light className="navbar shadow-sm p-3 mb-5 bg-white rounded" expand="md">
      <NavbarBrand tag={Link} to='/'>{brandText}</NavbarBrand>
    </Navbar>
  )
}

export default Header;
