import React, { useState, useEffect } from "react";
import TrackElements from "../components/TrackElements";
import "../style.css";
import {
    Box,
    Input,
    Text,
    Stat,
    StatNumber,
    Alert,
    AlertIcon,
} from "@chakra-ui/react";

export default function Play(props) {
    const name = props.track;
    const artist = props.artist;
    const cover = props.cover;
    const lyrics = props.lyrics;
    const length = props.length;
    const [isPlaying, setIsPlaying] = useState(true);
    const [seconds, setSeconds] = useState(0);
    const [firstRender, setFirstRender] = useState(false);
    const score = (length / seconds).toFixed(3);

    //regex to remove line breaks
    const result = lyrics.replace(/[\r\n]+/g, " ").replace(/’/g, "'");

    //function to manage the color of the lyrics
    function handleChange(event) {
        const lyricsDisplayElement = document.getElementById("lyricsDisplay");
        const lyricsInputElement = document.getElementById("lyricsInput");

        const arrayLyrics = lyricsDisplayElement.querySelectorAll("span");
        const arrayValue = lyricsInputElement.value.split("");

        let correct = true;
        arrayLyrics.forEach((characterSpan, index) => {
            const character = arrayValue[index];
            if (character == null) {
                characterSpan.classList.remove("correct");
                characterSpan.classList.remove("incorrect");
                correct = false;
            } else if (character === characterSpan.innerText) {
                characterSpan.classList.add("correct");
                characterSpan.classList.remove("incorrect");
            } else {
                characterSpan.classList.remove("correct");
                characterSpan.classList.add("incorrect");
                correct = false;
            }
        });

        if (firstRender) return;
        setFirstRender(true);

        if (lyricsDisplayElement !== null) {
            lyricsDisplayElement.innerHTML = "";
            result.split("").forEach((character) => {
                const characterSpan = document.createElement("span");
                characterSpan.innerText = character;
                lyricsDisplayElement.appendChild(characterSpan);
            });
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (event.target[0].value === result) {
            setIsPlaying((prevPlay) => !prevPlay);
        }
    }

    //timer
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((seconds) => seconds + 1);
        }, 1000);
        if (!isPlaying) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" w="60%">
            {!isPlaying ? (
                <Box>
                    <Stat>
                        <StatNumber>Score: {score}</StatNumber>
                    </Stat>
                    <TrackElements artist={artist} cover={cover} name={name} />
                </Box>
            ) : (
                <Box>
                    {lyrics === "" ? (
                        <Alert status="error">
                            <AlertIcon />
                            No Lyrics found, click the title to try again
                        </Alert>
                    ) : (
                        <Box>
                            <Stat>
                                <StatNumber>{seconds}</StatNumber>
                            </Stat>
                            <Text fontSize={['xs', 's']} p="" className="lyrics--display" id="lyricsDisplay">
                                {lyrics}
                            </Text>
                            <form onSubmit={handleSubmit}>
                                <Input
                                    w="75%"
                                    type="textarea"
                                    className="lyrics--input"
                                    id="lyricsInput"
                                    placeholder="Type Lyrics"
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </form>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
}