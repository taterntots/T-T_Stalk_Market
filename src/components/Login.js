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
    <Flex h='100vh' align='center' justify='center' bg='#79C3D8' >
      <form onSubmit={handleSubmit(submitForm)}>
        <Flex
          flexDir='column'
          background='#FDFDFF'
          justify='center'
          borderRadius='12px'
          w='450px'
          p='5%'
        >
          <Flex
            as='h2'
            fontSize='32px'
            justify='center'
          >
            Welcome back!
					</Flex>

          <FormLabel mt='3%'>Villager Name</FormLabel>
          <Input
            h='58px'
            type='text'
            name='villager_name'
            placeholder='Stitches'
            autoCapitalize='none'
            ref={register}
          />

          <FormLabel mt='3%'>Password</FormLabel>
          <Input
            h='58px'
            type='text'
            name='password'
            placeholder='********'
            autoCapitalize='none'
            ref={register}
          />

          <Button
            h='58px'
            mt='8%'
            border='none'
            size='lg'
            color='white'
            backgroundColor='#AFE8D0'
            isLoading={formState.isSubmitting}
            type='submit'
            data-cy='registerSubmit'
          >
            Login
					</Button>

          <Text textAlign='center' mt='6%'>
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