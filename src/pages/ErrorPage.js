import React from "react";
import { Box, Alert, AlertIcon } from "@chakra-ui/react";

export default function ErrorPage() {
    return (
        <Box>
            <Alert status="error">
                <AlertIcon />
                The link you clicked on is incorrect, click the title to be redirected
            </Alert>
        </Box>
    );
}