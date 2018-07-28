import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card, { CardActions, CardContent, CardMedia, CardHeader, CardTitle } from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import FormatQuote from '@material-ui/icons/FormatQuote';
import SingleLineGridList from '../GridListInline/component.jsx';
import GoogleApiWrapper from '../googleMaps/component.jsx';
import MediumArticles from '../mediumArticles/component.jsx';
import { fetchGitRepositories, fetchMediumArticles, fetchBio } from '../../redux/modules/reducerHandlers';
import { connect } from 'react-redux';

const styles = theme => ({
  card: {
    maxWidth: '100%',
  },
  downloadButton:{
    backgroundColor:"#6279fb",
    color: "#fff",
    fontFamily: "'ubuntu', sans-serif;",
    '&:hover':{
      backgroundColor: "#778cf3;"
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  projectContainer:{

  },
  projectList: {
    paddingLeft: '20%',
  },
  grid: {
    paddingBottom : theme.spacing.unit * 6,
    textAlign: 'center',
  },
  quotes: {

    background: '#ffffff',
    boxShadow: 'none'
  },
  bio: {
    background: '#ffffff',
    boxShadow: 'none',
    paddingLeft: '30%',
    paddingRight: '30%',
  },
  selfPaper:{
    height: theme.spacing.unit * 20,
    position: 'relative',
    background: '#ffffff',
    boxShadow: 'none'
  },
  identity: {
    background: '#ffffff',
    fontFamily: "\"palanquin\", Verdana, Tahoma",
  },
  mapsContainer: {
    height: theme.spacing.unit * 51,
    position: 'relative'
  },
  selfText:{
    fontFamily: "'roboto-thin', sans-serif;",
    fontSize: "1.355rem",
    lineHeight: "1.56429em",
    paddingBottom: theme.spacing.unit * 4,
  },
  quoteText: {
    fontFamily: "\"muli\", Verdana, Tahoma",
    fontSize: "1.675rem",
    opacity: "0.8",
    paddingLeft: '30%',
    paddingRight: '30%',
  },
  quoteAuthor: {
    fontFamily: "'Poiret One', cursive",
    fontSize: "1.0675rem",
    paddingLeft: "30%",
  },
  divider:{
    marginLeft: '25%',
    marginRight: '25%',
    marginBottom: '4%',
    marginTop: '1%',
  },
  backgroundQuotes: {
    backgroundImage: "url('/images/backgroundquotes.jpg')",
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '250px'
  },
  backgroundProjects: {
    backgroundImage: "url('/images/coffee-projects-menu.webp')",
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '350px'
  },
  backgroundHobby: {
    backgroundImage: "url('/images/Hobby.jpg')",
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '350px'
  },
  backgroundPosts:{
    backgroundImage: "url('/images/book-business-coffee.jpg')",
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '350px'
  },
  selfImage: {
    borderRadius: '50%',
    width: '240px',
    height: '240px',
    backgroundImage:'url(/images/self.jpg)',
    backgroundSize: 'cover',
    borderRadius: '50%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    margin: '0',
    position: 'absolute',
    top: '-1%',
    left: '50%',
    transform: 'translate(-50%, -55%)'
  },
  selfBlogImage: {
    borderRadius: '50%',
    width: '240px',
    height: '240px',
    backgroundImage:'url(/images/talks.webp)',
    backgroundSize: 'cover',
    borderRadius: '50%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    margin: '0',
    position: 'absolute',
    top: '-1%',
    left: '50%',
    transform: 'translate(-50%, -55%)'
  },
  projectImage: {
    borderRadius: '50%',
    width: '240px',
    height: '240px',
    backgroundImage:'url(/images/projects.jpg)',
    backgroundSize: 'cover',
    borderRadius: '50%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    margin: '0',
    position: 'absolute',
    top: '-1%',
    left: '50%',
    transform: 'translate(-50%, -55%)'
  },
  titleText:{
    paddingBottom: '5%',
    fontSize: '1.5rem',
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif;',
    boxShadow: 'none'
  },
  selfCamping: {
    borderRadius: '50%',
    width: '240px',
    height: '240px',
    backgroundImage:'url(/images/self-camping.jpg)',
    backgroundSize: 'cover',
    borderRadius: '50%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    margin: '0',
    position: 'absolute',
    top: '-1%',
    left: '50%',
    transform: 'translate(-50%, -55%)'
  },
  [`${theme.breakpoints.down('md')}`]: {
    backgroundHobby:{
      backgroundAttachment: 'unset'
    },
    backgroundPosts:{
      backgroundAttachment: 'unset',
      backgroundSize: 'cover'
    },
    backgroundProjects:{
      backgroundAttachment: 'unset'
    },
    bio: {
      paddingLeft: '20%',
      paddingRight: '20%',
    },
    quoteText: {
      paddingLeft: '20%',
      paddingRight: '20%',
      fontSize: "2.5rem",
    },
    quoteAuthor:{
      fontSize: "2.5rem"
    },
    identity: {
      background: '#ffffff',
      fontFamily: "'Muli', Verdana, Tahoma",
    },
    downloadButton:{
      fontSize: '1.5rem'
    },
    selfText:{
      fontFamily: "'Muli', sans-serif;",
      fontSize: "2.5rem",
      opacity: '0.8'
    },
  }
});

class MainContent extends React.Component  {

  constructor (props) {
		super(props);
	}

  componentDidMount() {
    if(!this.props.fieldState.github){
      this.props.getRepositories();
    }
    if(!this.props.fieldState.medium){
      this.props.getMediumArticles();
    }
    this.props.fetchBio();
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <Grid container className={classes.grid} alignContent='center' alignItems='center' id="home" name="home">
        <Grid item xs={12} lg={12} className={classes.identity} >
          <Paper  className={classes.selfPaper} elevation={2}>
            <Paper className={classes.selfImage}></Paper>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={12} className={classes.identity} >
        <Paper  className={classes.bio} elevation={2}>
          <Typography component="p" className={classes.selfText}>
            {this.props.fieldState.bio || 'I love problem solving and I enjoy working on improvising user interaction. I wish to develop novel solution using the might of todays technology to make life easier and enjoyable. I work on web and mobile applications and strive to build apps that could make life simple and enjoyable for everyone.'}
          </Typography>
        </Paper>
        <Button href="resume_pdf.pdf" target="_blank" className={classes.downloadButton}>
         Download my resume
        </Button>
        <Divider className={classes.divider}/>
        </Grid>

        <Grid item xs={12} lg={12}>
        <Paper className={classes.quotes} elevation={2}>
          <Typography component="p" className={classes.quoteText}>
            <FormatQuote />
          </Typography>
        </Paper>
          <Paper className={classes.quotes} elevation={2}>
            <Typography component="p" className={classes.quoteText}>
            You’ve got to find what you love,” Jobs said. “The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Paper className={classes.quotes} elevation={2}>
            <Typography component="p" className={classes.quoteAuthor}>
              - Steeve Jobs
            </Typography>
          </Paper>
          <Divider className={classes.divider} id="projects" name="projects" />
        </Grid>
        <Grid item xs={12} className={classes.backgroundProjects}>
        </Grid>
        <Grid item xs={12} lg={12} className={classes.identity} >
          <Paper  className={classes.selfPaper} elevation={2}>
            <Paper className={classes.projectImage}></Paper>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={12} >
          <SingleLineGridList style={{paddingLeft: '20%', paddingRight: '20%',overflowY: 'hidden'}} nodes={this.props.fieldState.github} logoUrl='/images/logo.svg' sectionTitle='Projects'/>
          <Divider className={classes.divider} id="blog" name="blog" />
        </Grid>


        <Grid item xs={12} className={classes.backgroundPosts}>
        </Grid>

        <Grid item xs={12} lg={12} className={classes.identity} >
          <Paper  className={classes.selfPaper} elevation={2}>
            <Paper className={classes.selfBlogImage}></Paper>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={12} >
          <SingleLineGridList style={{paddingLeft: '10%', paddingRight: '10%',overflowY: 'hidden'}} nodes={this.props.fieldState.medium} logoUrl='/images/blog.png' sectionTitle='Blogs'/>
          <Divider className={classes.divider} id="hobby" name="hobby"/>
        </Grid>

        <Grid item xs={12} className={classes.backgroundHobby}>
        </Grid>
        <Grid item xs={12} lg={12} className={classes.identity} >
          <Paper  className={classes.selfPaper} elevation={2}>
            <Paper className={classes.selfCamping}></Paper>
          </Paper>
          <Typography className={classes.titleText}>
            Camping
          </Typography>
        </Grid>
        <Grid item xs={12} lg={12} className={classes.mapsContainer}>
          <GoogleApiWrapper/>
        </Grid>

        <Grid item xs={12} lg={12}>
          <Divider className={classes.divider}/>
        </Grid>
      </Grid>
    );
  }
}

MainContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return state;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getRepositories : () => {
      return fetchGitRepositories(dispatch);
    },
    getMediumArticles : () => {
      return fetchMediumArticles(dispatch);
    },
    fetchBio: () => {
      return fetchBio(dispatch);
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((withStyles(styles)(MainContent)));

//<SingleLineGridList style={{paddingLeft: '20%', paddingRight: '20%',}}/>
