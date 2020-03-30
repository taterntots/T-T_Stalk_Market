import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// actions

// styles
import {
  Flex
} from '@chakra-ui/core';

const Dashboard = ({ isLoading, history }) => {

  return (
    <Flex>
      <h1>Stalk Market</h1>
    </Flex>
  )
}

export default Dashboard;