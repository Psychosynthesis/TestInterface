import { useState, useEffect } from "react";
import { Header, Loader } from 'semantic-ui-react';
import AllUsersList from './all-users';
import RatedUsersList from './rated-users';
import * as Const from './constants';
import { UserType } from './types';

import './style.css';

// В реальном проекте я бы, конечно, вынес получение данных куда-нибудь в другое
// место, например в thunks или в sagas (смотря какой стек у проекта).
// Здесь сделал так, чтобы не тратить время
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
  const fetchAndSet = () => fetchData(setUsers, false);
  const getNextAndSet = () => fetchData(
    (fetched: UserType[]) => setUsers([...allUsers, ...fetched]),
    false
  );

  const showList = Boolean(allUsers.length) || Boolean(ratedUsers.length);

  const changeRating = (uid: string, direction: boolean) => {
    // direction в данном контексте - направление в какую сторону менять + или -
    let userToUpdate = ratedUsers.find(user => user.uid === uid);
    if (!userToUpdate) {
      userToUpdate = allUsers.find(user => user.uid === uid);
      userToUpdate.rating = direction ? 1 : -1;
      setRated([...ratedUsers, userToUpdate]); // Добавляем в правый список
      setUsers(allUsers.filter(user => user.uid !== uid)); // Удаляем из левого

      console.log('New user was rated:', userToUpdate.username);
    } else {
      const newRatedUsers = ratedUsers.filter(user => {
        if (user.uid === uid) {
          if (direction) {
            userToUpdate.rating++;
          } else {
            userToUpdate.rating--;
          }
          return userToUpdate;
        } else {
          return user;
        }
      });

      setRated(newRatedUsers);
    }
  }

  const resetUser = (uid: string) => {
    const userToReset = ratedUsers.find(user => user.uid === uid);
    setRated(ratedUsers.filter(user => user.uid !== uid)); // Удаляем из правого
    setUsers([...allUsers, userToReset]); // добавляем в левый
  }

  useEffect(() => {
    fetchAndSet();
  }, []);

  return (
    <div className="userslist">
      <Header as='h2' className="userslist-header">
        Users rating list
      </Header>
      <div className="lists-panel">
        <div className="all-users">
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
        <div className="rated-users">
          <RatedUsersList
            ratedUsers={ratedUsers}
            bannedUsers={[]}
            ratingChangeCallback={changeRating}
            resetUserCallback={resetUser}
          />
        </div>
      </div>
    </div>
  );
}

export default UsersList;
