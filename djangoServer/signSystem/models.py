from django.db import models

# Create your models here.

class CUsers(models.Model):
    user_student_number     = models.IntegerField(primary_key=True, verbose_name="学号")
    user_student_name       = models.CharField(max_length=30, verbose_name="姓名")
    user_gender             = models.BooleanField(default=True, verbose_name="性别")
    user_privilige          = models.IntegerField(default=0, verbose_name="权限")
    user_class              = models.CharField(max_length=50, verbose_name="班级")
    user_major              = models.CharField(max_length=50, verbose_name="专业")
    user_password           = models.CharField(max_length=512, verbose_name="密码")
    user_email              = models.CharField(max_length=50, verbose_name="邮箱")
 
    def __unicode__(self):
        return self.user_student_name
    
    class Meta:
        db_table = "sm_users"
        ordering   = ['user_student_number']
        verbose_name = '用户表'
        verbose_name_plural = verbose_name


class CActivities(models.Model):
    act_number              = models.AutoField(primary_key=True, verbose_name="活动ID")
    act_name                = models.CharField(max_length=50, verbose_name="名称")
    # FK
    act_creator             = models.ForeignKey("CUsers", on_delete=models.CASCADE, verbose_name="创建人")
    #act_creator             = models.CharField(max_length=30,verbose_name="创建人")
    act_address             = models.CharField(max_length=50, verbose_name="地址")
    act_type                = models.CharField(max_length=50, verbose_name="类型")
    # 是否需要报名
    act_need_sign_up        = models.BooleanField(default=False, verbose_name="需不需报名")
    act_start_time          = models.DateTimeField(verbose_name="开始时间")
    act_end_time            = models.DateTimeField(verbose_name="结束时间")
    act_theme               = models.CharField(max_length=500, verbose_name="主题")
    act_start_sign          = models.DateTimeField(verbose_name="开始签到")
    act_end_sign            = models.DateTimeField(verbose_name="截止签到")
    act_grade               = models.IntegerField(verbose_name="举办年级")
    act_host                = models.CharField(max_length=50, verbose_name="举办方")

    def __unicode__(self):
        return self.act_name
    
    class Meta:
        db_table = "sm_activities"
        ordering   = ['pk']
        verbose_name = '活动表'
        verbose_name_plural = verbose_name
    

class CAct2Stu(models.Model):
    act2stu_act_num         = models.IntegerField(primary_key=True, verbose_name="活动ID")
    act2stu_act_num         = models.ForeignKey("CActivities", on_delete=models.CASCADE, verbose_name="活动ID")
    act2stu_stu_num         = models.ForeignKey("CUsers",on_delete=models.CASCADE, verbose_name="学号")
    act2stu_sign_time       = models.DateTimeField(verbose_name="签到时间")
    act2stu_isSignUp        = models.BooleanField(default=False, verbose_name="报名与否")
    
    def __unicode__(self):
        return self.act2stu_act_num
    
    class Meta:
        db_table = "sm_act2stu"
        ordering   = ['pk']
        verbose_name = '关联表'
        verbose_name_plural = verbose_name
