import { useFormik } from 'formik';
import { FlatList, HStack, Image, Pressable, Stack, Text, VStack } from 'native-base';
import React, { createRef, useImperativeHandle, useState, type FC } from 'react';
import { Icons } from '../../assets';
import { CustomModal, CustomTextInput } from '../../components';
import { ROUTES } from '../../constants';
import { useApplicationDimension } from '../../hooks';
import { useAppDispatch, useAppSelector, addTodo, removeTodo } from '../../redux';
import { Colors } from '../../theme';
import { navigateWithParam } from '../../utils';

// Reference for TodoModal
const todoModalRef = createRef<{
  show: () => void;
  hide: () => void;
}>();

/**
 * Show TodoModal using ref.
 */
export const showTodoModal = () => {
  todoModalRef.current?.show();
};
/**
 * Hide TodoModal using ref.
 */
export const hideTodoModal = () => {
  todoModalRef.current?.hide();
};

/**
 *
 * @returns HomeScreen.
 */
const HomeScreen: FC = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const [todoId, setTodoId] = useState<number>(1);
  const todos = useAppSelector((state) => state.todos);

  const initialValues = {
    todoTitle: '',
    todoDescription: '',
    id: 0
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, { resetForm }) => {
      const newTodo = {
        id: todoId,
        todoTitle: values.todoTitle,
        todoDescription: values.todoDescription
      };
      dispatch(addTodo(newTodo));
      setVisible(false);
      setTodoId(todoId + 1);
      resetForm();
    }
  });

  const data = [{}];
  const newData = [...todos, ...data];

  useImperativeHandle(todoModalRef, () => ({
    show: () => {
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
    }
  }));

  const { isMediumScreen, width } = useApplicationDimension();

  return (
    <Stack flex={1}>
      <HStack
        bgColor={Colors.primary}
        p={[8, 10]}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Text color={Colors.black} fontSize={50} fontWeight={'bold'}>
          Todo List
        </Text>
      </HStack>
      <Stack p={[2, 10]} flex={1} bg={'#ffffff'}>
        <FlatList
          //@ts-ignore
          data={newData}
          numColumns={5}
          renderItem={({
            item,
            index
          }: {
            item: { id: number; todoTitle: string; todoDescription: string };
            index: number;
          }) => {
            return item?.id ? (
              <Stack m={2} flex={[1, null]}>
                <VStack
                  bgColor={index % 2 === 0 ? '#99ffbb' : '#ffbb99'}
                  h={[150, 200]}
                  w={[null, (width - 0.15 * width - 34) / 4.8]}
                  borderRadius={10}
                >
                  <VStack flex={1} py={2}>
                    <Text fontSize={'lg'} fontWeight={'bold'} px={2}>
                      {item.todoTitle}
                    </Text>
                    <Text px={2} fontSize={'md'} fontWeight={'medium'}>
                      {item.todoDescription}
                    </Text>
                  </VStack>
                  <Pressable
                    position={'absolute'}
                    p={2}
                    flex={1}
                    right={0}
                    bottom={0}
                    _pressed={{ opacity: 0.5 }}
                    onPress={() => dispatch(removeTodo(item?.id))}
                  >
                    <Image source={Icons.close} height={'20px'} width={'20px'} alt={'delete'} />
                  </Pressable>
                </VStack>
              </Stack>
            ) : (
              <Pressable _pressed={{ opacity: 0.5 }} onPress={() => setVisible(true)}>
                <Stack
                  bgColor={Colors.gray}
                  h={[150, 200]}
                  w={[160, (width - 0.15 * width - 34) / 4.8]}
                  justifyContent={'center'}
                  alignItems={'center'}
                  borderRadius={10}
                  m={2}
                >
                  <Image alt="plus" source={Icons.plus} h={10} w={10} />
                </Stack>
              </Pressable>
            );
          }}
        />
      </Stack>
      <CustomModal
        alignItems={'center'}
        justifyContent={'center'}
        isOpen={visible}
        onClose={() => setVisible(false)}
      >
        <Stack alignSelf={'center'} borderRadius={10} width={['90%', '80%']} bg={Colors.white}>
          <Pressable p={4} onPress={() => setVisible(false)}>
            <Image alt="close" source={Icons.close} h={6} w={6} alignSelf={'flex-end'} />
          </Pressable>
          <CustomTextInput
            p={4}
            label="Title"
            placeholder={'Enter Title'}
            value={formik.values.todoTitle}
            // error={getErrorMessage(formik, 'subTaskName')}
            onChangeText={formik.handleChange('todoTitle')}
          />
          <CustomTextInput
            p={4}
            label="Description"
            placeholder={'Enter Description'}
            value={formik.values.todoDescription}
            // error={getErrorMessage(formik, 'subTaskName')}
            onChangeText={formik.handleChange('todoDescription')}
          />
          <Pressable
            p={4}
            alignItems={'center'}
            _pressed={{ opacity: 0.5 }}
            // onPress={() => navigateWithParam(ROUTES.Details)}
            onPress={() => formik.handleSubmit()}
          >
            <Text color={'blue.400'} fontSize={20}>
              Add
            </Text>
          </Pressable>
        </Stack>
      </CustomModal>
    </Stack>
  );
};

export default HomeScreen;
