import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// components
import TurnipCard from '../components/TurnipCard';
// actions
import getTurnips from '../state/actions/index';
// styles
import {
  Flex
} from '@chakra-ui/core';

const Dashboard = ({ data, getTurnips, isLoading, history }) => {

  // pull turnip data
  useEffect(() => {
    getTurnips();
  }, [getTurnips]);

  return (
    <>
      <Flex as='h1' justify='center'>
        Today's Turnip Prices
    </Flex>
      {data.map(turnip => (
        <TurnipCard
          key={turnip.turnip_id}
          turnip={turnip}
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