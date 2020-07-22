import React from "react";
import PropTypes from "prop-types";
// components
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
} from "@material-ui/core";
// redux
import { connect } from "react-redux";
import * as actions from "../store/actions";

const ContainerDialog = ({
  children,
  isOpen,
  title,
  description,
  secondaryButtonText,
  primaryButtonAction,
  primaryButtonText,
  closeModal,
}) => {
  const handleClose = () => {
    closeModal();
  };
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        {title && <DialogTitle id="dialog-title">{title}</DialogTitle>}
        <DialogContent>
          {description && (
            <DialogContentText id="dialog-description">
              {description}
            </DialogContentText>
          )}
          {children}
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            {secondaryButtonText}
          </Button>
          <Button color="primary" onClick={primaryButtonAction} autoFocus>
            {primaryButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ContainerDialog.defaultProps = {
  children: null,
  title: null,
  description: null,
};

ContainerDialog.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  secondaryButtonText: PropTypes.string.isRequired,
  primaryButtonAction: PropTypes.func.isRequired,
  primaryButtonText: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isOpen: state?.modalState?.isOpen || false,
});
const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(actions.closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContainerDialog);
