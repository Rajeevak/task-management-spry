import { useNavigate, useLocation } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  navBar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    background: "#232323",
    padding: [16, 0],
    borderRadius: 8,
    marginBottom: 32,
  },
  tab: {
    padding: [10, 28],
    border: "none",
    borderBottom: "3px solid transparent",
    background: "none",
    color: "#fff",
    fontSize: "1.1em",
    fontWeight: 500,
    cursor: "pointer",
    textDecoration: "none",
    transition: "border-color 0.2s, color 0.2s",
    outline: "none",
    "&:hover": {
      color: "#646cff",
    },
  },
  activeTab: {
    borderBottom: "3px solid #646cff",
    color: "#646cff",
  },
});

const NavigationBar = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const tabs = [
    {
      label: "All Tasks",
      path: "/task-management",
    },
    {
      label: "Completed Tasks",
      path: "/task-management/completed",
    },
  ];

  return (
    <nav className={classes.navBar}>
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            type="button"
            className={`${classes.tab} ${isActive ? classes.activeTab : ""}`}
            onClick={() => navigate(tab.path)}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};

export default NavigationBar;
