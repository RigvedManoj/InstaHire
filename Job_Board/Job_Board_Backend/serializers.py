from rest_framework import serializers
from .models import Job, Applicant , Employer

class JobSerializer( serializers.ModelSerializer ):
    class Meta:
        model = Job
        fields = [ 'title', 'company' , 'description' , 'location' , 'listing_date' , 'application_deadline' ,
        'min_salary' , 'max_salary' ]

class ApplicantSerializer( serializers.ModelSerializer ):
    class Meta:
        model = Applicant
        fields = [ 'first_name', 'last_name' , 'email' , 'phone_number' , 'address' , 'city' ,
        'state' , 'country' , 'skills' , 'education' , 'experience' , 'created_at' ]

class EmployerSerializer( serializers.ModelSerializer ):
    class Meta:
        model = Employer
        fields = [ 'company_name', 'email' , 'email' , 'phone_number' , 'industry' , 'company_description' ,
        'created_at' ]