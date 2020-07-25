import React from "react";
import PropTypes from "prop-types";
// components
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
// redux
import { connect } from "react-redux";
import * as actions from "../../store/actions";

const ContainerModal = ({
  children,
  isOpen,
  title,
  description,
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
        keepMounted={false}
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
      </Dialog>
    </>
  );
};

ContainerModal.defaultProps = {
  children: null,
  title: null,
  description: null,
};

ContainerModal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isOpen: state?.modalState?.isOpen || false,
});
const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(actions.closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContainerModal);
