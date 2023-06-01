import { List } from 'semantic-ui-react';
import User from './user';

const AllUsersList: React.FC = () => {
  return (
    <List divided verticalAlign='middle' >
      <User name="Лена" />
      <User name="Вася" />
      <User name="Петя" />
    </List>
  );
}

export default AllUsersList;
