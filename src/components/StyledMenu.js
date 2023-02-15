import * as React from 'react';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/router';
import { Box, Menu, MenuItem } from '@mui/material';

const TriggerButton = styled('button')(
    ({ theme }) => `
  line-height: 0.25rem;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 7px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[300]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }
  @media only screen and (min-width: 800px){
    display: none
  }
  `
);

export default function StyledMenu({ pages }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isOpen = Boolean(anchorEl);
    const router = useRouter();
    const paths = router.asPath.split('/');
    const activeScreen = paths[paths.length - 1].split('?')[0];
    const handleButtonClick = (event) => {
        if (isOpen) {
            setAnchorEl(null);
        } else {
            setAnchorEl(event.currentTarget);
        }
    };

    const close = () => {
        setAnchorEl(null);
    };

    const createHandleMenuClick = (menuItem) => {
        return () => {
            close();
            router.push(menuItem);
        };
    };
    return (

        <div>
            <TriggerButton
                type="button"
                onClick={handleButtonClick}
                aria-controls={isOpen ? 'simple-menu' : undefined}
                aria-expanded={isOpen || undefined}
                aria-haspopup="menu"
            >
                <MenuIcon />
            </TriggerButton>
            <Menu open={isOpen} onClose={close} anchorEl={anchorEl}>
                {pages.map((page, index) => {

                    return page.name == 'space' ? <Box key={'key'} sx={{ height: '1rem' }} /> : (
                        <MenuItem
                            key={page.name}
                            onClick={createHandleMenuClick(page.path)}
                            sx={{
                                mb: index < pages.length - 1 ? '5px' : 0
                            }}
                            selected={page.name.toLowerCase() == activeScreen}
                        >
                            {page.name}
                        </MenuItem>
                    )
                })}
            </Menu>
        </div>
    );
}
