import { AccessTimeOutlined, Devices, LanguageOutlined, MovingOutlined, WebOutlined } from "@mui/icons-material";
import { Chip, Collapse, Grid, ListItem, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import dynamic from "next/dynamic";
import { useState } from "react";

export default function EventCard({ event }) {
    const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });
    const tags = event.tags?.substr(1, event.tags.length - 2).split(", ");
    const icons = {
        deviceType: <Devices fontSize="small" />,
        browserMajorVersion: <MovingOutlined fontSize="small" />,
        platform: <Devices fontSize="small" />,
        browser: <LanguageOutlined fontSize="small" />,
        platformVersion: <MovingOutlined fontSize="small" />,
        browserType: <WebOutlined fontSize="small" />,
    };
    const formattedDate = (value) => {
        const date = new Date(value);
        return date.toUTCString();
    };
    return <Stack spacing={2}>
        <Stack direction={"row"}>
            <Chip label={formattedDate(event.createdAt)} icon={<AccessTimeOutlined fontSize="small" />} size="small" />
        </Stack>
        <Typography variant="body1" fontWeight={"500"}>Stacktrace:</Typography>
        <Typography variant="body2">{event.stackTrace}</Typography>
        <Typography variant="body1" fontWeight={"500"}>Tags:</Typography>
        <Grid container>
            {tags && tags.map((tag) => {
                const label = tag.split("=")[0];
                // const value = tag.split("=")[1];
                return (<Grid key={label} item sx={{ mr: '0.5rem', mb: '0.5rem' }}>
                    <Chip icon={icons[label]} variant="outlined" label={tag} key={tag} /></Grid>);
            })}
        </Grid>
        <Stack spacing={1}>
            <Typography variant="body1" fontWeight={"500"}>Request:</Typography>
            <CustomTextField value={event.userAgent} label="User Agent" />
            <CustomTextField value={event.headers} label="Headers" />
            <DynamicReactJson id="json-pretty" src={JSON.parse(event.body.replace("\\", ''))} name={null} collapsed></DynamicReactJson>

        </Stack>

        <Stack spacing={1}>
            <Typography variant="body1" fontWeight={"500"}>Settings:</Typography>
            <CustomTextField value={event.environment} label="Environment" />
            <CustomTextField value={event.packageName} label="Package name" />
            <CustomTextField value={event.packageVersion} label="Package version" />
        </Stack>

    </Stack>
}

function CustomTextField({ value, label }) {
    return <TextField value={value ?? ' '} label={label} fullWidth disabled size="small" sx={{
        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "#000000",
        },
    }} multiline
        variant="standard"
    />
}

function JsonFormatter({ value, type }) {

}