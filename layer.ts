/// <reference path="_dependencies.ts" />
module FreeHand {
    "use strict";

    // an infinite expanse of subshapes
    class Layer {
        private children: Shape[] = [];

        addShape(shape: Shape) {
            this.children.push(shape);
        }

        removeShape(shape: Shape) {
            var i = this.children.indexOf(shape);
            if (i !== -1)
                this.children.splice(i, 1);
        }

        draw(ctx: CanvasRenderingContext2D, transform: Transform) {
            for (var i = 0; i < this.children.length; ++i)
                this.children[i].draw(ctx, transform);
        }

        getShapeFromPoint(x: number, y: number): Shape {
            for (var i = this.children.length - 1; i >= 0; --i) {
                var child = this.children[i];
                if (child.isInside(x, y))
                    return child;
            }

            return null;
        }

        getShapeFromRegion(x1: number, y1: number, x2: number, y2: number): Shape {
            for (var i = this.children.length - 1; i >= 0; --i) {
                var child = this.children[i];
                if (child.isOverlapRegion(x1, y1, x2, y2))
                    return child;
            }

            return null;
        }

    }
}
