// 提取公共的累计进攻和今日进攻的方法
import conf from './../../../../assets/js/conf';
export default {
    data () {
        return {
            data: {},
            tableData: [
            ],
            rewardStuParams: { // 打赏徒弟
                userId: '',
                rewardUid: '',
                rewardTv: '',
                txPassword: ''
            },
            list: {},
            dialogVisible: false,
            payInput:'', // 打赏金额
            // payMoney: 10,
            payVisible: false,
            loading: true,
            preData: [],
            moreBtn: true
        }
    },
    methods: {
        reset () { // 清空打赏值
            this.dialogVisible = false;
            this.rewardStuParams.rewardTv = '';
            this.payInput = ''
        },
        setting () { // 跳转到设置交易密码界面
            window.open("#/account_safe?from=psd")
            localStorage.setItem('trader_pwd',2)
            // Lib.M.accountSafe()
            // window.open ("../account/details.html#/account_safe")
          },
        sortBy (order) {
            this.loading = true;
            this.params.currentPage = 1;
            if(order.prop == 'reConbTime') { // 按照时间排序
              delete this.params.orderByContribution;
              if(order.order == 'descending') {
                  this.params.orderByTime = 0
              }
              else {
                  this.params.orderByTime = 1
              }
              this.list = this.$Lib.M.dataRequest({ // 加密
                  userId: this.params.userId,
                  columnType: this.params.columnType,
                  orderByTime: this.params.orderByTime,
                  currentPage: this.params.currentPage,
                  pageSize: this.params.pageSize
              })
            }
            // 按进贡数量排序
            else if (order.prop == 'income') {
              delete this.params.orderByTime;
              if(order.order == 'descending') {
                  this.params.orderByContribution = 0
              }
              else {
                  this.params.orderByContribution = 1
              }
              this.list = this.$Lib.M.dataRequest({ // 加密
                  userId: this.params.userId,
                  columnType: this.params.columnType,
                  orderByContribution: this.params.orderByContribution,
                  currentPage: this.params.currentPage,
                  pageSize: this.params.pageSize
              })
            }
            this.requestAjax ();
            // 点击时，去掉默认的蓝色字
            document.getElementsByClassName('is-sortable')[1].getElementsByClassName('cell')[0].style.color = '#909399';
        },
        customPay () { // 用户自定义输入
            this.rewardStuParams.rewardTv = ''
        },
        paySure () { //确认打赏
            // 没输入金额
            var payInput = this.payInput*1000;
            // 如果选择手动输入
            if(this.rewardStuParams.rewardTv.length == 0) {
                var reg = /^[0-9]+.?[0-9]*$/;
                if( !reg.test(this.payInput)) {
                    this.$message({
                        message: '每次最多打赏50TV，请修改打赏金额',
                        type: 'warning'
                        });
                    return;
                }
                if(this.payInput > 50) {
                    this.$message({
                        message: '每次最多打赏50TV，请修改打赏金额',
                        type: 'warning'
                        });
                        return;
                }
                if(payInput <1) {
                    this.$message({
                        message: '请输入0.001~50TV之间的打赏值',
                        type: 'warning'
                        });
                        return;
                }
            }
            this.payVisible = true;
            this.dialogVisible = false;
        },
        pay () { // 通过验证，确认打赏
            var vm =this;
            if (this.rewardStuParams.txPassword.length == 0) {
                this.$message({
                    type: 'warning',
                    message: '请输入交易密码'
                });
                return;
            }
            let paylist = this.$Lib.M.dataRequest({
                userId: this.params.userId,
                rewardUid: this.rewardStuParams.rewardUid,
                rewardTv: this.rewardStuParams.rewardTv.length ==0 ? this.payInput : this.rewardStuParams.rewardTv,
                txPassword: this.rewardStuParams.txPassword
            });
            this.$Lib.M.ajax({
                'type': 'post',
                'url': 'disciple/rewardDisciple',
                'data': paylist,
                'success': function (data) {
                    if(data.code == 10000) {
                        vm.$message({
                            type: 'success',
                            message: '恭喜你，打赏徒弟成功'
                        });
                        vm.payVisible = false
                    }
                    else vm.$message.error(data.message)
                    vm.payVisible = false
                },
                
            })
            this.payInput = ''
            this.rewardStuParams.rewardTv = ''
            this.rewardStuParams.txPassword = ''
        },
        getdata () { // 获得徒弟列表
            this.list = this.$Lib.M.dataRequest({ // 默认值
              "userId":this.params.userId,
              "columnType": this.params.columnType,
              "orderByContribution": this.params.orderByContribution,
              currentPage: this.params.currentPage,
              pageSize: this.params.pageSize
          });
          this.requestAjax ();
        },
        getMore () { // 加载更多
                this.params.currentPage++;
                this.list = this.$Lib.M.dataRequest({ // 默认值
                    "userId":this.params.userId,
                    "columnType": this.params.columnType,
                    "orderByContribution": this.params.orderByContribution,
                    currentPage: this.params.currentPage,
                    pageSize: this.params.pageSize
                });
                var vm = this;
                this.$Lib.M.ajax({
                    'type': 'post',
                    'url': 'disciple/getContributionList', // 徒弟进贡列表
                    'data': this.list,
                    'success': function (data) {
                    if (data.code == 10000) {
                        vm.data  = data.responseBody;
                        vm.preData = data.responseBody.data;
                        vm.preData.forEach((element, index) => {
                            if (vm.params.currentPage == vm.data.totalPage) {
                                vm.moreBtn = false;
                            }
                            if(element.avatar != null && element.avatar != 'null') {
                                if (element.avatar.indexOf('http') !=-1) { // 第三方头像
                                    element = Object.assign(element, {avatar: element.avatar})
                                } else {
                                    element = Object.assign(element, {avatar: conf.imgUrl + element.avatar})  // 有头像，加图片地址
                                }
                            }
                            element = Object.assign(element, {rank: (vm.params.pageSize*(vm.params.currentPage-1))+index+1});
                            if(!element.reConbTime) { // 进贡时间为null,显示'-'
                                element = Object.assign(element, {reConbTime: '-'})
                            }
                            else if (!element.income) { // 进贡数量为null,显示 '-'
                            element = Object.assign(element, {income: '-'})
                            }
                        });
                        vm.tableData = vm.tableData.concat(vm.preData)
                        }
                    else {
                        vm.$message.error(data.message);
                        }
                    vm.loading =  false;
                    }
                });
        },
        requestAjax () {
            var vm = this;
            this.$Lib.M.ajax({
                'type': 'post',
                'url': 'disciple/getContributionList', // 徒弟进贡列表
                'data': this.list,
                'success': function (data) {
                if (data.code == 10000) {
                    vm.data  = data.responseBody;
                    vm.tableData = data.responseBody.data;
                    if(vm.tableData.length == 0) {
                        vm.moreBtn = false;
                        vm.loading = false;
                        return;
                    }
                    if (vm.rewardStuParams.currentPage == vm.data.totalPage ||  vm.data.currentPage === vm.data.totalPage) {
                        vm.moreBtn = false;
                    }
                    vm.tableData.forEach((element, index) => {
                        if(element.avatar != null && element.avatar != 'null') {
                            if (element.avatar.indexOf('http') !=-1) { // 第三方头像
                                element = Object.assign(element, {avatar: element.avatar})
                            } else {
                                element = Object.assign(element, {avatar: conf.imgUrl + element.avatar})  // 有头像，加图片地址
                            }
                        }
                        element = Object.assign(element, {rank: +(vm.params.pageSize*(vm.params.currentPage-1))+index+1});
                        if(!element.relDate) { // 进贡时间为null,显示'-'
                            element = Object.assign(element, {relDate: '-'})
                        }
                        if (!element.income) { // 进贡数量为null,显示 '-'
                        element = Object.assign(element, {income: '-'})
                        }
                        if (!element.todayIncome) { // 进贡数量为null,显示 '-'
                        element = Object.assign(element, {todayIncome: '-'})
                        }
                    });
                    localStorage.setItem('tabaleData', vm.tableData);
                    }
                else {
                    vm.$message.error(data.message);
                    }
                vm.loading =  false;
                }
            });
        },
        changeTV (e) {
            this.rewardStuParams.rewardTv = e;
            this.payInput = ''
        },
        awardHim(row) {
            this.rewardStuParams.rewardUid = row.tId;
        }
    },
    created () {
        this.params.userId = localStorage.getItem('kg_desk_userId');
        this.getdata ();
    }
}