import { Card, CardContent, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function IssueCard({props}){
    const {id, title, description} = props;
    return (
        <Card variant='outlined' sx={{
            borderRadius: '8px',
            borderColor: grey[300]
        }}>
            <CardContent>
                <Typography variant='h6'>{title}</Typography>
                <Typography variant='body1'>{description}</Typography>
                <Typography variant='caption'>{id}</Typography>
            </CardContent>
        </Card>
    );
}