import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// actions
import login from '../state/actions/index';
// styles
import {
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

  return (
    <h1>The Thing, Julie</h1>
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading
  };
};

export default connect(mapStateToProps, login)(Login);