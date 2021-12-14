export const pythagoras = (a, b) => Math.sqrt(a * a + b * b);

export const vector = (point1, point2) => [
    point2[0] * 1.0 - point1[0] * 1.0,
    point2[1] * 1.0 - point1[1] * 1.0,
];

export const normalize = (point1, point2) => {
    const v = vector(point1, point2);
    const distance = pythagoras(v[0], v[1]);
    const xNormal = v[0] / distance;
    const yNormal = v[1] / distance;
    return [xNormal, yNormal];
}

export const distance = (x, y, x2, y2) => {
    return pythagoras(x2 - x, y2 - y);
}
