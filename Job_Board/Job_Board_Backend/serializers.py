from rest_framework import serializers
from .models import Job, Applicant , Employer
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator

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

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[ UniqueValidator(queryset=User.objects.all()) ]
            )
    username = serializers.CharField(
            validators=[ UniqueValidator(queryset=User.objects.all()) ]
            )
    password = serializers.CharField( min_length=8 )

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
             validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')