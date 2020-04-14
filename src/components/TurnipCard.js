import React from 'react';
import { connect } from 'react-redux';
// actions
import deleteTurnip from '../state/actions/index';
// styles
import {
  Flex,
  Image,
  Text,
  Button,
  CloseButton,
  PseudoBox,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/core';

const TurnipCard = ({ turnip, deleteTurnip, morningTime, history }) => {
  const loginId = localStorage.getItem('userId');

  // needed for alert boxes
  const [isOpen, setIsOpen] = React.useState();
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  // deletes the turnip price in question
  const submitDelete = () => {
    deleteTurnip(turnip.villager_id, turnip.turnip_id).then(() => {
      window.location.reload();
      // history.push('/dashboard')
    });
  };

  return (
    <PseudoBox
      display='flex'
      alignItems='center'
      borderRadius='12px'
      background='#26A69A'
      color='white'
      // _hover={{ bg: '#E9F0FF' }}
      mt='2%'
      mx='15%'
      p='10px'
    >
      <Flex width='100%' justify='space-evenly'>
        <Flex alignItems='center' display={{ lg: 'flex', xs: 'none' }}>
          <Image src={require('../icons/paw-print.png')} size={{ lg: '4em', xs: '3em' }} />
        </Flex>
        <Flex alignItems='center' display={{ lg: 'flex', xs: 'none' }}>
          <Text fontSize={{ lg: '4xl', xs: '3xl' }}>
            {turnip.villager_name}
          </Text>
        </Flex>
        <Flex alignItems='center' >
          <Image src={require('../icons/island.png')} size={{ lg: '4em', xs: '3em' }} />
        </Flex>
        <Flex alignItems='center'>
          <Text fontSize={{ lg: '4xl', xs: '3xl' }}>
            {turnip.island_name}
          </Text>
        </Flex>
        <Flex alignItems='center' >
          <Image src={require('../icons/bell-bag.png')} size={{ lg: '4em', xs: '3em' }} />
        </Flex>
        <Flex justify='center'>
          {morningTime
            ?
            <Flex alignItems='center'>
              <Text fontSize={{ lg: '4xl', xs: '3xl' }}>
                {turnip.morning_price}
              </Text>
            </Flex>
            :
            <Flex alignItems='center'>
              <Text fontSize={{ lg: '4xl', xs: '3xl' }}>
                {turnip.afternoon_price}
              </Text>
            </Flex>}
        </Flex>
      </Flex>
      {
        Number(loginId) === Number(turnip.villager_id) ? (
          <Flex>
            <CloseButton size='sm' cursor='pointer' border='none' onClick={() => setIsOpen(true)} />
          </Flex>
        ) : null
      }

      {/* Alert for Deleting */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Reset Turnip Price?
          </AlertDialogHeader>
          <AlertDialogBody>
            <Image src={require('../images/resetti.png')} objectFit='cover' />
            Resetting... It’s like...pressing an emergency call button. You press it and I gotta come read you the riot act. See?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button variantColor="red" onClick={submitDelete} ml={3}>
              Reset
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PseudoBox >
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.turnip.fetchingData
  };
}

export default connect(mapStateToProps, deleteTurnip)(TurnipCard);