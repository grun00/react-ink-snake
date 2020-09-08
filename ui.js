'use strict';
const React = require('react');
const PropTypes = require('prop-types');
const {Text, Color, Box} = require('ink');

const FIELD_SIZE = 16;
const FIELD_ROW = [...new Array(FIELD_SIZE).keys()];

const App = () => (
  <Box flexDirection='column' alignItems='center'>
    <Text color='green'>Vi</Text><Text color='red'>Snake</Text>

    <Box flexDirection='column' >
      <Box flexDirection='column'>
        {FIELD_ROW.map(y => (
          <Box key={y}>
            {FIELD_ROW.map(x => (
              <Box key={x}>
                <Text color={(x+y)%2==0? 'red' : 'green'}> . </Text>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);

module.exports = App;
