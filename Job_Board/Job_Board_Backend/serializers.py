from rest_framework import serializers
from .models import Job, Applicant , Employer , UserAbstract
from rest_framework.validators import UniqueValidator

class JobSerializer( serializers.ModelSerializer ):
    class Meta:
        model = Job
        fields = [ 'title', 'company' , 'description' , 'location' , 'listing_date' , 'application_deadline' ,
        'min_salary' , 'max_salary' ]

class ApplicantSerializer( serializers.ModelSerializer ):
    class Meta:
        model = Applicant
        fields = [ 'username', 'first_name', 'last_name' , 'gender', 'email' , 'phone_number' , 'address_line1' , 'address_line2' ,'city' ,
        'state' , 'country' , 'resume', 'created_at' ]

class EmployerSerializer( serializers.ModelSerializer ):
    class Meta:
        model = Employer
        fields = [ 'company_name', 'email' , 'email' , 'phone_number' , 'industry' , 'company_description' ,
        'created_at' ]

class ApplicantUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = UserAbstract
        fields = ['username', 'password', 'is_applicant', 'is_employer']

    def create(self, validated_data):
        validated_data['is_applicant'] = True  # Set is_applicant to True during creation
        user = UserAbstract.objects.create_user(**validated_data)
        return user

class EmployerUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = UserAbstract
        fields = ['username', 'password', 'is_applicant', 'is_employer']

    def create(self, validated_data):
        validated_data['is_employer'] = True  # Set is_applicant to True during creation
        user = UserAbstract.objects.create_user(**validated_data)
        return user