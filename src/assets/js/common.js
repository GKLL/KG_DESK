import "babel-polyfill";
import conf from './conf';
import Lib from 'assets/js/Lib';
import axios from 'axios';
import md5 from 'js-md5';
import $ from 'jquery';
import {
	Message
} from 'element-ui';
import Vue from 'vue';
Vue.prototype.$message = Message;
let Base64 = require('js-base64').Base64;
var oproto = Object.prototype;
var serialize = oproto.toString;
let token = localStorage.getItem('kg_desk_token');
const userId = localStorage.getItem('kg_desk_userId');
const locationHref = window.location.href;

if (token == null) {
	token = ''
}
const that = this;
var Rxports = {
	/**
	 * 封装axios，减少学习成本，参数基本跟jq ajax一致
	 * @param {String} type			请求的类型，默认post
	 * @param {String} url				请求地址
	 * @param {String} time			超时时间
	 * @param {Object} data			请求参数
	 * @param {String} dataType		预期服务器返回的数据类型，xml html json ...
	 * @param {Object} headers			自定义请求headers
	 * @param {Function} success		请求成功后，这里会有两个参数,服务器返回数据，返回状态，[data, res]
	 * @param {Function} error		发送请求前
	 * @param return 
	 */
	//token请求方式
	ajax: function (opt) {
		var opts = opt || {};
		if (!opts.url) {
			alert('请填写接口地址');
			return false;
		}
		axios({
			method: opts.type || 'post',
			url: opts.url,
			params: opts.data || {},
			headers: opts.headers || {
				// 'Content-Type':'application/x-www-form-urlencoded',
				'token': token,
			},
			baseURL: conf.devIp,
			timeout: opts.time || 10 * 1000,
			responseType: opts.dataType || 'json'
		}).then(function (res) {
			if (res.data.code == 10004 || res.data.code == 10007 || res.data.code == 10001) {

			}
			//登录失效
			if (res.data.code == 10004) {
				localStorage.clear();
				if(
					locationHref.indexOf('account') != '-1' ||
					locationHref.indexOf('uploadVideo') != '-1' ||
					locationHref.indexOf('uploadVideoEditor') != '-1' ||
					locationHref.indexOf('publish') != '-1' ||
					locationHref.indexOf('editor') != '-1'
				){
					window.onbeforeunload = null
					setTimeout(() => {
						window.location.href = "../index/list.html"
					}, 2000);
				} else {
					setTimeout(() => {
						window.location.href = locationHref
					}, 2000);
				}

			}
			//文章不存在
			if (res.data.code == 10007) {
				// window.location.href = "https://www.kg.com/404.html"
			}
			//账号锁定
			if (res.data.code == 10011) {
				if (
					locationHref.indexOf('account') != '-1' ||
					locationHref.indexOf('uploadVideo') != '-1' ||
					locationHref.indexOf('uploadVideoEditor') != '-1' ||
					locationHref.indexOf('publish') != '-1' ||
					locationHref.indexOf('editor') != '-1'
				) {
					window.onbeforeunload = null
					setTimeout(() => {
						window.location.href = "../index/list.html"
					}, 2000);

				} else {
					setTimeout(() => {
						window.location.href = locationHref
					}, 2000);
				}
			}
			if (res.status == 200) {
				if (opts.success) {
					opts.success(res.data, res);
				}
			} else {
				if (data.error) {
					opts.error(error);
				} else {
					// alert('好多人在访问呀，请重新试试');
				}

			}
		}).catch(function (error) {

			if (opts.error) {
				opts.error(error);
			} else {
				// alert('好多人在访问呀，请重新试试');
			}
		});

	},

	activityAjax: function (opt) {
		var opts = opt || {};
		if (!opts.url) {
			alert('请填写接口地址');
			return false;
		}
		axios({
			method: opts.type || 'post',
			url: opts.url,
			params: opts.data || {},
			headers: opts.headers || {
				// 'Content-Type':'application/x-www-form-urlencoded',
				'token': token,
			},
			baseURL: conf.devIp,
			timeout: opts.time || 10 * 1000,
			responseType: opts.dataType || 'json'
		}).then(function (res) {
			if (res.data.code == 10004 || res.data.code == 10007 || res.data.code == 10001) {

			}
			//登录失效
			if (res.data.code == 10004) {
				localStorage.clear();
				// console.log('locationHref',locationHref)
				if (locationHref.indexOf('account') != '-1') {
					window.onbeforeunload = null
					console.log('跳出')
					setTimeout(() => {
						window.location.href = "../lottery/list.html"
					}, 2000);

				} else {
					setTimeout(() => {
						window.location.href = locationHref
					}, 2000);
				}




			}
			//账号锁定
			if (res.data.code == 10011) {
				// console.log('locationHref',locationHref)
				if (locationHref.indexOf('account') != '-1') {
					window.onbeforeunload = null
					setTimeout(() => {
						window.location.href = "../index/list.html"
					}, 2000);

				} else {
					setTimeout(() => {
						window.location.href = locationHref
					}, 2000);
				}
			}
			if (res.status == 200) {
				if (opts.success) {
					opts.success(res.data, res);
				}
			} else {
				if (data.error) {
					opts.error(error);
				} else {
					// alert('好多人在访问呀，请重新试试');
				}

			}
		}).catch(function (error) {
			// console.log('error',error);
			if (opts.error) {
				opts.error(error);
			} else {
				// alert('好多人在访问呀，请重新试试');
			}
		});

	},
	postAjax: function (opt) {
		var opts = opt || {};
		if (!opts.url) {
			alert('请填写接口地址');
			return false;
		}
		axios({
			method: opts.type || 'post',
			url: opts.url,
			data: opts.data || {},
			headers: opts.headers || {
				// 'enctype-Type':'application/x-www-form-urlencoded',
				//"Enctype":"application/x-www-form-urlencoded",
				// 'Content-Type':'application/x-www-form-urlencoded',
				'token': token
			},
			//	enctype:"application/x-www-form-urlencoded",
			baseURL: conf.devIp,
			timeout: opts.time || 10 * 1000,
			responseType: opts.dataType || 'json'
		}).then(function (res) {
			if (res.data.code == 10004 || res.data.code == 10007 || res.data.code == 10001) {

			}
			//登录失效
			if (res.data.code == 10004) {
				localStorage.clear();
				window.onbeforeunload = null

				setTimeout(() => {
					window.location.href = "../index/list.html"
				}, 2000);
			}
			//账号锁定
			if (res.data.code == 10011) {
				localStorage.clear();
				setTimeout(() => {
					window.location.href = "../index/list.html"
				}, 2000);
				window.onbeforeunload = null
			}
			if (res.status == 200) {
				if (opts.success) {
					opts.success(res.data, res);
				}
			} else {
				if (data.error) {
					opts.error(error);
				} else {
					// alert('好多人在访问呀，请重新试试');
				}

			}
		}).catch(function (error) {

			if (opts.error) {
				opts.error(error);
			} else {
				// alert('好多人在访问呀，请重新试试');
			}
		});

	},
	//登录请求方式
	loginAjax: function (opt) {
		var opts = opt || {};
		if (!opts.url) {
			alert('请填写接口地址');
			return false;
		}
		axios({
			method: opts.type || 'post',
			url: opts.url,
			params: opts.data || {},
			headers: opts.headers || {
				'Content-Type': 'application/x-www-form-urlencoded',


			},
			baseURL: conf.devIp,
			timeout: opts.time || 10 * 1000,
			responseType: opts.dataType || 'json'
		}).then(function (res) {
			if (res.status == 200) {
				if (opts.success) {
					opts.success(res.data, res);
				}
			} else {
				if (data.error) {
					opts.error(error);
				} else {}

			}
		}).catch(function (error) {

			if (opts.error) {
				opts.error(error);
			} else {}
		})
	},
	weixinAjax(opt) {
		var opts = opt || {};
		if (!opts.url) {
			alert('请填写接口地址');
			return false;
		}
		axios({
			method: opts.type || 'post',
			url: opts.url,
			params: opts.data || {},
			headers: opts.headers || {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			baseURL: conf.weiIp,
			timeout: opts.time || 10 * 1000,
			responseType: opts.dataType || 'json'
		}).then(function (res) {
			if (res.status == 200) {
				if (opts.success) {
					opts.success(res.data, res);
				}
			} else {
				if (data.error) {
					opts.error(error);
				} else {}

			}
		}).catch(function (error) {

			if (opts.error) {
				opts.error(error);
			} else {}
		})
	},
	/*判定是否类数组，如节点集合，纯数组，arguments与拥有非负整数的length属性的纯JS对象*/
	isArrayLike: function (obj) {
		if (!obj)
			return false
		var n = obj.length
		if (n === (n >>> 0)) { //检测length属性是否为非负整数
			var type = serialize.call(obj).slice(8, -1)
			if (/(?:regexp|string|function|window|global)$/i.test(type))
				return false
			if (type === "Array")
				return true
			try {
				if ({}.propertyIsEnumerable.call(obj, "length") === false) { //如果是原生对象
					return /^\s?function/.test(obj.item || obj.callee)
				}
				return true
			} catch (e) { //IE的NodeList直接抛错
				return !obj.window //IE6-8 window
			}
		}
		return false
	},
	/*遍历数组与对象,回调的第一个参数为索引或键名,第二个或元素或键值*/
	each: function (obj, fn) {
		var That = this;
		if (obj) { //排除null, undefined
			var i = 0
			if (That.isArrayLike(obj)) {
				for (var n = obj.length; i < n; i++) {
					if (fn(i, obj[i]) === false)
						break
				}
			} else {
				for (i in obj) {
					if (obj.hasOwnProperty(i) && fn(i, obj[i]) === false) {
						break
					}
				}
			}
		}
	},
	/**
	 * 获取url传过来的参数
	 * @param name 	获取的参数
	 * @param Url 		自定义获取参数的链接
	 * @param return
	 */
	getUrlQuery: function (name, Url) {

		//URL GET 获取值
		　　
		var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i"),
			url = Url || location.href;　　
		if (reg.test(url))　　 return unescape(RegExp.$2.replace(/\+/g, " "));　　
		return "";

	},
	// 解码中文
	getUrlVars() {
		/*                  var vars = [], hash; 
		                  var hashes = window.location.href.slice(window.location.href.indexOf('?')+1).split('&'); 
		                  for(var i = 0; i < hashes.length; i++) { 
		                  hash = hashes[i].split('='); 
		                  vars.push(hash[0]); 
		                  vars[hash[0]] = hash[1]; 
		                  } */
		var vars = window.location.href.split("?")[1].split("=")[1]
		return vars;
	},
	//判断token失效
	loseToken() {
		const token = localStorage.getItem('kg_desk_token');
		if (token == null) {
			// window.location.href = "../index/list.html"

		}
	},
	//请求数据拼接
	dataRequest(data) {
		/*		var list = new URLSearchParams();
				list.append('data',Base64.encode(JSON.stringify(data)));
				list.append('sign',md5(Base64.encode(JSON.stringify(data)) +token));*/
		let list = {
			"data": Base64.encode(JSON.stringify(data)),
			"sign": md5(Base64.encode(JSON.stringify(data)) + token)
		}
		if (data == '') {
			list = {
				"data": "",
				"sign": md5("" + token)
			}
		}

		return list;
	},
	postDataRequest(data) {

		var list = new FormData();;
		// var list = new URLSearchParams();
		if (data == '') {
			list.append('data', "");
			list.append('sign', md5("" + token));
		} else {
			list.append('data', Base64.encode(JSON.stringify(data)));
			list.append('sign', md5(Base64.encode(JSON.stringify(data)) + token));
		}

		return list

	},
	//不需要签名数据拼接
	noSignRequest(data) {
		let list = {
			"data": Base64.encode(JSON.stringify(data))
		}
		return list
	},
	GetRequest() {
		var url = location.search; //获取url中"?"符后的字串
		var theRequest = new Object();
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	},
	//加载更多文章
	loadMore(url, data, listData, me) {
		me.moreLoading = true
		this.ajax({
			'type': 'post',
			'url': url,
			"data": data,
			'success': function (data) {
				me.loadmorebtn = data.responseBody.totalPage == data.responseBody.currentPage ? false : true
				data = data.responseBody.data;
				if (data.length == 0) {
					me.$message({
						message: '没有更多数据了...',
						type: 'info'
					});
					me.loadmorebtn = false;
				}
				for (var i in data) {
					const defaultImg = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/180327/aticle" + Math.round(Math.random() * 32) + ".png"
					if (data[i].articleImage == null || data[i].articleImage == '') {
						data[i].defaultImage = defaultImg
					}
					if (data[i].articleTagnames != null) {
						arr = data[i].articleTagnames.split(',');
						arr = arr.slice(0, 3)
						data[i].articleTagnames = arr
					}
					if (data[i].avatar != null && data[i].avatar != "") {
						if (data[i].avatar.indexOf("http") == "-1") {
							data[i] = Object.assign(data[i], {
								avatar: Lib.C.imgUrl + data[i].avatar
							});
							data[i] = Object.assign(data[i], {
								realavatar: 1
							});
						} else {
							data[i] = Object.assign(data[i], {
								avatar: data[i].avatar
							});
							data[i] = Object.assign(data[i], {
								realavatar: null
							});
						}
					}
					listData.push(data[i])
				}
				me.moreLoading = false
			}
		});
	},
	//发送验证码
	sendMessage(form, me, send_list, id, csessionid, sig, token, scene) {
		me.time = 90;
		const that = this;
		window.clearInterval(me.interval);
	
		// this.aliBlock(id,me)
		if (me.atskMobile != null) {
			if(me.slideInfo.session == ''){
				me.$message({
					message: '验证失败，请重新进行滑块验证',
					type: 'warning'
				});
				return
			}
			me.$message({
				message: '验证码已发送！',
				type: 'success'
			});
			me.sendMsgDisabled = true;
			me.interval = window.setInterval(function () {
				if ((me.time--) <= 0) {
					me.sendMsgDisabled = false;
					that.aliBlock(id, me, csessionid, sig, token, scene)
					me.handleSlide('', '', '', '')
					window.clearInterval(me.interval);
				}
			}, 1000);
			this.loginAjax({
				'type': 'post',
				'url': "/userkg/sendSmsEmailcode",
				"data": send_list,
				'success': function (data) {

					if (data.code == 10000) {
						// me.$message({
						// 	message: '验证码已发送！',
						// 	type: 'success'
						// });
						// me.sendMsgDisabled = true;
						// me.interval = window.setInterval(function () {
						// 	if ((me.time--) <= 0) {
						// 		me.sendMsgDisabled = false;
						// 		that.aliBlock(id, me, csessionid, sig, token, scene)
						// 		me.handleSlide('', '', '', '')
						// 		window.clearInterval(me.interval);
						// 	}
						// }, 1000);
					} else if (data.code == 10020) {
						me.$message({
							message: data.message,
							type: 'warning'
						});
						me.sendMsgDisabled = false;
						that.aliBlock(id, me, csessionid, sig, token, scene)
						me.handleSlide('', '', '', '')
					} else {
						me.$message({
							message: data.message,
							type: 'error'
						});
						me.sendMsgDisabled = false;
						window.clearInterval(me.interval);
						that.aliBlock(id, me, csessionid, sig, token, scene)
						me.handleSlide('', '', '', '')
					}
				}
			})

		} else {
			me.$refs[form].validateField('phone', (phone) => {
				if (phone == "") {
					if(me.slideInfo.session == ''){
						me.$message({
							message: '验证失败，请重新进行滑块验证',
							type: 'warning'
						});
						return
					}
					me.$message({
						message: '验证码已发送！',
						type: 'success'
					});
					me.sendMsgDisabled = true;
					me.interval = window.setInterval(function () {
						if ((me.time--) <= 0) {
							me.sendMsgDisabled = false;
							that.aliBlock(id, me, csessionid, sig, token, scene)
							me.handleSlide('', '', '', '')
							window.clearInterval(me.interval);
						}
					}, 1000);
					this.loginAjax({
						'type': 'post',
						'url': "/userkg/sendSmsEmailcode",
						"data": send_list,
						'success': function (data) {
							if (data.code == 10000) {
								// me.$message({
								// 	message: '短信已经发送！',
								// 	type: 'success'
								// });
								// me.sendMsgDisabled = true;

								// me.interval = window.setInterval(function () {
								// 	if ((me.time--) <= 0) {
								// 		me.time = 90;
								// 		me.sendMsgDisabled = false;
								// 		that.aliBlock(id, me, csessionid, sig, token, scene)
								// 		me.handleSlide('', '', '', '')
								// 	}
								// }, 1000);
							} else if (data.code == 10020) {
								me.$message({
									message: data.message,
									type: 'warning'
								});
								me.sendMsgDisabled = false;
								window.clearInterval(me.interval);
								that.aliBlock(id, me, csessionid, sig, token, scene)
								me.handleSlide('', '', '', '')
							} else {
								me.$message({
									message: data.message,
									type: 'error'
								});
								me.sendMsgDisabled = false;
								window.clearInterval(me.interval);
								that.aliBlock(id, me, csessionid, sig, token, scene)
								me.handleSlide('', '', '', '')
							}
						}
					})

				} else {
					return false
				}
			});
		}
	},
	//跳转到详情页
	goDetail(item) {
		localStorage.setItem("article_tags", Base64.encode(item.articleTags))
		localStorage.setItem("column_id", Base64.encode(item.columnId))
		localStorage.setItem("display_order", Base64.encode(item.displayOrder))
		localStorage.setItem("author_id", Base64.encode(item.createUser))
		const kg_desk_userId = localStorage.getItem("kg_desk_userId") == null ? "" : localStorage.getItem("kg_desk_userId");
		var u = navigator.userAgent;
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		if (isiOS) {
			window.location.href = "../detail/list.html?id=" + Base64.encode(item.articleId) + '_' + kg_desk_userId + '&c=' + item.columnId;
		} else if (isAndroid) {
			window.location.href = "../detail/list.html?id=" + Base64.encode(item.articleId) + '_' + kg_desk_userId + '&c=' + item.columnId;
		} else {
			window.open("../detail/list.html?id=" + Base64.encode(item.articleId) + '_' + kg_desk_userId + '&c=' + item.columnId);
		}

		// window.open ("../detail/list.html?article_id=" + Base64.encode(item.articleId) + '&user_id=' + localStorage.getItem("kg_desk_userId")); 
	},
	//上一篇、下一篇跳转详情页
	pageToDetail(item) {

	},
	//跳转标签页
	goTag(item) {
		// localStorage.setItem("tag_name",item)
		window.open("../tag/list.html?t=" + item)
	},
	//跳转到作者页
	goAuthor(item) {
		localStorage.setItem("author_column_id", item.createUser)
		// window.location.href = "../author/list.html?id=" + item.createUser;
		window.open("../author/list.html?id=" + item.createUser)
	},
	//跳转到频道页
	goChannel(item) {
		// localStorage.setItem('channel_column_id',item.columnId);
		// localStorage.setItem('channel_column_name',item.columnName);
		window.open("../channel/list.html?channel=" + item.columnId)
		// localStorage.setItem("author_column_id",item.createUser)
	},
	//跳转二级栏目   
	goSubColumn(item) {
		// localStorage.setItem("sub_column_id",item.columnId)
		window.open("../subColumn/list.html?c=" + item.columnId)
	},
	//跳转到账户安全页面
	accountSafe(item) {
		// location.reload();
		window.location.href = "../account/details.html#/account_safe";
	},
	//跳转搜索结果页
	goSearch(item) {
		localStorage.setItem('kg_searchValue', item)
		// let searchValue_lately = [];
		let searchValue_lately = localStorage.getItem('kg_searchValue_lately');

		if (searchValue_lately == null || searchValue_lately == '') {
			searchValue_lately = [];
		} else {
			searchValue_lately = JSON.parse(localStorage.getItem('kg_searchValue_lately'))
		}
		// searchValue_lately = JSON.parse(localStorage.getItem('kg_searchValue_lately'))
		searchValue_lately.push(item)
		localStorage.setItem('kg_searchValue_lately', JSON.stringify(searchValue_lately))
		window.open('../search/list.html?s=' + encodeURI(item))
	},
	//跳转关于我们
	goAboutUs(item) {
		localStorage.setItem("kg_about", item.infoType)
		window.open('../about_register/list.html')
	},
	//跳转24快讯页
	goHours(item) {
		// window.open('../hours/details.html?id=' + item.newsflashId)
		localStorage.setItem('newsflashId', item.newsflashId);
		window.open('../hours/details.html')
	},
	//时间戳转换
	fmtDate(obj) {
		let date = new Date(obj);
		let y = 1900 + date.getYear();
		let m = "0" + (date.getMonth() + 1);
		let d = "0" + date.getDate();
		return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
	},
	//存草稿
	saveDraft(list, me) {
		me.draftLoading = true;

		list = this.postDataRequest(list);
		this.postAjax({
			'type': 'post',
			'url': '/article/AddArticle',
			"data": list,
			'success': function (data) {
				if (data.code === '10000') {
					data = data.responseBody.data;
					me.$message({
						message: '已保存至草稿',
						type: 'success'
					});
					me.draftLoading = false
					setTimeout(() => {
						window.location.href = '../account/details.html#/column';
					}, 200);
				} else if (data.code === '29001') {
					me.sensitive = data.message
					me.$refs['ruleForm'].validateField('title', (title) => {
						if (title == "") {} else {
							return false
						}
					});
					me.draftLoading = false
				} else if (data.code === '29002') {
					let sensitive = [];
					sensitive = data.message.split(',');
					me.sensitive = data.message.split(',')
					for (var i in sensitive) {
						(function (i) {
							// setTimeout(function () {
							var reg = new RegExp("(" + sensitive[i] + ")", "g");
							me.content = me.editorContentHtml.replace(reg, "<span style='color:red'>$1</span>&nbsp;");
							// }, 200)
						})(i)
					}
					me.$message({
						message: '文章正文中检测到敏感词：' + data.message,
						type: 'warning'
					})
					me.draftLoading = false
				} else if (data.code === '29003') {
					me.sensitive = data.message
					me.$refs['ruleForm'].validateField('tag', (tag) => {
						if (tag == "") {} else {
							return false
						}
					});
					me.draftLoading = false
				} else if (data.code === '29004') {
					me.sensitive = data.message
					me.$refs['ruleForm'].validateField('textarea', (textarea) => {
						if (textarea == "") {} else {
							return false
						}
					});
					me.draftLoading = false
				} else if (data.code === '29006') {
					me.sensitive = data.message
					me.$refs['ruleForm'].validateField('articleSource', (articleSource) => {
						if (articleSource == "") {} else {
							return false
						}
					});
					me.draftLoading = false
				} else {
					me.$message({
						message: data.message,
						type: 'error'
					});
					me.draftLoading = false
				}
			}
		});
	},
	//自动保存
	autoSave(list, me) {
		// window.clearInterval(me.autoSaveInterval);
		const that = this;
		this.postAjax({
			'type': 'post',
			'url': '/article/AddArticle',
			"data": that.postDataRequest(list),
			'success': function (data) {
				if (data.code === '10000') {
					id = data.responseBody;
					list.articleId = id;
					me.articleId = id;
					// that.autoSave(list,me)
					// me.autoSaveInterval = window.setInterval(function() {
					// that.autoSave(list,me)
					// }, 10000);

				} else if (data.code === '29001') {
					me.sensitive = data.message
					me.$refs['ruleForm'].validateField('title', (title) => {
						if (title == "") {} else {
							return false
						}
					});
				} else if (data.code === '29002') {
					let sensitive = [];
					sensitive = data.message.split(',');
					me.sensitive = data.message.split(',')
					for (var i in sensitive) {
						(function (i) {
							// setTimeout(function () {
							var reg = new RegExp("(" + sensitive[i] + ")", "g");
							me.content = me.editorContentHtml.replace(reg, "<span style='color:red'>$1</span>&nbsp;");
							// }, 200)
						})(i)
					}
					me.$message({
						message: '文章正文中检测到敏感词：' + data.message,
						type: 'warning'
					})
				} else if (data.code === '29003') {
					me.sensitive = data.message
					me.$refs['ruleForm'].validateField('tag', (tag) => {
						if (tag == "") {} else {
							return false
						}
					});
				} else if (data.code === '29004') {
					me.sensitive = data.message
					me.$refs['ruleForm'].validateField('textarea', (textarea) => {
						if (textarea == "") {} else {
							return false
						}
					});
				} else if (data.code === '29006') {
					me.sensitive = data.message
					me.$refs['ruleForm'].validateField('articleSource', (articleSource) => {
						if (articleSource == "") {} else {
							return false
						}
					});
				} else {
					me.$message({
						message: data.message,
						type: 'error'
					});
				}
			}
		});
	},
	//收藏、点赞
	onGoods(list, smg, me) {
		const userId = localStorage.getItem("kg_desk_userId");
		/*        if(userId == null){
		              me.$message({
		               message:'请先登录!',
		               type: 'warning'
		              });
		              return
		        }*/
		me.goodsDisabled = true;
		this.ajax({
			'type': 'post',
			'url': '/usercollect/addCollect',
			"data": list,
			'success': function (data) {
				if (data.code == 10000) {
					var _width = $(window).width();
					if (_width < 768) {
						me.ismessage = true;
						me.message = smg;
						me.closeMessage(1500);
					} else {
						me.$message({
							message: smg,
							type: 'success'
						});
					}


					if (data.responseBody != 0) {
						const awardStr = '感谢您的点赞，请收下' + data.responseBody + '钛值的奖励！';
						me.$alert(awardStr, "提示", {
							confirmButtonText: '我知道了',
							center: true,
							showClose: false,
							customClass: "mobile_collent",
							callback: action => {}
						});
					}
					me.goodsVisible = true;
					me.goodsDisabled = false;
					me.articleDetails.thumbupNum += 1
				} else {
					if (_width < 768) {
						me.ismessage = true;
						me.message = data.message;
						me.closeMessage(1500);
					} else {
						me.$message({
							message: data.message,
							type: 'error'
						});
					}

				}

			}
		});
	},
	onCollect(list, smg, me) {
		const userId = localStorage.getItem("kg_desk_userId");
		var _width = $(window).width();
		if (userId == null) {
			if (_width < 768) {
				me.ismessage = true;
				me.message = "请先登录!";
				me.closeMessage(1500);
			} else {
				me.$message({
					message: '请先登录!',
					type: 'warning'
				});
			}

			return
		}
		me.collectDisabled = true;
		this.ajax({
			'type': 'post',
			'url': '/usercollect/addCollect',
			"data": list,
			'success': function (data) {
				if (data.code == 10000) {
					if (_width < 768) {
						me.ismessage = true;
						me.message = smg;
						me.closeMessage(1500);
					} else {
						me.$message({
							message: smg,
							type: 'success'
						});
					}

					if (data.responseBody != 0) {
						const awardStr = '感谢您的收藏，请收下' + data.responseBody + '钛值的奖励！';
						me.$alert(awardStr, "提示", {
							confirmButtonText: '我知道了',
							center: true,

							showClose: false,
							customClass: "mobile_collent",
							callback: action => {}
						});
					}
					me.collectVisible = true;
					me.collectDisabled = false;
					me.articleDetails.collect += 1

				} else {
					if (_width < 768) {
						me.ismessage = true;
						me.message = data.message;
						me.closeMessage(1500);
					} else {
						me.$message({
							message: data.message,
							type: 'error'
						});
					}

				}

			}
		});
	},
	//取消收藏、取消点赞
	cancelCollect(list, smg, me) {
		var _width = $(window).width();
		me.cancelcollectDisabled = true;
		this.ajax({
			'type': 'post',
			'url': '/usercollect/deleteCollect',
			"data": list,
			'success': function (data) {
				if (data.code == 10000) {
					if (_width < 768) {
						me.ismessage = true;
						me.message = smg;
						me.closeMessage(1500);
					} else {
						me.$message({
							message: smg,
							type: 'info'
						});
					}

					me.collectVisible = false;
					me.cancelcollectDisabled = false;
					me.articleDetails.collect -= 1;
				} else {
					if (_width < 768) {
						me.ismessage = true;
						me.message = data.message;
						me.closeMessage(1500);
					} else {
						me.$message({
							message: data.message,
							type: 'error'
						});
					}

				}
			}
		});
	},
	cancelGoods(list, smg, me) {
		me.cancelgoodsDisabled = true;
		this.ajax({
			'type': 'post',
			'url': '/usercollect/deleteCollect',
			"data": list,
			'success': function (data) {
				if (data.code == 10000) {
					var _width = $(window).width();
					if (_width < 768) {
						me.ismessage = true;
						me.message = smg;
						me.closeMessage(1500);
					} else {
						me.$message({
							message: smg,
							type: 'info'
						});
					}
					me.goodsVisible = false;
					me.cancelgoodsDisabled = false;
					me.articleDetails.thumbupNum -= 1;
				} else {
					if (_width < 768) {
						me.ismessage = true;
						me.message = data.message;
						me.closeMessage(1500);
					} else {
						me.$message({
							message: data.message,
							type: 'error'
						});
					}

				}
			}
		});
	},
	nbsp2Space(str) {
		var arrEntities = {
			'nbsp': ' '
		};
		return str.replace(/&(nbsp);/ig, function (all, t) {
			return arrEntities[t]
		})
	},
	//获取账户余额
	getUserbalance(me) {
		const tivalue_list = Lib.M.dataRequest({
			"userId": localStorage.getItem('kg_desk_userId'),
		})
		Lib.M.ajax({
			'type': 'post',
			'url': '/account/selectByUserbalance',
			"data": tivalue_list,
			'success': function (data) {
				if (data.code == 10000) {
					data = data.responseBody.data;
					me.readAward.balance = data.balance;
				} else {
					me.$message({
						message: data.message,
						type: 'error'
					});
				}
			}
		});
	},
	//判断实名认证
	isApprove(fn, me) {
		// certificateStatus 状态字段 认证状态 0 不通过 1 已认证 2 审核中
		const approve_list = Lib.M.dataRequest({
			"userId": localStorage.getItem('kg_desk_userId'),
		})
		Lib.M.ajax({
			'type': 'post',
			'url': '/userkg/getCertificate',
			"data": approve_list,
			'success': function (data) {
				if (data.code == 10000) {
					data = data.responseBody;
					if (data.realnameAuthed == 1) {
						fn()
					} else {
						if (data.certificateStatus == 0) {
							me.reApproveVisible = true;
						} else if (data.certificateStatus == 2) {
							me.$alert('您的实名认证还在审核中，可以先发表文章，待审核通过后再设置阅读奖励', {
								confirmButtonText: '知道了',
								center: true,
								callback: action => {}
							});
						} else {
							me.approveVisible = true;
						}
					}

				} else {
					me.$message({
						message: data.message,
						type: 'error'
					});
				}
			}
		});
	},
	//TDK接口
	selectSeo(id, me) {
		const seo_list = Lib.M.dataRequest({
			"columnId": id,
		})
		this.ajax({
			'type': 'post',
			'url': '/column/selectSeo',
			"data": seo_list,
			'success': function (data) {
				if (data.code == 10000) {
					data = data.responseBody.data
					let indexTitle = document.getElementsByTagName('title')[0];
					indexTitle.innerHTML = data.seoTitle;
					document.querySelector('meta[name="keywords"]').setAttribute('content', data.seoKeyword == null ? "" : data.seoKeyword);
					document.querySelector('meta[name="description"]').setAttribute('content', data.seoDescription == null ? "" : data.seoDescription);
					// indexTitle.innerHTML = data.seoKeyword;
					// indexTitle.innerHTML = data.seoDescription;
				} else {
					me.$message({
						message: data.message,
						type: 'error'
					});
				}
			}
		});
	},
	//input[file] 置空
	uploadfile(e, JQ, me) {
		const that = this;
		var fileList = e.target.files[0]
		//现在图片文件大小
		var imgSize = fileList.size;
		if (imgSize > 2 * 1024 * 1024) {
			me.$message({
				type: "warning",
				message: '上传的图片的大于2M,请重新选择'
			})
			var jqObj = JQ("#uploadInput");
			jqObj.val("");
			var domObj = jqObj[0];
			domObj.outerHTML = domObj.outerHTML;
			var newJqObj = jqObj.clone();
			jqObj.before(newJqObj);
			jqObj.remove();
			JQ("#uploadInput").unbind().change(function (e) {
				that.uploadfile(e, JQ, me)
			});
			return;
		} else {
			var reader = new FileReader();
			reader.onload = function (e) {
				me.checkedImg = reader.result;
			}
			reader.readAsDataURL(fileList)
		}

	},
	//阿里云滑块验证
	aliBlock(dom, me, csessionid, sig, token, scene) {
		const that = this;
		var u = navigator.userAgent;
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		// if(isiOS || isAndroid){
		// 	window.webkit.messageHandlers.onBack.postMessage("");
		// }
		var nc = new noCaptcha();
		let date = new Date();
		date = date.toISOString()
		// var nc_appkey = 'FFFF00000000017B0D9D';  // 应用标识,不可更改
		// var nc_scene = 'rigister';  //场景,不可更改
		var nc_appkey = "FFFF00000000017B0D9D";
		var nc_scene = isiOS || isAndroid ? "nc_register_h5":"nc_login";
		var nc_token = [nc_appkey, (new Date()).getTime(), Math.random()].join(':');
		var nc_option = {
			renderTo: dom, //渲染到该DOM ID指定的Div位置
			appkey: nc_appkey,
			scene: nc_scene,
			token: nc_token,
			// trans:{"key1":"code0"},//测试用，特殊nc_appkey时才生效，正式上线时请务必要删除；code0:通过;code100:点击验证码;code200:图形验证码;code300:恶意请求拦截处理
			callback: function (data) { // 校验成功回调

				document.getElementById(csessionid).value = data.csessionid;
				document.getElementById(sig).value = data.sig;
				document.getElementById(token).value = nc_token;
				document.getElementById(scene).value = nc_scene;

				// me.aliBlock = true;
				const list = {
					"platform": '3',
					"session": data.csessionid,
					"sig": data.sig,
					"token": nc_token,
					"scene": nc_scene,
				}
				me.handleSlide(data.csessionid, data.sig, nc_token, nc_scene)
				/*                        that.loginAjax({
				                                'type':'post',
				                                'url':'/userkg/af/',
				                                "data":list,
				                                'success':function (data){
				                                  if(data.responseBody.errorCode == 0){
				                                  		  me.isSlide = true; 
				                                  }else{
				                                  	me.$message({
				                                  		type:'error',
				                                  		message:data.message
				                                  	})
				                                  }
				                            	}
				                        });*/
			}
		};
		nc.init(nc_option);
	},
	initAliBlock() {
	// 	let nc = new window.noCaptcha()
	// 	let nc_appkey = "FFFF00000000017B0D9D"; // 应用标识,不可更改
	// 	let nc_scene = "nc_register_h5";// 场景,不可更改
	// 	let nc_token = [nc_appkey, new Date().getTime(), Math.random()].join(":");
	// 	var nc = window.NoCaptcha.init({
	// 	  renderTo: '#block',
	// 	  appkey: nc_appkey, 
	// 	  scene: nc_scene,
	// 	  token: nc_token,
	// 	  is_Opt: 0,
	// 	  language: "cn",
	// 	  timeout: 10000,
	// 	  retryTimes: 5,
	// 	  errorTimes: 5,
	// 	  inline:false,
	// 	  apimap: {
	// 		  // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
	// 		  // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
	// 	  },
	// 	  bannerHidden:false,
	// 	  initHidden:false,
	// 	  callback: data => {
	// 		let ncBlock = {}
	// 		ncBlock.session = data.csessionid
	// 		ncBlock.sig = data.sig
	// 		ncBlock.token = nc_token
	// 		ncBlock.scene = nc_scene
	// 		this.setState({ncBlock:ncBlock});
	// 	  },
	// 	  error: function (s) {
	// 	  }
	//   })
	},
	//微博分享
	share_weibo(item) {

		let url = Lib.C.newsFlashUrl + item.newsflashId;
		const text = item.newsflashText.slice(0, 40) + '...'
		const articleImage = "http://pro-kg-oss.oss-cn-beijing.aliyuncs.com/video/112.jpg";
		const share_url = "http://share.baidu.com/s?type=text&searchPic=1&sign=on&to=tsina&key=595885820&url=" + url + "&title=" + text + '&pic=' + articleImage;
		window.open(share_url, 'newwindow', 'height=400,width=400,top=100,left=100');
	},
	//微信分享
	share_weixin(url, data) {
		// let detail_url = "http://www.kg.com/";
		// let detail_url = window.location.href;

		let links = url; //分享出去的链接
		let title = data.newsflashTitle; //分享的标题
		let desc = data.newsflashText.slice(0, 40) + '...'; //分享的详情介绍
		let articleImage = "http://pro-kg-oss.oss-cn-beijing.aliyuncs.com/video/112.jpg?x-oss-process=image/resize,h_100";
		//生成微信二维码
		wx.ready(function () {
			wx.onMenuShareTimeline({
				title: title, // 分享标题
				link: links, // 分享链接'
				imgUrl: articleImage, // 分享图标
				success: function () {},
				cancel: function () {}
			});
			wx.onMenuShareAppMessage({
				title: title, // 分享标题
				desc: desc, // 分享描述
				link: links, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: articleImage, // 分享图标
				success: function () {},
				cancel: function () {}
			});

		})
	},
	//微信登录
	login_wx() {

		localStorage.removeItem('kg_third_openId');
		localStorage.removeItem('kg_bind_data');
		localStorage.setItem('localUrl', window.location.href);
		localStorage.setItem('openType', '1');
		// window.location.href ='https://open.weixin.qq.com/connect/qrconnect?appid='+Lib.C.wxappid+'&redirect_uri='+Lib.C.redirectUrl+'&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect';
		window.open(
			// '../relevanceAccount/list.html',
			'https://open.weixin.qq.com/connect/qrconnect?appid=' + Lib.C.wxappid + '&redirect_uri=' + Lib.C.redirectUrl + '&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect',
			"newwindow",
			"height=555,width=700,top=100,left=100"
		)
	},
	//微博登录
	login_weibo() {
		// localStorage.getItem('openType')
		localStorage.removeItem('kg_third_openId');
		localStorage.removeItem('kg_bind_data');
		localStorage.setItem('localUrl', window.location.href);
		localStorage.setItem('openType', '0');
		// window.location.href = 'https://api.weibo.com/oauth2/authorize?client_id='+Lib.C.wbappid+'&redirect_uri='+ Lib.C.redirectUrl;
		window.open(
			'https://api.weibo.com/oauth2/authorize?client_id=' + Lib.C.wbappid + '&redirect_uri=' + Lib.C.redirectUrl,
			"newwindow",
			"height=555,width=700,top=100,left=100"
		)
	},
	mobile_login_weibo() {
		localStorage.removeItem('kg_third_openId');
		localStorage.removeItem('kg_bind_data');
		const loginUrl = localStorage.getItem('loginUrl');

		localStorage.setItem('localUrl', loginUrl);
		localStorage.setItem('openType', '0');
		window.location.href = 'https://api.weibo.com/oauth2/authorize?client_id=' + Lib.C.wbappid + '&redirect_uri=' + Lib.C.redirectUrl;
	},
	//微博绑定
	weiboBind() {
		localStorage.removeItem('kg_third_openId');
		localStorage.removeItem('kg_bind_data');
		const loginUrl = window.location.href;

		localStorage.setItem('localUrl', loginUrl);
		localStorage.setItem('openType', '0');
		// window.location.href = 'https://api.weibo.com/oauth2/authorize?client_id='+Lib.C.wbappid+'&redirect_uri='+ Lib.C.redirectUrl;
		window.open(
			'https://api.weibo.com/oauth2/authorize?client_id=' + Lib.C.wbappid + '&redirect_uri=' + Lib.C.redirectUrl,
			// '../relevanceAccount/list.html',
			"newwindow",
			"height=555,width=700,top=100,left=100"
		)
	},
	// 微信绑定
	wxBind() {
		localStorage.removeItem('kg_third_openId');
		localStorage.removeItem('kg_bind_data');
		const loginUrl = window.location.href;

		localStorage.setItem('localUrl', loginUrl);
		localStorage.setItem('openType', '1');
		// window.location.href ='https://open.weixin.qq.com/connect/qrconnect?appid='+Lib.C.wxappid+'&redirect_uri='+Lib.C.redirectUrl+'&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect';
		window.open(
			'https://open.weixin.qq.com/connect/qrconnect?appid=' + Lib.C.wxappid + '&redirect_uri=' + Lib.C.redirectUrl + '&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect',
			"newwindow",
			"height=555,width=700,top=100,left=100"
		)
	},
};


export default Rxports;