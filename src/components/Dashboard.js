import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// components
import TurnipCard from '../components/TurnipCard';
// actions
import getTurnips from '../state/actions/index';
// styles
import {
  Flex,
  Button
} from '@chakra-ui/core';

const Dashboard = ({ data, getTurnips, isLoading, history }) => {
  const [morningTime, setMorningTime] = useState(true);

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

  return (
    <>
      <Flex as='h1' justify='center'>
        Today's Turnip Prices
      </Flex>
      <Flex justify='space-evenly' mt='2%' mx='10%'>
        <Button onClick={navToMorningPrice}>Morning</Button>
        <Button onClick={navToAfternoonPrice}>Afternoon</Button>
      </Flex>
      {data.map(turnip => (
        <TurnipCard
          key={turnip.turnip_id}
          turnip={turnip}
          morningTime={morningTime}
          history={history}
        />
      ))}
    </>
  )
}

const mapStateToProps = state => {
  console.log(state);
  return {
    isLoading: state.turnip.fetchingData,
    data: state.turnip.data
  };
};
export default connect(mapStateToProps, getTurnips)(Dashboard);