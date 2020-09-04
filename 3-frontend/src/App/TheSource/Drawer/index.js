import { createElement as e } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
});


export default function SwipeableTemporaryDrawer() {

  const classes = useStyles();

  const list = () => (
	    e(
	    	'div',
	    	{
	    		className: clsx(
	    			classes.list,
	    			{
	        			[classes.fullList]: false,
	      			}
	      		),
	      		role: 'presentation',
	      		onClick: () => {},
	      		onKeyDown: () => {},
	    	},
	    	e(
	    		List,
	    		{},
	    		[
	    			'Inbox',
	    			'Starred',
	    			'Send email',
	    			'Drafts'

	    		].map( ( text, index ) => (
	          		e(
	          			ListItem,
	          			{
	          				button: true,
	          				key: text,
	          			},
	          			e(
	          				ListItemIcon,
	          				{},
	          				e( InboxIcon )
	          			),
	          			e(
	          				ListItemText,
	          				{
	          					primary: text,	
	          				}
	      				)
	          		)
	        	))
	        ),
	        e( Divider ),
	        e(
	    		List,
	    		{},
	    		[
	    			'Inbox',
	    			'Starred',
	    			'Send email',
	    			'Drafts'

	    		].map( ( text, index ) => (
	          		e(
	          			ListItem,
	          			{
	          				button: true,
	          				key: text,
	          			},
	          			e(
	          				ListItemIcon,
	          				{},
	          				e( InboxIcon )
	          			),
	          			e(
	          				ListItemText,
	          				{
	          					primary: text,	
	          				}
	      				)
	          		)
	        	))
	        )
	    )
  	);

  	return e(
    	SwipeableDrawer,
    	{
    		anchor: 'left',
    		open: true,
    		onOpen: (event) => {
			    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			      return;
			    }
    		},
    		onClose: (event) => {
			    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			      return;
			    }
    		},
    	},
    	list()
	);
}