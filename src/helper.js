/**
 *
 * @param {number} angle
 * @return {number}
 */
export function toDegree(angle) {
  return angle * (180 / Math.PI);
}

/**
 *
 * @param {number} angle
 * @return {number}
 */
export function toRadians(angle) {
  return angle * (Math.PI / 180);
}

/**
 * getCircumferencePosition
 * @param {number} degree
 * @param {number} radius
 * @param {Phaser.Point} centerPoint
 * @return {Phaser.Point}
 */
export function getCircumferencePosition(degree, radius, centerPoint) {
  const angle = toRadians(degree);
  return new Phaser.Point(
    radius * (Math.cos(angle)) + centerPoint.x,
    radius * (Math.sin(angle)) + centerPoint.y
  );
}
