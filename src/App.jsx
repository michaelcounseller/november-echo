import MenuIcon from "@mui/icons-material/Menu";

import {
  AppBar,
  Breadcrumbs,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";

function App() {
  return (
    <>
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
            separator="|"
            aria-label="breadcrumb"
          >
            <Link underline="hover" color="white" href="IBS">
              IBS
            </Link>
            <Link underline="hover" color="white" href="Gold">
              Gold
            </Link>
            <Link underline="hover" color="white" href="Plat">
              Plat
            </Link>
            <Link underline="hover" color="white" href="Diamond">
              Diamond
            </Link>
            <Link underline="hover" color="white" href="Master">
              Master
            </Link>
            <Link underline="hover" color="white" href="NACL">
              NACL
            </Link>
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default App;
