/*
 *	PK4YO Co. Ltd.
 *  Author: Zhang Hui <spacetiller@163.com>
 *  Time: Dec. 2018
 *  All Copyrights Reserved.
 */
var express = require('express');
var router = express.Router();
var conn = require('../common/database');
var Myactivity = require('../../models/myactivity/myactivity.js');

var myactivity = new Myactivity();

const table_name = myactivity.table_name; //'pkproject';
const table_cols = myactivity.table_cols; //'pkproject';

//console.log(table_name);

/* GET all listing. */
router.get('/', function(req, res, next) {
	var cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		var retjson = {"code":0,"data":[]};
		if(results && results.length > 0){
			retjson.data = results;
		}
		//res.json(JSON.stringify(retjson));
        //res.end('is over');
		if(conn.cc.whitelist.indexOf(req.headers["x-real-ip"]) >= 0){
			res.setHeader("Access-Control-Allow-Origin", "*");
		}
		res.send(JSON.stringify(retjson));
		console.log('all listing json sent over. ');
	};
	conn.queryList(req, table_name, cbfunc);
	console.log("all listing first here"); 
});

/* GET condition listing. */
router.get('/getbycond', function(req, res, next) {
	var retjson = {"code":0,"data":[]};
	var cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		if(results.length > 0){
			retjson.data = results;
		}
		if(conn.cc.whitelist.indexOf(req.headers["x-real-ip"]) >= 0){
			res.setHeader("Access-Control-Allow-Origin", "*");
		}
		res.send(JSON.stringify(retjson));
		console.log('condition listing json sent over. ');
	};
	conn.queryList(req, table_name, cbfunc);
	console.log("condition listing first here"); 
});

/* GET one . */
router.get('/getbyid', function(req, res, next) {
	var retjson = {"code":0,"data":[]};
	var cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		if(results.length > 0){
			retjson.data = results;
		}
		if(conn.cc.whitelist.indexOf(req.headers["x-real-ip"]) >= 0){
			res.setHeader("Access-Control-Allow-Origin", "*");
		}
		res.send(JSON.stringify(retjson));
		console.log('one by id json sent over. ');
	};
	conn.queryOneById(req, table_name, cbfunc);
	console.log("get one by id first here"); 
});

/*
 * add one
 */
router.get('/add', function(req, res, next) {
	var retjson = {"code":0,"msg":"ok"};

	var cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		retjson.maId = results?results.insertId:'-1';
		if(conn.cc.whitelist.indexOf(req.headers["x-real-ip"]) >= 0){
			res.setHeader("Access-Control-Allow-Origin", "*");
		}
		res.send(JSON.stringify(retjson));
        //res.end('is over');
		console.log('sql add over ');
	};
	conn.addOne(req, table_name, cbfunc);
	console.log("sql add first here"); 
	
	cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		console.log(results);
		console.log('myactivity user update over ');
	};
	conn.updateOne(req, 'pkuser', cbfunc);
	console.log("sql update first here"); 
});

/*
 * add one, if condition record not exist
 */
router.get('/addifnotexist', function(req, res, next) {
	var retjson = {"code":0,"msg":"ok"};
	var cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		if(conn.cc.whitelist.indexOf(req.headers["x-real-ip"]) >= 0){
			res.setHeader("Access-Control-Allow-Origin", "*");
		}
		if(results.length == 0){
			var cbfunc1 = function(error, results, fields) {
				if(error){
					console.log(error);
				}
				retjson.maId = results?results.insertId:'-1';
				res.send(JSON.stringify(retjson));
    		    //res.end('is over');
				console.log(table_name + ': sql add over');
			};
			conn.addOne(req, table_name, cbfunc1);
			console.log(table_name + ': sql add first here'); 

		}else{
			retjson.maId = results[0].maId;
			res.send(JSON.stringify(retjson));
			console.log(table_name + ': sql query over');
		}
		//res.send(JSON.stringify(retjson));
		console.log(table_name + ': condition listing json sent over. ');
	};
	conn.queryList(req, table_name, cbfunc);
	console.log(table_name + ': condition listing first here'); 

	cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		console.log(results);
		console.log(table_name + ': user update over ');
	};
	conn.updateOne(req, 'pkuser', cbfunc);
	console.log(table_name + ': user update first here'); 
});


/* 
 *	update one
 */
router.get('/update', function(req, res, next) {
	var retjson = {"code":0,"msg":"ok"};
	var cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		if(conn.cc.whitelist.indexOf(req.headers["x-real-ip"]) >= 0){
			res.setHeader("Access-Control-Allow-Origin", "*");
		}
		res.send(JSON.stringify(retjson));
		console.log('sql update over: ');
        //res.end('is over');
		//console.log('connected as id ' + conn.threadId);
		//conn.releaseConnection();
	};
	conn.updateOne(req, table_name, cbfunc);
	console.log("sql update first here"); 
});

/* 
 *	delete one
 */
router.get('/delete', function(req, res, next) {
	var retjson = {"code":0,"msg":"ok"};
	var cbfunc = function(error, results, fields) {
		if(error){
			console.log(error);
		}
		//res.json(JSON.stringify(retjson));
        //res.end('is over');
		if(conn.cc.whitelist.indexOf(req.headers["x-real-ip"]) >= 0){
			res.setHeader("Access-Control-Allow-Origin", "*");
		}
		res.send(JSON.stringify(retjson));
		console.log('sql delete over ');
	};
	conn.deleteOne(req, table_name, cbfunc);
	console.log("sql delete first here"); 
});

module.exports = router;
