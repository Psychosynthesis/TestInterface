import { useContext } from "react";
import { Button, Modal } from 'semantic-ui-react';
import { StoreContext } from '../index';
import { UserType } from '../types';
import * as Const from '../constants';

import './style.css';

interface Props {
  isOpen: boolean;
  user?: UserType;
}

const RatingModal: React.FC<Props> = props => {
  const { isOpen, user } = props;
  const { resetUser, banUser, toggleModal } = useContext(StoreContext);
  const onClose = () => toggleModal(false);
  let text = '';
  let onAction = () => {};
  if (typeof(user) === 'undefined' ) return;
  if (user.rating === Const.RATING_LIMITS.MAX) {
    text = `Нужно вознаградить ${user.username}. Сделать это?`;
    onAction = () => resetUser(user.uid);
  }
  if (user.rating === Const.RATING_LIMITS.MIN) {
    text = `Пора забанить ${user.username}. Сделать это?`;
    onAction = () => banUser(user.uid);
  }

  return (
    <Modal open={isOpen} className="rating-modal">
      <Modal.Header>What to do with the user</Modal.Header>
      <Modal.Content>{text}</Modal.Content>
      <Modal.Actions>
        <Button content="Да" labelPosition="right" icon='checkmark' onClick={onAction} positive />
        <Button content="Нет" color='black' onClick={onClose} />
      </Modal.Actions>
    </Modal>
  );
}

export default RatingModal;
