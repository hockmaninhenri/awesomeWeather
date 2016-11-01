import { AnimationPlayer, AnimationKeyframe } from "./private_import_core";
import { KeyframeInfo } from 'ui/animation/keyframe-animation';
import * as styleProperty from 'ui/styling/style-property';
export declare class NativeScriptAnimationPlayer implements AnimationPlayer {
    parentPlayer: AnimationPlayer;
    private _startSubscriptions;
    private _doneSubscriptions;
    private _finished;
    private _started;
    private animation;
    private target;
    constructor(element: Node, keyframes: AnimationKeyframe[], duration: number, delay: number, easing: string);
    init(): void;
    hasStarted(): boolean;
    onStart(fn: Function): void;
    onDone(fn: Function): void;
    private _onStart();
    private _onFinish();
    play(): void;
    pause(): void;
    finish(): void;
    reset(): void;
    restart(): void;
    destroy(): void;
    setPosition(p: any): void;
    getPosition(): number;
    static animationTimingFunctionConverter(value: any): any;
    static bezieArgumentConverter(value: any): number;
    static transformConverter(value: any): Object;
    static parseTransform(value: string, animationInfo: KeyframeInfo): styleProperty.KeyValuePair<styleProperty.Property, any>[];
}
