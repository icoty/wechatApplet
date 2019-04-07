from django.db import models

# Create your models here.

class User(models.Model):
    gender_level = ((0, '女'), (1, '男'))
    privilege_level = ((0, '普通'), (1, '管理员'))
    class_level = (('未名一苑'), ('未名二苑'),('博雅一苑'), ('博雅二苑'),('朗润一苑'), ('朗润二苑'))
    major_level = ((0, '软件工程'), (1, '计算机技术'),(2, 'CAT'), (3, '云计算'),(4, '金融学'), (5, '金融与大数据'))

    u_number     = models.IntegerField(primary_key=True, verbose_name="学号")
    u_name       = models.CharField(max_length=30, verbose_name="姓名")
    u_gender             = models.BooleanField(choices=gender_level, default=True, verbose_name="性别")
    u_privilege          = models.IntegerField(choices=privilege_level, verbose_name="权限")
    #u_class              = models.CharField(choices=class_level, max_length=50, verbose_name="班级")
    #u_major             = models.CharField(choices=major_level, max_length=50, verbose_name="专业")
    u_class              = models.CharField(max_length=50, verbose_name="班级")
    u_major             = models.CharField(max_length=50, verbose_name="专业")
    u_password           = models.CharField(max_length=512, verbose_name="密码")
    u_email              = models.CharField(max_length=50, verbose_name="邮箱")
    u_openid       = models.CharField(max_length=30, verbose_name="openID")
    
    def __unicode__(self):
        return self.u_name
    
    class Meta:
        db_table = "userInfo"
        ordering   = ['u_number']
        verbose_name = '用户表'
        verbose_name_plural = verbose_name


class Activity(models.Model):
    host_level = ((0, '团委'), (1, '研会'),(2, '青协'),(3, '未名一苑'), (4, '未名二苑'),(5, '博雅一苑'), (6, '博雅二苑'),(7, '朗润一苑'), (8, '朗润二苑'))
    a_number              = models.AutoField(primary_key=True, verbose_name="活动ID")
    a_name                = models.CharField(max_length=50, verbose_name="名称")
    # FK
    a_creator             = models.ForeignKey("User", on_delete=models.CASCADE, verbose_name="创建人")
    #act_creator             = models.CharField(max_length=30,verbose_name="创建人")
    a_address             = models.CharField(max_length=50, verbose_name="地址")
    a_type                = models.CharField(max_length=50, verbose_name="类型")
    # 是否需要报名
    a_needsign        = models.BooleanField(default=False, verbose_name="需不需报名")
    a_starttime          = models.DateTimeField(verbose_name="开始时间")
    a_endtime            = models.DateTimeField(verbose_name="结束时间")
    a_theme               = models.CharField(max_length=500, verbose_name="主题")
    a_startsign          = models.DateTimeField(verbose_name="开始签到")
    a_endsign            = models.DateTimeField(verbose_name="截止签到")
    a_grade               = models.IntegerField(verbose_name="举办年级")
    a_host                = models.CharField(max_length=50, verbose_name="举办方")
    #a_host                = models.CharField(choices=host_level, max_length=50, verbose_name="举办方")

    def __unicode__(self):
        return self.a_name
    
    class Meta:
        db_table = "Activity"
        ordering   = ['pk']
        verbose_name = '活动表'
        verbose_name_plural = verbose_name
    

class Act2Stu(models.Model):
    a2s_num         = models.AutoField(primary_key=True,verbose_name="ID")
    a2s_actnum         = models.ForeignKey("Activity",on_delete=models.CASCADE, verbose_name="活动ID")
    ats_stunum         = models.ForeignKey("User",on_delete=models.CASCADE, verbose_name="学号")
    a2s_signtime       = models.DateTimeField(verbose_name="签到时间")
    a2s_signup        = models.BooleanField(default=False, verbose_name="是否报名")
    
    def __unicode__(self):
        return self.a2s_num
    
    class Meta:
        db_table = "act2stu"
        ordering   = ['pk']
        verbose_name = '关联表'
        verbose_name_plural = verbose_name
