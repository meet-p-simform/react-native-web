import { Modal, type IModalProps } from 'native-base';
import React, { type FC } from 'react';
import type { CustomModalTypes } from './CustomModalTypes';

/**
 *
 * @returns Empty Modal Container
 */
const CustomModal: FC<CustomModalTypes & IModalProps> = ({
  isOpen = false,
  onClose,
  children,
  ...rest
}) => {
  return (
    <Modal
      isOpen={isOpen}
      closeOnOverlayClick={false}
      _backdrop={{ bg: 'black', opacity: 0.7 }}
      size={'100%'}
      justifyContent={['flex-start', 'center']}
      alignItems={'center'}
      onClose={onClose}
      {...rest}
    >
      {children}
    </Modal>
  );
};
export default CustomModal;
