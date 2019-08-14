var express = require("express");
var jsonfile = require("jsonfile");
var fs = require("fs");
var ftp = require("ftp");
var wifi = require("node-wifi");
var bebop = require("node-bebop");
var router = express.Router();
var drone = bebop.createClient();
var alreadyFlying = false;
var c = new ftp();

wifi.init({
  iface: null
});
wifi.connect({ ssid: "media", password: "metro-cit" }, function(err) {
  console.log(err);
});