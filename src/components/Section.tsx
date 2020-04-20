import React from 'react'
import { Box, Flex, Heading, Image, Text } from 'rebass'
import ReactMarkdown from 'react-markdown'
import theme from '../theme'

export type SectionProps = {
  image?: string
  imagePos?: "left" | "right" | "center"
  imageCaption?: string
  imageDescription?: string
  list?: string[]
  subtitle?: string
  text?: string[]
  title?: string
}

export const Section: React.FC<any> = ({ image, imageCaption, imagePos, text }) =>
  <Box
    maxWidth="40rem"
  >
    {
      !!image &&
      imagePos !== "right" &&
      <Box
        mb={3}
      >
        <Image
          src={image}
          width="100%"
          height="100%"
          mr={[0, 0, 2]}
        />
        <Text
          color={theme.colors.grey}
          fontSize="0.8em"
          mt={1}
        >{imageCaption}</Text>
      </Box>
    }

    {
      !!text && text.map((t: any) =>
        <ReactMarkdown source={t} />
      )
    }

    {
      !!image &&
      imagePos === "right" &&
      <Image
        src={image}
        width="100%"
        height="100%"
        ml={[0, 0, 2]}
        mt={[3, 0, 0]}
      />
    }
  </Box>
