from django.contrib import admin
from .models import Job, Applicant, Employer , UserAbstract, Application

# Register your models here.
admin.site.register( Job )
admin.site.register( Applicant )
admin.site.register( Employer )
admin.site.register( Application )
admin.site.register( UserAbstract )
