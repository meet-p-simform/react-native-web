import { FormControl, Input, Text, VStack } from 'native-base';
import React from 'react';
import { Fonts } from '../../assets';
import { Colors } from '../../theme';
import type { CustomTextInputType } from './CustomTextInputTypes';

/**
 *
 * @returns CustomTextInput Component
 */
const CustomTextInput = ({ label, labelProps, ...rest }: CustomTextInputType) => {
  return (
    <FormControl {...rest}>
      <VStack space={'5px'}>
        {label && (
          <Text fontWeight={500} fontSize={[20, 25]} fontFamily={Fonts.regular} {...labelProps}>
            {label}
          </Text>
        )}
        <Input
          minH={'50px'}
          _hover={
            {
              // borderColor: 'color.primary'
            }
          }
          _focus={{
            borderWidth: '1px'
            // backgroundColor: 'color.white',
            // outlineColor: 'color.primary'
          }}
          // focusOutlineColor={'color.primary'}
          bg={Colors.white}
          {...rest}
        />
      </VStack>
      <FormControl.ErrorMessage>{rest?.isInvalid ?? ''}</FormControl.ErrorMessage>
    </FormControl>
  );
};

export default CustomTextInput;
