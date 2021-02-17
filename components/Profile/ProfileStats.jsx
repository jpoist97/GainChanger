import React from 'react';
import styled from 'styled-components';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../../constants/index';
import StatCard from './StatCard';

const ProfileStatsContainer = styled(View)`
   width: 100%;
   display: flex;
   align-items: center;
   margin-bottom: 20px;
`;

const DoubleCardContainer = styled(View)`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   width: 90%;
`;

const ProfileStats = () => {
  const profileStats = useSelector((state) => state.progress.profileStats);
  const { totalWeightLifted, totalWorkoutsPerformed, weightPersonalRecord } = profileStats;

  return (
    <ProfileStatsContainer>
      <StatCard text={`${totalWeightLifted}`} subtext="All-time lbs. Lifted" width="90%" textSize={40} subtextSize={20} color={COLORS[0]} />
      <DoubleCardContainer>
        <StatCard text={`${totalWorkoutsPerformed}`} subtext="Workouts Performed" width="47%" color={COLORS[1]} />
        <StatCard text={`${weightPersonalRecord}`} subtext="Heaviest Lift" titleUnits="lbs." width="47%" color={COLORS[2]} />
      </DoubleCardContainer>
    </ProfileStatsContainer>
  );
};

export default ProfileStats;
