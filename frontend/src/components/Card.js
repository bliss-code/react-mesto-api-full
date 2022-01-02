import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card(props) {

  //subscribe to context
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    props.onCardClick(props.card);
  }

  const isLiked = props.card.likes.some(like => like._id === currentUser._id);
  const isMyCard = props.card.owner._id === currentUser._id;

  const handleLikeClick = () => {
    props.onCardLike(props.card);
  }

  const handleDeleteClick = () => {
    props.onCardDelete(props.card);
  }

  return (
    <li className="place">
      {isMyCard ? <button className="place__remove-btn transparent transparent_amount_more" type="button"
                   aria-label="Кнопка удаления карточки места" onClick={handleDeleteClick}></button> : ''}
      <img src={props.card.link} alt={`Фото ${props.card.name}`} className="place__photo flip" onClick={handleCardClick}/>
      <h2 className="place__name">{props.card.name}</h2>
      <button className={`place__like-btn ${isLiked ? 'place__like-btn_selected' : ''} transparent transparent_amount_less`} type="button"
       aria-label="Кнопка лайк сердечко карточки места" onClick={handleLikeClick}></button>
      <p className="place__number-of-likes">{props.card.likes.length}</p>
    </li>
  );
}
