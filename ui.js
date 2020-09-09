'use strict';

const useInterval = require('react-useinterval');

const React = require('react');
const PropTypes = require('prop-types');
const {Text, Color, Box} = require('ink');

const FIELD_SIZE = 16;
const FIELD_ROW = [...new Array(FIELD_SIZE).keys()];
const DIRECTIONS = {
  RIGHT: { x: 1, y: 0 },
  LEFT: { x: -1, y: 0 },
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 }
}

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

function calcSnakePosition(segments, direction){
  return segments.map(segment => ({
    x: calcBoundary(segment.x + direction.x),
    y: calcBoundary(segment.y + direction.y)
  }));
}

function calcBoundary(x) {
  if (x >= FIELD_SIZE){
    return 0;
  }
  if (x < 0){
    return FIELD_SIZE - 1;
  }

  return x;
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
  ]);

  const [direction, setDirection] = React.useState(DIRECTIONS.LEFT);

  useInterval(() =>{
    setSnakeSegments(segments => calcSnakePosition(segments, direction))
  }, 1000)

  return (
    <Box flexDirection='column' alignItems='center'>
      <Text color='#000000'>Vi<Text color='#f94144' backgroundColor='#FFFFFF'>Snake</Text></Text>
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
