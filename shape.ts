/// <reference path="_dependencies.ts" />
module FreeHand {

    export class Shape {
        width: number = 0;
        height: number = 0;
        private transform: Transform = new Transform();

        draw(ctx: CanvasRenderingContext2D, transform: Transform) {}

        isInside(x: number, y: number): boolean {
            var pos = this.transform.getLocal(x, y);
            return pos.x >= 0 && pos.x < this.width &&
                pos.y >= 0 && pos.y < this.height;
        }

        isInRegion(x1: number, y1: number, x2: number, y2: number): boolean {
            var pos1 = this.transform.getLocal(x1, y1);
            var pos2 = this.transform.getLocal(x2, y2);

            return pos1.x < this.width && x2 >= 0 &&
                pos1.y < this.height && y2 >= 0;
        }

        getTransform(): Transform {
            return this.transform;
        }
    }
}
