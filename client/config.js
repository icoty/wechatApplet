/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
// var host = 'https://9zjv84ez.qcloud.la';

// var host = 'http://localhost:5757';

// 服务器
//var host = 'https://www.ezoul.net'


// 服务器
var host = 'https://www.2belief.com'

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        //注册用户接口
        setUserInfoUrl: `${host}/weapp/user`,

        //修改用户信息接口
        updateUserInfoUrl: `${host}/weapp/updateuser`,
        
        //修改活动信息
        updateCourseInfoUrl: `${host}/weapp/changecourse`,

        //获取用户所有活动列表
        getCourseListUrl: `${host}/weapp/getcourselist`,
        
        //根据活动id查询活动简略信息
        searchCourseUrl: `${host}/weapp/searchcourse`,

        //根据活动id查询活动详细信息
        searchCourseDetailUrl: `${host}/weapp/serchcoursedetail`,

        //加入活动
        joinCourseUrl: `${host}/weapp/joincourse`,

        //创建活动
        createCourseUrl: `${host}/weapp/createcourse`,

        //根据活动id获取已加入活动的信息
        getJointCourseRecordUrl: `${host}/weapp/getjointcoursedetail`,

        //根据活动id获取可管理的活动详细信息
        getCreatededCourseRecordUrl: `${host}/weapp/getcreatedcourserecord`,

        //删除活动
        deleteCourseUrl: `${host}/weapp/deletecourse`,

        //发布签到
        submitSignInUrl: `${host}/weapp/submitsignin`,

        //进行签到
        signInUrl: `${host}/weapp/signin`,

        //获取签到详细信息
        getSignInDetailUrl: `${host}/weapp/getsignindetail`,
      
        //获取成员列表
        getMembersListUrl: `${host}/weapp/getmemberslist`,

        //删除成员
        deleteMemberUrl: `${host}/weapp/deleteMember`,

        //修改成员权限
        changeLevelUrl: `${host}/weapp/changelevel`,

        //获取活动二维码
        getCourseQRUrl: `${host}/weapp/getCourseQR`,

        //退出活动
        quitCourseUrl: `${host}/weapp/quitCourse`,

        //获取邮件
        getExcelUrl: `${host}/weapp/getExcel`
    }
};

module.exports = config;
