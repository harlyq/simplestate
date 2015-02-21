/// <reference path="_dependencies.ts" />
module FreeHand {
    "use strict";

    export class TrailShape extends Shape {
        private points: number[] = [];
        public lineWidth: number = 1;
        public strokeStyle: string = 'black';

        addPoint(x: number, y: number) {
            this.points.push(x, y);
            this.updateBounds(x, y);
        }

        removeLastPoint() {
            if (this.points.length > 1) {
                this.points.length = this.points.length - 2;
            }
        }

        draw(ctx: CanvasRenderingContext2D) {
            var points = this.points;
            if (points.length < 3)
                return;

            ctx.save();
            this.transform.transformContext(ctx);
            this.drawStart(ctx, points[0], points[1])
            for (var i = 2; i < points.length;)
                ctx.lineTo(points[i++], points[i++]);

            ctx.stroke();
            ctx.restore();
        }

        drawDirect(ctx: CanvasRenderingContext2D, parentTransform: Transform) {
            ctx.save();
            parentTransform.transformContext(ctx);
            this.transform.transformContext(ctx);

            var points = this.points;
            var len = points.length;
            if (len === 2) {
                this.drawStart(ctx, points[0], points[1]);
            } else {
                ctx.lineTo(points[len - 2], points[len - 1]);
                ctx.stroke();
            }
            ctx.restore();
        }

        drawStart(ctx: CanvasRenderingContext2D, x: number, y: number) {
            this.transform.transformContext(ctx);
            ctx.beginPath();
            this.applyStyle(ctx);
            ctx.moveTo(x, y);
        }

        applyStyle(ctx: CanvasRenderingContext2D) {
            ctx.strokeStyle = this.strokeStyle;
            ctx.lineWidth = this.lineWidth;
        }

        calculateBounds() {
            var points = this.points;
            for (var i = 0; i < points.length;)
                this.updateBounds(points[i++], points[i++]);
        }
    }
}
