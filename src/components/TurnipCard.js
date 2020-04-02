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
      background='#26A69A'
      color='white'
      _hover={{ bg: '#E9F0FF' }}
      onClick={submitDelete}
      mt='2%'
      mx='15%'
      p='10px'
    >
      <Flex width='100%' justify='space-evenly'>
        <Flex alignItems='center' >
          <Image src={require('../icons/paw-print.png')} size='4em' />
        </Flex>
        <Flex alignItems='center'>
          <Text fontSize='4xl'>
            {turnip.villager_name}
          </Text>
        </Flex>
        <Flex alignItems='center' >
          <Image src={require('../icons/island.png')} size='4em' />
        </Flex>
        <Flex alignItems='center'>
          <Text fontSize='4xl'>
            {turnip.island_name}
          </Text>
        </Flex>
        <Flex alignItems='center' >
          <Image src={require('../icons/bell-bag.png')} size='4em' />
        </Flex>
        <Flex justify='center'>
          {morningTime
            ?
            <Flex alignItems='center'>
              <Text fontSize='5xl'>
                {turnip.morning_price}
              </Text>
            </Flex>
            :
            <Flex alignItems='center'>
              <Text fontSize='5xl'>
                {turnip.afternoon_price}
              </Text>
            </Flex>
          }
        </Flex>
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