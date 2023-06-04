import { render, screen } from '@testing-library/react';
import AllUsersList from './index';

const testUsers = [{ username: 'username', uid: 'dfgdfg-fgjhfj', rating: 0, banned: false }];

test('All users has next button', () => {
  render(<AllUsersList users={testUsers} />);
  const next = screen.getByTestId('next-button');
  expect(next).toBeInTheDocument();
});

test('All users has update button', () => {
  render(<AllUsersList users={testUsers} />);
  const update = screen.getByTestId('update-button');
  expect(update).toBeInTheDocument();
});
