import React from 'react'
import {
  Menu,
} from 'semantic-ui-react'

const MainMenu = ({active_page}) => {
  // const { activeItem } = this.state

    return (
      <Menu stackable>
        <Menu.Item>
          {/*<img src='/logo.png' />*/}
        </Menu.Item>

        <Menu.Item
          name='Home'
           active={active_page === 'home'}
        >
          Home
        </Menu.Item>

        <Menu.Item
          name='First'
          active={active_page === 'First'}
          href="/Build"
          // onClick={this.handleItemClick}
        >
          Pick your own trip
        </Menu.Item>

        <Menu.Item
          name='Second'
          active={active_page === 'Second'}
          href="/recommend"
          // onClick={this.handleItemClick}
        >
          Recommendations System
        </Menu.Item>
         <Menu.Item
          name='AboutUs'
          active={active_page === 'AboutUs'}
          href="/about-us"
          // onClick={this.handleItemClick}
        >
          About Us
        </Menu.Item>
      </Menu>
  )
}

export default MainMenu