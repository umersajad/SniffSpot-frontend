import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: "50px",
  },
  PaginationContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    fontSize: "16px",
    padding: "40px 0",
  },
});
