import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
// components
import TurnipCard from '../components/TurnipCard';
// actions
import getTurnips from '../state/actions/index';
import postTurnip from '../state/actions/index';
// styles
import {
  Flex,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast
} from '@chakra-ui/core';

const Dashboard = ({ data, getTurnips, postTurnip, turnipAdded, isLoading, history }) => {
  const [morningTime, setMorningTime] = useState(true);
  const { handleSubmit, errors, register, formState } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // pull turnip data
  useEffect(() => {
    getTurnips();
  }, [getTurnips]);

  const navToMorningPrice = () => {
    setMorningTime(true);
  }

  const navToAfternoonPrice = () => {
    setMorningTime(false);
  }

  let morningPricesOnly = data.filter(mp => {
    return mp.morning_price >= 1;
  })

  let afternoonPricesOnly = data.filter(mp => {
    return mp.afternoon_price >= 1;
  })

console.log(turnipAdded);

  //submit handler
  const submitForm = (data) => {
    postTurnip(localStorage.getItem('userId'), data).then(() => {
      // window.location.reload();
      history.push('/dashboard')
      if (turnipAdded) {
        toast({
          title: 'Turnip Price Added!',
          description: `We've added a turnip price for you.`,
          status: 'success',
          duration: 5000,
          isClosable: true
        })
      } else {
        toast({
          title: 'An error occurred',
          description: `Unable to add turnip price`,
          status: 'error',
          duration: 5000,
          isClosable: true
        })
      }
    })
  }

  console.log(data);

  return (
    <>
      {/* ------------------------------------------------------------------------------------ */}
      {/* -------------------------------- Add Turnip Modal --------------------------------- */}
      {/* ------------------------------------------------------------------------------------ */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {morningTime ?
            <ModalHeader>Add Morning Price</ModalHeader>
            :
            <ModalHeader>Add Afternoon Price</ModalHeader>
          }
          <ModalCloseButton />
          <ModalBody>
            <InputGroup>
              <InputLeftAddon children='Bells' />
              {morningTime ?
                <Input
                  name='morning_price'
                  type='number'
                  placeholder='XXX'
                  min='10'
                  max='999'
                  roundedLeft='0'
                  ref={register}
                />
                :
                <Input
                  name='afternoon_price'
                  type='number'
                  placeholder='XXX'
                  min='10'
                  max='999'
                  roundedLeft='0'
                  ref={register}
                />
              }
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button variantColor='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit' onClick={handleSubmit(submitForm)} variant='ghost'>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* ------------------------------------------------------------------------------------ */}
      {/* -------------------------------- Dashboard Proper ---------------------------------- */}
      {/* ------------------------------------------------------------------------------------ */}

      {/* Header with turnip title and date */}
      <Flex as='h1' justify='center'>
        Today's Turnip Prices
      </Flex>
      <Flex as='h2' justify='center'>
        {(new Date().getMonth() + 1) + '-' + new Date().getDate() + '-' + new Date().getFullYear()}
      </Flex>

      {/* Buttons for turnip time of day */}
      <Flex justify='space-evenly' mt='1%' mx='10%'>
        <Flex>
          <Button backgroundColor='#9ADAE1' border='none' color='white' onClick={navToMorningPrice}>Morning</Button>
          {morningTime ?
            <Button backgroundColor='#9ADAE1' border='none' color='white' onClick={onOpen} ml='5px'>+</Button>
            :
            <Button backgroundColor='#9ADAE1' border='none' color='white' onClick={onOpen} isDisabled='true' ml='5px'>+</Button>
          }
        </Flex>
        <Flex>
          <Button backgroundColor='#9ADAE1' border='none' color='white' onClick={navToAfternoonPrice}>Afternoon</Button>
          {morningTime ?
            <Button backgroundColor='#9ADAE1' border='none' color='white' onClick={onOpen} isDisabled='true' ml='5px'>+</Button>
            :
            <Button backgroundColor='#9ADAE1' border='none' color='white' onClick={onOpen} ml='5px'>+</Button>
          }
        </Flex>
      </Flex>

      {/* Turnips Cards */}
      {morningTime ?
        morningPricesOnly.map(turnip => (
          <TurnipCard
            key={turnip.turnip_id}
            turnip={turnip}
            morningTime={morningTime}
            history={history}
          />
        )) :
        afternoonPricesOnly.map(turnip => (
          <TurnipCard
            key={turnip.turnip_id}
            turnip={turnip}
            morningTime={morningTime}
            history={history}
          />))
      }
    </>
  )
}

const mapStateToProps = state => {
  console.log(state);
  return {
    isLoading: state.turnip.fetchingData,
    data: state.turnip.data,
    turnipAdded: state.turnip.turnipAdded
  };
};
export default connect(mapStateToProps, (getTurnips, postTurnip))(Dashboard);