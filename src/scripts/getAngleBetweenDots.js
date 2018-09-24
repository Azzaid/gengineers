export default function getAngleBetweenDots(dot1,dot2) {
  let x = dot2[0] - dot1[0] + 1;
  let y = dot2[1] - dot1[1] + 1;
  let angle = Math.sign(y)*90;
  if (x != 0) {
    angle = Math.atan(y/x)*57.29;
  }
  if (x<0) {
    angle = ((-1) * Math.sign(angle) * 180) + angle;
  }
  return angle;
}

