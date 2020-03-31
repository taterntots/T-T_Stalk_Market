import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
// actions

// styles
import {
  Flex
} from '@chakra-ui/core';

const TurnipCard = ({ turnip, morningTime, history }) => {

  return (
    <Flex
      width='80%'
      flexDir='column'
      alignItems='center'
      borderRadius='12px'
      background='#F2F6FE'
      my='2%'
      mx='10%'
    >
      <Flex>
        Villager: {turnip.villager_name}
      </Flex>
      <Flex>
        Island: {turnip.island_name}
      </Flex>
      {morningTime ?
        <Flex>
          morning price: {turnip.morning_price}
        </Flex> :
        <Flex>
          afternoon price: {turnip.afternoon_price}
        </Flex>
      }
    </Flex>
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.turnip.fetchingData
  };
}

export default connect(mapStateToProps)(TurnipCard);