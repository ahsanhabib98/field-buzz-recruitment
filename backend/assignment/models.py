from django.db import models
from django.core.validators import (
    MaxValueValidator,
    MinValueValidator
)
from django.db.models.signals import post_save

import uuid

# Create your models here.


DEPARTMENT_CHOICES = (
    ('Mobile', 'Mobile'),
    ('Backend', 'Backend')
)


class RecruitmentInformation(models.Model):
    tsync_id = models.UUIDField(unique=True, default=uuid.uuid4, max_length=55)
    name = models.CharField(max_length=256)
    email = models.EmailField(max_length=256)
    phone = models.CharField(max_length=14)
    full_address = models.CharField(max_length=512)
    name_of_university = models.CharField(max_length=256)
    graduation_year = models.IntegerField(validators=[
        MaxValueValidator(2020),
        MinValueValidator(2015)
    ])
    cgpa = models.FloatField(validators=[
        MaxValueValidator(4),
        MinValueValidator(2)
    ])
    experience_in_months = models.IntegerField(validators=[
        MaxValueValidator(100),
        MinValueValidator(0)
    ])
    current_work_place_name = models.CharField(max_length=256)
    applying_in = models.CharField(choices=DEPARTMENT_CHOICES, max_length=10)
    expected_salary = models.IntegerField(validators=[
        MaxValueValidator(60000),
        MinValueValidator(15000)
    ])
    field_buzz_reference = models.CharField(max_length=256)
    github_project_url = models.CharField(max_length=512)
    on_spot_update_time = models.DateTimeField(auto_now=True)
    on_spot_creation_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class CVFile(models.Model):
    tsync_id = models.UUIDField(unique=True, default=uuid.uuid4, max_length=55)
    cv_file = models.FileField(blank=False, null=False)
    user_info = models.OneToOneField(RecruitmentInformation, on_delete=models.CASCADE, related_name='cv_file')

    def __str__(self):
        return self.user_info.name


def create_cvfile(sender, **kwargs):
    if kwargs['created']:
        CVFile.objects.create(user_info=kwargs['instance'])


post_save.connect(create_cvfile, sender=RecruitmentInformation)
