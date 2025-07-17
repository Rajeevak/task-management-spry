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
  const isAllTasks = location.pathname === "/task-management";
  const isCompletedTasks = location.pathname === "/task-management/completed";

  return (
    <nav className={classes.navBar}>
      <button
        type="button"
        className={`${classes.tab} ${isAllTasks ? classes.activeTab : ""}`}
        onClick={() => navigate("/task-management")}
      >
        All Tasks
      </button>
      <button
        type="button"
        className={`${classes.tab} ${isCompletedTasks ? classes.activeTab : ""}`}
        onClick={() => navigate("/task-management/completed")}
      >
        Completed Tasks
      </button>
    </nav>
  );
};

export default NavigationBar;
