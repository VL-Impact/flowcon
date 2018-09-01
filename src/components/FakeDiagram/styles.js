/**
 * ### Диаграмма
 * стили оформления
 *
 * Created by Evgeniy Malyarov on 16.08.2018
 */

import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  flex: {
    flex: 1,
    //whiteSpace: 'nowrap',
    paddingTop: theme.spacing.unit,
  },
  container: {
    display: 'flex',
  },
  secondary: {
    marginTop: -theme.spacing.unit * 1.5,
  },
  title: {
    marginLeft: theme.spacing.unit,
    fontSize: '1.1rem',
  },
  height: {
    position: 'relative',
    overflow: 'auto',
    maxHeight: 'calc(100vh - 160px)',
    minWidth: 260,
  },
  expansion: {
    padding: 0,
  },
  summary: {
    minHeight: '24px!important',
  },
  summaryCont: {
    margin: '8px 0!important',
  }
});

export default withStyles(styles);
