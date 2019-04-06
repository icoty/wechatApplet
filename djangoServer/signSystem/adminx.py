import xadmin
from import_export import resources
from .models import User,Activity,Act2Stu


# Create your models here.
class UserResource(resources.ModelResource):
    class Meta:
        model = User
        # fields = ('name', 'description',)
        exclude = ('id')
        import_id_fields = ['学号','姓名' ,'性别','权限','班级','专业','密码','邮箱','openID']

class ActivityResource(resources.ModelResource):
    class Meta:
        model = Activity
        # fields = ('name', 'description',)
        exclude = ('id')
        import_id_fields = ['活动ID','名称' ,'创建人','地址','类型','需不需报名','开始时间','结束时间','主题','开始签到','截止签到' ,'举办年级','举办方']
    
class Act2StuResource(resources.ModelResource):
    class Meta:
        model = Act2Stu
        # fields = ('name', 'description',)
        exclude = ('id')
        import_id_fields = ['活动ID','学号' ,'签到时间','是否报名']  
        
        
@xadmin.sites.register(User)
class UserAdmin(object):
    import_export_args = {'import_resource_class': UserResource,'export_resource_class': UserResource}
    
    list_display = ['u_number','u_name' ,'u_gender','u_privilege','u_class','u_major','u_email']
    search_fields = ['u_number','u_name' ,'u_gender','u_privilege','u_class','u_major','u_password','u_email','u_openid']
    list_editable = ['u_number','u_name' ,'u_gender','u_privilege','u_class','u_major','u_password','u_email','u_openid']
    list_filter   = ['u_number','u_name' ,'u_gender','u_privilege','u_class','u_major','u_password','u_email','u_openid']
    
    def u_gender(self):
        if self.u_gender:
            return "男"
        else:
            return "女"
    u_gender.short_description = "性别"
        
    
@xadmin.sites.register(Activity)
class ActivityAdmin(object):
    import_export_args = {'import_resource_class': ActivityResource}

    list_display = ['a_number','a_name','a_creator','a_theme','a_address','a_type','a_needsign','a_starttime','a_endtime','a_startsign','a_endsign','a_grade','a_host']
    search_fields = ['a_number','a_name','a_creator','a_theme','a_address','a_type','a_needsign','a_starttime','a_endtime','a_startsign','a_endsign','a_grade','a_host']
    list_editable = ['a_number','a_name','a_creator','a_theme','a_address','a_type','a_needsign','a_starttime','a_endtime','a_startsign','a_endsign','a_grade','a_host']
    list_filter = ['a_number','a_name','a_creator','a_theme','a_address','a_type','a_needsign','a_starttime','a_endtime','a_startsign','a_endsign','a_grade','a_host']

        
@xadmin.sites.register(Act2Stu)
class Act2StuAdmin(object):
    import_export_args = {'import_resource_class': Act2StuResource}
    
    list_display = ['a2s_num','a2s_actnum','ats_stunum','a2s_signtime','a2s_signup']
    search_fields = ['a2s_num','a2s_actnum','ats_stunum','a2s_signtime','a2s_signup']
    list_editable = ['a2s_num','a2s_actnum','ats_stunum','a2s_signtime','a2s_signup']
    list_filter = ['a2s_num','a2s_actnum','ats_stunum','a2s_signtime','a2s_signup']

#xadmin.sites.site.register(User,UsersAdmin)
#xadmin.sites.site.register(Act2Stu,Act2StuAdmin)
#xadmin.sites.site.register(Activity,ActivityAdmin)
