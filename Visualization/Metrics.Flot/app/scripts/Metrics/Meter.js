﻿(function ($,_, metrics) {
    'use strict';

    function Meter(name) {
        var count = new metrics.ValueSeries(name + '.Count'),
            meanRate = new metrics.ValueSeries(name + '.Rate.Mean'),
            oneMinuteRate = new metrics.ValueSeries(name + '.Rate.1 Min'),
            fiveMinuteRate = new metrics.ValueSeries(name + '.Rate.5 Min'),
            fifteenMinuteRate = new metrics.ValueSeries(name + '.Rate.15 Min');

        this.getNames = function () {
            return [name];
        };

        this.update = function (value) {
            count.update(value.count);
            meanRate.update(value.meanRate);
            oneMinuteRate.update(value.oneMinuteRate);
            fiveMinuteRate.update(value.fiveMinuteRate);
            fifteenMinuteRate.update(value.fifteenMinuteRate);
        };

        this.getSeries = function () {
            return _.union(meanRate.getSeries(), oneMinuteRate.getSeries(), fiveMinuteRate.getSeries(), fifteenMinuteRate.getSeries());
        };
    }

    $.extend(true, this, { metrics: { Meter: Meter } });

}).call(this, this.jQuery, this._, this.metrics);