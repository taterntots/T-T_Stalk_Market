import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
// actions

// styles
import {
  Flex,
  Image,
  Text
} from '@chakra-ui/core';

const TurnipCard = ({ turnip, morningTime, history }) => {

  return (
    <Flex
      alignItems='center'
      borderRadius='12px'
      background='#AFE8D0'
      color='white'
      my='2%'
      mx='10%'
      px='2%'
    >
      <Flex width='100%' justify='space-evenly'>
        <Flex alignItems='center'>
          <Image src={require('../icons/island.png')} size='3.8em' pr='5%' />
          <Text fontSize='4xl'>
            {turnip.villager_name}
          </Text>
        </Flex>
        <Flex alignItems='center'>
          <Image src={require('../icons/island.png')} size='3.8em' pr='5%' />
          <Text fontSize='4xl'>
            {turnip.island_name}
          </Text>
        </Flex>
      </Flex>

      <Image src={require('../icons/bell-bag.png')} size='3.8em' alignItems='center' />
      <Flex width='15%' justify='center'>
        {morningTime
          ?
          <Flex>
            <Text fontSize='5xl'>
              {turnip.morning_price}
            </Text>
          </Flex>
          :
          <Flex>
            <Text fontSize='5xl'>
              {turnip.afternoon_price}
            </Text>
          </Flex>
        }
      </Flex>
    </Flex>
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.turnip.fetchingData
  };
}

export default connect(mapStateToProps)(TurnipCard);