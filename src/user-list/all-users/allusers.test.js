import { render, screen } from '@testing-library/react';
import { StoreContext } from '../index';
import AllUsersList from './index';

const testUsers = [{ username: 'username', uid: 'dfgdfg-fgjhfj', rating: 0, banned: false }];

const testStore = {
  toggleModal: () => {},
  setControledUser: () => {},
  resetUser: () => {},
  banUser: () => {}
};

test('All users has next button', () => {
  render(
    <StoreContext.Provider value={testStore}>
      <AllUsersList users={testUsers} />
    </StoreContext.Provider>
  );
  const next = screen.getByTestId('next-button');
  expect(next).toBeInTheDocument();
});

test('All users has update button', () => {
  render(
    <StoreContext.Provider value={testStore}>
      <AllUsersList users={testUsers} />
    </StoreContext.Provider>
  );
  const update = screen.getByTestId('update-button');
  expect(update).toBeInTheDocument();
});
