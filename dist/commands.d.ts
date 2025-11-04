export declare const MOVE_COMMAND: {
    up: {
        on: number;
        off: number;
    };
    down: {
        on: number;
        off: number;
    };
    left: {
        on: number;
        off: number;
    };
    right: {
        on: number;
        off: number;
    };
};
export declare const HOME_COMMAND = 5;
export declare const ZOOM_COMMAND: {
    in: {
        on: number;
        off: number;
    };
    out: {
        on: number;
        off: number;
    };
};
export declare const FOCUS_COMMAND: {
    near: {
        on: number;
        off: number;
    };
    far: {
        on: number;
        off: number;
    };
};
export declare const FOCUS_MODE: readonly ["auto", "manual"];
export declare const EXPOSURE_MODE: readonly ["auto", "manual", "iris priority", "shutter priority", "brightness priority"];
export declare const SHUTTER: {
    '1/25': number;
    '1/50': number;
    '1/75': number;
    '1/100': number;
    '1/120': number;
    '1/150': number;
    '1/215': number;
    '1/300': number;
    '1/425': number;
    '1/600': number;
    '1/1000': number;
    '1/1250': number;
    '1/1750': number;
    '1/2500': number;
    '1/3500': number;
    '1/6000': number;
    '1/10000': number;
};
export declare const GAIN: {
    '0dB': number;
    '2dB': number;
    '4dB': number;
    '6dB': number;
    '8dB': number;
    '10dB': number;
    '12dB': number;
    '14dB': number;
    '16dB': number;
    '18dB': number;
    '20dB': number;
    '22dB': number;
    '24dB': number;
    '26dB': number;
    '28dB': number;
    '30dB': number;
};
export declare const IRIS: {
    Close: number;
    'F14.0': number;
    'F11.0': number;
    'F9.6': number;
    'F8.0': number;
    'F6.8': number;
    'F5.6': number;
    'F4.8': number;
    'F4.0': number;
    'F3.4': number;
    'F2.8': number;
    'F2.4': number;
    'F2.0': number;
    'F1.8': number;
};
export declare const ANTIFLICKER: {
    Off: number;
    '50Hz': number;
    '60Hz': number;
};
export declare const WHITEBALANCE_MODE: readonly ["auto", "indoor", "outdoor", "one push", "auto tracking", "manual", "temperature"];
export declare const WIDEDYNAMICRANGE_MODE: readonly ["Off", 1, 2, 3, 4, 5, 6];
export declare const NOISEREDUCTION3D_MODE: {
    Off: number;
    Auto: number;
    1: number;
    2: number;
    3: number;
    4: number;
};
