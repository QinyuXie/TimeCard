from django.db import models


# Create your models here.
class Employee(models.Model):

    id = models.AutoField('id', primary_key=True)
    username = models.CharField('username', max_length=100)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    phone = models.CharField(max_length=11)
    create_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('id',)


class TimeEntry(models.Model):
    id = models.AutoField('id', primary_key=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    employee_id = models.IntegerField()
    duration = models.DateTimeField()

    # -1 -- declined , 0 -- pending , 1 -- approved
    # status = models.IntegerField()
    # duration_hr = models.IntegerField()
    # duration_min = models.IntegerField()

    # owner = models.ForeignKey('auth.User', related_name='TimeEntry', on_delete=)

    class Meta:
        ordering = ('start_time',)
