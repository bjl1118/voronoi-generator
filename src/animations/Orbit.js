import { distance, vector } from "../utils/utils";

const orbit = (particles, index, ctx, frameCount = 0) => {
    if (frameCount % 1 === 0) {
        const centerPoint = [ctx.canvas.width / 2, ctx.canvas.height / 2];
        const p = particles[index];
        const radius = distance(p[0], p[1], centerPoint[0], centerPoint[1])
        const v = vector(centerPoint, p);
        console.log('DISTANCE!!', radius);
        console.log('VECTOR!!', v);
        const radians = Math.atan2(v[1], v[0]);
        const newRadians = index % 2 === 0 ? radians + 0.003 : radians - 0.003;

        const newX = centerPoint[0] + (radius * Math.cos(newRadians))
        const newY = centerPoint[1] + (radius * Math.sin(newRadians))
        console.log('NEW POINTS!!', newX, newY);
        return [newX, newY];
    }
    return particles[index];

}

export default orbit;