import React from "react";
import { Box, Text, Image, useColorModeValue } from "@chakra-ui/react";

export default function TrackElements(props) {
    const track = props.name;
    const artist = props.artist;
    const cover = props.cover;

    const textColor = useColorModeValue("gray.700", "gray.200")

    return (
        <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            flexDirection="column"
            textAlign="center"
        >
            <Box>
                <Text pb="5" fontSize="xl" color={textColor}>
                    {artist} <br></br>
                    {track}
                </Text>
            </Box>
            <Box>
                <Image boxSize={['100px', '200px', '300px']} src={cover} alt="Song Cover" />
            </Box>
        </Box>
    );
}