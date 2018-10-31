import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

class LoginControl extends React.Component {
    
    constructor(props) {
      super(props);
      this.handleLoginClick = this.handleLoginClick.bind(this);
      this.handleLogoutClick = this.handleLogoutClick.bind(this);
      this.state = {isLoggedIn: false, unreadMessages: props.unreadMessages, showWarning: props.showWarning};
      this.handleToggleClick = this.handleToggleClick.bind(this);
    }
  
    handleLoginClick() {
      this.setState({isLoggedIn: true});
    }
  
    handleLogoutClick() {
      this.setState({isLoggedIn: false});
    }
    
    handleToggleClick() {
        this.setState(prevState => ({
          showWarning: !prevState.showWarning
        }));
      }

    render() {
      const isLoggedIn = this.state.isLoggedIn;
      let button;
  
      if (isLoggedIn) {
        button = <LogoutButton onClick={this.handleLogoutClick} />;
      } else {
        button = <LoginButton onClick={this.handleLoginClick} />;
      }
  
      return (
        <div>
          <Greeting isLoggedIn={isLoggedIn} unreadMessages={this.state.unreadMessages} showWarning={this.state.showWarning}/>
          {button}
            {
                isLoggedIn &&
                <button onClick={this.handleToggleClick}>
                    {this.state.showWarning ? 'Hide Warning' : 'Show Warning'}
                </button>
            }
        </div>
      );
    }
  }
  
  function UserGreeting(props) {
    return <h1>Welcome back! 
            <div>
            {/* Inline If with Logical && Operator */}
                {props.unreadMessages.length > 0 &&
                <h2>
                    You have {props.unreadMessages.length} unread messages.
                </h2>
                }
            </div>
        </h1>;
  }
  
  function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
  }
  
  function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    const unreadMessages = props.unreadMessages;
    const showWarning = props.showWarning;
    if (isLoggedIn) {
      return <div>
                <UserGreeting unreadMessages={unreadMessages}/>
                <WarningBanner warn={showWarning} />
            </div>;
    }
    return <GuestGreeting />;
  }
  
  function LoginButton(props) {
    return (
      <button onClick={props.onClick}>
        Login
      </button>
    );
  }
  
  function LogoutButton(props) {
    return (
      <button onClick={props.onClick}>
        Logout
      </button>
    );
  }

//   Preventing Component from Rendering
  function WarningBanner(props) {
    // Returning null from a component’s render method does not affect the firing of the component’s lifecycle methods.
    //  For instance componentDidUpdate will still be called.
    if (!props.warn) {
      return null;
    }
  
    return (
      <div className="warning">
        Warning!
      </div>
    );
  }

  const messages = ['React', 'Re: React', 'Re:Re: React'];
  const showWarning = true;
// const messages = [];
  ReactDOM.render(
    <LoginControl unreadMessages={messages} showWarning={showWarning}/>,
    document.getElementById('root')
  );
  

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
