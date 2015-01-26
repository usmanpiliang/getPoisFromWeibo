//count group by annotation.poiid
db.weibo.group({
	key: {
		'annotations.poiid': true,
	},
	initial: {
		counts: 0,
	},
	reduce: function(doc, argument) {
		argument.counts = argument.counts + 1;
		argument.title = doc.annotations.title;
		argument.lng = doc.annotations.lon;
		argument.lat = doc.annotations.lat;
	}
});
//insert index for created_at
db.weibo.ensureIndex({
	'created_at': 1
}, {
	unique: true,
	dropDups: true
});
//insert index for annotation.poiid
db.weibo.ensureIndex({
	'created_at': 1
}, {
	unique: true,
	dropDups: true
});

//map-reduce
var map = function() {
	// var yearMonth = this.created_at.getFullYear() + '-' + (this.created_at.getMonth() + 1) + '-' + this.created_at.getDate();
	var yearMonth = this.created_at.getDay();
	var value = {
		count: 1,
		pics: parseInt(this.pic_count),
		year: this.created_at.getFullYear(),
		month: this.created_at.getMonth(),
		date: this.created_at.getDate(),
		day: this.created_at.getDay()
	};
	emit(yearMonth, value);
}

var reduce = function(key, countObjVals) {
	reducedVal = {
		count: 0,
		pics: 0,
		year: 0,
		month: 0,
		date: 0,
		day: 0
	};

	for (var idx = 0; idx < countObjVals.length; idx++) {
		reducedVal.count += countObjVals[idx].count;
		reducedVal.pics += countObjVals[idx].pics;
		reducedVal.year = countObjVals[idx].year;
		reducedVal.month = countObjVals[idx].month;
		reducedVal.date = countObjVals[idx].date;
		reducedVal.day = countObjVals[idx].day;
	}

	return reducedVal;
}

var query = {
	created_at: {
		$gte: new Date(2014, 8, 25),
		$lte: new Date(2014, 9, 14)
	}
}

var finalize = function(key, reducedVal) {
	reducedVal.time = new Date(parseInt(reducedVal.year), parseInt(reducedVal.month), parseInt(reducedVal.date))
	return reducedVal;

};
db.weibo.mapReduce(map, reduce, {
	query: query,
	out: "WeiboCountWeekend",
	finalize: finalize
})