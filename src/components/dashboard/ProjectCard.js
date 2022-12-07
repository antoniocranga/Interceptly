import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import theme from '../../theme';
import Link from 'next/link';
import { useRouter } from 'next/router';
export default function ProjectCard({ props }) {
    const { name, id } = props;
    const projectPath = `/dashboard/${id}`;
    const router = useRouter();
    const handleOnClick = () => {
        router.push(projectPath);
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
            <CardMedia component="img" heigth="140" image="/assets/images/1.jpg" />
            <CardContent>
                <Typography variant="h6">{name}</Typography>
                <Typography
                    variant="caption"
                    sx={{
                        color: grey[400]
                    }}
                >
                    {id}
                </Typography>
            </CardContent>
        </Card>
    );
}
