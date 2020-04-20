import React from 'react'
import { Box, Heading, Text } from 'rebass'
import { Section } from "./"
import { SectionProps as TSection } from './Section'
import theme from '../theme'

export type ModuleProps = {
  heading: string
  index?: number
  sections: TSection[]
}


export const Module: React.FC<ModuleProps> = ({
  heading,
  index,
  sections
}) =>
  <Box
    py={3}
  >
    <Heading
      color={theme.colors.lightgreen}
      fontFamily="Nanum Gothic"
      fontWeight="normal"
      fontSize="3rem"
      display="inline-block"
    >
      {index !== 0
        && <Text
          color={theme.colors.lightgrey}
          display="inline-block"
          pr={2}
          mr={3}
          sx={{
            borderRight: `1px solid ${theme.colors.lightgrey}`
          }}
        >{index}</Text>
      }
      {heading.toLowerCase()}</Heading>

    {sections.map((section: any) => <Section
      {...section}
    >
    </Section>)}
  </Box>
