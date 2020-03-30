import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// actions
import signup from '../state/actions/index';
// styles
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Text,
  InputGroup,
  InputRightElement,
  Stack
} from '@chakra-ui/core';

const Signup = ({ signup, isLoading, history }) => {
  const { handleSubmit, errors, register, formState } = useForm();

  const submitForm = creds => {
    signup(creds).then(() => {
      history.push('/dashboard');
    });
  };

  return (
    <Flex h='100vh' align='center' justify='center' bg='#79C3D8'>
      <form onSubmit={handleSubmit(submitForm)}>
        <Flex
          flexDir='column'
          background='#FDFDFF'
          justify='center'
        >
          <Flex
            as='h2'
            fontSize='32px'
            justify='center'
          >
            Welcome back!
					</Flex>

          <Flex wrap='wrap' w='411px%' justify='center'>
            <FormLabel>Villager Name</FormLabel>
            <Input
              mb='30px'
              type='text'
              name='villager_name'
              placeholder='Tater'
              autoCapitalize='none'
              ref={register}
            />
            <FormLabel>Island Name</FormLabel>
            <Input
              mb='30px'
              type='text'
              name='island_name'
              placeholder='Memoria'
              autoCapitalize='none'
              ref={register}
            />
            <FormLabel>Password</FormLabel>
            <Input
              mb='30px'
              type={'text'}
              name='password'
              placeholder='********'
              autoCapitalize='none'
              ref={register}
            />
            <Flex w='100%' justify='center'>
              <Button
                mb='30px'
                border='none'
                h='58px'
                w='404px'
                my='2%'
                size='lg'
                color='white'
                backgroundColor='#344CD0'
                isLoading={formState.isSubmitting}
                type='submit'
                data-cy='registerSubmit'
              >
                Sign up
								</Button>
            </Flex>
            <Text>
              Already have an account?{' '}
              <Link
                to='/'
                color='black'
                fontWeight='bold'
                underline='none'
              >
                Login here!
									</Link>
            </Text>
          </Flex>
        </Flex>
      </form>
    </Flex>
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading
  };
};

export default connect(mapStateToProps, signup)(Signup);