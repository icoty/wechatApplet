import xadmin
from .models import CUsers,CActivities,CAct2Stu

# Create your models here.


@xadmin.sites.register(CUsers)
class CUsersAdmin(object):
    list_display = ['user_student_number','user_student_name' ,'user_gender','user_class','user_major','user_email','user_password','user_privilige']
    search_fields = ['user_student_number', ]
    list_editable = ['user_student_number','user_student_name' ,'user_gender','user_class','user_major']
    list_filter   = ['user_student_number','user_gender','user_class','user_major','user_privilige']
    
    def user_gender(self):
        if self.user_gender:
            return "男"
        else:
            return "女"
    user_gender.short_description = "性别"


@xadmin.sites.register(CActivities)
class CActivitiesAdmin(object):
    list_display = ['act_number','act_name' ,'act_creator','act_address','act_type','act_theme','act_grade','act_host','act_need_sign_up','act_start_time','act_end_time','act_start_sign','act_end_sign']
    search_fields = ['act_creator',]
    list_editable = ['act_name' ,'act_address','act_theme','act_grade','act_host','act_need_sign_up','act_start_time','act_end_time']
    list_filter = ['act_creator','act_type','act_theme','act_grade','act_host','act_need_sign_up','act_start_time','act_end_time']
   
@xadmin.sites.register(CAct2Stu)
class CAct2StuAdmin(object):
    list_display = ['act2stu_act_num','act2stu_stu_num','act2stu_isSignUp','act2stu_sign_time']
    search_fields = ['act2stu_isSignUp',]
    list_editable = ['act2stu_isSignUp']
    list_filter = ['act2stu_act_num','act2stu_stu_num','act2stu_isSignUp']

#xadmin.sites.site.register(CUsers,CUsersAdmin)
#xadmin.sites.site.register(CAct2Stu,CAct2StuAdmin)
#xadmin.sites.site.register(CActivities,CActivitiesAdmin)
