import { popupConfig } from '../utils/utils';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup(props) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm name={popupConfig.profileEditPopupAndFormName} formTitle="Редактировать профиль" submitButtonText="Сохранить" isOpen={props.isOpen}
      onClose={props.onClose} onSubmit={handleSubmit} isSaving={props.isSaving} >
      <input id="popup__profile-name-input" type="text" name="profileName"
        className="page__form-text" placeholder="Жак-Ив Кусто" minLength="2" maxLength="40" required="required" value={name} onChange={handleNameChange}/>
      <span className="popup__profile-name-input-error page__form-text-error">Вы пропустили это поле.</span>
      <input id="popup__profile-description-input" type="text" name="profileDescription"
        className="page__form-text" placeholder="Исследователь океана" minLength="2" maxLength="200" required="required" value={description}
        onChange={handleDescriptionChange} />
      <span className="popup__profile-description-input-error page__form-text-error">Вы пропустили это поле.</span>
    </PopupWithForm>
  );
}
