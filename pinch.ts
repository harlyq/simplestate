/// <reference path="_dependencies.ts" />
module FreeHand {
    "use strict";

    export interface PinchInfo {
        x: number; // center of the pinch
        y: number;
        dx: number;
        dy: number;
        scale: number; // 1 at the start of the pinch
    }

    export class Pinch {
        lastX: number = 0;
        lastY: number = 0;
        startX: number = 0;
        startY: number = 0;
        startDist: number = 0;
        wasValid: boolean = false;

        construtor() {}

        updateTouches(touches: TouchInfo[]): PinchInfo {
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
            var dist = Math.sqrt(x * x + y * y);

            var dx = 0;
            var dy = 0;
            var scale = 1;

            if (!this.wasValid) {
                // can't have a zero start distance
                if (dist < 0.001) {
                    this.wasValid = false;
                    return null;
                }

                this.startX = x;
                this.startY = y;
                this.startDist = dist;
                this.wasValid = true;
            } else {
                scale = dist / this.startDist;
                x = x / scale - this.startX;
                y = y / scale - this.startY;

                dx = this.lastX - x;
                dy = this.lastY - y;
            }
            this.lastX = x;
            this.lastY = y;

            // x,y,dx,dy are in unscaled pixels (i.e. when the pinch was started)
            return {
                x: x,
                y: y,
                dx: dx,
                dy: dy,
                scale: scale
            };
        }
    }
}
