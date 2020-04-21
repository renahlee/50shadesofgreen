import React from 'react'
import { Box, Heading, Text } from 'rebass'
import { Section } from "./"
import { SectionProps as TSection } from './Section'
import theme from '../theme'

export type ModuleProps = {
  heading: string
  index?: number
  imagePrefix?: string
  sections: TSection[]
}


export const Module: React.FC<ModuleProps> = ({
  heading,
  imagePrefix,
  index,
  sections
}) => {

  const imageCaptions = sections.reduce<string[]>((acc, val, index) => {
    if (!!val.image && !!val.imageCaption) {
      acc = [...acc, val.imageCaption]
    }

    return acc
  }, [])

  return <Box
    py={3}
  >
    <Heading
      color={theme.colors.lightgreen}
      fontFamily="Nanum Gothic"
      fontWeight="normal"
      fontSize="3rem"
      display="inline-block"
    >
      {
        ![0, 4, 5].some(_ => _ === index)
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

    {
      sections.map((section: TSection) =>
        <Section
          {...section}
          imagePrefix={imagePrefix}
          imageSuffix={section.imageCaption ? imageCaptions.indexOf(section.imageCaption) + 1 : undefined}
        />
      )}
  </Box>
}