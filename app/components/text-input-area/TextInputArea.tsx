import { FormControl, Text, TextArea, VStack } from 'native-base';
import React from 'react';
import type { TextInputAreaTypes } from './TextInputAreaTypes';

/**
 *
 * @returns TextInputArea Component
 */
const TextInputArea = ({ label, ...rest }: TextInputAreaTypes) => (
  <FormControl {...rest}>
    <VStack space={'8px'}>
      {label && (
        <Text fontWeight={500} fontSize={[20, 25]}>
          {label}
        </Text>
      )}
      <TextArea
        autoCompleteType
        _hover={
          {
            // borderColor: 'color.primary'
          }
        }
        h={'100px'}
        _focus={{
          borderWidth: '1px'
          // backgroundColor: 'color.white'
        }}
        // focusOutlineColor={'color.primary'}
        {...rest}
      />
    </VStack>
    <FormControl.ErrorMessage>{rest?.isInvalid ?? ''}</FormControl.ErrorMessage>
  </FormControl>
);

export default TextInputArea;
