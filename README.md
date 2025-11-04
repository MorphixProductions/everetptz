# EveretPTZ

A TypeScript REST API wrapper for Everet [EVP212N](https://www.everetimaging.com/support/kb/evp212-ndi/datasheet-evp212n/) PTZ cameras with **zero dependencies**.

## Overview

EveretPTZ is a lightweight TypeScript library for controlling Everet EVP212N professional PTZ cameras over HTTP. It provides a simple, promise-based API for camera control, image settings, and configuration management.

**Supported Camera**: Everet EVP212N Professional Grade FHD NDI PTZ Camera

## Features

-   **Zero Dependencies** - Pure TypeScript implementation
-   **Complete PTZ Control** - Pan, tilt, zoom, and focus operations
-   **Image Settings** - Exposure, white balance, iris, shutter control
-   **Advanced Features** - WDR, noise reduction, gamma correction
-   **Type Safety** - Full TypeScript support with type definitions
-   **Promise-based** - Modern async/await API

## Installation

```bash
npm install everetptz
```

## Basic example

```typescript
import { EveretPTZ } from 'everetptz';

// Initialize camera connection
const camera = new EveretPTZ('192.168.1.100', 'admin', 'password');

// Wait for authentication
await camera.whenReady();

// Get streaming URL
const streamUrl = await camera.getRTSPUrl('main');
console.log('Stream URL:', streamUrl);

// Move camera up for 2 seconds
await camera.move('up', true, 15);
setTimeout(() => {
	//Stop moving up
	await camera.move('up', false);

	// Save current position as preset 1
	await camera.setPreset(1);
}, 2000);
```

## API Reference

### [Constructor](#constructor-1)

### [Return values](#return-values-1)

### [Camera](#camera)

-   [whenReady](#whenready)
-   [onError](#onerror)

### [Movement](#movement)

-   [move](#move)
-   [zoom](#zoom-1)
-   [focus](#focus-1)

### [Presets](#presets)

-   [setPreset](#setpreset)
-   [recallPreset](#recallpreset)
-   [clearPreset](#clearpreset)

### [Focus](#focus)

-   [setFocusMode](#setfocusmode)
-   [getFocusMode](#getfocusmode)

### [Exposure](#exposure)

-   [setExposureMode](#setexposuremode)
-   [getExposureMode](#getexposuremode)
-   [setShutter](#setshutter)
-   [getShutter](#getshutter)
-   [setExposureGain](#setexposuregain)
-   [getExposureGain](#getexposuregain)
-   [setIris](#setiris)
-   [getIris](#getiris)
-   [setExposureBrightness](#setexposurebrightness)
-   [getExposureBrightness](#getexposurebrightness)
-   [setAntiFlicker](#setantiflicker)
-   [getAntiFlicker](#getantiflicker)

### [White Balance](#white-balance)

-   [setWhiteBalanceMode](#setwhitebalancemode)
-   [getWhiteBalanceMode](#getwhitebalancemode)
-   [setRedGain](#setredgain)
-   [getRedGain](#getredgain)
-   [setBlueGain](#setbluegain)
-   [getBlueGain](#getbluegain)
-   [setColorTemperature](#setcolortemperature)
-   [getColorTemperature](#getcolortemperature)

### [Image](#image)

-   [setMirror](#setmirror)
-   [getMirror](#getmirror)
-   [setFlip](#setflip)
-   [getFlip](#getflip)
-   [setBacklightCompensation](#setbacklightcompensation)
-   [getBacklightCompensation](#getbacklightcompensation)
-   [setGamma](#setgamma)
-   [getGamma](#getgamma)
-   [setWideDynamicRange](#setwidedynamicrange)
-   [getWideDynamicRange](#getwideynamicrange)

### [Image Quality](#image-quality)

-   [setBrightness](#setbrightness)
-   [getBrightness](#getbrightness)
-   [setSharpness](#setsharpness)
-   [getSharpness](#getsharpness)
-   [setContrast](#setcontrast)
-   [getContrast](#getcontrast)
-   [setSaturation](#setsaturation)
-   [getSaturation](#getsaturation)

### [Noise Reduction](#noise-reduction)

-   [set2dNoiseReduction](#set2dnoisereduction)
-   [get2dNoiseReduction](#get2dnoisereduction)
-   [set3dNoiseReduction](#set3dnoisereduction)
-   [get3dNoiseReduction](#get3dnoisereduction)

### [Streaming](#streaming)

-   [getRTSPUrl](#getrtspurl)
-   [getRTMPUrl](#getrtmpurl)
-   [getFLVUrl](#getflvurl)
-   [getWebRTCUrl](#getwebrtcurl)

---

## Constructor

```typescript
new EveretPTZ(ip: string, username: string, password: string)
```

-   `ip` - Camera IP address
-   `username` - Camera login username
-   `password` - Camera login password

## Return Values

**Important**: All `set` methods return a `Promise<boolean>`:

-   `true` - Command executed successfully
-   `false` - Command failed or something went wrong

**Note**: `get` methods return the actual values, while control methods (`move`, `zoom`, `focus`) return boolean success indicators.

## Camera

### whenReady

```typescript
await camera.whenReady(): Promise<void>
```

Wait for authentication to complete before sending commands.

### onError

```typescript
camera.onError(callback: (error: Error) => void): void
```

Set error handler for authentication and request failures.

## Movement

### move

```typescript
await camera.move(
  direction: 'up' | 'down' | 'left' | 'right',
  active: boolean,
  speed?: number // 0-24, default: 10
): Promise<boolean>
```

Start or stop pan/tilt movement in the specified direction.

### zoom

```typescript
await camera.zoom(
  direction: 'in' | 'out',
  active: boolean,
  speed?: number // 0-7, default: 7
): Promise<boolean>
```

Control zoom operation.

### focus

```typescript
await camera.focus(
  direction: 'near' | 'far',
  active: boolean,
  speed?: number // 0-7, default: 7
): Promise<boolean>
```

> Only applicable when **focus mode** is set to `manual`

Manual focus control.

## Presets

### setPreset

```typescript
await camera.setPreset(presetNumber: number): Promise<boolean> // 0-127
```

Save current camera position to preset slot.

### recallPreset

```typescript
await camera.recallPreset(presetNumber: number): Promise<boolean> // 0-127
```

Recall saved preset position.

### clearPreset

```typescript
await camera.clearPreset(presetNumber: number): Promise<boolean> // 0-127
```

Clear preset from slot.

## Focus

### setFocusMode

```typescript
await camera.setFocusMode(mode: 'auto' | 'manual'): Promise<boolean>
```

Set focus mode.

### getFocusMode

```typescript
await camera.getFocusMode(): Promise<'auto' | 'manual'>
```

Get current focus mode.

## Exposure

### setExposureMode

```typescript
await camera.setExposureMode(
  mode: 'auto' | 'manual' | 'iris priority' | 'shutter priority' | 'brightness priority'
): Promise<boolean>
```

Set exposure mode.

### getExposureMode

```typescript
await camera.getExposureMode(): Promise<string>
```

Get current exposure mode.

### setShutter

```typescript
await camera.setShutter(speed: string): Promise<boolean>
```

> Only applicable when **exposure mode** is set to `manual` or `shutter priority`

Set shutter speed.

Available shutter speeds: `'1/25'`, `'1/50'`, `'1/75'`, `'1/100'`, `'1/120'`, `'1/150'`, `'1/215'`, `'1/300'`, `'1/425'`, `'1/600'`, `'1/1000'`, `'1/1250'`, `'1/1750'`, `'1/2500'`, `'1/3500'`, `'1/6000'`, `'1/10000'`

### getShutter

```typescript
await camera.getShutter(): Promise<string>
```

Get current shutter speed.

### setExposureGain

```typescript
await camera.setExposureGain(gain: string): Promise<boolean>
```

> Only applicable when **exposure mode** is set to `manual`

Set exposure gain.

Available gain values: `'0dB'` to `'30dB'` in 2dB increments

### getExposureGain

```typescript
await camera.getExposureGain(): Promise<string>
```

Get current exposure gain.

### setIris

```typescript
await camera.setIris(aperture: string): Promise<boolean>
```

> Only applicable when **exposure mode** is set to `manual` or `iris priority`

Set iris aperture.

Available apertures: `'Close'`, `'F14.0'`, `'F11.0'`, `'F9.6'`, `'F8.0'`, `'F6.8'`, `'F5.6'`, `'F4.8'`, `'F4.0'`, `'F3.4'`, `'F2.8'`, `'F2.4'`, `'F2.0'`, `'F1.8'`

### getIris

```typescript
await camera.getIris(): Promise<string>
```

Get current iris aperture.

### setExposureBrightness

```typescript
await camera.setExposureBrightness(brightness: number): Promise<boolean> // 0-27
```

> Only applicable when **exposure mode** is set to `brightness priority`

Set exposure brightness.

### getExposureBrightness

```typescript
await camera.getExposureBrightness(): Promise<number>
```

Get current exposure brightness.

### setAntiFlicker

```typescript
await camera.setAntiFlicker(frequency: 'Off' | '50Hz' | '60Hz'): Promise<boolean>
```

> Only applicable when **exposure mode** is set to `auto` or `iris priority`

Set anti-flicker frequency.

### getAntiFlicker

```typescript
await camera.getAntiFlicker(): Promise<string>
```

Get current anti-flicker setting.

## White Balance

### setWhiteBalanceMode

```typescript
await camera.setWhiteBalanceMode(
  mode: 'auto' | 'indoor' | 'outdoor' | 'one push' | 'auto tracking' | 'manual' | 'temperature'
): Promise<boolean>
```

Set white balance mode.

### getWhiteBalanceMode

```typescript
await camera.getWhiteBalanceMode(): Promise<'auto' | 'indoor' | 'outdoor' | 'one push' | 'auto tracking' | 'manual' | 'temperature'>
```

Get current white balance mode.

### setRedGain

```typescript
await camera.setRedGain(value: number): Promise<boolean> // 0-255
```

> Only applicable when **white balance mode** is set to `manual`

Set red gain.

### getRedGain

```typescript
await camera.getRedGain(): Promise<number>
```

Get current red gain.

### setBlueGain

```typescript
await camera.setBlueGain(value: number): Promise<boolean> // 0-255
```

> Only applicable when **white balance mode** is set to `manual`

Set blue gain.

### getBlueGain

```typescript
await camera.getBlueGain(): Promise<number>
```

Get current blue gain.

### setColorTemperature

```typescript
await camera.setColorTemperature(value: number): Promise<boolean> // 1800-10000K
```

> Only applicable when **white balance mode** is set to `temperature`

Set color temperature.

### getColorTemperature

```typescript
await camera.getColorTemperature(): Promise<number>
```

Get current color temperature.

## Image

### setMirror

```typescript
await camera.setMirror(enabled: boolean): Promise<boolean>
```

Enable or disable image mirroring.

### getMirror

```typescript
await camera.getMirror(): Promise<boolean>
```

Get current mirror setting.

### setFlip

```typescript
await camera.setFlip(enabled: boolean): Promise<boolean>
```

Enable or disable image flipping.

### getFlip

```typescript
await camera.getFlip(): Promise<boolean>
```

Get current flip setting.

### setBacklightCompensation

```typescript
await camera.setBacklightCompensation(enabled: boolean): Promise<boolean>
```

Enable or disable backlight compensation.

### getBacklightCompensation

```typescript
await camera.getBacklightCompensation(): Promise<boolean>
```

Get current backlight compensation setting.

### setGamma

```typescript
await camera.setGamma(value: number): Promise<boolean> // 0-4
```

Set gamma correction value.

### getGamma

```typescript
await camera.getGamma(): Promise<number>
```

Get current gamma correction value.

### setWideDynamicRange

```typescript
await camera.setWideDynamicRange(mode: 'Off' | 1 | 2 | 3 | 4 | 5 | 6): Promise<boolean>
```

Set wide dynamic range mode.

### getWideDynamicRange

```typescript
await camera.getWideDynamicRange(): Promise<string | number>
```

Get current wide dynamic range setting.

## Image Quality

### setBrightness

```typescript
await camera.setBrightness(value: number): Promise<boolean> // 0-15
```

> Only applicable when **exposure mode** is set to `auto`, `iris priority` or `shutter priority`

Set image brightness.

### getBrightness

```typescript
await camera.getBrightness(): Promise<number>
```

Get current brightness value.

### setSharpness

```typescript
await camera.setSharpness(value: number): Promise<boolean> // 0-15
```

Set image sharpness.

### getSharpness

```typescript
await camera.getSharpness(): Promise<number>
```

Get current sharpness value.

### setContrast

```typescript
await camera.setContrast(value: number): Promise<boolean> // 0-15
```

Set image contrast.

### getContrast

```typescript
await camera.getContrast(): Promise<number>
```

Get current contrast value.

### setSaturation

```typescript
await camera.setSaturation(value: number): Promise<boolean> // 0-15
```

Set image saturation.

### getSaturation

```typescript
await camera.getSaturation(): Promise<number>
```

Get current saturation value.

## Noise Reduction

### set2dNoiseReduction

```typescript
await camera.set2dNoiseReduction(enabled: boolean): Promise<boolean>
```

Enable or disable 2D noise reduction.

### get2dNoiseReduction

```typescript
await camera.get2dNoiseReduction(): Promise<boolean>
```

Get current 2D noise reduction setting.

### set3dNoiseReduction

```typescript
await camera.set3dNoiseReduction(mode: 'Off' | 'Auto' | '1' | '2' | '3' | '4'): Promise<boolean>
```

Set 3D noise reduction mode.

### get3dNoiseReduction

```typescript
await camera.get3dNoiseReduction(): Promise<string>
```

Get current 3D noise reduction setting.

## Streaming

### getRTSPUrl

```typescript
await camera.getRTSPUrl(type?: 'main' | 'sub'): Promise<string>
```

Get RTSP streaming URL. Defaults to 'main' stream if type not specified.

### getRTMPUrl

```typescript
await camera.getRTMPUrl(type?: 'main' | 'sub'): Promise<string>
```

Get RTMP streaming URL. Defaults to 'main' stream if type not specified.

### getFLVUrl

```typescript
await camera.getFLVUrl(type?: 'main' | 'sub'): Promise<string>
```

Get FLV streaming URL. Defaults to 'main' stream if type not specified.

### getWebRTCUrl

```typescript
await camera.getWebRTCUrl(type?: 'main' | 'sub'): Promise<string>
```

Get WebRTC streaming URL. Defaults to 'main' stream if type not specified.

**Stream Types:**

-   `'main'` - High quality stream (default) - 1920×1080 up to 60fps
-   `'sub'` - Lower quality stream - Various resolutions up to 1280×720
