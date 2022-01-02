import { popupConfig } from "../utils/utils";

export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} popup_transparent_medium ${props.isOpen && popupConfig.popupOpenedClass}`}>
      <div className="page__container">
        <button className="popup__container-close-btn transparent transparent_amount_more" type="button" aria-label="Кнопка закрытия попапа"
         onClick={props.onClose}></button>
        <form name={props.name} className="page__form" onSubmit={props.onSubmit}>
          <h2 className={`page__form-title ${props.onlyTitle ? 'page__form-title_onlytitle' : ''}`}>{props.formTitle}</h2>
          {props.children}
          <button className="page__form-submit-btn transparent transparent_amount_much-more" type="submit">
            {props.isSaving ? popupConfig.popupWithFormSavingText : props.submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}
