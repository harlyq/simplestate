/// <reference path="_dependencies.ts" />
module FreeHand {
    "use strict";

    export class Shape {
        minX: number = 10e10;
        minY: number = 10e10;
        maxX: number = -10e10;
        maxY: number = -10e10;
        protected transform: Transform = new Transform();

        draw(ctx: CanvasRenderingContext2D) {}

        isInside(x: number, y: number): boolean {
            var pos = this.transform.getLocal(x, y);
            return pos.x >= this.minX && pos.x < this.maxX &&
                pos.y >= this.minY && pos.y < this.maxY;
        }

        isOverlapRegion(x1: number, y1: number, x2: number, y2: number): boolean {
            var pos1 = this.transform.getLocal(x1, y1);
            var pos2 = this.transform.getLocal(x2, y2);

            return pos1.x < this.maxX && x2 >= this.minX &&
                pos1.y < this.maxY && y2 >= this.minY;
        }

        getTransform(): Transform {
            return this.transform;
        }


        updateBounds(x: number, y: number) {
            this.minX = Math.min(this.minX, x);
            this.minY = Math.min(this.minY, y);
            this.maxX = Math.max(this.maxX, x);
            this.maxY = Math.max(this.maxY, y);
        }
    }
}
