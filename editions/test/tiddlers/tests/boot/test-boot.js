/*\
title: boot/test-widget.js
type: application/javascript
tags: [[$:/tags/test-spec]]

Tests the boot module.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: true */
	"use strict";

// The boot module has global side-effects when executed in browser,
// which makes it hard to test. We contend with only testing in Node.
if($tw.node) {
	describe("boot module",function() {
		var path = require("path");
		var boot = require(path.join($tw.boot.bootPath,"boot.js")).TiddlyWiki;
		function createTw() {
			var tw = boot();
			// Run only the essential initialization code from $tw.boot.initStartup().
			tw.wiki = new tw.Wiki();
			return tw;
		}
		describe("execStartup()",function() {
			it("executes simple startup modules",function(done) {
				var $tw = createTw();
				var log = [];
				$tw.modules.define("start1","startup",{
					startup: function() {
						log.push("start1");
					},
				});
				$tw.modules.define("start2","startup",{
					startup: function() {
						log.push("start2");
					},
				});
				$tw.boot.execStartup({callback: function() {
					expect(log).toEqual(["start1","start2"]);
					done();
				}});
			});
			it("skips startup modules that do not match the current platform",function(done) {
				var $tw = createTw();
				var log = [];
				$tw.modules.define("start1","startup",{
					platforms: ["browser"],
					startup: function() {
						log.push("start1");
					},
				});
				$tw.boot.execStartup({callback: function() {
					expect(log).toEqual([]);
					done();
				}});
			});
			it("executes startup modules ordered by 'after'",function(done) {
				var $tw = createTw();
				var log = [];
				$tw.modules.define("after2","startup",{
					after: ["start2"],
					startup: function() {
						log.push("after2");
					},
				});
				$tw.modules.define("start2","startup",{
					name: "start2",
					startup: function() {
						log.push("start2");
					},
				});
				$tw.boot.execStartup({callback: function() {
					expect(log).toEqual(["start2","after2"]);
					done();
				}});
			});
			it("executes async startup modules ordered by 'after'",function(done) {
				var $tw = createTw();
				var log = [];
				$tw.modules.define("after2","startup",{
					after: ["start2"],
					synchronous: false,
					startup: function(callback) {
						setTimeout(function(){
							log.push("after2");
							callback();
						}, 0);
					},
				});
				$tw.modules.define("start2","startup",{
					name: "start2",
					synchronous: false,
					startup: function(callback) {
						setTimeout(function(){
							log.push("start2");
							callback();
						}, 0);
					},
				});
				$tw.boot.execStartup({callback: function() {
					expect(log).toEqual(["start2","after2"]);
					done();
				}});
			});
			it("executes startup modules ordered by 'after' even if platform does not match",function(done) {
				var $tw = createTw();
				var log = [];
				$tw.modules.define("after2","startup",{
					after: ["start2"],
					startup: function() {
						log.push("after2");
					},
				});
				$tw.modules.define("start2","startup",{
					name: "start2",
					platforms: ["browser"],
					startup: function() {
						log.push("start2");
					},
				});
				$tw.boot.execStartup({callback: function() {
					// "start2" always gets skipped because this test suite is
					// only run in Node and "start2" is only run in the browser
					expect(log).toEqual(["after2"]);
					done();
				}});
			});
			it("executes startup modules ordered by 'before'",function(done) {
				var $tw = createTw();
				var log = [];
				$tw.modules.define("start1","startup",{
					name: "start1",
					startup: function() {
						log.push("start1");
					},
				});
				$tw.modules.define("before1","startup",{
					before: ["start1"],
					startup: function() {
						log.push("before1");
					},
				});
				$tw.boot.execStartup({callback: function() {
					expect(log).toEqual(["before1","start1"]);
					done();
				}});
			});
			it("executes async startup modules ordered by 'before'",function(done) {
				var $tw = createTw();
				var log = [];
				$tw.modules.define("start1","startup",{
					name: "start1",
					synchronous: false,
					startup: function(callback,) {
						setTimeout(function(){
							log.push("start1");
							callback();
						}, 0);
					},
				});
				$tw.modules.define("before1","startup",{
					before: ["start1"],
					synchronous: false,
					startup: function(callback) {
						setTimeout(function(){
							log.push("before1");
							callback();
						}, 0);
					},
				});
				$tw.boot.execStartup({callback: function() {
					expect(log).toEqual(["before1","start1"]);
					done();
				}});
			});
		});
	});
}

})();
