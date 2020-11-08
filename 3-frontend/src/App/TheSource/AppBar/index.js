import { createElement as e } from 'react';
import { getState } from '../../reduxX';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const getClasses = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


const getStyles = () => {

    const {

        backgroundColor

    } = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor,
            // width: 300,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
    };
};



export default ({

    websiteName

}) => {

    const classes = getClasses();

    return e(
        AppBar,
        {
            // position: 'static',
        },
        e(
            Toolbar,
            {},
            e(
                IconButton,
                {
                    edge: 'start',
                    className: classes.menuButton,
                    color: 'inherit',
                    ['aria-label']: 'menu'
                },
                e(
                    MenuIcon
                ),
            ),
            e(
                Typography,
                {
                    variant: 'h6',
                    className: classes.title,
                },
                websiteName,
            ),
            e(
                Button,
                {
                    color: 'inherit',
                },
                'Login'
            )
        )
    );
};
