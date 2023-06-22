import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div>
        <img
          src="https://www.gravatar.com/avatar/HASH"
          alt="avatar"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">Player Name: ******</h3>
        <h5 data-testid="header-score">Player Score: *****</h5>
      </div>
    );
  }
}

export default Header;
