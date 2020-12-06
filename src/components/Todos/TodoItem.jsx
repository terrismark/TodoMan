import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Delete, Edit } from '@material-ui/icons'
import { 
  ListItemIcon, 
  ListItemSecondaryAction, 
  ListItemText, 
  Checkbox, 
  IconButton, 
  ListItem,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
    secondaryButton: {
      marginRight: 0,
    },
    textItem: {
        minWidth: 80,
        maxWidth: 140,
        marginRight: 80
    }
})

export default function TodoItem({ key, value }) {
    const classes = useStyles();

    return (
        <ListItem key={key} button>
            <ListItemIcon color="primary">
                <Checkbox
                    edge="start"
                    color="primary"
                    disableRipple
                />
            </ListItemIcon>

            <ListItemText className={classes.textItem}>
                <Typography>
                    {value}
                </Typography>
            </ListItemText>

            <ListItemSecondaryAction>
                <IconButton edge="end" className={classes.secondaryButton}>
                    <Edit />
                </IconButton>
                
                <IconButton edge="end" color="primary">
                    <Delete />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}