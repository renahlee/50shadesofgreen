import React from 'react'
import { Box, Flex, Heading, Image, Text } from 'rebass'
import ReactMarkdown from 'react-markdown'
import theme from '../theme'

export type SectionProps = {
  image?: string
  imageCaption?: string
  imagePos?: "left" | "right" | "center"
  imageWidth?: string
  imageDescription?: string
  index?: number
  list?: string[]
  subtitle?: string
  text?: string[]
  title?: string
}

export const Section: React.FC<SectionProps> = ({ image, imageCaption, imageWidth, imagePos, index, text }) =>
  <Box
    maxWidth="40rem"
  >
    {
      !!image && imagePos !== "right" &&
      <Box
        mb={3}
        width="100%"
      >
        <Image
          src={image}
          width={['100%', imageWidth || "100%"]}
          height="100%"
          mr={[0, 0, 2]}
          mt={3}
        />
        <Text
          color={theme.colors.grey}
          fontSize="0.7em"
          fontStyle="italic"
          mt={1}
        > {imageCaption}</Text>
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
        width={['100%', imageWidth || "100%"]}
        height="100%"
        ml={[0, 0, 2]}
        mt={[3, 0, 0]}
      />
    }
  </Box>
