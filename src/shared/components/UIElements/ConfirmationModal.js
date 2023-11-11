import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button";

// import classes from "./ConfirmationModal.module.css";

const ConfirmationModal = ({ show, message, onSubmit, onCancel }) => {
  return (
    <Dialog open={show} onClose={onCancel}>
      <DialogTitle>Are You Sure</DialogTitle>

      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel}>No</Button>
        <Button type="submit" onClick={onSubmit} color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
