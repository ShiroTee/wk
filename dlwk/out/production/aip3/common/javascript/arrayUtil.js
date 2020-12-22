Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val)
			return i;
	}
	return -1;
};
// 数组删除元素方法
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};

Array.prototype.min = function() {
	var min = this[0];
	var len = this.length;
	for (var i = 1; i < len; i++) {
		if (this[i] < min) {
			min = this[i];
		}
	}
	return min;
}
Array.prototype.minIndex = function() {
	var index=0;
	var min = this[0];
	var len = this.length;
	for (var i = 1; i < len; i++) {
		if (this[i] < min) {
			min = this[i];
			index=i;
		}
	}
	return index;
}
// 最大值
Array.prototype.max = function() {
	var max = this[0];
	var len = this.length;
	for (var i = 1; i < len; i++) {
		if (this[i] > max) {
			max = this[i];
		}
	}
	return max;
}

Array.prototype.maxIndex = function() {
	var index=0;
	var max = this[0];
	var len = this.length;
	for (var i = 1; i < len; i++) {
		if (this[i] > max) {
			max = this[i];
			index=i;
		}
	}
	return index;
}
// 选中
function selectTab() {
};