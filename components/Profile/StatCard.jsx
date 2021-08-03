import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, Text } from 'react-native';
import { COLORS } from '../../constants/index';

const StatCardContainer = styled(View)`
   width: ${(props) => props.width};
   height: ${(props) => props.height};
   border: 3px solid ${(props) => props.color};
   border-radius: 20px;
   display: flex;
   justify-content: center;
   margin-bottom: 20px;
   padding: 12px;
`;

const Title = styled(Text)`
   font-family: 'Montserrat_600SemiBold';
   font-size: ${(props) => props.size}px;
   text-align: center;
`;

const Units = styled(Text)`
   font-family: 'Montserrat_600SemiBold';
   font-size: 20px;
   text-align: center;
`;

const SubTitle = styled(Text)`
   font-family: 'Montserrat_600SemiBold';
   font-size: ${(props) => props.size}px;
   text-align: center;
`;

const StatCard = (props) => {
   const {
      text,
      subtext,
      color,
      width,
      height,
      textSize,
      subtextSize,
      titleUnits,
   } = props;

   return (
      <StatCardContainer height={height} width={width} color={color}>
         <Text>
            <Title size={textSize}>{text}</Title>
            <Units>{titleUnits}</Units>
         </Text>
         <SubTitle size={subtextSize}>{subtext}</SubTitle>
      </StatCardContainer>
   );
};

StatCard.propTypes = {
   width: PropTypes.string,
   height: PropTypes.string,
   color: PropTypes.string,
   text: PropTypes.string.isRequired,
   subtext: PropTypes.string,
   textSize: PropTypes.number,
   subtextSize: PropTypes.number,
   titleUnits: PropTypes.string,
};

StatCard.defaultProps = {
   width: '45%',
   height: '110px',
   color: COLORS.default[0],
   subtext: '',
   textSize: 30,
   subtextSize: 15,
   titleUnits: '',
};

export default StatCard;
