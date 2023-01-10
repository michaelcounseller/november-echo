import React from 'react'
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from 'react-router-dom'
import {
  AppBar,
  Breadcrumbs,
  IconButton,
  Toolbar,
 
} from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="static">
    <Toolbar>
      <IconButton sx={{ flexGrow: 1, justifyContent: "flex-start"}}
        size="large"
        edge='start'
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon  />
      </IconButton>
      
      <Breadcrumbs
        sx={{ justifyContent: "flex-end" }}
        separator="<"
        color="white"
        aria-label="breadcrumb"
      >
        
        <Link style={{color: "white", textDecoration: "none"}} to="teams/IBS">
          IBS
        </Link>
        <Link underline="hover" style={{color: "white", textDecoration: "none"}} to="teams/Gold">
          Gold
        </Link>
        <Link underline="hover" style={{color: "white", textDecoration: "none"}} to="teams/Plat">
          Plat
        </Link>
        <Link underline="hover" style={{color: "white", textDecoration: "none"}} to="teams/Diamond">
          Diamond
        </Link>
        <Link underline="hover" style={{color: "white", textDecoration: "none"}} to="teams/Master">
          Master
        </Link>
        <Link underline="hover" style={{color: "white", textDecoration: "none"}} to="teams/NACL">
          NACL
        </Link>
      </Breadcrumbs>
    </Toolbar>
  </AppBar>
  )
}

export default NavBar