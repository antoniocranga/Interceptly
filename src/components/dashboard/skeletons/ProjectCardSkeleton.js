import { Card, CardContent, CardMedia, Skeleton, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
export default function ProjectCardSkeleton({ props }) {
    return (
        <Card
            variant="outlined"
            sx={{

                border: '1px solid',
                borderColor: grey[300]
            }}
        >
            <Skeleton animation="wave" height={200} variant='rectangle' />
            <CardContent>
                <Skeleton animation="wave" height={10} width="30%" sx={
                    {
                        my: 2
                    }
                } />
                <Skeleton animation="wave" height={10} width="80%" sx={{
                    mb: 1
                }} />
            </CardContent>
        </Card>
    );
}
