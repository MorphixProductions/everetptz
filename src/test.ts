import { GAIN, IRIS } from './commands';
import { EveretPTZ } from './EveretPTZ';
import { delay } from './utils';

async function main() {
	const ptz = new EveretPTZ('10.99.0.118', 'admin', '234Tgb999!');

	ptz.onError((error) => {
		console.error('Error occurred:', error.message);
	});

	await ptz.whenReady();

	var mirror: boolean = false;

	ptz.setFlip(false);
	var b = 0;
	var c = 0;
	setInterval(() => {
		// if (c == 5) {
		// 	ptz.setMirror(mirror);
		// 	mirror = !mirror;
		// 	c = 0;
		// } else c++;

		b++;

		if (b > 255) b = 0;
		else b += 10;

		ptz.setBlueGain(b as any);
	}, 100);

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
