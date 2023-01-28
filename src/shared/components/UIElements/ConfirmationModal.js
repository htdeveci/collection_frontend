import classes from "./ConfirmationModal.module.css";
import Button from "../FormElements/Button";
import Modal from "./Modal";

const ConfirmationModal = ({ show, onCancel, message, onSubmit }) => {
  return (
    <Modal
      show={show}
      onCancel={onCancel}
      header="Are You Sure"
      headerClass
      footerStyle={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
      footer={
        <>
          <Button type="submit" onClick={onSubmit}>
            Yes
          </Button>
          <Button onClick={onCancel}>No</Button>
        </>
      }
      headerStyle={{ display: "flex", justifyContent: "flex-start" }}
      onSubmit={onSubmit}
    >
      <p> {message}</p>
    </Modal>
  );
};

export default ConfirmationModal;
