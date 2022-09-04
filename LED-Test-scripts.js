LEDTest = new (function () {
	this.LEDStates = [];
	this.controlValues = [0x80, 0x90, 0xb0];
	this.currentControlValue = 0xb0;
})();

LEDTest.init = function (id) {
	for (var i = 0; i < 128; i++) {
		LEDTest.LEDStates[i] = LedState.off;
	}
};

LEDTest.setLed = function (channel, control, value, status, group) {
	if (LEDTest.LEDStates[value] == LedState.off) {
		LEDTest.LEDStates[value] = LedState.on;
	} else {
		LEDTest.LEDStates[value] = LedState.off;
	}
	midi.sendShortMsg(
		LEDTest.currentControlValue,
		value,
		LEDTest.LEDStates[value]
	);
	print(
		'Sent: ' +
			LEDTest.currentControlValue.toString(16) +
			', ' +
			value.toString(16) +
			', ' +
			LEDTest.LEDStates[value].toString(16)
	);
};

LEDTest.toggleControlValue = function (channel, control, value, status, group) {
	if (value == 0) return;

	var i;
	for (i = 0; i < LEDTest.controlValues.length; i++) {
		if (LEDTest.controlValues[i] == LEDTest.currentControlValue) {
			print('Break on: ' + i);
			break;
		}
	}
	i++;
	print('i: ' + i);
	if (i == LEDTest.controlValues.length) {
		i = 0;
	}

	LEDTest.currentControlValue = LEDTest.controlValues[i];
	print('Current control value: ' + LEDTest.currentControlValue.toString(16));
};
