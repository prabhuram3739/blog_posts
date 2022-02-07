import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { makeStyles, styled, ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { useSelector, shallowEqual, useDispatch } from "react-redux"

type Props = {
    article: IArticle
  }

const theme = createTheme();

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    }
}))

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div">
        be{bull}nev{bull}o{bull}lent
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export const FetchArticle = ((Props) => {
    const classes = useStyles();
    const articles: readonly IArticle[] = useSelector(
        (state: ArticleState) => state.articles,
        shallowEqual
      );
      console.log('Articles:', articles);
  return (
    <div className={classes.root}>
    <Box sx={{ flexGrow: 1 }}>
    <Grid
    container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
    >
    {articles?.map(elem => (
<Grid item xs={12} sm={6} md={3} key={articles.indexOf(elem)}>
      <Card variant="outlined">{elem}</Card></Grid>))}
</Grid></Box></div>
  );
});