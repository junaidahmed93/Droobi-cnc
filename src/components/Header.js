import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import Popover from 'material-ui/Popover';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router';
import imageUrl from '../assets/images/profile.png';
import { loadState } from '../utils/StorageUtils';
import DroobiLogo from '../assets/images/droobi_logo.svg';
import ProfileAvatar from '../assets/images/avatar.jpeg';

class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    const path = browserHistory.getCurrentLocation().pathname;
    const activeHead = path.charAt(6) === 'h' ? 'Hotel' : 'Admin';
    this.onlineUser = loadState();
    this.state = {
      activeItem: activeHead,
      isDraweropen: false,
      itemName: '',
      itemslist: ['Overview Home'],
      open: false,
      showAll: false,
      showOnlyHotel: false,
      showOnlyRemote: false,
    };
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  handleItemClick = (e, name) => {
    this.setState({ activeItem: name });
    const path = this.routeMap(name);
    browserHistory.push(`/home/${path}`);
  };

  routeMap(name) {
    switch (name) {
      case 'Admin':
        return 'admin/dashboard';
      case 'Remote':
        return 'remote';
      case 'Hotel':
        return 'hotel/bookings';
      default:
        return 'admin';
    }
  }

  handleDrawerClose() {
    this.setState({ isDraweropen: false });
  }
  getActiveItem = (links) => {
    let item = '';
    links.forEach((element) => {
      if (element.Index) {
        item = element.link;
      }
    });
    this.setState({ activeItem: item });
  };
  getHeaderLinks = () => {
    const { activeItem } = this.state;

    // if (!this.props.firstLogin) {
    return this.props.links.map(element => (
      <Menu.Item
        className="menu-item menuTabStyle"
        name={element.tag}
        id={element.tag}
        active={activeItem === element.tag}
        onClick={this.handleItemClick}
        data-index={element.address}
      />
    ));
  };
  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  componentWillMount() {
    if (this.props.loggedInUser.role.roleType === 'hotel' || this.props.loggedInUser.role.roleType === 'hotelCheckInAdmin') {
      this.setState({ showOnlyHotel: true });
    }
    if (this.props.loggedInUser.role.roleType === 'remote') {
      this.setState({ showOnlyRemote: true });
    }
    if (this.props.loggedInUser.role.roleType === 'admin') {
      this.setState({ showAll: true });
    }
  }
  render() {
    let loggedUserName;
    if (this.onlineUser) {
      loggedUserName = loadState().name;
    } else {
      loggedUserName = 'Not Logged';
    }
    const { activeItem } = this.state;
    console.log('activeItem', activeItem);
    return (
      <Menu
        pointing
        secondary
        size="massive"
        className="menu-header custom-header"
      >
        <Menu.Item
          name="Overview"
          widths={10}
          style={{ alignSelf: 'center', marginRight: '65px' }}
        >
          <div >
            <img height="100px" width="100px" src={DroobiLogo} />
          </div>
        </Menu.Item>
        {this.state.showAll ?
          <Menu
            pointing
            secondary
            size="massive"
            className="menu-header border-transparent"
          >
            <Menu.Item className="menu-header-list" active={activeItem === 'Admin'} onClick={(e) => { this.handleItemClick(e, 'Admin'); }} >
              <span >CNC</span>
            </Menu.Item>

          </Menu>
          : null}
        {this.state.showOnlyHotel ?
          <Menu
            pointing
            secondary
            size="massive"
            className="menu-header border-transparent"
          >
            <Menu.Item name="Hotel Check-in" className="menu-header-list" active={activeItem === 'Hotel'} onClick={(e) => { this.handleItemClick(e, 'Hotel'); }} />
          </Menu>
          : null}


        <Menu.Item
          position="right"
          style={{ paddingBottom: 0, marginRight: 30, cursor: 'pointer' }}
          onClick={this.handleClick}
        >
          <div style={{ display: 'flex', fontWeight: 'bold' }}>
            <div className="account" > <img alt="profile" height="42px" width="42px" src={ProfileAvatar} /> </div>
            <div style={{ height: 'fit-content', marginTop: 10 }}>
              <div style={{ fontSize: 10, color: '#715E0B' }}>Logged in as</div>
              <div style={{color:'#715E0B'}}>{loggedUserName}</div>
            </div>
          </div>
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            onRequestClose={this.handleRequestClose}
          >
            <MenuItem primaryText="Profile" onClick={() => { this.setState({ open: false }); this.props.profile(); }} />
            <MenuItem primaryText="Logout" onClick={this.props.logout} />

          </Popover>
        </Menu.Item>
      </Menu>
    );
  }
}

export default HeaderMenu;
