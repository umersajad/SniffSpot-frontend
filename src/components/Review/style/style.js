import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  card: {
    width: "100%",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
    backgroundColor: "white",
    marginBottom: "16px",
    transition: "0.2s",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    },
  },
  title: {
    fontWeight: "bold",
    marginBottom: "8px",
  },
  content: {
    color: "rgba(0, 0, 0, 0.7)",
  },
  editButton: {
    marginLeft: "auto",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
