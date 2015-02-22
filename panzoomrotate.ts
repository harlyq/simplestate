/// <reference path="_dependencies.ts" />
module FreeHand {
    "use strict";

    export class PanZoomRotate {
        // touch params, all touch changes are relative to the
        // starting parameters (first touch) to avoid rounding errors
        startCX: number = 0;
        startCY: number = 0;
        startDist: number = 0;
        startTransform: Transform = null;
        wasValid: boolean = false;

        construtor() {}

        updateMouseInput(transform: Transform, mouse: MouseInfo, zoom: number): Transform {
            if (mouse.state !== 'wheel') {
                return null;
            }

            var scale = 1;
            if (mouse.dy < 0)
                scale = zoom;
            else if (mouse.dy > 0)
                scale = 1 / zoom;

            if (scale !== 1) {
                transform.setTranslate(
                    mouse.x - (mouse.x - transform.tx) * scale,
                    mouse.y - (mouse.y - transform.ty) * scale);
                transform.scale(scale);
            }
            return transform;
        }

        updateTouchInput(transform: Transform, touches: TouchInfo[]): Transform {
            var one = -1;
            var two = -1;
            for (var i = 0; i < touches.length; ++i) {
                if (touches[i].state !== 'up') {
                    if (one === -1)
                        one = i;
                    else if (two === -1)
                        two = i;
                    else
                        break;
                }
            }

            if (one === -1 || two === -1) {
                this.wasValid = false;
                return null;
            }

            var x = touches[one].x - touches[two].x;
            var y = touches[one].y - touches[two].y;
            var cx = (touches[one].x + touches[two].x) * 0.5;
            var cy = (touches[one].y + touches[two].y) * 0.5;
            var dist = Math.sqrt(x * x + y * y);

            if (!this.wasValid) {
                // can't have a zero start distance
                if (dist < 0.001) {
                    this.wasValid = false;
                    return null;
                }

                this.startTransform = transform.clone();
                this.startDist = dist;
                this.startCX = cx;
                this.startCY = cy;
                this.wasValid = true;
                return transform;
            }

            var scale = dist / this.startDist;

            transform.setTranslate(
                cx - (this.startCX - this.startTransform.tx) * scale,
                cy - (this.startCY - this.startTransform.ty) * scale);
            transform.setScale(
                scale * this.startTransform.sx,
                scale * this.startTransform.sy);

            return transform;
        }
    }
}
