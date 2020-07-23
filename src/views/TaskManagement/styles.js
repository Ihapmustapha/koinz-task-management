const styles = () => ({
  columnPaper: {
    width: "275px",
    height: "85vh",
    padding: "20px",
    margin: "15px 20px 0px 0px",
    backgroundColor: "#e6e5e5",
  },
  columnTitle: {
    fontWeight: "bold",
  },
  titleDivider: {
    height: "2px",
    width: "100%",
    color: "black",
    marginTop: "10px",
  },
  tasksListContainer: {
    "&::-webkit-scrollbar": {
      width: "7px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#cacaca",
      borderRadius: "50px",
      marginBottom: "3px",
      opacity: "0.3",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "darkslateblue",
      outline: "1px solid slategrey",
      borderRadius: "50px",
    },
    width: "275px",
    height: "450px",
    overflowX: "hidden",
    overflowY: "auto",
    boxSizing: "border-box",
    paddingLeft: "5px",
  },
  addIcon: {
    width: "18px",
  },
  addButton: {
    backgroundColor: "darkslateblue",
  },
  taskCard: {
    width: "260px",
    height: "auto",
    marginTop: "10px",
    boxSizing: "border-box",
    padding: "20px 20px",
  },
});

export default styles;
