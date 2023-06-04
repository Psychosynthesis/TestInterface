import { render, screen } from '@testing-library/react';
import UserItem from './index';

const testUser = { username: 'username', uid: 'dfgdfg-fgjhfj', rating: 0, banned: false };

test('Test single user item render', () => {
  render(<UserItem user={testUser} />);
  const userItem = screen.getByRole('listitem');
  expect(userItem).toBeInTheDocument();
});

test('Rated user rating displayed', () => {
  render(<UserItem user={testUser} showRating={true} />);
  const rating = screen.getByTestId('user-rating-count');
  expect(rating).toBeInTheDocument();
});
