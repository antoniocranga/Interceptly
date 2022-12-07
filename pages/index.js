import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SyntaxHighlight from '../src/utils/SyntaxHighlight';
import { grey } from '@mui/material/colors';

export default function Index() {
    const code = `
  try{
    //do some work
  }catch(e){
    //call Interceptly
  }
  `;
    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Next.js example
                </Typography>
            </Box>
            <Box
                sx={{
                    pre: {
                        borderRadius: '6px',
                        border: '1px solid',
                        borderColor: grey[300],
                        background: grey[100]
                    }
                }}
            >
                <SyntaxHighlight>{code}</SyntaxHighlight>
            </Box>
        </Container>
    );
}
