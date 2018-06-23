import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Activities } from '../api/collection';
import AvatarList from '../components/AvatarList';
import ActivityInfo from '../components/ActivityInfo';
import Record from '../components/Record';
import QRCode from 'qrcode.react';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ArrowDropRight from 'material-ui/svg-icons/navigation/arrow-drop-down';

const ThinDivider = () => (
  <div className="col-xs-12 col-sm-12" style={{height: 1, backgroundColor: "#E2E2E2", marginTop: 10, marginBottom: 10}}/>
)

class ActivityDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmStatus: false,
      resultStatus: false,
      attendanceStatus: false,
      menuStatus: false,
    }
  }

  handleApply() {
    if (!Meteor.user()) {
      this.props.history.push("/signin");
    }
    Meteor.call('activity.apply', Meteor.userId(), this.props.activity._id);
    this.setState({confirmStatus: false})
    this.handleMenuClose();
  }

  handleQRShow = () => {
    this.setState({attendanceStatus: true, menuStatus: false});
  }

  handleMenuOpen = () => {
    this.setState({menuStatus: true});
  }

  handleMenuClose = () => {
    this.setState({menuStatus: false});
  }

  checkIsApplied() {
    if (!Meteor.user()) {
      return false;
    }
    var that = this;
    return Meteor.user().profile.activities.some((id)=>{
      return id == that.props.activity._id;
    });
  }

  render() {
    const confirmActions = [
      <FlatButton
        label="取消"
        primary={true}
        onClick={() => {this.setState({confirmStatus: false})}}
      />,
      <FlatButton
        label="确定"
        primary={true}
        onClick={this.handleApply.bind(this)}
      />,
    ];
    const resultActions = [
      <FlatButton
        label="确定"
        primary={true}
        onClick={() => {this.setState({resultStatus: false})}}
      />,
    ];
    return (
      <div className="container-fluid" style={{padding: 0, paddingBottom: 46}}>
        {this.props.activity && 
          <div className="container-fluid" style={{padding: 0}}>
            <ActivityInfo activity={this.props.activity} />

            <div className="col-xs-12 col-sm-12" style={{position: "fixed", top: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: 0}}>
              <div style={{fontSize: 18, marginLeft: 16}}  onClick={() => {this.props.history.goBack()}}>
                <i className="fas fa-chevron-left" style={{color: "white"}}></i>
              </div>
              <IconMenu
                iconButtonElement={<IconButton iconStyle={{color: "white"}}><MoreVertIcon onClick={this.handleMenuOpen}/></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                style={{zIndex: 5}}
                open={this.state.menuStatus}
              >
                <MenuItem primaryText="收藏" />
                <MenuItem primaryText="分享" />
                <Divider />
                {Meteor.user() && (Meteor.user().profile.permission == '0' || Meteor.user().profile.permission == '0') && 
                  <div>
                    <MenuItem primaryText="编辑" onClick={()=>{this.props.history.push('/activityedit/' + this.props.activity._id)}}/>
                    <MenuItem primaryText="签到" onClick={this.handleQRShow}
                      // rightIcon={<ArrowDropRight />}
                      // anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                      // targetOrigin={{horizontal: 'right', vertical: 'top'}}
                      // menuItems={[
                      //   <MenuItem primaryText="发布签到" onClick={this.handleQRShow}/>,
                      //   <MenuItem primaryText="查看记录" />,
                      // ]}
                    />
                  </div>
                }
              </IconMenu>
            </div>
            <Dialog
              title="确认报名"
              actions={confirmActions}
              modal={true}
              open={this.state.confirmStatus}
            >
              您是否确认参加{this.props.activity.title}?
            </Dialog>
            <Dialog
              title="报名结果"
              actions={resultActions}
              modal={true}
              open={this.state.resultStatus}
            >
              报名成功
            </Dialog>

            <Dialog
              modal={true}
              open={this.state.attendanceStatus}
              onRequestClose={()=>{this.setState({attendanceStatus: false})}}
            >
              {/* <div className="col-xs-12 col-sm-12" style={{padding: 0}}>
                <div className="col-xs-12 col-sm-12" style={{textAlign: "center", fontSize: 20, overflow: "wrap", marginBottom: 16}}>扫码签到</div>
                <div className="col-xs-12 col-sm-12" style={{displey: "flex", justifyContent: "center"}}>
                  <QRCode size={200} value={"http://192.168.199.202/takeattendance/" + this.props.activity._id}/>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12" style={{display: "flex", justifyContent: "center"}}>
                <FlatButton
                  label="关闭"
                  primary={true}
                  onClick={()=>{this.setState({attendanceStatus: false})}}
                />
              </div> */}
              <Record activity={this.props.activity}/>
            </Dialog>

            <div className="col-xs-12 col-sm-12" style={{position: "fixed", bottom: 0, padding: 4}}>
              <RaisedButton className="col-xs-12 col-sm-12" label={this.checkIsApplied() ? "已报名" : "报名"} primary={true} style={{padding: 0}} onClick={() => {if (!this.checkIsApplied()) this.setState({confirmStatus: true})}}/>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default withTracker((props) => {
  Meteor.subscribe('Activity.one', props.match.params.id);
  return {
    activity: Activities.find({}).fetch()[0],
  }
})(ActivityDetail);