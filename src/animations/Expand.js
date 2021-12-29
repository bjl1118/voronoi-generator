import { normalize } from "../utils/utils";

const expand = (particles, index, ctx) => {
    if (index === 0) {
        return;
    }
    const centerPoint = [ctx.canvas.width / 2, ctx.canvas.height / 2];
    const p = particles[index];
    const vector = normalize(centerPoint, p);
    let nextX = Math.round((p[0] + vector[0]) * 100) / 100;
    let nextY = Math.round((p[1] + vector[1]) * 100) / 100;
    return [nextX, nextY];
}

export default expand;