import React from 'react';
import Matter from "matter-js";
import Joint from "./Joint";

export default class GameField extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      jointsList:[],
    };
    this.domObjectRef = React.createRef();
  }

  componentDidMount() {
    this.engine = Matter.Engine.create();
    this.updateGamefieldPosition();
  }

  updateGamefieldPosition = () => {
    const gamefieldCorner = this.domObjectRef.current.getBoundingClientRect();
    this.gamefieldCornerX = gamefieldCorner.left;
    this.gamefieldCornerY = gamefieldCorner.top;
  };

  handleGameFieldClick = (event) => {
    this.addJoint(event.clientX - this.gamefieldCornerX, event.clientY - this.gamefieldCornerY);
    if (this.selectedJoint) this.selectedJoint = "";
  };

  handleJointClick = jointIndex => () => {
    if (this.selectedJoint) this.addBone(this.selectedJoint, this.state.jointsList[jointIndex]);
    else this.selectedJoint = this.state.jointsList[jointIndex]
  };

  addJoint = (x,y) => {
    let newJointsList = this.state.jointsList;
    newJointsList.push(new Joint(x, y, newJointsList.length, this.engine, this.handleJointClick));
    this.setState({jointsList:newJointsList})
  };

  addBone = (joint1, joint2) => {
    let newBonesList = this.state.bonesList;
    newBonesList.push(new Bone(joint1, joint2, bonesList.length, this.engine, this.handleBoneClick));
    this.setState({bonesList:newBonesList});
  };

  stepSimulation = (time) => {
    const stepTime = isFinite(time) ? time : 200;
    const startTime = new Date().getTime();
    this.renderStep(startTime, startTime, stepTime)
  };

  renderStep = (animationStartTime, previousCallTime, targetAnimationLength) => {
    const currentTime = new Date().getTime();
    Matter.Engine.update(this.engine, previousCallTime-currentTime, 1);
    this.forceUpdate();
    if (targetAnimationLength && currentTime - animationStartTime < targetAnimationLength) window.requestAnimationFrame(()=>{
      this.renderStep(animationStartTime, currentTime, targetAnimationLength)
    })
  };

  render()
  {
    return (
      <React.Fragment>
        <div className="BIGBUTTON" onClick={this.stepSimulation}/>
        <div ref={this.domObjectRef}
             className="gamefield"
             onClick={this.handleGameFieldClick}>
          {this.state.jointsList.map(joint => {return joint.render()})}
        </div>
      </React.Fragment>
    );
  }
}