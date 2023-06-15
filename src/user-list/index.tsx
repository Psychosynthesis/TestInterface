import { createContext, useState, useEffect, useMemo } from "react";
import { Header, Loader } from 'semantic-ui-react';
import AllUsersList from './all-users';
import RatedUsersList from './rated-users';
import RatingModal from './rating-modal';
import { fetchData } from './api';
import { EventTag, UserType, StoreType } from './types';
import { Logger, updateRating } from './utils';

import './style.css';

// Просто для удобства, чтоб не прокидывать лишние колбэки
export const StoreContext = createContext(null);

const UsersList: React.FC = () => {
  const [allUsers, setUsers] = useState<UserType[]>([]);
  const [modalVisible, toggleModal] = useState<boolean>(false);
  const [userToControl, setControledUser] = useState<UserType>();
  const [ratedIds, setRatedIds] = useState<string[]>([]);
  const [bannedIds, setBannedIds] = useState<string[]>([]);
  const getNextAndSet = () => fetchData((fetched: UserType[]) => setUsers([...allUsers, ...fetched]), true);
  const fetchAndSet = () => fetchData((fetched: UserType[]) => {
      // Приходится отдельно сохранять ранее отрейтингованных пользователей,
      // т.к. в стейте мы храним лишь айдишники. Можно было бы вместо этого
      // хранить массивс инстансами пользователей, но тогда пришлось бы хранить
      // больще данных в стейте, а также лишний раз перебирать массивы при рейтинговании
      const oldRated = allUsers.filter(user => ratedIds.includes(user.uid));
      const oldBanned = allUsers.filter(user => bannedIds.includes(user.uid));
      setUsers([...oldRated, ...oldBanned, ...fetched]);
    },
    false
  );


  const changeRating = (uid: string, newRating: number) => {
    setUsers(updateRating(uid, newRating, allUsers));
    if (!ratedIds.includes(uid)) {
      setRatedIds([...ratedIds, uid]);
      Logger(EventTag.NEW_RATED, uid);
    } else {
      Logger(EventTag.RATING_CHANGES, uid);
    }
  }

  const resetUser = (uid: string) => {
    setRatedIds(ratedIds.filter(id => id !== uid));
    toggleModal(false);
    Logger(EventTag.RESET, uid);
  }

  const banUser = (uid: string) => {
    setBannedIds([...bannedIds, uid]);
    setRatedIds(ratedIds.filter(id => id !== uid));
    toggleModal(false);
    Logger(EventTag.BANNED, uid);
  }

  const showList = Boolean(allUsers.length) || Boolean(ratedIds.length);

  const commonStore: StoreType = {
    toggleModal,
    setControledUser,
    changeRating,
    resetUser,
    banUser
  };

  const bannedUsers = useMemo(
    () => allUsers.filter(user => bannedIds.includes(user.uid)),
    [allUsers, bannedIds]
  );

  const ratedUsers = useMemo(
    () => allUsers.filter(user => ratedIds.includes(user.uid)),
    [allUsers, ratedIds]
  );

  const displayedUsers = useMemo(
    () => allUsers.filter(user => !bannedIds.includes(user.uid) && !ratedIds.includes(user.uid)),
    [allUsers, ratedIds, bannedIds]
  );

  // eslint-disable-next-line
  useEffect(() => { fetchAndSet() }, []);

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
                users={displayedUsers}
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
