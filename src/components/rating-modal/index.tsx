import { Button, Modal } from 'semantic-ui-react';
import * as Const from '../constants';
import { UserType } from '../types';

import './style.css';

interface Props {
  isOpen: boolean;
  user?: UserType;
  toggleCallback: (modalOpen: boolean) => void;
  modalAction: () => void;
}

const RatingModal: React.FC<Props> = props => {
  const { isOpen, user, toggleCallback, modalAction } = props;
  const onClose = () => toggleCallback(false);
  let text = '';
  if (!user) return;
  if (user.rating === Const.RATING_LIMITS.MAX) text = `Нужно вознаградить ${user.username}. Сделать это?`;
  if (user.rating === Const.RATING_LIMITS.MIN) text = `Пора забанить ${user.username}. Сделать это?`;

  return (
    <Modal open={isOpen} className="rating-modal">
      <Modal.Header>What to do with the user</Modal.Header>
      <Modal.Content>{text}</Modal.Content>
      <Modal.Actions>
        <Button
          content="Да"
          labelPosition="right"
          icon='checkmark'
          onClick={modalAction}
          positive
        />
        <Button color='black' onClick={onClose}>Нет</Button>
      </Modal.Actions>
    </Modal>
  );
}

export default RatingModal;
