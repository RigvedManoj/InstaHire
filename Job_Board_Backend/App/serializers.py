from rest_framework import serializers
from .models import Job, Applicant , Employer , Application , UserAbstract
from rest_framework.validators import UniqueValidator

from .models import Job, Applicant, Employer, UserAbstract


class JobSerializer(serializers.ModelSerializer):
    """
    Serializer for Job Model
    """
    class Meta:
        model = Job
        fields = ['job_id', 'title', 'company', 'description', 'location', 'listing_date', 'application_deadline',
                  'min_salary', 'max_salary']


class ApplicantSerializer(serializers.ModelSerializer):
    """
    Serializer for Applicant Model
    """
    class Meta:
        model = Applicant
        fields = ['username', 'first_name', 'last_name', 'gender', 'dob', 'email', 'phone_number', 'address_line1',
                  'address_line2', 'city',
                  'state', 'country', 'resume', 'created_at']


class EmployerSerializer(serializers.ModelSerializer):
    """
    Serializer for Employer Model
    """
    class Meta:
        model = Employer
        fields = ['username', 'company_name', 'email', 'phone_number', 'industry', 'company_description',
                  'created_at']



class ApplicationSerializer( serializers.ModelSerializer ):
    """
    Serializer for Application Model
    """
    class Meta:
        model = Application
        fields = [ 'application_id', 'job_id', 'applicant_username', 'employer_username', 'status'  ]


class ApplicantUserSerializer(serializers.ModelSerializer):
    """
    Serializer for Applicant User Model
    """
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = UserAbstract
        fields = ['username', 'password', 'is_applicant', 'is_employer']

    def create(self, validated_data):
        validated_data['is_applicant'] = True  # Set is_applicant to True during creation
        user = UserAbstract.objects.create_user(**validated_data)
        return user


class EmployerUserSerializer(serializers.ModelSerializer):
    """
    Serializer for Employer User Model
    """
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = UserAbstract
        fields = ['username', 'password', 'is_applicant', 'is_employer']

    def create(self, validated_data):
        validated_data['is_employer'] = True  # Set is_applicant to True during creation
        user = UserAbstract.objects.create_user(**validated_data)
        return user
