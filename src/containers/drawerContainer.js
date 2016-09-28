import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


import EnterAddressForm from '../forms/enterAddressForm'
import YelpForm from '../forms/yelpForm'
import ErrorContainer from '../containers/errorContainer'
import HeaderContainer from '../containers/headerContainer'
import MapAdder from '../helpers/mapAdder'
import VendorsAdder from '../helpers/vendorsAdder'
import VendorsContainer from '../containers/vendorsContainer'
import DetailsContainer from '../containers/detailsContainer'

export default class DrawerSimpleExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <button
          id='start'
          label="Toggle Drawer"
          onTouchTap={this.handleToggle}
        >start</button>
        <Drawer
        open={this.state.open} width='350'>
        <div className='aside'>
          <img className="image" src="http://s9.postimg.org/k6a8x8hsf/Screen_Shot_2016_09_20_at_8_56_15_PM.png" />
          <ErrorContainer />
          <EnterAddressForm />
          <HeaderContainer />
          <YelpForm />
          <VendorsContainer />
          <VendorsAdder />
          <DetailsContainer />
        </div>
          <MenuItem
          onTouchTap={this.handleToggle}>Close</MenuItem>
        </Drawer>
      </div>
    );
  }
}