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
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
  FormControl,
  FormErrorMessage,
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
import moment from 'moment';

const Dashboard = ({ data, getTurnips, postTurnip, turnipAdded, isLoading, history }) => {
  const [morningTime, setMorningTime] = useState(true);
  const { handleSubmit, errors, register, formState } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  // variables for finding the current hour in the day
  const currentHour = moment().format('HH');
  const currentDate = moment().format('YYYY-MM-DD');

  // pull turnip data
  useEffect(() => {
    getTurnips();
  }, [getTurnips]);

  // verifies time of day
  useEffect(() => {
    if (currentHour >= 5 && currentHour < 12) {
      setMorningTime(true);
    } else {
      setMorningTime(false);
    }
  }, []);

  const navToMorningPrice = () => {
    setMorningTime(true);
    history.push('/dashboard/morning');
  }

  const navToAfternoonPrice = () => {
    setMorningTime(false);
    history.push('/dashboard/afternoon');
  }

  let morningPricesOnly = data.filter(mp => {
    const localConvertedMorningDate = moment.utc(mp.created_at).local().format('YYYY-MM-DD HH:mm:ss');
    return mp.morning_price >= 1 && !localConvertedMorningDate.indexOf(currentDate);
  })

  let afternoonPricesOnly = data.filter(ap => {
    const localConvertedAfternoonDate = moment.utc(ap.created_at).local().format('YYYY-MM-DD HH:mm:ss');
    return ap.afternoon_price >= 1 && !localConvertedAfternoonDate.indexOf(currentDate);
  })

  function validatePrice(value) {
    let error;
    if (!value) {
      error = 'Turnip price is required';
    } else if (value.length === 1 || value.length > 3) {
      error = 'Turnip prices must be in double or triple digits';
    }
    return error || true;
  }

  const logout = () => {
    localStorage.clear('token');
    localStorage.clear('userId');
    localStorage.clear('villager_name');
    localStorage.clear('island_name');
    history.push('/');
  };

  //submit handler
  const submitForm = (data) => {
    postTurnip(localStorage.getItem('userId'), data).then(() => {
      console.log(data)
      if (currentHour >= 5 && currentHour < 12) {
        // setMorningTime(true);
        history.push('/dashboard/morning');
      } else {
        // setMorningTime(false);
        history.push('/dashboard/afternoon');
      }
      window.location.reload();
      // if (turnipAdded) {
      //   toast({
      //     title: 'Turnip Price Added!',
      //     description: `We've added a turnip price for you.`,
      //     status: 'success',
      //     duration: 5000,
      //     isClosable: true
      //   })
      // } else {
      //   toast({
      //     title: 'An error occurred',
      //     description: `Unable to add turnip price`,
      //     status: 'error',
      //     duration: 5000,
      //     isClosable: true
      //   })
      // }
    })
  }

  return (
    <>
      {/* ------------------------------------------------------------------------------------ */}
      {/* -------------------------------- Add Turnip Modal --------------------------------- */}
      {/* ------------------------------------------------------------------------------------ */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(submitForm)}>
            {morningTime ?
              <ModalHeader>Add Morning Price</ModalHeader>
              :
              <ModalHeader>Add Afternoon Price</ModalHeader>
            }
            <ModalCloseButton />

            <ModalBody>
              {morningTime ?
                <FormControl isInvalid={errors.morning_price}>
                  <InputGroup>
                    <InputLeftAddon children='Bells' />
                    <Input
                      name='morning_price'
                      type='number'
                      placeholder='XXX'
                      maxLength='3'
                      roundedLeft='0'
                      ref={register({ validate: validatePrice })}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.morning_price && errors.morning_price.message}
                  </FormErrorMessage>
                </FormControl>
                :
                <FormControl isInvalid={errors.afternoon_price}>
                  <InputGroup>
                    <InputLeftAddon children='Bells' />
                    <Input
                      name='afternoon_price'
                      type='number'
                      placeholder='XXX'
                      maxLength='3'
                      roundedLeft='0'
                      ref={register({ validate: validatePrice })}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.afternoon_price && errors.afternoon_price.message}
                  </FormErrorMessage>
                </FormControl>
              }
            </ModalBody>

            <ModalFooter>
              <Button variantColor='blue' mr={3} onClick={onClose}>
                Cancel
            </Button>
              <Button type='submit' variant='ghost'>Submit</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* ------------------------------------------------------------------------------------ */}
      {/* -------------------------------- Dashboard Proper ---------------------------------- */}
      {/* ------------------------------------------------------------------------------------ */}

      {/* Header with turnip title and date */}
      <Box
        // h='100vh'
        // bg='#E4D6A2'
        // pt='2%'
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundImage: `url(${require('../images/AC-poptart.jpg')})`
        }}
      >
        <Box
          bg='#B199C9'
          mx='10%'
          roundedBottom='12px'
          position='fixed'
          w='80%'
        >
          <Flex as='h2' justify='space-between' color='white' mt='1%' mx='2%'>
            <Text>
              Turnip Prices
            </Text>
            <Button backgroundColor='#F3747B' border='none' color='white' onClick={logout}>Logout</Button>
          </Flex>

          {/* Buttons for turnip time of day */}
          <Flex justify='space-evenly' mx='10%'>
            <Flex mb='2%'>
              <Button backgroundColor={morningTime ? '#F8996D' : '#91D5E2'} border='none' color='white' onClick={navToMorningPrice}>Morning</Button>
              {morningTime ?
                <Button backgroundColor='#91D5E2' border='none' color='white' onClick={onOpen} ml='5px'>+</Button>
                :
                <Button backgroundColor='#91D5E2' border='none' color='white' onClick={onOpen} isDisabled='true' ml='5px'>+</Button>
              }
            </Flex>
            <Text as='h2' color='white' textAlign='center'>
              {currentDate}
            </Text>
            <Flex>
              <Button backgroundColor={!morningTime ? '#F8996D' : '#91D5E2'} border='none' color='white' onClick={navToAfternoonPrice}>Afternoon</Button>
              {morningTime ?
                <Button backgroundColor='#91D5E2' border='none' color='white' onClick={onOpen} isDisabled='true' ml='5px'>+</Button>
                :
                <Button backgroundColor='#91D5E2' border='none' color='white' onClick={onOpen} ml='5px'>+</Button>
              }
            </Flex>
          </Flex>
        </Box>

        <Flex pt='8%'>
          {/* Space for Fixed Navbar */}
        </Flex>

        {/* Turnips Cards */}
        {!morningTime ?
          afternoonPricesOnly.map(turnip => (
            <TurnipCard
              key={turnip.turnip_id}
              turnip={turnip}
              morningTime={morningTime}
              history={history}
            />
          )) :
          morningPricesOnly.map(turnip => (
            <TurnipCard
              key={turnip.turnip_id}
              turnip={turnip}
              morningTime={morningTime}
              history={history}
            />
          ))
        }
        <Flex pb='2%'>
          {/* Empty Box For Bottom Margin */}
        </Flex>
      </Box>
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