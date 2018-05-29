import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TabContainer from '../tabContainer/tabContainer.js';
import SingleLineGridList from '../GridListInline/component.jsx';
import Footer from '../footer/component.jsx';
//import BackgroundImage from '../../../images/background.jpg';
import MainContent from '../mainContent/component.jsx';

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
  },
  backgroundPaper:{
    width: '100%'
  },
  backgroundGrid: {
    marginTop: '-147px',
    marginBottom: '-337px'
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: `${theme.spacing.unit * 0}px`,
    boxShadow: "none",
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
});

function CSSGrid(props) {
  const { classes } = props;

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <TabContainer />
        </Grid>
        <Grid item xs={12} className={classes.backgroundGrid}>
        <Paper>
          <img className={classes.backgroundPaper} id='image' src='/images/background.jpg' />
        </Paper>
        </Grid>
        <Grid item xs={12}>
          <MainContent/>
        </Grid>
        <Grid item xs={12}>
          <SingleLineGridList/>
        </Grid>
        <Grid item xs={12}>
          <Footer/>
        </Grid>
      </Grid>
    </div>
  );
}

CSSGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CSSGrid);
