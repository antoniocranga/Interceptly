import { Checkbox, ListItem, Skeleton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Stack } from "@mui/system";

export default function IssueCardSkeleton(props) {
    const { index, length } = props;
    return (<ListItem
        key={index}
        sx={{
            pl: '1rem',
            borderBottom: '1px solid',
            borderLeft: '1px solid',
            borderRight: '1px solid',
            borderColor: grey[300],
            borderRadius: index == 0 && length > 1 ? '0px' : index == 0 ? '0px 0px 8px 8px' : index == length - 1 ? '0px 0px 8px 8px' : '0px',
        }}>
        <Checkbox
            sx={{
                display: {
                    xs: 'none',
                    sm: 'flex',
                },
                mr: '0.5rem'
            }}
            edge="start"
            checked={false}
            disabled
        />
        <Stack sx={{
            width: "100%",
            py: '0.5rem'
        }}
        >
            <Skeleton animation="wave" height={10} width="60%" variant="text" />
            <Skeleton animation="wave" height={10} width="30%" variant="text" sx={{
                mt: '0.5rem',
                mb: '1rem'
            }} />
            <Stack direction={"row"} spacing={1}>
                <Skeleton animation="wave" height={30} width="10%" variant="text" />
                <Skeleton animation="wave" height={30} width="10%" variant="text" />
                <Skeleton animation="wave" height={30} width="10%" variant="text" />
            </Stack>
        </Stack>
    </ListItem>);
}