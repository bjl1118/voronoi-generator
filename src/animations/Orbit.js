import { distance, vector } from "../utils/utils";

const orbit = (particles, index, ctx) => {

    // The amount to move each point by, in radians
    const radianDiff = 0.003

    const centerPoint = [ctx.canvas.width / 2, ctx.canvas.height / 2];
    const p = particles[index];
    const radius = distance(p[0], p[1], centerPoint[0], centerPoint[1])
    const v = vector(centerPoint, p);
    const radians = Math.atan2(v[1], v[0]);

    // Have half the points go clockwise, the others go counter clockwise
    const newRadians = index % 2 === 0 ? radians + radianDiff : radians - radianDiff;
    const newX = centerPoint[0] + (radius * Math.cos(newRadians))
    const newY = centerPoint[1] + (radius * Math.sin(newRadians))
    return [newX, newY];
}

export default orbit;