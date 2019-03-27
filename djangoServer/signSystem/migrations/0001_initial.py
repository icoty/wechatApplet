# Generated by Django 2.0.2 on 2019-03-27 06:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CAct2Stu',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('act2stu_sign_time', models.DateTimeField(verbose_name='签入时间')),
                ('act2stu_isSignUp', models.BooleanField(default=False, verbose_name='是否报名')),
            ],
            options={
                'verbose_name': '用户关联活动',
                'verbose_name_plural': '用户关联活动',
                'db_table': 'sm_act2stu',
                'ordering': ['pk'],
            },
        ),
        migrations.CreateModel(
            name='CActivities',
            fields=[
                ('act_number', models.AutoField(primary_key=True, serialize=False)),
                ('act_name', models.CharField(max_length=50, verbose_name='活动名称')),
                ('act_address', models.CharField(max_length=50, verbose_name='活动开展地址')),
                ('act_type', models.CharField(max_length=50, verbose_name='活动类型')),
                ('act_need_sign_up', models.BooleanField(default=False, verbose_name='是否需要报名')),
                ('act_start_time', models.DateTimeField(verbose_name='活动开始时间')),
                ('act_end_time', models.DateTimeField(verbose_name='活动结束时间')),
                ('act_theme', models.CharField(max_length=500, verbose_name='活动主题')),
                ('act_start_sign', models.DateTimeField(verbose_name='签到开始时间')),
                ('act_end_sign', models.DateTimeField(verbose_name='签到截止时间')),
                ('act_grade', models.IntegerField(verbose_name='活动举办年级')),
                ('act_host', models.CharField(max_length=50, verbose_name='活动举办单位')),
            ],
            options={
                'verbose_name': '活动列表',
                'verbose_name_plural': '活动列表',
                'db_table': 'sm_activities',
                'ordering': ['pk'],
            },
        ),
        migrations.CreateModel(
            name='CUsers',
            fields=[
                ('user_student_number', models.IntegerField(primary_key=True, serialize=False, verbose_name='学号')),
                ('user_student_name', models.CharField(max_length=30, verbose_name='姓名')),
                ('user_gender', models.BooleanField(default=True, verbose_name='性别')),
                ('user_privilige', models.IntegerField(default=0, verbose_name='权限')),
                ('user_class', models.CharField(max_length=50, verbose_name='班级')),
                ('user_major', models.CharField(max_length=50, verbose_name='专业')),
                ('user_password', models.CharField(max_length=512, verbose_name='密码')),
                ('user_email', models.CharField(max_length=50, verbose_name='邮箱')),
            ],
            options={
                'verbose_name': '用户表',
                'verbose_name_plural': '用户表',
                'db_table': 'sm_users',
                'ordering': ['user_student_number'],
            },
        ),
        migrations.AddField(
            model_name='cactivities',
            name='act_creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='signSystem.CUsers', verbose_name='活动创建者'),
        ),
        migrations.AddField(
            model_name='cact2stu',
            name='act2stu_act_num',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='signSystem.CActivities'),
        ),
        migrations.AddField(
            model_name='cact2stu',
            name='act2stu_stu_num',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='signSystem.CUsers'),
        ),
    ]