import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
    padding: "16px",
    width: "400px",
  },
  textField: {
    width: "100%",
    marginBottom: "16px",
  },
  actions: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "flex-end",
  },
});
