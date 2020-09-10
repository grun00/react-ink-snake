'use strict';

const useInterval = require('react-useinterval');
const React = require('react');
const { useState, useContext, useEffect } = require('react');
const PropTypes = require('prop-types');
const {Text, Box, useInput} = require('ink');

const FIELD_SIZE = 16;
const FIELD_ROW = [...new Array(FIELD_SIZE).keys()];
const DIRECTIONS = {
  RIGHT: { x: 1, y: 0 },
  LEFT: { x: -1, y: 0 },
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 }
}

let food = {
  x: Math.round(Math.random()*FIELD_SIZE),
  y: Math.round(Math.random()*FIELD_SIZE)
}

let speed = 800;
let gameOver = 0;
let score = 0;

function getItem(x, y, snakeSegments, color){
  if(x === food.x && y === food.y){
    return <Text color='red'> O </Text>
  }

  for(const segment of snakeSegments){
    if(x === segment.x && y === segment.y){
      return <Text color={color}> x </Text>
    }
  };

  return <Text color='#761298'> . </Text>
}

function calcSnakePosition(segments, direction){
  const [head] = segments;

  const newHead = {
    x: calcBoundary(head.x + direction.x),
    y: calcBoundary(head.y + direction.y)
  }

  if(newHead.x === food.x && newHead.y === food.y){
    food = {
      x: Math.floor(Math.random() * FIELD_SIZE),
      y: Math.floor(Math.random() * FIELD_SIZE),
    }
    speed = speed === 100? 100 : speed - 20
    score = score + 100
    return [newHead, ...segments];
  }

  return [newHead, ...segments.slice(0, -1)];
}

function calcBoundary(x) {
  if (x >= FIELD_SIZE){
    endGame();
  }
  if (x < 0){
    endGame();
  }

  return x;
}

function endGame(){
  speed = 0;
  gameOver = 1;
  return null
}

const App = ({color='green'}) => {
  const [snakeSegments, setSnakeSegments] = React.useState([
      { x: 8, y: 8 },
      { x: 8, y: 7 },
      { x: 8, y: 6 }
  ]);

  const [head, ...tail] = snakeSegments;
  const selfIntersect = tail.some(
    segment => segment.x === head.x && segment.y === head.y
  )

  const [direction, setDirection] = React.useState(DIRECTIONS.DOWN);

  useInterval(() =>{
    setSnakeSegments(segments => calcSnakePosition(segments, direction))
  }, selfIntersect? endGame() : speed)

  useInput((input, key) => {
    if(key.leftArrow || input === 'h'){
      setDirection(DIRECTIONS.LEFT)
    }
    if(key.rightArrow || input === 'l'){
      setDirection(DIRECTIONS.RIGHT)
    }
    if(key.upArrow || input === 'k'){
      setDirection(DIRECTIONS.UP)
    }
    if(key.downArrow || input === 'j'){
      setDirection(DIRECTIONS.DOWN)
    }
  })

  return (
    <Box flexDirection='column' alignItems='center'>
      <Box  borderStyle='classic' paddingX={12} borderColor={gameOver === 1? '#FF0000' : '#fff'}>
        <Text color='#ff00ff'>
          Score: {score}
          <Text color='#10ff10'>Vi<Text color='#f94144'>Snake</Text>
          </Text>
          Speed: {speed}
        </Text>
      </Box>
      <Box flexDirection='column' alignItems='center' borderStyle='classic' borderColor={gameOver === 1? '#FF0000' : '#fff'}>
            <Box flexDirection='column' >
              <Box flexDirection='column'>
                {FIELD_ROW.map(y => (
                  <Box key={y}>
                    {FIELD_ROW.map(x => (
                      <Box key={x}>
                        {getItem(x, y, snakeSegments, color)}
                      </Box>
                    ))}
                  </Box>
                  ))}
              </Box>
            </Box>
        </Box>
    </Box>
  )
};

module.exports = App;
