declare type glvec2 = number[];
declare type glmat2d = number[];

interface mat2d {
    create(): glmat2d;
    clone(a: glmat2d): glmat2d;
    copy(out: glmat2d, a: glmat2d): glmat2d;
    identity(out: glmat2d): glmat2d;
    invert(out: glmat2d, a: glmat2d): glmat2d;
    determinant(a: glmat2d): glmat2d;
    multiply(out: glmat2d, a: glmat2d, b: glmat2d): glmat2d;
    mul(out: glmat2d, a: glmat2d, b: glmat2d): glmat2d;
    rotate(out: glmat2d, a: glmat2d, rad: number): glmat2d;
    scale(out: glmat2d, a: glmat2d, scale: glmat2d): glmat2d;
    translate(out: glmat2d, a: glmat2d, v: glmat2d): glmat2d;
    fromRotation(out: glmat2d, rad: number): glmat2d;
    fromScaling(out: glmat2d, v: glmat2d): glmat2d;
    fromTranslation(out: glmat2d, v: glmat2d): glmat2d;
    str(a: glmat2d): string;
    frob(a: glmat2d): number;
}

interface vec2 {
    create(): glvec2;
    clone(a: glvec2): glvec2;
    fromValues(x: number, y: number): glvec2;
    copy(out: glvec2, a: glvec2): glvec2;
    set(a: glvec2, x: number, y: number): glvec2;
    add(out: glvec2, a: glvec2, b: glvec2): glvec2;
    subtract(out: glvec2, a: glvec2, b: glvec2): glvec2;
    add(out: glvec2, a: glvec2, b: glvec2): glvec2;
    multiply(out: glvec2, a: glvec2, b: glvec2): glvec2;
    mul(out: glvec2, a: glvec2, b: glvec2): glvec2;
    divide(out: glvec2, a: glvec2, b: glvec2): glvec2;
    div(out: glvec2, a: glvec2, b: glvec2): glvec2;
    min(out: glvec2, a: glvec2, b: glvec2): glvec2;
    max(out: glvec2, a: glvec2, b: glvec2): glvec2;
    scale(out: glvec2, a: glvec2, scale: number): glvec2;
    scaleAndAdd(out: glvec2, a: glvec2, b: glvec2, scale: number): glvec2;
    distance(a: glvec2, b: glvec2): number;
    dist(a: glvec2, b: glvec2): number;
    squaredDistance(a: glvec2, b: glvec2): number;
    sqrDist(a: glvec2, b: glvec2): number;
    length(a: glvec2): number;
    len(a: glvec2): number;
    squaredLength(a: glvec2): number;
    sqrLen(a: glvec2): number;
    negate(out: glvec2, a: glvec2): glvec2;
    inverse(out: glvec2, a: glvec2): glvec2;
    normalize(out: glvec2, a: glvec2): glvec2;
    dot(a: glvec2, b: glvec2): number;
    cross(out: glvec2, a: glvec2, b: glvec2): glvec2;
    lerp(out: glvec2, a: glvec2, b: glvec2, t: number): glvec2;
    random(out: glvec2, scale: number): glvec2;
    //transformMat2(out: glvec2, a: glvec2, m: glmat2): glvec2;
    transformMat2d(out: glvec2, a: glvec2, m: glmat2d): glvec2;
    //transformMat3(out: glvec2, a: glvec2, m: glmat3): glvec2;
    //transformMat4(out: glvec2, a: glvec2, m: glmat4): glvec2;
    forEach(): {
        (a: glvec2[], stride: number, offset: number, count: number, fn: Function, arg: any): glvec2[]
    };
    str(a: glvec2): string;
}
