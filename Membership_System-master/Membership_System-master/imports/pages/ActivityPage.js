import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Activities } from '../api/collection';
import { ActivityCard } from '../components/ActivitiesContainer';

class ActivityPage extends Component {

  componentWillMount() {
    if (!Meteor.user()) {
      this.props.history.push('/signin')
    }
  }

  renderActivities() {
    return this.props.activities.map((activity) => {
      return <ActivityCard key={activity._id} activity={activity} />
    })
  }

  render() {
    return (
      <div style={{paddingTop: 15, paddingBottom: 48, overflow: "auto"}}>
        {this.props.activities && this.renderActivities()}
      </div>
    )
  }
}

export default withRouter(withTracker(() => {
  handleActivity = Meteor.subscribe('Activity.all');
  activitiesArray = [];
  if (handleActivity.ready() && Meteor.user()) {
    Meteor.user().profile.activities.map((activityId) => {
      activitiesArray.push(Activities.find({_id: activityId}).fetch()[0]);
    })
  }
  return {
    activities: activitiesArray,
  }
})(ActivityPage));