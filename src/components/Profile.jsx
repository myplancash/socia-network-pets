import React from 'react';
import { fetchUserData, cancelFetch } from '../dataFetcher';
import { Userlist } from './Userlist';

export class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: null,
    }
  }

  componentDidMount() {
    this.loadUserData();
  }
  // only the username updates. We don’t fetch new data:
  componentDidUpdate(prevProps) {
    //If the username has changed 
    if(this.props.username !== prevProps.username) {
      cancelFetch(this.fetchID) 
      this.loadUserData()
    }
  }
  
  componentWillUnmount() {
    cancelFetch(this.fetchID)
  }

  loadUserData() {
    this.setState({userData: null})
    this.fetchID = fetchUserData(this.props.username, (userData) => {
      this.setState({userData})
    })
  } 

  render() {
    const isLoading = this.state.userData === null ? true : false;

    let className = 'Profile';
    if (isLoading) {
      className += ' loading';
    }
    const name = isLoading ? "Loading..." : this.state.userData.name;
    const bio = isLoading ? "Loading..." : this.state.userData.bio;
    const friends = isLoading ? [] : this.state.userData.friends

    return (
      <div className={className}>
        <div className="profile-picture">
        {!isLoading && (<img src={this.state.userData.profilePictureUrl} alt=""/>)}
        </div>
        <div className="profile-body">
          <h2>{name}</h2>
          <h3>@{this.props.username}</h3>
          <p>{bio}</p>
          <h3>My friends</h3>
          <Userlist usernames={friends} onChoose={this.props.onChoose} />
        </div>
      </div>
    );
  }
}