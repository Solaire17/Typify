import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Play from "./pages/Play";
import ErrorPage from "./pages/ErrorPage";
import { Box, Button, Heading, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBdy58dlPkATmCz2TYchyofxxBYeZ6gvSg",
  authDomain: "typify-fdd5b.firebaseapp.com",
  projectId: "typify-fdd5b",
  storageBucket: "typify-fdd5b.appspot.com",
  messagingSenderId: "811715975905",
  appId: "1:811715975905:web:774938420202711f6d35a0",
  measurementId: "G-W7Q7R7E1VZ"
};
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
// connectFunctionsEmulator(functions, "localhost", 5001);

export default function App() {
  const [track, setTrack] = useState({
    name: "",
    artist: "",
    cover: "",
    audio: "",
    length: 0.0,
  });
  const [id, setId] = useState("");
  const [token, setToken] = useState("");
  const [lyrics, setLyrics] = useState("");
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("blue.50", "blue.700")
  const textColor = useColorModeValue("gray.700", "gray.200")
  const [darkMode, setDarkMode] = useState({})

  //firebase function to get user's token
  useEffect(() => {
    const getToken = httpsCallable(functions, "getToken")
    getToken().then(
      (res) => {
        setToken(res.data.data)
      }
    )
  }, []);

  //function to get selected song's info
  useEffect(() => {
    if (id !== "") {
      axios(`https://api.spotify.com/v1/tracks/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }).then((trackResponse) => {
        setTrack((prevTrack) => ({
          ...prevTrack,
          name: trackResponse.data.name,
          artist: trackResponse.data.artists[0].name,
          cover: trackResponse.data.album.images[1].url,
          audio: trackResponse.data.preview_url,
        }));
      });

      axios(`https://api.spotify.com/v1/audio-analysis/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }).then((trackResponse) => {
        setTrack((prevTrack) => ({
          ...prevTrack,
          length: trackResponse.data.track.duration,
        }));
      });
    }
  }, [id]);

  //function to get selected song's lyrics
  useEffect(() => {
    if (track.name !== "" && track.artist !== "") {
      axios
        .get(`https://api.lyrics.ovh/v1/${track.artist}/${track.name}`, {
          headers: { "Content-Type": "application/json" },
        })
        .then((lyricResponse) => {
          setLyrics(lyricResponse.data.lyrics);
        });
    }
  }, [track.name && track.artist]);

  return (
    <Box
      bg={bgColor}
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      flexDirection="column"
      textAlign="center"
    >
      <Router>
        <Heading
          as="h1"
          size="2xl"
          top="0"
          pt="35"
          color={textColor}
        >
          <Link to="/">Typify</Link>
        </Heading>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setId={setId}
                name={track.name}
                artist={track.artist}
                cover={track.cover}
                audio={track.audio}
              />
            }
          />
          <Route
            path="/play"
            element={
              <Play
                track={track.name}
                artist={track.artist}
                cover={track.cover}
                lyrics={lyrics}
                length={track.length}
              />
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      <Button onClick={() => {
        toggleColorMode()
        setDarkMode(prevState => !prevState)
      }}>
        {
          darkMode ? (<SunIcon />) : (<MoonIcon />)
        }
      </Button>
    </Box>
  );
}
