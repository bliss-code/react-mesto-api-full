import { useEffect, useState, useContext } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { api }  from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import { AuthContext } from "../contexts/AuthContext";

export default function App() {

  const emptyCard = {link: '', name: '', likes: [], _id: '', createdAt: '', owner: ''};

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [isPopupSaving, setIsPopupSaving] = useState(false);
  const [selectedCard, setSelectedCard] = useState(emptyCard);
  const [cardToDelete, setCardToDelete] = useState(emptyCard);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isInfoTooltipSuccessful, setIsInfoTooltipSuccessful] = useState(false);

  //context state variables
  const [currentUser, setCurrentUser] = useState({name: '', about: '', avatar: '', _id: '', cohort: ''});
  const [cards, setCards] = useState([]);
  const {isLoggedIn} = useContext(AuthContext);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard(emptyCard);
    setCardToDelete(emptyCard);
    setIsInfoTooltipOpen(false);
  };

  useEffect(() => {
    const closePopupOnEsc = (evt) => {
      if (evt.key === 'Escape')
        closeAllPopups();
    };

    document.addEventListener('keydown', closePopupOnEsc);

    return () => {document.removeEventListener('keydown', closePopupOnEsc)};
  }, []);

  useEffect(() => {
    //get api data on mount in parallel and put it in react state variables
    if (isLoggedIn) {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([info, cards]) => {
      setCurrentUser(info.data);
      setCards(cards.reverse());
    })
    .catch(err => {console.log(err)});
    }
  }, [isLoggedIn]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards(state => state.map(c => c._id === card._id ? newCard : c));
    })
    .catch(err => {console.log(err)});
  }

  function handleCardDelete(card) {
    setIsConfirmDeletePopupOpen(true);
    setCardToDelete(card);
  }

  const handleUserUpdate = ({name, about}) => {
    setIsPopupSaving(true);
    api.setUserInfo({name, about})
    .then(info => {
      setCurrentUser(info.data);
      closeAllPopups();
    })
    .catch(err => {console.log(err)})
    .finally(() => {setIsPopupSaving(false)});
  };

  const handleAvatarUpdate = ({avatar}) => {
    setIsPopupSaving(true);
    api.setUserAvatar(avatar)
    .then(res => {
      const userInfo = {...currentUser};
      userInfo.avatar = avatar;
      setCurrentUser(userInfo);
      closeAllPopups();
    })
    .catch(err => {console.log(err)})
    .finally(() => {setIsPopupSaving(false)});
  };

  const handleAddPlaceSubmit = (evt, {name, link}) => {
    evt.preventDefault();
    setIsPopupSaving(true);
    api.addCard({name, link})
    .then(card => {
      setCards(cards => [card, ...cards]);
      closeAllPopups();
    })
    .catch(err => {console.log(err)})
    .finally(() => {setIsPopupSaving(false)});
  };

  const handleConfirmDeleteSubmit = (evt) => {
    evt.preventDefault();
    setIsPopupSaving(true);
    api.deleteCard(cardToDelete._id)
    .then(res => {
      setCards(cards => cards.filter(c => c._id !== cardToDelete._id));
      closeAllPopups();
    })
    .catch(err => console.log(err))
    .finally(() => {setIsPopupSaving(false)});
  };

  //auth logic

  const history = useHistory();
  const { setupIsLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const mail = localStorage.getItem('email');
    if (mail)
      setEmail(mail);
  }, [setEmail]);

  const onLogin = (email, password) => {
    api.signIn({ email, password })
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email);
        api.makeAuthHeaders(data.token);
        setEmail(email);
        setupIsLoggedIn(true);
        history.push('/');
      }
    })
    .catch(err => {
      setIsInfoTooltipSuccessful(false);
      setIsInfoTooltipOpen(true);
    });
  };

  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setupIsLoggedIn(false);
  };

  const onRegister = (email, password) => {
    api.register({email, password})
    .then(res => {
      setIsInfoTooltipSuccessful(true);
      history.push('/sign-in');
    })
    .catch(err => {
      setIsInfoTooltipSuccessful(false);
    })
    .finally(res => {
      setIsInfoTooltipOpen(true);
    });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page body__element">
        <Header onLogout={onLogout} email={email} />
        <Switch>
          <ProtectedRoute exact path="/" render={() => (
            <>
              <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
              <Footer />
              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUserUpdate} isSaving={isPopupSaving} />
              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isSaving={isPopupSaving} />
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleAvatarUpdate} isSaving={isPopupSaving} />
              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
              <ConfirmDeletePopup isOpen={isConfirmDeletePopupOpen} onClose={closeAllPopups} onSubmit={handleConfirmDeleteSubmit} isSaving={isPopupSaving} />
            </>
          )} />
          <Route path="/sign-up" render={ () => (
              <Register onRegister={onRegister} />
          )} />
          <Route path="/sign-in" render={() => (
              <Login onLogin={onLogin} />
          )} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} successful={isInfoTooltipSuccessful} />
      </div>
    </CurrentUserContext.Provider>
  );
}
