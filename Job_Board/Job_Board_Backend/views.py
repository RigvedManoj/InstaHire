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


class Job_list(APIView):
    """
    List all snippets, or create a new snippet.
    """
    # permission_classes = [EmployerPermission, IsAuthenticated]
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        snippets = Job.objects.all()
        serializer = JobSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Employer_list(APIView):
    """
    List all snippets, or create a new snippet.
    """
    permission_classes = [EmployerPermission, IsAuthenticated]

    # permission_classes = [AllowAny]

    def get(self, request, format=None):
        # snippets = Employer.objects.all()
        employer = request.GET.get('username', '')
        jobs = Employer.objects.filter(username__iexact=employer)
        serializer = EmployerSerializer(jobs, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
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


class Applicant_list(APIView):
    """
    List all snippets, or create a new snippet.
    """
    permission_classes = [ApplicantPermission, IsAuthenticated]

    # permission_classes = [AllowAny]

    def get(self, request, format=None):
        # snippets = Applicant.objects.all()
        applicant = request.GET.get('username', '')
        profile = Applicant.objects.filter(username__iexact=applicant)
        serializer = ApplicantSerializer(profile, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
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


class Employer_Applications_List(APIView):
    """
    List all snippets, or create a new snippet.
    """
    # permission_classes = (IsAuthenticated, )
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        employer = request.GET.get('employer_username', '')
        applications = Application.objects.filter(employer_username__exact=employer)
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data)


class Applicant_Applications_List(APIView):
    """
    List all snippets, or create a new snippet.
    """
    # permission_classes = (IsAuthenticated, )
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        applicant = request.GET.get('applicant_username', '')
        applications = Application.objects.filter(applicant_username__exact=applicant)
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data)


class Job_list_Detail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Job.objects.get(pk=pk)
        except Job.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = JobSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = JobSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ApplicantHomeView(APIView):
    permission_classes = [ApplicantPermission, IsAuthenticated]

    def get(self, request):
        content = {'message': 'You have access to this view'}
        return Response(content)


class EmployerHomeView(APIView):
    permission_classes = [EmployerPermission, IsAuthenticated]

    def get(self, request):
        content = {'message': 'You have access to this view'}
        return Response(content)


class ApplicantUserCreate(APIView):
    """
    Creates the user.
    """
    permission_classes = [AllowAny]

    # permission_classes = [ApplicantPermission, IsAuthenticated]

    def post(self, request, format='json'):
        serializer = ApplicantUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmployerUserCreate(APIView):
    """
    Creates the user.
    """
    permission_classes = [AllowAny]

    # permission_classes = [EmployerPermission, IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = EmployerUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class JobCreate(APIView):
    """
    Creates the user.
    """
    permission_classes = [EmployerPermission, IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Job registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
