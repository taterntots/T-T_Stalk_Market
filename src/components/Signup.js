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
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const submitForm = creds => {
    signup(creds).then(() => {
      history.push('/dashboard');
    });
  };

  return (
    <Flex h='100vh'
      align='center'
      // justify='center'
      pl='25%'
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundImage: `url(${require('../images/AC-island-nintendo.jpg')})`
      }}
    >
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
          <FormLabel mt='3%'>Island Name</FormLabel>
          <Input
            h='58px'
            type='text'
            name='island_name'
            placeholder='Memoria'
            autoCapitalize='none'
            ref={register}
          />
          <FormLabel mt='3%'>Password</FormLabel>
          <InputGroup>
            <Input
              h='58px'
              type={show ? 'text' : 'password'}
              name='password'
              placeholder='********'
              autoCapitalize='none'
              ref={register}
            />
            <InputRightElement width='4.5rem' py='32px'>
              <Button
                // position='fixed'
                h='1.75rem'
                color='rgba(72, 72, 72, 0.1)'
                border='none'
                size='sm'
                backgroundColor='#FDFDFF'
                onClick={handleClick}
              >
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
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
            Sign up
					</Button>

          <Text textAlign='center' mt='6%'>
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