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
} from '@chakra-ui/core';

const Signup = ({ signup, isLoading, history }) => {
  const { handleSubmit, errors, register, formState } = useForm();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  // variables for finding the current hour in the day
  const today = new Date();
  const currentHour = today.getHours()

  function validateVillagerName(value) {
    let error;
    if (!value) {
      error = 'Villager Name is required';
    } else if (value.length > 10) {
      error = 'Villager Name cannot exceed 10 characters';
    }
    return error || true;
  }

  function validateIslandName(value) {
    let error;
    if (!value) {
      error = 'Island Name is required';
    } else if (value.length > 10) {
      error = 'Island Name cannot exceed 10 characters';
    }
    return error || true;
  }

  function validatePassword(value) {
    let error;
    if (!value) {
      error = 'Password is required';
    } else if (value.length < 8) {
      error = 'Password must be at least 8 characters';
    }
    return error || true;
  }

  const submitForm = creds => {
    signup(creds).then(() => {
      if (currentHour >= 5 && currentHour < 12) {
        history.push('/dashboard/morning');
      } else {
        history.push('/dashboard/afternoon');
      }
    });
  };

  return (
    <Flex h='100vh'
      align='center'
      justify={{ lg: 'left', xs: 'center' }}
      pl={{ lg: '25%', xs: '0%' }}
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
          w={{ lg: '450px', xs: '300px' }}
          p='5%'
        >
          <Flex
            as='h2'
            fontSize='32px'
            justify='center'
          >
            Welcome back!
					</Flex>
          <FormControl isInvalid={errors.villager_name}>
            <FormLabel mt='3%'>Villager Name</FormLabel>
            <Input
              h='58px'
              type='text'
              name='villager_name'
              placeholder='Tater'
              autoCapitalize='none'
              ref={register({ validate: validateVillagerName })}
            />
            <FormErrorMessage>
              {errors.villager_name && errors.villager_name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.island_name}>
            <FormLabel mt='3%'>Island Name</FormLabel>
            <Input
              h='58px'
              type='text'
              name='island_name'
              placeholder='Memoria'
              autoCapitalize='none'
              ref={register({ validate: validateIslandName })}
            />
            <FormErrorMessage>
              {errors.island_name && errors.island_name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>

            <FormLabel mt='3%'>Password</FormLabel>
            <InputGroup>
              <Input
                h='58px'
                type={show ? 'text' : 'password'}
                name='password'
                placeholder='********'
                autoCapitalize='none'
                ref={register({ validate: validatePassword })}
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
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
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
    </Flex >
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading
  };
};

export default connect(mapStateToProps, signup)(Signup);