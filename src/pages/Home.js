import React from "react";
import { useNavigate } from "react-router-dom";
import TrackElements from "../components/TrackElements";
import {
    Button,
    FormControl,
    FormHelperText,
    Box,
    Input,
    useToast,
} from "@chakra-ui/react";

export default function Home(props) {
    const navigate = useNavigate();
    const name = props.name;
    const artist = props.artist;
    const cover = props.cover;
    const audio = new Audio(props.audio);
    const toast = useToast();

    function handleSubmit(event) {
        console.log(event.target[0].value);
        const trackURL = event.target[0].value
            .substring(0, event.target[0].value.indexOf("?"))
            .replace("https://open.spotify.com/track/", "");
        event.preventDefault();
        props.setId(trackURL);

        toast({
            title: "Song Added",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    }

    return (
        <Box>
            {name.length === 0 ? (
                <FormControl>
                    <form onSubmit={handleSubmit}>
                        <Input type="text" placeholder="Paste Song Link" />
                    </form>
                    <FormHelperText>
                        Example:
                        https://open.spotify.com/track/4TwVtW8hS5LyLoDtJGpUOg?si=31d7bf256a9547f4
                    </FormHelperText>
                </FormControl>
            ) : (
                <Box>
                    <TrackElements artist={artist} cover={cover} name={name} />
                    <Button
                        mt="5"
                        text="gray.500"
                        onClick={() => {
                            navigate("/Play");
                            audio.play();
                        }}
                    >
                        Change to Play Page
                    </Button>
                </Box>
            )}
        </Box>
    );
}