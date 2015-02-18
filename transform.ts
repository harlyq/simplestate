// <reference path="_dependencies.ts" />
module FreeHand {
    "use strict";

    interface XY {
        x: number;
        y: number;
    }

    export class Transform {
        sx: number = 1;
        sy: number = 1;
        tx: number = 0;
        ty: number = 0;
        r: number = 0;

        copy(other: Transform): Transform {
            this.sx = other.sx;
            this.sy = other.sy;
            this.tx = other.tx;
            this.ty = other.ty;
            return this;
        }

        clone(): Transform {
            return new Transform().copy(this);
        }

        translate(x: number, y: number): Transform {
            this.tx += x;
            this.ty += y;
            return this;
        }

        scale(sx: number, sy: number): Transform {
            this.sx *= sx;
            this.sy *= sy;
            return this;
        }

        rotate(rad: number): Transform {
            this.r += rad;
            return this;
        }

        postMultiply(other: Transform): Transform {
            this.tx = other.tx * this.sx + this.tx;
            this.ty = other.ty * this.sy + this.ty;
            this.sx *= other.sx;
            this.sy *= other.sy;
            return this;
        }

        preMultiply(other: Transform): Transform {
            this.tx = this.tx * other.sx + other.tx;
            this.ty = this.ty * other.sy + other.ty;
            this.sx *= other.sx;
            this.sy *= other.sy;
            return this;
        }

        inverse(): Transform {
            this.sx = 1 / this.sx;
            this.sy = 1 / this.sy;
            this.tx = -this.tx;
            this.ty = -this.ty;
            return this;
        }

        setIdentity(): Transform {
            this.sx = this.sy = 1;
            this.tx = this.ty = 0;
            return this;
        }

        setTranslate(tx: number, ty: number): Transform {
            this.tx = tx;
            this.ty = ty;
            return this;
        }


        setScale(sx: number, sy: number): Transform {
            this.sx = sx;
            this.sy = sy;
            return this;
        }

        setRotate(rad: number): Transform {
            this.r = rad;
            return this;
        }

        transformContext(ctx: CanvasRenderingContext2D) {
            var cos = Math.cos(this.r);
            var sin = Math.sin(this.r);
            ctx.transform(cos * this.sx, sin * this.sy, -sin * this.sx, cos * this.sy, this.tx, this.ty);
        }

        getLocal(x: number, y: number): XY {
            var cos = Math.cos(this.r);
            var sin = Math.sin(this.r);
            var lx = (x - this.tx + (y - this.ty) * this.sx / this.sy) / (2 * cos * this.sx);
            var ly = (y - this.ty - lx * cos * this.sy) / (sin * this.sy);
            return {
                x: lx,
                y: ly
            };
        }

        getGlobal(lx: number, ly: number): XY {
            var cos = Math.cos(this.r);
            var sin = Math.sin(this.r);
            return {
                x: lx * cos * this.sx - ly * sin * this.sx + this.tx,
                y: ly * sin * this.sy + lx * cos * this.sy + this.ty
            };
        }

        static Identity = new Transform();
    }
}
