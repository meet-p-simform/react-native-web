import type { IInputProps, ITextProps } from 'native-base';

export type CustomTextInputType = {
  label?: string;
  labelProps?: ITextProps;
} & IInputProps;
