import React, { useState, useEffect } from "react";
import _ from 'lodash';
import { Button, Checkbox, Form, Icon, Message, Transition, Segment, Divider, Grid, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { useLoginFacade } from "./facade";


const LoginPage = (props) => {
    const { formData,
        onFormChange,
        doLogin
    } = useLoginFacade();

    return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        {/*<Image src='/logo.PNG' /> Log-in to your account*/}
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input
              fluid icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              onChange={(__, data) => onFormChange('email', data.value)}
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={ (__, data) => onFormChange('password', data.value)}
          />

          <Button color='teal' fluid size='large'  onClick={() => doLogin()} >
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <a href='/signup'>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
    );

}


export default class Login extends React.Component {
  render()
  {
      return (
          <div>
              <LoginPage />
          </div>
      )
  }
}

