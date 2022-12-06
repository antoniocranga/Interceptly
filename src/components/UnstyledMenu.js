import * as React from 'react';
import MenuUnstyled, { MenuUnstyledActions } from '@mui/base/MenuUnstyled';
import MenuItemUnstyled, { menuItemUnstyledClasses } from '@mui/base/MenuItemUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import { blue, grey } from '@mui/material/colors';
import Link from 'next/link';
import { NextRequest, NextResponse } from 'next/server';
import { useRouter } from 'next/router';
const StyledListbox = styled('ul')(
    ({ theme }) => `
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0px 0px 24px;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[300]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[300]};
  @media only screen and (min-width: 800px){
    display: none
  }
  `
);

const StyledMenuItem = styled(MenuItemUnstyled)(
    ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `
);

const TriggerButton = styled('button')(
    ({ theme }) => `
  line-height: 0.25rem;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 7px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  `
);

const Popper = styled(PopperUnstyled)`
    z-index: 1;
`;

export default function UnstyledMenuIntroduction({ pages }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isOpen = Boolean(anchorEl);
    const buttonRef = React.useRef(null);
    const menuActions = React.useRef(null);
    const router = useRouter();
    const handleButtonClick = (event) => {
        if (isOpen) {
            setAnchorEl(null);
        } else {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleButtonKeyDown = (event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            setAnchorEl(event.currentTarget);
            if (event.key === 'ArrowUp') {
                menuActions.current?.highlightLastItem();
            }
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
                onKeyDown={handleButtonKeyDown}
                ref={buttonRef}
                aria-controls={isOpen ? 'simple-menu' : undefined}
                aria-expanded={isOpen || undefined}
                aria-haspopup="menu"
            >
                <MenuIcon />
            </TriggerButton>
            <MenuUnstyled
                actions={menuActions}
                open={isOpen}
                onClose={close}
                anchorEl={anchorEl}
                slots={{ root: Popper, listbox: StyledListbox }}
                slotProps={{ listbox: { id: 'simple-menu' } }}
            >
                {pages.map((page) => (
                    <StyledMenuItem onClick={createHandleMenuClick(page.path)}>{page.name}</StyledMenuItem>
                ))}
            </MenuUnstyled>
        </div>
    );
}
