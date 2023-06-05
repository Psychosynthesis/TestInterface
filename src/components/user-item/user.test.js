import { render, screen } from '@testing-library/react';
import { StoreContext } from '../index';
import UserItem from './index';

const testUser = { username: 'username', uid: 'dfgdfg-fgjhfj', rating: 0, banned: false };

const testStore = {
  toggleModal: () => {},
  setControledUser: () => {},
  resetUser: () => {},
  banUser: () => {}
};

test('Test single user item render', () => {
  render(
    <StoreContext.Provider value={testStore}>
      <UserItem user={testUser} />
    </StoreContext.Provider>
  );
  const userItem = screen.getByRole('listitem');
  expect(userItem).toBeInTheDocument();
});

test('Rated user rating displayed', () => {
  render(
    <StoreContext.Provider value={testStore}>
      <UserItem user={testUser} showRating={true} />
    </StoreContext.Provider>
  );
  const rating = screen.getByTestId('user-rating-count');
  expect(rating).toBeInTheDocument();
});
