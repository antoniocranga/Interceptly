import { Card, CardContent, CardMedia, Divider, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import theme from '../../theme';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import * as timeago from 'timeago.js';
export default function ProjectCard({ props }) {
    const { title, description, id, color, createdAt } = props;
    const projectPath = `/dashboard/${id}/overview`;
    const router = useRouter();
    const handleOnClick = () => {
        router.push(projectPath);
    };
    const formatedDate = () => {
        return timeago.format(new Date(createdAt));
    };
    return (
        <Card
            variant="outlined"
            sx={{
                ':hover': {
                    boxShadow: theme.custom.customBoxShadow,
                    borderColor: theme.palette.primary.main
                },
                border: '1px solid',
                borderColor: grey[300]
            }}
            onClick={handleOnClick}
        >
            <CardContent>
                <Box height={150} sx={{
                    backgroundColor: color ? color : theme.palette.primary.main,
                    borderRadius: "6px"
                }} />
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2">{description.substr(0, 50) ?? "\u00A0"}</Typography>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                }}>
                    <Typography
                        variant="caption"
                        sx={{
                            color: grey[400]
                        }}
                    >
                        {id}
                    </Typography>
                    <Typography sx={{
                        color: grey[400],
                        mx: '0.2rem'
                    }}>•</Typography>
                    <Tooltip title={new Date(createdAt).toUTCString()}><Typography
                        variant="caption"
                        sx={{
                            color: grey[400]
                        }}
                    >
                        created {formatedDate()}
                    </Typography></Tooltip>

                </Box>
            </CardContent>
        </Card>
    );
}
