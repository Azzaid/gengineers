export default function getAngleBetweenDots(dot1,dot2) {
  let x = dot2[0] - dot1[0] + 1;
  let y = dot2[1] - dot1[1] + 1;
  let angle = Math.sign(y)*90;
  if (x != 0) {
    angle = Math.atan(y/x)*57.29;
    //kd("raw angle is " + angle);
  }
  if (x<0) {
    angle = ((-1) * Math.sign(angle) * 180) + angle;
    //kd("but x < 0 so now angle is " + angle);
  }
  //kd("will create angle from " + dot1 + " and " + dot2 + " got x " + x + " and y " + y + " so angle is " + angle);
  return angle;
}

