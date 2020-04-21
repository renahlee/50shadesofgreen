import React from 'react'
import { Box, Flex, Heading, Image, Text } from 'rebass'
import ReactMarkdown from 'react-markdown'
import theme from '../theme'
import { ModuleProps as TModule } from './Module'

export type SectionProps = {
  image?: string
  imageCaption?: string
  imagePrefix?: TModule["imagePrefix"]
  imageSuffix?: number
  imageWidth?: string
  imageDescription?: string
  list?: string[]
  subtitle?: string
  text?: string[]
  title?: string
}

export const Section: React.FC<SectionProps> = ({
  image,
  imageCaption,
  imageDescription,
  imagePrefix,
  imageSuffix,
  imageWidth,
  text
}) => {
  const LabelledImage = () =>
    <Flex
      flexDirection="column"
      justifyContent="center"
      mt={4}
      mb={3}
      height="auto"
      width={['100%', imageWidth || "100%"]}
    >
      <Image
        src={image}
        mr={[0, 0, 2]}
      />
      <Text
        color={theme.colors.grey}
        fontSize="0.75em"
        mt={3}
        mb={1}
        textAlign="center"
      > <span>{`Figure ${imagePrefix}.${imageSuffix}:`}</span>{imageCaption}</Text>
      <Text
        color={theme.colors.grey}
        fontSize="0.8em"
        mt={1}
        textAlign={imageDescription && imageDescription.length > 100 ? "left" : "center"}
      >
        <ReactMarkdown
          source={imageDescription}
        />
      </Text>
    </Flex>


  return <Flex
    alignItems={!!image ? "center" : "flex-start"}
    flexDirection="column"
    maxWidth="40rem"
    width="100%"
  >
    {
      !!image
      && <LabelledImage />
    }

    {
      !!text && text.map(t =>
        <ReactMarkdown source={t} />
      )
    }

  </Flex>
}
