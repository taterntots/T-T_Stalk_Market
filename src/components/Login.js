import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// actions
import login from '../state/actions/index';
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

const Login = ({ login, isLoading, history }) => {
  const { handleSubmit, errors, register, formState } = useForm();

  const submitForm = creds => {
    login(creds).then(() => {
      history.push('/dashboard');
    })
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
              placeholder='Stitches'
              autoCapitalize='none'
            />
            <FormLabel>Password</FormLabel>
            <Input
              mb='30px'
              type={'text'}
              name='password'
              placeholder='********'
              autoCapitalize='none'
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
                Login
								</Button>
            </Flex>
            <Text>
              Don't have an account?{' '}
              <Link
                to='/signup'
                color='black'
                fontWeight='bold'
                underline='none'
              >
                Sign up here!
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

export default connect(mapStateToProps, login)(Login);