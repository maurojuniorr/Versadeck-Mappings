function Versadeck() {}

// The button that enables/disables scratching
Versadeck.wheelTouch = function (channel, control, value, status, group) {
	var deckNumber = script.deckFromGroup(group);

	// if ((status & 0x1a) === 0x92) {
	// If button down
	if (value === 0x7f) {
		// Some wheels send 0x90 on press and release, so you need to check the value
		var alpha = 1.0 / 8;
		var beta = alpha / 32;
		engine.scratchEnable(deckNumber, 128, 33 + 1 / 3, alpha, beta);
	} else {
		// If button up
		engine.scratchDisable(deckNumber);
	}
};

// The wheel that actually controls the scratching
Versadeck.wheelTurn = function (channel, control, value, status, group) {
	var newValue = value - 64;

	// In either case, register the movement
	var deckNumber = script.deckFromGroup(group);
	if (engine.isScratching(deckNumber)) {
		engine.scratchTick(deckNumber, newValue); // Scratch!
	} else {
		engine.setValue(group, 'jog', newValue); // Pitch bend
	}
};
