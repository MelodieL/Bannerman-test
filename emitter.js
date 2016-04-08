function EventEmitter() {
	this.events = [];
}

EventEmitter.prototype.listen = function(name, callback) {
	this.events.push({
		name: name,
		callback: callback
	});
}

EventEmitter.prototype.unregister = function(name, callback) {
	var indexes = this.events.map(function(item, index) {
		if (item.name === name && item.callback === callback) {
			return index;
		}
		return null;
	}.bind(this));
	
	indexes.forEach(function(index) {
		if (index) {
			delete this.events[index];
		}
	}.bind(this));
}

EventEmitter.prototype.trigger = function(name, data, ctx) {
	var funcs = this.events.filter(function(item) {
		if (item.name === name) {
			return true;
		}
		return false;
	}.bind(this));
	
	funcs.forEach(function(item) {
		var func = item.callback;
		if (ctx) {
			func.bind(ctx);
		}
		func(data);
	}.bind(this));
}

function checkinListener(data) {
	console.log('Latitude: ' + data.lat);
	console.log('Longitude: ' + data.lng);
}

function sumListener(data) {
	console.log('Sum: ' + (data.lat + data.lng));
}

var emitter = new EventEmitter();
emitter.listen('checkin', checkinListener);
emitter.listen('checkin', sumListener);

emitter.trigger('checkin', {lat: 15, lng: 28});