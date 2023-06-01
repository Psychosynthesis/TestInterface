import { Icon, Button, List } from 'semantic-ui-react';
import './style.css';

export interface Props {
  name: string;
}

const User: React.FC<Props> = props => {
  const { name } = props;
  return (
    <List.Item horizontal className="user-item">
        <Icon name='user' />
        <List.Content>{name}</List.Content>
        <List.Content><Button color='green' circular compact>+</Button></List.Content>
        <List.Content><Button color='red' circular compact>-</Button></List.Content>
    </List.Item>
  );
}

export default User;
