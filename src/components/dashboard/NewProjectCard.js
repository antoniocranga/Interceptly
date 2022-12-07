import { AddOutlined } from '@mui/icons-material';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import theme from '../../theme';
export default function NewProjectCard({}) {
    return (
        <Card
            variant="outlined"
            sx={{
                ':hover': {
                    boxShadow: theme.custom.customBoxShadow,
                    borderColor: theme.palette.primary.main
                },
                border: '1px solid',
                borderColor: theme.palette.primary.main,
                borderStyle: 'dashed'
            }}
        >
            <CardContent
                sx={{
                    textAlign: 'center',
                    transition: '500ms color',
                    ':hover': {
                        color: theme.palette.primary.main,
                        transitionDuration: '500ms'
                    }
                }}
            >
                <AddOutlined />
                <Typography variant="h6">Create a new project</Typography>
            </CardContent>
        </Card>
    );
}
