import PopupWithForm from "./PopupWithForm";

export default function ConfirmDeletePopup(props) {
  return (
    <PopupWithForm formTitle="Вы уверены?" submitButtonText="Да" isOpen={props.isOpen} onClose={props.onClose} onSubmit={props.onSubmit}
      onlyTitle={true} isSaving={props.isSaving} />
  );
}
