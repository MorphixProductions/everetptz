import { GAIN, IRIS } from './commands';
import { EveretPTZ } from './EveretPTZ';
import { delay } from './utils';

declare const process: any;
const password = (process as any).argv[2];

if (password == null)
	throw new Error('Please provide the password as the first argument.');

async function main() {
	const ptz = new EveretPTZ('10.99.0.118', 'admin', password);

	ptz.onError((error) => {
		console.error('Error occurred:', error.message);
	});

	await ptz.whenReady();

	const info = await ptz.getInfo();
	console.log('Current info:', info);

	// ptz.setWideDynamicRange('Off');

	// ptz.setGamma(4);
	// const exposureMode = await ptz.getExposureMode();
	// console.log('Current exposure mode:', exposureMode);

	// const presetRecall = await ptz.recallPreset(2);
	// console.log('Preset recalled:', presetRecall);

	// const presetSet = await ptz.setPreset(2);
	// console.log('Preset set:', presetSet);

	// const presetSet = await ptz.setPreset(2);
	// console.log('Preset set:', presetSet);

	// const rtsp = await ptz.getRTSPUrl();
	// const rtmp = await ptz.getRTMPUrl();
	// const flv = await ptz.getFLVUrl();
	// const webrtc = await ptz.getWebRTCUrl();

	// console.log({ rtsp, rtmp, flv, webrtc });

	// var mirror: boolean = false;

	// // ptz.setFlip(false);
	// var b = 0;
	// // var c = 0;
	// setInterval(() => {
	// 	// if (c == 5) {
	// 	// 	ptz.setMirror(mirror);
	// 	// 	mirror = !mirror;
	// 	// 	c = 0;
	// 	// } else c++;

	// 	ptz.setSaturation(10);

	// 	ptz.setWhiteBalanceMode('manual');

	// 	b++;

	// 	if (b > 255) b = 0;
	// 	else b += 10;

	// 	ptz.setBlueGain(b as any);
	// 	ptz.setRedGain(b as any);

	// 	ptz.setMirror(mirror);
	// 	mirror = !mirror;
	// }, 100);

	// const saturation = await ptz.getSaturation();
	// console.log('Current saturation:', saturation);

	// const contrast = await ptz.setContrast(10);
	// console.log('Current contrast:', contrast);

	// const succeed = await ptz.setWideDynamicRange('Off');.36
	// console.log('Set wide dynamic range succeeded:', succeed);

	// await ptz.setGamma(2);

	// const gamma = await ptz.getGamma();
	// console.log('Current gamma:', gamma);

	// const backlight = await ptz.getBacklightCompensation();
	// console.log('Current backlight compensation state:', backlight);

	// const flipped = await ptz.getFlip();
	// console.log('Current flip state:', flipped);

	// await ptz.setFlip(false);

	// const mirrored = await ptz.getMirror();
	// console.log('Current mirror state:', mirrored);

	// const currentColor = await ptz.getColorTemperature();
	// console.log(`Current color temperature: ${currentColor}`);

	// const colorSucceed = await ptz.setColorTemperature(6500);
	// console.log(`Set color temperature succeeded: ${colorSucceed}`);

	// for (let i = 0; i < 256; i++) {
	// 	ptz.setBlueGain(i as any);
	// 	console.log(`Set blue gain to ${i}`);
	// 	await delay(10);
	// }

	// ptz.setAntiFlicker('Off');

	// const state = await ptz.getAntiFlicker();
	// console.log('Anti-flicker state:', state);

	// const iris = Object.keys(IRIS);
	// for (let i = 0; i < 28; i++) {
	// 	await ptz.setBrightness(i as any);

	// 	console.log(`Set brightness to ${i}`);

	// 	await delay(100);
	// }

	// ptz.setBrightness(20);

	// const succeed = await ptz.setIris('F2.0');
	// console.log(`Set iris succeeded: ${succeed}`);

	// const current = await ptz.getIris();
	// console.log(`Current is ${current}`);
}

main();
