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

## Quick Start

```typescript
import { EveretPTZ } from 'everetptz';

// Initialize camera connection
const camera = new EveretPTZ('192.168.1.100', 'admin', 'password');

// Wait for authentication
await camera.whenReady();

// Pan and tilt control
await camera.move('up', true, 15); // Start tilting up at speed 15
await camera.move('up', false); // Stop tilting

// Zoom control
await camera.zoom('in', true, 5); // Start zooming in at speed 5
await camera.zoom('in', false); // Stop zooming

// Focus control
await camera.focus('far', true, 3); // Start focusing far at speed 3
await camera.focus('far', false); // Stop focusing

// Get streaming URLs
const rtspUrl = await camera.getRTSPUrl('main');
const webrtcUrl = await camera.getWebRTCUrl('sub');
console.log('RTSP Stream:', rtspUrl);
console.log('WebRTC Stream:', webrtcUrl);
```

## API Reference

### Constructor

```typescript
new EveretPTZ(ip: string, username: string, password: string)
```

-   `ip` - Camera IP address
-   `username` - Camera login username
-   `password` - Camera login password

### Authentication

```typescript
await camera.whenReady(): Promise<void>
```

Wait for authentication to complete before sending commands.

```typescript
camera.onError(callback: (error: Error) => void): void
```

Set error handler for authentication and request failures.

### Movement Control

```typescript
await camera.move(
  direction: 'up' | 'down' | 'left' | 'right',
  active: boolean,
  speed?: number // 0-24, default: 10
): Promise<boolean>
```

Start or stop pan/tilt movement in the specified direction.

**Examples:**

```typescript
// Start moving up at speed 15
await camera.move('up', true, 15);

// Stop all movement
await camera.move('up', false);
await camera.move('down', false);
await camera.move('left', false);
await camera.move('right', false);
```

### Zoom Control

```typescript
await camera.zoom(
  direction: 'in' | 'out',
  active: boolean,
  speed?: number // 0-7, default: 7
): Promise<boolean>
```

Control zoom operation.

**Examples:**

```typescript
// Start zooming in at maximum speed
await camera.zoom('in', true, 7);

// Stop zooming
await camera.zoom('in', false);
```

### Focus Control

```typescript
await camera.focus(
  direction: 'near' | 'far',
  active: boolean,
  speed?: number // 0-7, default: 7
): Promise<boolean>
```

Manual focus control.

```typescript
await camera.setFocusMode(mode: 'auto' | 'manual'): Promise<boolean>
await camera.getFocusMode(): Promise<'auto' | 'manual'>
```

**Examples:**

```typescript
// Set to manual focus
await camera.setFocusMode('manual');

// Focus to infinity
await camera.focus('far', true, 5);
await camera.focus('far', false);

// Return to auto focus
await camera.setFocusMode('auto');
```

### Exposure Control

```typescript
await camera.setExposureMode(
  mode: 'auto' | 'manual' | 'iris priority' | 'shutter priority' | 'brightness priority'
): Promise<boolean>

await camera.getExposureMode(): Promise<string>
```

**Shutter Speed Control:**

```typescript
await camera.setShutter(speed: string): Promise<boolean>
await camera.getShutter(): Promise<string>
```

Available shutter speeds: `'1/25'`, `'1/50'`, `'1/75'`, `'1/100'`, `'1/120'`, `'1/150'`, `'1/215'`, `'1/300'`, `'1/425'`, `'1/600'`, `'1/1000'`, `'1/1250'`, `'1/1750'`, `'1/2500'`, `'1/3500'`, `'1/6000'`, `'1/10000'`

**Gain Control:**

```typescript
await camera.setExposureGain(gain: string): Promise<boolean>
await camera.getExposureGain(): Promise<string>
```

Available gain values: `'0dB'` to `'30dB'` in 2dB increments

**Iris Control:**

```typescript
await camera.setIris(aperture: string): Promise<boolean>
await camera.getIris(): Promise<string>
```

Available apertures: `'Close'`, `'F14.0'`, `'F11.0'`, `'F9.6'`, `'F8.0'`, `'F6.8'`, `'F5.6'`, `'F4.8'`, `'F4.0'`, `'F3.4'`, `'F2.8'`, `'F2.4'`, `'F2.0'`, `'F1.8'`

**Brightness Control:**

```typescript
await camera.setExposureBrightness(brightness: number): Promise<boolean> // 0-27
await camera.getExposureBrightness(): Promise<number>
```

### White Balance

```typescript
await camera.setWhiteBalanceMode(
  mode: 'auto' | 'indoor' | 'outdoor' | 'one push' | 'auto tracking' | 'manual' | 'temperature'
): Promise<boolean>

await camera.getWhiteBalanceMode(): Promise<string>
```

**Manual White Balance Controls:**

```typescript
await camera.setRedGain(value: number): Promise<boolean>     // 0-255
await camera.getRedGain(): Promise<number>

await camera.setBlueGain(value: number): Promise<boolean>    // 0-255
await camera.getBlueGain(): Promise<number>

await camera.setColorTemperature(value: number): Promise<boolean> // 1800-10000K
await camera.getColorTemperature(): Promise<number>
```

### Image Enhancement

**Anti-Flicker:**

```typescript
await camera.setAntiFlicker(frequency: 'Off' | '50Hz' | '60Hz'): Promise<boolean>
await camera.getAntiFlicker(): Promise<string>
```

**Wide Dynamic Range:**

```typescript
await camera.setWideDynamicRange(mode: 'Off' | 1 | 2 | 3 | 4 | 5 | 6): Promise<boolean>
await camera.getWideDynamicRange(): Promise<string | number>
```

**Noise Reduction:**

```typescript
await camera.set2dNoiseReduction(enabled: boolean): Promise<boolean>
await camera.get2dNoiseReduction(): Promise<boolean>

await camera.set3dNoiseReduction(mode: 'Off' | 'Auto' | '1' | '2' | '3' | '4'): Promise<boolean>
await camera.get3dNoiseReduction(): Promise<string>
```

**Image Adjustments:**

```typescript
await camera.setBrightness(value: number): Promise<boolean>   // 0-15
await camera.getBrightness(): Promise<number>

await camera.setSharpness(value: number): Promise<boolean>    // 0-15
await camera.getSharpness(): Promise<number>

await camera.setContrast(value: number): Promise<boolean>     // 0-15
await camera.getContrast(): Promise<number>

await camera.setSaturation(value: number): Promise<boolean>   // 0-15
await camera.getSaturation(): Promise<number>

await camera.setGamma(value: number): Promise<boolean>        // 0-4
await camera.getGamma(): Promise<number>
```

### Image Orientation

```typescript
await camera.setMirror(enabled: boolean): Promise<boolean>
await camera.getMirror(): Promise<boolean>

await camera.setFlip(enabled: boolean): Promise<boolean>
await camera.getFlip(): Promise<boolean>

await camera.setBacklightCompensation(enabled: boolean): Promise<boolean>
await camera.getBacklightCompensation(): Promise<boolean>
```

### Streaming URLs

Get streaming URLs for various protocols. The camera supports both main and sub streams:

```typescript
await camera.getRTSPUrl(type?: 'main' | 'sub'): Promise<string>
await camera.getRTMPUrl(type?: 'main' | 'sub'): Promise<string>
await camera.getFLVUrl(type?: 'main' | 'sub'): Promise<string>
await camera.getWebRTCUrl(type?: 'main' | 'sub'): Promise<string>
```

**Stream Types:**

-   `'main'` - High quality stream (default) - 1920×1080 up to 60fps
-   `'sub'` - Lower quality stream - Various resolutions up to 1280×720

## Complete Usage Example

```typescript
import { EveretPTZ } from 'everetptz';

async function main() {
	// Initialize camera
	const camera = new EveretPTZ('192.168.1.100', 'admin', 'admin123');

	// Set up error handling
	camera.onError((error) => {
		console.error('Camera error:', error.message);
	});

	// Wait for authentication
	await camera.whenReady();
	console.log('Camera ready!');

	// Get streaming URLs for integration
	const streams = {
		rtsp: await camera.getRTSPUrl('main'),
		rtmp: await camera.getRTMPUrl('main'),
		webrtc: await camera.getWebRTCUrl('main'),
		flv: await camera.getFLVUrl('sub'), // Sub stream for lower bandwidth
	};

	console.log('Available streams:', streams);

	// Configure camera settings
	await camera.setExposureMode('auto');
	await camera.setFocusMode('auto');
	await camera.setWhiteBalanceMode('auto');
	await camera.setAntiFlicker('60Hz');

	// Preset movement sequence
	console.log('Moving to position...');

	// Pan right for 2 seconds
	await camera.move('right', true, 20);
	await new Promise((resolve) => setTimeout(resolve, 2000));
	await camera.move('right', false);

	// Tilt up for 1 second
	await camera.move('up', true, 15);
	await new Promise((resolve) => setTimeout(resolve, 1000));
	await camera.move('up', false);

	// Zoom in
	await camera.zoom('in', true, 5);
	await new Promise((resolve) => setTimeout(resolve, 3000));
	await camera.zoom('in', false);

	console.log('Movement complete!');
}

main().catch(console.error);
```

## Error Handling

The library provides built-in error handling for network issues and authentication failures:

```typescript
const camera = new EveretPTZ('192.168.1.100', 'admin', 'password');

camera.onError((error) => {
	if (error.message.includes('Invalid login')) {
		console.error('Authentication failed - check credentials');
	} else if (error.message.includes('fetch')) {
		console.error('Network error - check camera IP and connectivity');
	} else {
		console.error('Camera error:', error.message);
	}
});
```

## Tested Camera Models

-   **EVP212N** (Black) - EAN: 8719327137901
-   **EVP212N-W** (White) - EAN: 8719327137956
