/**
 * 小程序配置文件
 */

// 服务器
var host = 'https://www.2belief.com'

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/login`,

        // 注册的时候判断用户名是否已经存在
        userAlreadyExistUrl: `${host}/useralreadyexist`,

        //注册用户接口
        registerUrl: `${host}/register`,
        
        //创建活动信息
        addActivityUrl: `${host}/addactivity`,
      
        //修改活动信息
        modifyActivityUrl: `${host}/modifyactivity`,

        //删除活动
        deleteActivityUrl: `${host}/deleteactivity`,

        //获取用户已经参加过的所有活动
        getAttendUrl: `${host}/weapp/get_attend`,
      
        //获取用户缺席的所有活动
        getAbsencetUrl: `${host}/get_absence`,
     
        //获取用户已报名但尚未开始的所有活动
        getSignUrl: `${host}/get_sign`,

        //根据活动id查询活动详细信息
        getActivityByIdUrl: `${host}/getactivitybyid`,

        //根据活动id查询学生列表
        getStuListByIdUrl: `${host}/getstudentlistbyid`,

        //发布签到
        submitSignInUrl: `${host}/submitsignin`,

        //进行签到
        signInUrl: `${host}/signin`,

        //获取活动二维码
        getCourseQRUrl: `${host}/getCourseQR`,
    }
};

module.exports = config;