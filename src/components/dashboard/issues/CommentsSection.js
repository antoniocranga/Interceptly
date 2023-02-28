import {
    Avatar,
    Button,
    createMuiTheme,
    createTheme,
    Divider,
    Grid,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Skeleton,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import theme from '../../../theme';
import { convertToRaw } from 'draft-js';
import dynamic from 'next/dynamic';
import { stateToHTML } from 'draft-js-export-html';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import * as timeago from 'timeago.js';
import { useAppContext } from '../../../utils/AppContext';
import { DeleteOutline, SendOutlined } from '@mui/icons-material';
import Endpoints from '../../../api/endpoints';
import parse from 'html-react-parser';
const TextEditor = dynamic(() => import('mui-rte'), {
    ssr: false,
    // eslint-disable-next-line react/display-name
    loading: () => (
        <>
            <Skeleton variant="text" sx={{ width: '15%', borderRadius: '8px' }} />
            <Skeleton variant="rectangular" sx={{ width: '100%', marginBottom: 3, borderRadius: '8px' }} height={100} />
        </>
    )
});

export default function CommentsSection(props) {
    const { issueComments } = props;
    const [comments, setComments] = useState(issueComments);
    const router = useRouter();
    const { projectId, issueId } = router.query;

    const [controller, setController] = useState('');
    const onEditorChange = (event) => {
        setController(stateToHTML(event.getCurrentContent()));
    };
    const defaultTheme = createTheme();
    Object.assign(defaultTheme, {
        overrides: {
            MUIRichTextEditor: {}
        }
    });

    const formattedDate = (date) => {
        return timeago.format(new Date(date));
    };

    const { appState } = useAppContext();
    const postComment = () => {
        if (controller.length == 0) {
            return;
        }
        axios
            .post(`${Endpoints.comments}`, {
                issueId: issueId,
                projectId: projectId,
                comment: controller.toString()
            })
            .then((data) => {
                setComments((oldComments) => [data.data, ...oldComments]);
            })
            .catch((err) => {});
    };
    const deleteComment = (id) => () => {
        console.log(id);
        axios
            .delete(`${Endpoints.comments}`, {
                data: {
                    projectId: projectId,
                    id: id
                }
            })
            .then((data) => {
                let filteredArray = comments.filter((com) => com.id != id);
                setComments(filteredArray);
            })
            .catch((err) => {});
    };
    return (
        <Stack
            spacing={2}
            sx={{
            }}
        >
            <ContentTitle>Comments</ContentTitle>
            <TextEditor
                theme={defaultTheme}
                label="Start typing a comment..."
                toolbarButtonSize="small"
                maxLength={300}
                onChange={onEditorChange}
                controls={[
                    'title',
                    'bold',
                    'italic',
                    'underline',
                    'strikethrough',
                    'highlight',
                    'undo',
                    'redo',
                    'quote',
                    'numberList',
                    'bulletList',
                    'link',
                    'code',
                    'clear'
                ]}
            />
            <Box
                sx={{
                    height: '50px'
                }}
            />
            <Divider />
            <Box display="flex" justifyContent={'end'}>
                <Button onClick={postComment} variant="contained" disableElevation startIcon={<SendOutlined fontSize="medium" />}>
                    Post comment
                </Button>
            </Box>
            <List
                disablePadding
                sx={{
                    maxHeight: '690.5px',
                    overflowY: 'auto',
                }}
            >
                {comments &&
                    comments.map((comment) => (
                        <ListItem disablePadding disableGutters key={comment.id} alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar>{comment.email[0]}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Stack direction="row" justifyContent={'space-between'} alignItems={'center'}>
                                        <Grid container alignItems={'center'}>
                                            <Grid item xs={12} sm={4} lg={12}>
                                                <Box display="flex" alignItems={'center'}>
                                                    <Typography>{comment.email.split('@')[0]}</Typography>
                                                    {appState.user.id == comment.userId && (
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                background: theme.palette.primary.main,
                                                                borderRadius: '4px',
                                                                px: '0.5rem',
                                                                mx: '0.7rem'
                                                            }}
                                                            color="white"
                                                        >
                                                            you
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} sm={8} lg={12}>
                                                <Typography variant="body2" color={grey[500]}>
                                                    {formattedDate(comment.createdAt)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        {appState.user.id == comment.userId && (
                                            <Box display="flex">
                                                <Button
                                                    variant="text"
                                                    size="small"
                                                    color="error"
                                                    onClick={deleteComment(comment.id)}
                                                    startIcon={<DeleteOutline fontSize="small" />}
                                                >
                                                    Delete
                                                </Button>
                                            </Box>
                                        )}
                                    </Stack>
                                }
                                secondary={parse(comment.comment)}
                            />
                        </ListItem>
                    ))}
            </List>
        </Stack>
    );
}
function ContentTitle({ children }) {
    return (
        <Typography variant="body1" fontWeight={'500'}>
            {children}
        </Typography>
    );
}
