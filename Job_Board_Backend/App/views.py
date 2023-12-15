from .models import Job, Employer, Applicant
from .serializers import JobSerializer, EmployerSerializer, ApplicantSerializer, ApplicantUserSerializer, \
    EmployerUserSerializer, ApplicationSerializer
from django.http import Http404
from django.core.files.storage import default_storage
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Job, Employer, Applicant, Application
from .permissions import ApplicantPermission, EmployerPermission
from .serializers import JobSerializer, EmployerSerializer, ApplicantSerializer, ApplicantUserSerializer, \
    EmployerUserSerializer


class create_view_employer(APIView):
    """
    API endpoint for creating and getting employer profile.

    Permissions:
    - Users must be authenticated.
    - Custom permission 'EmployerPermission' is required.
    """
    permission_classes = [EmployerPermission, IsAuthenticated]

    def get(self, request, format=None):
        """
        Retrieve a list of employers from Employer DB based on optional query parameters.

        Supported query parameters:
        - username: Filter employers by username (case-insensitive).
        - company_name: Filter employers by company name (case-insensitive).
        """
        params = request.GET.items()
        queryset = Employer.objects.all()

        for key, value in params:
            # queryset = queryset.filter(**{f'{key}__iexact':value})
            if key == 'username':
                queryset = queryset.filter(username__iexact=value)
            if key == 'company_name':
                queryset = queryset.filter(company_name__iexact=value)

        serializer = EmployerSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        """
        Create a new employer and store in Employer DB.

        If the username already exists, update the existing employer.
        """
        employer_name = request.data.get('username', None)
        try:
            employer = Employer.objects.get(username=employer_name)
            serializer = EmployerSerializer(employer, data=request.data)
        except Employer.DoesNotExist:
            serializer = EmployerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class employer_view_applicant(APIView):
    """
    API endpoint for employers to view applicant profiles.

    Permissions:
    - Users must be authenticated.
    - Custom permission 'EmployerPermission' is required.
    """

    permission_classes = [EmployerPermission, IsAuthenticated]

    def get(self, request, format=None):
        """
        Retrieve the profile of an applicant from Applicant DB based on their username.

        Query Parameter:
        - username: The username of the applicant (case-insensitive).
        """
        applicant = request.GET.get('username', '')
        profile = Applicant.objects.filter(username__iexact=applicant)
        serializer = ApplicantSerializer(profile, many=True)
        return Response(serializer.data)


class create_view_applicant(APIView):
    """
    API endpoint for creating and retrieving applicant profiles.

    Permissions:
    - Users must be authenticated.
    - Custom permission 'ApplicantPermission' is required.
    """
    permission_classes = [ApplicantPermission, IsAuthenticated]

    def get(self, request, format=None):
        """
        Retrieve the profile of an applicant from APplicant DB based on their username.

        Query Parameter:
        - username: The username of the applicant (case-insensitive).
        """
        applicant = request.GET.get('username', '')
        profile = Applicant.objects.filter(username__iexact=applicant)
        serializer = ApplicantSerializer(profile, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        """
        Create a new applicant profile in Applicant DB.

        If the username already exists, update the existing profile.
        If updating, the previous resume file will be deleted.
        """
        applicant_name = request.data.get('username', None)
        previous_resume = None
        try:
            applicant = Applicant.objects.get(username=applicant_name)
            # Get the previous resume file
            previous_resume = applicant.resume
            serializer = ApplicantSerializer(applicant, data=request.data)
        except Applicant.DoesNotExist:
            serializer = ApplicantSerializer(data=request.data)

        if serializer.is_valid():
            if previous_resume:
                default_storage.delete(previous_resume.name)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class applicant_view_employer(APIView):
    """
    API endpoint for applicants to get employer profiles.

    Permissions:
    - Users must be authenticated.
    - Custom permission 'ApplicantPermission' is required.
    """
    permission_classes = [ApplicantPermission, IsAuthenticated]

    def get(self, request, format=None):
        """
        Retrieve a list of employers based on optional query parameters.

        Query Parameters:
        - `username` (optional): Filter employers by username (case-insensitive).
        - `company_name` (optional): Filter employers by company name (case-insensitive).
        """

        params = request.GET.items()
        queryset = Employer.objects.all()

        for key, value in params:
            # queryset = queryset.filter(**{f'{key}__iexact':value})
            if key == 'username':
                queryset = queryset.filter(username__iexact=value)
            if key == 'company_name':
                queryset = queryset.filter(company_name__iexact=value)

        serializer = EmployerSerializer(queryset, many=True)
        return Response(serializer.data)


class employer_view_applications(APIView):
    """
    API endpoint for employers to view applications received.

    Permissions:
    - Users must be authenticated.
    - Custom permission 'EmployerPermission' is required.
    """

    permission_classes = [EmployerPermission, IsAuthenticated]

    def get(self, request, format=None):
        """
        Retrieve a list of applications received.

        Supported query parameters:
        - employer_username: Filter applications by employer username (case-insensitive).
        """
        employer = request.GET.get('employer_username', '')
        applications = Application.objects.filter(employer_username__exact=employer)
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        """
        Update status of an existing application in application DB.
        """
        application_id = request.data.get('application_id', None)
        try:
            application = Application.objects.get(application_id=application_id)
            serializer = ApplicationSerializer(application, data=request.data)
        except Application.DoesNotExist:
            serializer = ApplicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class applicant_view_applications(APIView):
    """
    API endpoint for applicants to view their job applications.

    Permissions:
    - Users must be authenticated.
    - Custom permission 'ApplicantPermission' is required.
    """
    permission_classes = [ApplicantPermission, IsAuthenticated]

    def get(self, request, format=None):
        """
        Retrieve a list of job applications for the applicant.

        Query Parameter:
        - applicant_username: The username of the applicant (case-sensitive).
        """
        applicant = request.GET.get('applicant_username', '')
        applications = Application.objects.filter(applicant_username__exact=applicant)
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        """
        Applicant applies to a job.
        Data with applicant_id, job_id, and employer_id are stored in the Application DB.
        """
        application_id = request.data.get('application_id', None)
        try:
            application = Application.objects.get(application_id=application_id)
            serializer = ApplicationSerializer(application, data=request.data)
        except Application.DoesNotExist:
            serializer = ApplicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class create_applicant_user(APIView):
    """
    API endpoint for creating a new applicant user.

    Permissions:
    - Allows any user to access this endpoint.
    """
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        """
        Create a new applicant user. User information gets updated in the Users DB.
        """
        serializer = ApplicantUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class create_employer_user(APIView):
    """
    API endpoint for creating a new employer user.

    Permissions:
    - Allows any user to access this endpoint.
    """
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """
        Create a new employer user. User information gets updated in the Users DB.
        """
        serializer = EmployerUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class employer_create_job(APIView):
    """
    API endpoint for employers to create a new job listing.

    Permissions:
    - Users must be authenticated.
    - Custom permission 'EmployerPermission' is required.
    """
    permission_classes = [EmployerPermission, IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Create a new job listing. Job information is stored in the Jobs DB.
        """
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Job registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class applicant_view_job(APIView):
    """
    API endpoint for applicants to view available job listings.

    Permissions:
    - Users must be authenticated.
    - Custom permission 'ApplicantPermission' is required.
    """
    permission_classes = [ApplicantPermission, IsAuthenticated]

    def get(self, request, format=None):
        """
        Retrieve a list of available job listings.
        """
        snippets = Job.objects.all()
        serializer = JobSerializer(snippets, many=True)
        return Response(serializer.data)


class view_jobs(APIView):
    """
    API endpoint for authenticated users to view a specific job listing.

    Permissions:
    - Users must be authenticated.
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Job.objects.get(pk=pk)
        except Job.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        """
        Retrieve details of a specific job listing.
        """
        snippet = self.get_object(pk)
        serializer = JobSerializer(snippet)
        return Response(serializer.data)
