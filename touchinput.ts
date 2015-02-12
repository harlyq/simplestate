/// <reference path="_dependencies.ts" />
module FreeHand {
    "use strict";

    interface Touch {
        identifier: number;
        screenX: number;
        screenY: number;
        clientX: number;
        clientY: number;
        pageX: number;
        pageY: number;
        radiusX: number;
        radiusY: number;
        rotationAngle: number;
        force: number;
        target: Element;
    }

    interface TouchEvent extends UIEvent {
        altKey: boolean;
        changedTouches: Touch[];
        ctrlKey: boolean;
        metaKey: boolean;
        shiftKey: boolean;
        targetTouches: Touch[];
        touches: Touch[];
    }


    export interface TouchInfo {
        id: number;
        x: number;
        y: number;
        dx: number;
        dy: number;
        isDown: boolean;
    }

    function updateTouch(touchInfos: TouchInfo[], touch: Touch, elem: HTMLElement) {
        var thisTouch: any = null;
        for (var i = 0; i < touchInfos.length; ++i) {
            if (touch.identifier == touchInfos[i].id) {
                thisTouch = touchInfos[i];
                break;
            }
        }

        var x = touch.pageX - elem.offsetLeft;
        var y = touch.pageY - elem.offsetTop;

        if (!thisTouch) {
            thisTouch = {
                x: x,
                y: y,
                dx: 0,
                dy: 0,
                isDown: touch.force > 0
            };
            touchInfos.push(thisTouch);
        } else {
            thisTouch.dx = x - thisTouch.x;
            thisTouch.dy = y - thisTouch.y;
            thisTouch.x = x;
            thisTouch.y = y;
            thisTouch.isDown = touch.force > 0;
        }
    }


    export class TouchInput {
        private touchStartHandler = this.onTouchStart.bind(this);
        private touchMoveHandler = this.onTouchMove.bind(this);
        private touchEndHandler = this.onTouchEnd.bind(this);

        private touchInfos: TouchInfo[] = [];

        constructor(private elem: HTMLElement, private onTouchFunc: (touchInfos: TouchInfo[]) => void) {
            elem.addEventListener('touchstart', this.touchStartHandler);
        }

        onTouchStart(e: TouchEvent) {
            e.preventDefault();

            document.addEventListener("touchmove", this.touchMoveHandler);
            document.addEventListener("touchup", this.touchEndHandler);

            // touches are accumulated until all touches have been released
            var allOff = true;
            for (var i = 0; allOff && i < this.touchInfos.length; ++i)
                allOff = !this.touchInfos[i].isDown;

            if (allOff)
                this.touchInfos = [];

            for (var i = 0; i < e.changedTouches.length; ++i)
                updateTouch(this.touchInfos, e.changedTouches[i], this.elem);

            this.onTouchFunc.call(this, this.touchInfos);
        }

        onTouchMove(e: TouchEvent) {
            e.preventDefault();

            for (var i = 0; i < e.changedTouches.length; ++i)
                updateTouch(this.touchInfos, e.changedTouches[i], this.elem);

            this.onTouchFunc.call(this, this.touchInfos);
        }

        onTouchEnd(e: TouchEvent) {
            e.preventDefault();
            document.removeEventListener("touchend", this.touchEndHandler);
            document.removeEventListener("touchmove", this.touchMoveHandler);

            for (var i = 0; i < e.changedTouches.length; ++i)
                updateTouch(this.touchInfos, e.changedTouches[i], this.elem);

            this.onTouchFunc.call(this, this.touchInfos);
        }
    }
}
