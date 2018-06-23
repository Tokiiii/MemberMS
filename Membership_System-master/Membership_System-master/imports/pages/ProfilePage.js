import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import { RaisedButton } from 'material-ui';

const ThinDivider = () => (
  <div className="col-xs-12 col-sm-12" style={{height: 1, backgroundColor: "#E2E2E2", marginTop: 4}}/>
)

class ProfilePage extends Component {

  componentWillMount() {
    if (!Meteor.user()) {
      this.props.history.push('/signin')
    }
  }

  render() {
    return (
      <div className="container-fluid" style={{padding: 15}}>
        {Meteor.user() &&
          <div className="container-fluid" style={{padding: 0}}>
            <div className="col-sm-12 col-xs-12" style={{display: "flex", justifyContent: "center", zIndex: 5}}><Avatar src={Meteor.user().profile.avatar} style={{width: 80, height: 80}}/></div>
            <Paper className="col-sm-12 col-xs-12" zDepth={2} style={{borderRadius: 4, padding: 15, paddingTop: 24, position: "relative", top: -40}}>
              {/* <div className="col-sm-12 col-xs-12" style={{display: "flex", justifyContent: "center"}}><Avatar src="images/RF.png" style={{width: 80, height: 80}}/></div> */}
              <div className="col-sm-12 col-xs-12" style={{textAlign: "center", fontSize: 30, marginTop: 12}}>{Meteor.user().username}</div>
              <ThinDivider />
              <div className="col-xs-12 col-sm-12" style={{padding: 0}}>
                <div className="col-xs-4 col-sm-4" style={{padding: 0}}>
                  <div className="col-xs-12 col-sm-12" style={{fontWeight: "bold", display: "flex", justifyContent: "center"}}>0</div>
                  <div className="col-xs-12 col-sm-12" style={{display: "flex", justifyContent: "center"}}>我的活动</div>
                </div>
                <div className="col-xs-4 col-sm-4" style={{borderLeft: "1px solid #E2E2E2", borderRight: "1px solid #E2E2E2", padding: 0}}>
                  <div className="col-xs-12 col-sm-12" style={{fontWeight: "bold", display: "flex", justifyContent: "center"}}>0</div>
                  <div className="col-xs-12 col-sm-12" style={{display: "flex", justifyContent: "center"}}>我的活动</div>
                </div>
                <div className="col-xs-4 col-sm-4" style={{padding: 0}}>
                  <div className="col-xs-12 col-sm-12" style={{fontWeight: "bold", display: "flex", justifyContent: "center"}}>0</div>
                  <div className="col-xs-12 col-sm-12" style={{display: "flex", justifyContent: "center"}}>我的收藏</div>
                </div>
              </div>
            </Paper>
              
            <Paper className="col-sm-12 col-xs-12" zDepth={2} style={{borderRadius: 4}} >
              <div>{Meteor.user().username}</div>
              <ThinDivider />
              <div>{Meteor.user().profile.studentId}</div>
              <ThinDivider />
              <div>{Meteor.user().emails[0].address}</div>
              <ThinDivider />

            </Paper>

            <Paper className="col-sm-12 col-xs-12" zDepth={2} style={{borderRadius: 4, marginTop: 20}} >
              <div style={{fontSize: 24, marginTop: 10}}>签到情况</div>
              <ThinDivider />
              <div></div>
            </Paper>

            {Meteor.user() && 
              <div className="col-xs-12 col-sm-12" style={{padding: 0, marginLeft: -15, position: "fixed", bottom: 52, display: "flex", justifyContent: "center"}}>
                <RaisedButton primary={true} label="退出登录" onClick={()=>{Meteor.logout(); this.props.callbackParent(0)}}/>
              </div>
            }
          </div>
        }
      </div>
    )
  }
}

export default withRouter(ProfilePage);