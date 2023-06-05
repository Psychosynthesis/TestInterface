import { createContext, useState, useEffect } from "react";
import { Header, Loader } from 'semantic-ui-react';
import AllUsersList from './all-users';
import RatedUsersList from './rated-users';
import RatingModal from './rating-modal';
import * as Const from './constants';
import { EventTag, UserType } from './types';
import { Logger } from './utils';

import './style.css';

// Просто для удобства, чтоб не прокидывать лишние колбэки
export const StoreContext = createContext(null);

// В реальном проекте я бы, конечно, вынес получение данных куда-нибудь в другое
// место, например в thunks или в sagas (смотря какой стек у проекта), ну и взял
// бы какой-нибудь фреймворк типа Axios, здесь же сделал так, чтобы не тратить время
const fetchData = async (updateUsersCallback: Function, getNext: boolean) => {
  const url = getNext ? Const.API_URL + '&page=N' : Const.API_URL;
  const response = await fetch(url);
  const json: UserType[] = await response.json();
  updateUsersCallback(json);
}

const UsersList: React.FC = () => {
  const [allUsers, setUsers] = useState<UserType[]>([]);
  const [ratedUsers, setRated] = useState<UserType[]>([]);
  const [bannedUsers, setBanned] = useState<UserType[]>([]);
  const [modalVisible, toggleModal] = useState<boolean>(false);
  const [userToControl, setControledUser] = useState<UserType>();
  const fetchAndSet = () => fetchData(setUsers, false);
  const getNextAndSet = () => fetchData((fetched: UserType[]) => setUsers([...allUsers, ...fetched]), false);

  // Если было бы больше времени на продумывание, наверно тоже вытащил бы это куда-то в отдельное место
  // Очевидно, с редаксом или мобиксом все эти функции были бы в редьюсерах
  const changeRating = (uid: string, newRating: number) => {
    let userToUpdate = ratedUsers.find(user => user.uid === uid);
    if (!userToUpdate) {
      userToUpdate = allUsers.find(user => user.uid === uid);
      userToUpdate.rating = newRating;
      setRated([...ratedUsers, userToUpdate]); // Добавляем в правый список
      setUsers(allUsers.filter(user => user.uid !== uid)); // Удаляем из левого
      Logger(EventTag.NEW_RATED, userToUpdate.username);
    } else {
      // Тут наверно можно почище, первое что в голову пришло
      const newRatedUsers = ratedUsers.filter(user => {
        if (user.uid === uid) {
          userToUpdate.rating = newRating;
          return userToUpdate;
        } else {
          return user;
        }
      });
      Logger(EventTag.RATING_CHANGES, userToUpdate.username);
      setRated(newRatedUsers);
    }
  }

  const resetUser = (uid: string) => {
    const userToReset = ratedUsers.find(user => user.uid === uid);
    setUsers([...allUsers, userToReset]); // добавляем в левый
    setRated(ratedUsers.filter(user => user.uid !== uid)); // Удаляем из правого
    toggleModal(false);
    Logger(EventTag.RESET, userToReset.username);
  }

  const banUser = (uid: string) => {
    const userToBan = ratedUsers.find(user => user.uid === uid);
    setBanned([...bannedUsers, userToBan]); // добавляем в бан
    setRated(ratedUsers.filter(user => user.uid !== uid)); // Удаляем из рейтинга
    toggleModal(false);
    Logger(EventTag.BANNED, userToBan.username);
  }

  const showList = Boolean(allUsers.length) || Boolean(ratedUsers.length);

  const commonStore = {
    toggleModal,
    setControledUser,
    resetUser,
    banUser
  };

  useEffect(() => {
    fetchAndSet();
  }, []);

  return (
    <StoreContext.Provider value={commonStore}>
      <div className="userslist">
        <Header as='h2' className="userslist-header">
          Users rating list
        </Header>
        <div className="lists-panel">
          <div className="all-users"  data-testid="all-users-list">
             {showList ?
               <AllUsersList
                users={allUsers}
                ratingChangeCallback={changeRating}
                updateCallback={fetchAndSet}
                getNextCallback={getNextAndSet}
               /> :
               <Loader active />
             }
          </div>
          <div className="rated-users" data-testid="rated-users-list">
            <RatedUsersList
              ratedUsers={ratedUsers}
              bannedUsers={bannedUsers}
              ratingChangeCallback={changeRating}
            />
          </div>
        </div>
        <RatingModal
          user={userToControl}
          isOpen={modalVisible}
        />
      </div>
    </StoreContext.Provider>
  );
}

export default UsersList;
