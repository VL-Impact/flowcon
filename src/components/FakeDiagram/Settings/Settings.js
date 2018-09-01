/**
 * Настройки диаграмм
 *
 * @module Settings
 *
 * Created by Evgeniy Malyarov on 23.08.2018.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloudQueue from '@material-ui/icons/LineStyle';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import DialogActions from '@material-ui/core/DialogActions';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Grid1 from './grid1';
import Grid2 from './grid2';
import Grid3 from './grid3';
import Grid12 from './grid12';
import Grid13 from './grid13';
import Grid123 from './grid123';
import Grid23 from './grid23';

import Composition from './Composition';
import connect from '../connect';
import compose from 'recompose/compose';

import {withIface} from 'metadata-redux';

class Settings extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      available: [],
      expansion: {
        layout: true,
        composition: false,
      },
    };
  }

  componentDidMount() {
    this.props.available()
      .then((available) => this.setState({available: available.available}));
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  setLayout(mode) {
    this.handleClose();
    this.props.handleNavigate(`${location.pathname}?grid=${mode}`);
  }

  expandLayout = () => {
    let {layout, composition} = this.state.expansion;
    if(layout) {
      composition = true;
    }
    layout = !layout;
    this.setState({expansion: {layout, composition}});
  };

  expandComposition = () => {
    let {layout, composition} = this.state.expansion;
    if(!composition) {
      layout = false;
    }
    composition = !composition;
    this.setState({expansion: {layout, composition}});
  };

  render() {
    const {props: {classes, changeCharts}, state: {open, expansion, available}} = this;
    return <div>
      <IconButton

        title="Настройка диаграмм"
        buttonRef={node => {
          this.anchorEl = node;
        }}
        onClick={this.handleOpen}
      >
        <CloudQueue color="inherit"/>
      </IconButton>
      <Popper
        open={open}
        anchorEl={this.anchorEl}
        placement="bottom-end"
        modifiers={{
          flip: {
            enabled: false,
          }
        }}
      >
        <Paper>
          <ExpansionPanel expanded={expansion.layout} onChange={this.expandLayout}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{expanded: classes.summary, content: classes.summaryCont}}>
              <Typography variant="title" color="textSecondary" className={classes.title}>Расположение</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expansion}>
              <MenuList className={classes.height}>
                <MenuItem onClick={() => this.setLayout(1)}>
                  <ListItemIcon>
                    <Grid1 />
                  </ListItemIcon>
                  <ListItemText inset primary="Одна колонка" />
                </MenuItem>
                <MenuItem onClick={() => this.setLayout(2)}>
                  <ListItemIcon>
                    <Grid2 />
                  </ListItemIcon>
                  <ListItemText inset primary="Две колонки" />
                </MenuItem>
                <MenuItem onClick={() => this.setLayout(3)}>
                  <ListItemIcon>
                    <Grid3 />
                  </ListItemIcon>
                  <ListItemText inset primary="Три колонки" />
                </MenuItem>
                <MenuItem onClick={() => this.setLayout(12)}>
                  <ListItemIcon>
                    <Grid12 />
                  </ListItemIcon>
                  <ListItemText inset primary="Одна + две" />
                </MenuItem>
                <MenuItem onClick={() => this.setLayout(13)}>
                  <ListItemIcon>
                    <Grid13 />
                  </ListItemIcon>
                  <ListItemText inset primary="Одна + три" />
                </MenuItem>
                <MenuItem onClick={() => this.setLayout(23)}>
                  <ListItemIcon>
                    <Grid23 />
                  </ListItemIcon>
                  <ListItemText inset primary="Две + три" />
                </MenuItem>
                <MenuItem onClick={() => this.setLayout(123)}>
                  <ListItemIcon>
                    <Grid123 />
                  </ListItemIcon>
                  <ListItemText inset primary="Одна + две + три" />
                </MenuItem>
              </MenuList>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel expanded={expansion.composition} onChange={this.expandComposition}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{expanded: classes.summary, content: classes.summaryCont}}>
              <Typography variant="title" color="textSecondary" className={classes.title}>Состав</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expansion}>
              <Composition rows={available} changeCharts={changeCharts}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Записать
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Закрыть
            </Button>
          </DialogActions>
        </Paper>
      </Popper>
    </div>;
  }
}

Settings.propTypes = {
  handleNavigate: PropTypes.func.isRequired,
  available: PropTypes.func.isRequired,
  changeCharts: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default compose(withIface, connect)(Settings);
