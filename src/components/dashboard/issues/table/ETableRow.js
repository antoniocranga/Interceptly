import { TableRow, TableCell, Checkbox, Tooltip, Card, Typography, withStyles, tooltipClasses, Stack} from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/system';
import React from 'react';

export default function ETableRow(props) {
    const { row, isItemSelected, handleClick, labelId } = props;
    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: '#eeeeee',
          color: 'black',
          minWidth: 150,
          border: '1px solid',
          borderColor: grey[300]
        },
      }));
    return (
        <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.id} selected={isItemSelected}>
            <TableCell padding="checkbox">
                <Checkbox
                    onClick={(event) => handleClick(event, row.id)}
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                        'aria-labelledby': labelId
                    }}
                />
            </TableCell>

            <HtmlTooltip title={
                <Stack>
                    <Typography>{row.issue}</Typography>
                </Stack>
            } placement={'top-end'} arrow>
                <TableCell component="th" id={labelId} scope="row" padding="none">
                    {row.issue}
                </TableCell>
            </HtmlTooltip>
            <TableCell align="right">{row.events}</TableCell>
            <TableCell align="right">{row.severity}</TableCell>
        </TableRow>
    );
}
