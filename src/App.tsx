import React from 'react';
import { ThemeProvider } from 'emotion-theming'
import { Heading, Text, Box } from 'rebass'
import { Module } from './components'
import "./App.css"
import theme from './theme'
import {
  Introduction,
  Methodology,
  Results
} from './content'


const modules = [
  Introduction,
  Methodology,
  Results
] as const

const App = () => {
  return <ThemeProvider theme={theme}>
    <Box px={5}>
      <Heading
        color={theme.colors.green}
        fontFamily="Nanum Gothic"
        fontSize="4rem"
        fontWeight="normal"
        pt={4}
        pb={2}
      >
        50 shades of green 🌿
      </Heading>
      <Text
        color={theme.colors.grey}
        fontSize="0.8em"
        pb={5}
      >Samuel Elkind, Ollie Hsieh, Michael Liang, Nick Martucci, Matt Redington</Text>

      {modules.map((module, index) =>
        <Module
          index={index}
          heading={module.heading}
          sections={module.sections}
        />
      )}
    </Box>

    <div id="leaves">
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </div>
  </ThemeProvider >
}

export default App;
