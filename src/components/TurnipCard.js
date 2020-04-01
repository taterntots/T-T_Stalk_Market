import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
// actions
import deleteTurnip from '../state/actions/index';
// styles
import {
  Flex,
  Image,
  Text,
  PseudoBox
} from '@chakra-ui/core';

const TurnipCard = ({ turnip, deleteTurnip, morningTime, history }) => {

  //deletes the turnip price in question
  const submitDelete = () => {
    deleteTurnip(turnip.villager_id, turnip.turnip_id).then(() => {
      // window.location.reload();
      history.push('/dashboard')
    });
  };

  return (
    <PseudoBox
      display='flex'
      alignItems='center'
      borderRadius='12px'
      background='#AFE8D0'
      color='white'
      _hover={{ bg: '#E9F0FF' }}
      onClick={submitDelete}
      my='2%'
      mx='15%'
      p='10px'
    >
      <Flex width='100%' justify='space-evenly'>
        <Image src={require('../icons/paw-print.png')} size='3.8em' />
        <Flex alignItems='center'>
          <Text fontSize='4xl'>
            {turnip.villager_name}
          </Text>
        </Flex>
        <Image src={require('../icons/island.png')} size='3.8em' />
        <Flex alignItems='center'>
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
    </PseudoBox>
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.turnip.fetchingData
  };
}

export default connect(mapStateToProps, deleteTurnip)(TurnipCard);