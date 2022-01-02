import { popupConfig } from "../utils/utils";
import successIcon from '../images/success_icon.svg';
import failureIcon from '../images/failure_icon.svg';

export default function InfoTooltip(props) {
  return (
    <div className={`popup popup_type_info-tooltip popup_transparent_slightly ${props.isOpen ? popupConfig.popupOpenedClass : ''}`}>
        <div className="page__container page__container_type_fixed-size-adaptive">
          <button className="popup__container-close-btn transparent transparent_amount_more" type="button" aria-label="Кнопка закрытия попапа"
            onClick={props.onClose}></button>

          {props.successful ? (
            <>
              <img src={successIcon} className="popup__confirm-icon" alt="иконка успеха" />
              <p className="popup__confirm-text">Вы успешно зарегистрировались!</p>
            </>
          ) : (
            <>
              <img src={failureIcon} className="popup__confirm-icon" alt="иконка ошибки" />
              <p className="popup__confirm-text">Что-то пошло не так! Попробуйте ещё раз.</p>
            </>
          )}
        </div>
    </div>
  );
}
