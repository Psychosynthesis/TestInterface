import { useState, useEffect } from "react";
import { Header, Loader } from 'semantic-ui-react';
import AllUsersList from './all-users';
import RatedUsersList from './rated-users';
import RatingModal from './rating-modal';
import * as Const from './constants';
import { UserType } from './types';

import './style.css';

// В реальном проекте я бы, конечно, вынес получение данных куда-нибудь в другое
// место, например в thunks или в sagas (смотря какой стек у проекта), ну и взял
// бы какой-нибудь фреймворк типа Axios, здесь же сделал так, чтобы не тратить время
const fetchData = async (updateUsersCallback: Function, getNext: boolean) => {
  const url = getNext ? Const.API_URL + '&page=N' : Const.API_URL;
  const response = await fetch(url);
  const json: UserType[] = await response.json();
  console.log("Users received: ", json);
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

  const modalAction = () => {
    if (userToControl.rating === Const.RATING_LIMITS.MAX) { resetUser(userToControl.uid); }
    if (userToControl.rating === Const.RATING_LIMITS.MIN) { banUser(userToControl.uid); }
    toggleModal(false);
  };

  const changeRating = (uid: string, newRating: number) => {
    let userToUpdate = ratedUsers.find(user => user.uid === uid);
    if (!userToUpdate) {
      userToUpdate = allUsers.find(user => user.uid === uid);
      userToUpdate.rating = newRating;
      setRated([...ratedUsers, userToUpdate]); // Добавляем в правый список
      setUsers(allUsers.filter(user => user.uid !== uid)); // Удаляем из левого
      console.log('New user was rated:', userToUpdate.username);
    } else {
      const newRatedUsers = ratedUsers.filter(user => {
        if (user.uid === uid) {
          userToUpdate.rating = newRating;
          return userToUpdate;
        } else {
          return user;
        }
      });

      if (userToUpdate.rating === Const.RATING_LIMITS.MIN) {
        setControledUser(userToUpdate);
        toggleModal(true);
      }

      if (userToUpdate.rating === Const.RATING_LIMITS.MAX) {
        setControledUser(userToUpdate);
        toggleModal(true);
      }

      setRated(newRatedUsers);
    }
  }

  const resetUser = (uid: string) => {
    const userToReset = ratedUsers.find(user => user.uid === uid);
    setRated(ratedUsers.filter(user => user.uid !== uid)); // Удаляем из правого
    setUsers([...allUsers, userToReset]); // добавляем в левый
  }

  const banUser = (uid: string) => {
    const userToBan = ratedUsers.find(user => user.uid === uid);
    setRated(ratedUsers.filter(user => user.uid !== uid)); // Удаляем из рейтинга
    setBanned([...bannedUsers, userToBan]); // добавляем в бан
  }

  const showList = Boolean(allUsers.length) || Boolean(ratedUsers.length);

  useEffect(() => {
    fetchAndSet();
  }, []);

  return (
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
            resetUserCallback={resetUser}
          />
        </div>
      </div>
      <RatingModal
        user={userToControl}
        isOpen={modalVisible}
        toggleCallback={toggleModal}
        modalAction={modalAction}
      />
    </div>
  );
}

export default UsersList;
