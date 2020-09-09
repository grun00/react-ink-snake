'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const {Text, Color, Box} = require('ink');

const FIELD_SIZE = 16;
const FIELD_ROW = [...new Array(FIELD_SIZE).keys()];

const food = {
  x: Math.round(Math.random()*FIELD_SIZE),
  y: Math.round(Math.random()*FIELD_SIZE)
}

function getItem(x, y, snakeSegments){
  if(x === food.x && y === food.y){
    return <Text color='red'> O </Text>
  }

  for(const segment of snakeSegments){
    if(x === segment.x && y === segment.y){
      return <Text color='green'> x </Text>
    }
  };

  return <Text color='#761298'> . </Text>
}

const App = () => {
  const [snakeSegments, setSnakeSegments] = React.useState([
      {
        x: 8,
        y: 8
      },
      {
        x: 8,
        y: 7
      },
      {
        x: 8,
        y: 6
      }
  ])

  return (
    <Box flexDirection='column' alignItems='center'>
      <Text color='green'>Vi</Text><Text color='red'>Snake</Text>
        <Box flexDirection='column' >
          <Box flexDirection='column'>
            {FIELD_ROW.map(y => (
              <Box key={y}>
                {FIELD_ROW.map(x => (
                  <Box key={x}>
                    {getItem(x, y, snakeSegments)}
                  </Box>
                ))}
              </Box>
              ))}
          </Box>
        </Box>
    </Box>
  )
};

module.exports = App;
