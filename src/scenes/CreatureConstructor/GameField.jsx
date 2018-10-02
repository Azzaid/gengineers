import React from 'react';
import Matter from "matter-js";
import Joint from "./components/Joint";
import Bone from "./components/Bone";
import {GROUND} from "../../constants";
import getAngleBetweenDots from "../../scripts/getAngleBetweenDots";

export default class GameField extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {};
    this.jointsList = [];
    this.bonesList = [];
    this.domObjectRef = React.createRef();
  }

  componentDidMount() {
    this.engine = Matter.Engine.create();
    this.debugScreen = document.getElementById('debugCanvas');
    if (this.debugScreen) {
      this.debugScreenRenderer = Matter.Render.create({canvas:this.debugScreen, engine:this.engine});
      Matter.Render.run(this.debugScreenRenderer);
    }
    this.updateGamefieldPosition();
    this.addGround([{x:0, y:500}, {x:200, y:500},  {x:400, y:550},  {x:600, y:500},  {x:800, y:500},])
  }

  updateGamefieldPosition = () => {
    const gamefieldCorner = this.domObjectRef.current.getBoundingClientRect();
    this.gamefieldCornerX = gamefieldCorner.left;
    this.gamefieldCornerY = gamefieldCorner.top;
  };
  
  addGround = groundSurfaceArray => {
    let previousDot = false;
    groundSurfaceArray.forEach(({x,y}) => {
      if (previousDot) {
        
        const length = Math.sqrt(Math.pow((previousDot.y - y) ,2) + Math.pow((previousDot.x - x),2));
        const angle = getAngleBetweenDots([previousDot.x,previousDot.y],[x, y]);
  
        const centerX = Math.min(previousDot.x, x) + Math.abs(previousDot.x - x)/2;
        const centerY = Math.min(previousDot.y, y) + Math.abs(previousDot.y - y)/2;
        
        const matterObject = Matter.Bodies.rectangle(centerX, centerY, length, GROUND.thickness, {
          angle:angle/57.29,
          isStatic:true,
        });
        
        Matter.World.add(this.engine.world, [matterObject]);
  
        previousDot = {x:x, y:y};
        
      } else {
        previousDot = {x:x, y:y};
      }
    })
  };

  handleGameFieldClick = (event) => {
    if (this.selectedJoint) this.selectedJoint = "";
    else this.addJoint(event.clientX - this.gamefieldCornerX, event.clientY - this.gamefieldCornerY);
  };

  handleJointClick = jointIndex => event => {
    if (this.selectedJoint) {
      this.addBone(this.selectedJoint, this.jointsList[jointIndex]);
      this.selectedJoint = '';
    }
    else {
      this.selectedJoint = this.jointsList[jointIndex];
      this.forceUpdate();
    }
    event.stopPropagation();
  };

  addJoint = (x,y) => {
    this.jointsList.push(new Joint(x, y, this.jointsList.length, this.engine, this.handleJointClick));
    this.forceUpdate();
  };

  addBone = (joint1, joint2) => {
    this.bonesList.push(new Bone(joint1, joint2, this.bonesList.length, this.engine, this.handleBoneClick));
    this.forceUpdate();
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
          {this.jointsList.map(joint => {return joint.render(joint === this.selectedJoint)})}
          {this.bonesList.map(bone => {return bone.render()})}
        </div>
        <canvas id="debugCanvas" style={{width:600, height:600}}/>
      </React.Fragment>
    );
  }
}